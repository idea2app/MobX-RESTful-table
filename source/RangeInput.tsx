import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { ReactNode } from 'react';

export interface RangeInputProps extends Omit<FormComponentProps, 'type'> {
  icon?: ReactNode | ((itemValue: number) => ReactNode);
}

@observer
@observePropsState
export class RangeInput extends FormComponent<RangeInputProps> {
  static readonly displayName = 'RangeInput';

  renderItem(index: number) {
    const { value = 0 } = this,
      { icon, step = 1 } = this.observedProps;
    const fullValue = +step * index;
    const itemValue = Math.max(Math.min(+value - fullValue, +step), 0);

    return (
      <li key={index} className="text-center">
        {typeof icon === 'function' ? icon(itemValue) : icon}
      </li>
    );
  }

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
          style={{ margin: '0 -0.5rem', cursor: 'pointer' }}
          type="range"
          onChange={({ currentTarget: { value } }) => (this.innerValue = value)}
        />
        <ol className="list-unstyled user-select-none position-absolute start-0 top-0 w-100 h-100 pe-none d-flex justify-content-around">
          {Array.from({ length: +max }, (_, index) => this.renderItem(index))}
        </ol>
      </div>
    );
  }
}
