import { observer } from 'mobx-react';
import { ChangeEvent, MouseEvent } from 'react';
import { CloseButton } from 'react-bootstrap';

import { FilePreview } from './FilePreview';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from './FormComponent';

export interface FilePickerProps extends FormComponentProps {
  onChange?: (value: FormComponentProps['value'], file?: File) => any;
}

@observer
@observePropsState
export class FilePicker extends FormComponent<FilePickerProps> {
  static readonly displayName = 'FilePicker';

  handleAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];

    this.innerValue = file ? URL.createObjectURL(file) : '';

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
    const { id, name, value, required, disabled, accept } = this.props;

    return (
      <>
        <input
          ref={this.ref}
          className="position-absolute start-0 top-0 w-100 h-100 opacity-0"
          type="file"
          name={value ? undefined : name}
          required={!value && required}
          {...{ id, disabled, accept }}
          onChange={this.handleAdd}
        />
        {value && <input type="hidden" name={name} value={value} />}
      </>
    );
  }

  render() {
    const { value } = this,
      { className = '', style, accept } = this.props;

    return (
      <div
        className={`form-control position-relative ${className}`}
        style={style}
      >
        {value ? (
          <FilePreview
            className="w-100 h-100 object-fit-contain"
            type={accept}
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
