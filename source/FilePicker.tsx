import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps, reaction } from 'mobx-react-helper';
import { Button, ButtonGroup } from 'react-bootstrap';
import { blobOf } from 'web-utility';

import { FilePreview, FilePreviewProps } from './FilePreview';
import * as styles from './FilePicker.module.less';

export interface FilePickerProps extends FormComponentProps<string | File> {
  onView?: (data: Pick<FilePreviewProps, 'path' | 'file'>) => void;
}

const blobCache = new WeakMap<File, string>();

@observer
export class FilePicker extends FormComponent<FilePickerProps> {
  static readonly displayName = 'FilePicker';

  @observable
  accessor file: File | undefined;

  @computed
  get fileType() {
    const { accept } = this.observedProps,
      { file } = this;

    return file?.type || file?.name.match(/\.\w+$/)?.[0] || accept;
  }

  @computed
  get filePath() {
    const { value } = this;

    return typeof value === 'string' ? value : blobCache.get(value);
  }

  @reaction(({ value }) => value)
  protected async restoreFile(data: FilePickerProps['value']) {
    if (typeof data === 'string')
      try {
        const blob = await blobOf(data),
          name = data.split('/').at(-1);
        const file = new File([blob], name, { type: blob.type });

        blobCache.set(file, data);

        return (this.file = file);
      } catch {}

    if (data instanceof File) {
      if (!blobCache.has(data)) blobCache.set(data, URL.createObjectURL(data));

      return (this.file = data);
    }
    return (this.file = undefined);
  }

  #changeFile = (data?: File) => {
    this.file = data;

    if (data) {
      this.innerValue = data;

      blobCache.set(data, URL.createObjectURL(data));
    } else if (this.value) {
      const { innerValue } = this;

      if (typeof innerValue === 'string' && innerValue.startsWith('blob:'))
        URL.revokeObjectURL(innerValue);
      else if (innerValue instanceof File) blobCache.delete(innerValue);

      this.innerValue = '';
    }
  };

  componentDidMount() {
    super.componentDidMount();

    this.restoreFile(this.value);
  }

  renderInput() {
    const { id, name, value, required, disabled, accept, multiple } = this.props,
      { filePath } = this;

    return (
      <>
        <input
          ref={this.ref}
          className="position-absolute start-0 top-0 w-100 h-100 opacity-0"
          type="file"
          name={value ? undefined : name}
          required={!value && required}
          {...{ id, disabled, accept, multiple }}
          onChange={({ currentTarget: { files } }) => this.#changeFile(files?.[0])}
        />
        {filePath && <input type="hidden" name={name} value={filePath} />}
      </>
    );
  }

  render() {
    const { file, filePath, fileType } = this,
      { className = '', style, onView } = this.props;

    return (
      <div
        className={`d-inline-block border rounded position-relative ${styles.filePicker} ${className}`}
        style={{ width: '10rem', height: '10rem', ...style }}
      >
        {filePath ? (
          <FilePreview className="w-100 h-100" type={fileType} path={filePath} file={file} />
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center display-1">
            +
          </div>
        )}
        {this.renderInput()}
        <ButtonGroup className={`position-absolute top-0 end-0 ${styles.toolbar}`} size="sm">
          {onView && (
            <Button onClick={() => onView({ path: filePath, file })}>
              <i className="bi bi-eye-fill" />
            </Button>
          )}
          {filePath && (
            <Button onClick={() => this.#changeFile()}>
              <i className="bi bi-x-lg" />
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  }
}
