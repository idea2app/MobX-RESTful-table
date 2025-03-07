import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { ChangeEvent, MouseEvent } from 'react';
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

  handleAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];

    this.innerValue = (this.file = file) ? URL.createObjectURL(file) : '';

    this.props.onChange?.(this.innerValue, file);
  };

  handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.innerValue) {
      URL.revokeObjectURL(this.innerValue + '');

      this.innerValue = '';
    }
    this.props.onChange?.(this.innerValue);
  };

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
          onChange={this.handleAdd}
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
            onClick={this.handleClear}
          />
        )}
      </div>
    );
  }
}
