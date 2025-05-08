import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps } from 'mobx-react-helper';
import { KeyboardEvent } from 'react';
import { Badge, CloseButton } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

export const TextInputTypes = [
  'text',
  'number',
  'tel',
  'email',
  'url',
] as const;

export interface BadgeInputProps extends FormComponentProps<string[]> {
  type?: (typeof TextInputTypes)[number];
}

@observer
export class BadgeInput extends FormComponent<BadgeInputProps> {
  static readonly displayName = 'BadgeInput';

  static match(type: string): type is BadgeInputProps['type'] {
    return TextInputTypes.includes(type as BadgeInputProps['type']);
  }

  handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const { value } = input,
      innerValue = this.innerValue || [];

    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        input.value = '';

        if (value) this.innerValue = [...innerValue, value];

        break;
      }
      case 'Backspace': {
        if (!value) this.innerValue = innerValue.slice(0, -1);
      }
    }
  };

  delete(index: number) {
    const { innerValue } = this;

    this.innerValue = [
      ...innerValue.slice(0, index),
      ...innerValue.slice(index + 1),
    ];
  }

  render() {
    const { value } = this,
      { className = '', style, type, name, required, placeholder } = this.props;

    return (
      <div
        className={`form-control p-2 d-flex flex-wrap gap-2 ${className}`}
        style={style}
      >
        {value?.map((item, index) => (
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
