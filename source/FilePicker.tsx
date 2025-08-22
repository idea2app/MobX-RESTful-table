import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps, reaction } from 'mobx-react-helper';
import { CloseButton } from 'react-bootstrap';
import { blobOf } from 'web-utility';

import { FilePreview } from './FilePreview';

export type FilePickerProps = FormComponentProps<string | File>;

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
    const { filePath, fileType } = this,
      { className = '', style } = this.props;

    return (
      <div
        className={`d-inline-block border rounded position-relative ${className}`}
        style={{ width: '10rem', height: '10rem', ...style }}
      >
        {filePath ? (
          <FilePreview className="w-100 h-100" type={fileType} path={filePath} />
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center display-1">
            +
          </div>
        )}
        {this.renderInput()}
        {filePath && (
          <CloseButton
            className="position-absolute top-0 end-0"
            style={{ width: '0.5rem', height: '0.5rem' }}
            onClick={() => this.#changeFile()}
          />
        )}
      </div>
    );
  }
}
