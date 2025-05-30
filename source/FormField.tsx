import { FC, TextareaHTMLAttributes } from 'react';
import { FloatingLabelProps, Form, FormControlProps, FormSelectProps } from 'react-bootstrap';

export interface SelectOption
  extends Partial<Pick<HTMLOptionElement, 'text' | 'label' | 'disabled'>> {
  value: string;
}

export type FormFieldProps = FormControlProps &
  FormSelectProps &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> &
  Pick<FloatingLabelProps, 'label'> & {
    options?: SelectOption[];
  };

export const FormField: FC<FormFieldProps> = ({
  className,
  style,
  label,
  placeholder,
  id,
  name,
  options,
  multiple,
  rows,
  onBlur,
  ...controlProps
}) => (
  <Form.FloatingLabel
    {...{ className, style, label }}
    controlId={name || id}
    onBlur={event => {
      if ((event.target as HTMLInputElement).checkValidity()) {
        event.target.classList.remove('is-invalid');
        event.currentTarget.classList.remove('is-invalid');
      } else {
        event.target.classList.add('is-invalid');
        event.currentTarget.classList.add('is-invalid');
      }
      onBlur?.(event as Parameters<FormControlProps['onBlur']>[0]);
    }}
  >
    {options ? (
      <Form.Select
        className={multiple ? 'h-auto' : ''}
        {...{ name, multiple, htmlSize: rows, ...controlProps }}
      >
        {options.map(({ value, text, label, disabled }) => (
          <option key={value} {...{ value, label, disabled }}>
            {text || value}
          </option>
        ))}
      </Form.Select>
    ) : (
      <Form.Control
        className={rows > 1 ? 'h-auto' : ''}
        {...{ name, multiple, rows, ...controlProps }}
        placeholder={placeholder || (typeof label === 'string' ? label : name || id)}
      />
    )}
  </Form.FloatingLabel>
);

FormField.displayName = 'FormField';
