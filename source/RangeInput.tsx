import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { ChangeEvent, ReactNode } from 'react';

export interface RangeInputProps extends Omit<FormComponentProps, 'type'> {
  icon?: ReactNode | ((value: number) => ReactNode);
}

@observer
@observePropsState
export class RangeInput extends FormComponent<RangeInputProps> {
  declare observedProps: RangeInputProps;

  handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.innerValue = value;

    this.props.onChange?.(value);
  };

  render() {
    const {
        className = 'd-inline-block position-relative',
        icon,
        min,
        max = icon ? 5 : 100,
        onChange,
        ...props
      } = this.observedProps,
      { value = min || 0 } = this;

    return (
      <div className={className} title={value + ''}>
        <input
          {...{ min, max, value, ...props }}
          className={icon ? 'opacity-0' : ''}
          type="range"
          onChange={this.handleChange}
        />
        <div className="position-absolute start-0 top-0 w-100 h-100 pe-none d-flex">
          {Array.from({ length: Math.ceil(+value) }, (_, index) => (
            <div className="text-center" style={{ width: 100 / +max + '%' }}>
              {typeof icon === 'function'
                ? icon(+value - index > 1 ? 1 : +value - index)
                : icon}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
