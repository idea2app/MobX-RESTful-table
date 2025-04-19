import { computed, IReactionDisposer, observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { CloseButton } from 'react-bootstrap';

import { FilePreview } from './FilePreview';

export interface FilePickerProps extends FormComponentProps {
  onChange?: (value: FormComponentProps['value'], file?: File) => any;
}

@observer
@observePropsState
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

  #disposer?: IReactionDisposer;

  #handleURI = (file: File) => {
    if (file) this.innerValue = URL.createObjectURL(file);
    else if (this.innerValue) {
      URL.revokeObjectURL(this.innerValue);

      this.innerValue = '';
    }
  };

  componentDidMount() {
    super.componentDidMount();

    this.#disposer = reaction(() => this.file, this.#handleURI);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.#disposer?.();
    this.#disposer = undefined;
  }

  renderInput() {
    const { id, name, value, required, disabled, accept, multiple } =
      this.props;

    return (
      <>
        <input
          ref={this.ref}
          className="position-absolute start-0 top-0 w-100 h-100 opacity-0"
          type="file"
          name={value ? undefined : name}
          required={!value && required}
          {...{ id, disabled, accept, multiple }}
          onChange={({ currentTarget }) =>
            (this.file = currentTarget.files?.[0])
          }
        />
        {value && <input type="hidden" name={name} value={value} />}
      </>
    );
  }

  render() {
    const { value, fileType } = this,
      { className = '', style } = this.props;

    return (
      <div
        className={`d-inline-block border rounded position-relative ${className}`}
        style={{ width: '10rem', height: '10rem', ...style }}
      >
        {value ? (
          <FilePreview
            className="w-100 h-100 object-fit-contain"
            type={fileType}
            path={value + ''}
          />
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center display-1">
            +
          </div>
        )}
        {this.renderInput()}
        {value && (
          <CloseButton
            className="position-absolute top-0 end-0"
            style={{ width: '0.5rem', height: '0.5rem' }}
            onClick={() => (this.file = undefined)}
          />
        )}
      </div>
    );
  }
}
