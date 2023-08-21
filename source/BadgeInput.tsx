import { computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { InputHTMLAttributes, KeyboardEvent, PureComponent } from 'react';
import { Badge, CloseButton } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

export const TextInputTypes = [
  'text',
  'number',
  'tel',
  'email',
  'url',
] as const;

export interface BadgeInputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'style' | 'name' | 'required' | 'placeholder'
  > {
  type?: (typeof TextInputTypes)[number];
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => any;
}

@observer
export class BadgeInput extends PureComponent<BadgeInputProps> {
  constructor(props: BadgeInputProps) {
    super(props);

    makeObservable?.(this);
  }

  static match(type: string): type is BadgeInputProps['type'] {
    return TextInputTypes.includes(type as BadgeInputProps['type']);
  }

  @observable
  innerValue = this.props.defaultValue || [];

  @computed
  get value() {
    return this.props.value || this.innerValue;
  }

  handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const { value } = input,
      { onChange } = this.props;

    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        input.value = '';

        if (value) {
          this.innerValue = [...this.innerValue, value];
          onChange?.(this.innerValue);
        }
        break;
      }
      case 'Backspace': {
        if (value) return;

        this.innerValue = this.innerValue.slice(0, -1);

        onChange?.(this.innerValue);
      }
    }
  };

  delete(index: number) {
    const { innerValue } = this;

    this.innerValue = [
      ...innerValue.slice(0, index),
      ...innerValue.slice(index + 1),
    ];
    this.props.onChange?.(this.innerValue);
  }

  render() {
    const { value } = this,
      { className = '', style, type, name, required, placeholder } = this.props;

    return (
      <div
        className={`form-control p-2 d-flex flex-wrap gap-2 ${className}`}
        style={style}
      >
        {value.map((item, index) => (
          <Badge
            key={item}
            className="d-flex align-items-center gap-2"
            bg="light"
            text="dark"
          >
            {item}
            <CloseButton onClick={() => this.delete(index)} />
          </Badge>
        ))}
        <input
          className="border-0 flex-fill"
          style={{ outline: 'none' }}
          type={type}
          required={isEmpty(value) ? required : undefined}
          placeholder={placeholder}
          onKeyDown={this.handleInput}
        />
        <input type="hidden" name={name} value={JSON.stringify(value)} />
      </div>
    );
  }
}
