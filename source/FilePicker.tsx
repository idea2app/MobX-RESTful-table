import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  PureComponent,
} from 'react';
import { CloseButton } from 'react-bootstrap';

import { FilePreview } from './FilePreview';

export type FilePickerProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'className'
  | 'style'
  | 'id'
  | 'name'
  | 'defaultValue'
  | 'value'
  | 'required'
  | 'disabled'
  | 'accept'
  | 'onChange'
>;

@observer
export class FilePicker extends PureComponent<FilePickerProps> {
  static readonly displayName = 'FilePicker';

  @observable
  innerValue = '';

  @computed
  get value() {
    const { value, defaultValue } = this.props;

    return value || this.innerValue || defaultValue;
  }

  handleAdd = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];

    if (file) this.innerValue = URL.createObjectURL(file);

    this.props.onChange?.(event);
  };

  handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.innerValue) {
      URL.revokeObjectURL(this.innerValue);

      this.innerValue = '';
    }
    // @ts-ignore
    this.props.onChange?.(event);
  };

  render() {
    const { value, innerValue } = this,
      {
        className = '',
        style,
        id,
        name,
        required,
        disabled,
        accept,
      } = this.props;

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
        <input
          className="position-absolute start-0 top-0 w-100 h-100 opacity-0"
          type="file"
          name={innerValue ? name : undefined}
          {...{ id, required, disabled, accept }}
          onChange={this.handleAdd}
        />
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
