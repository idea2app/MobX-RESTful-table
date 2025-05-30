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
  ...controlProps
}) => (
  <Form.FloatingLabel {...{ className, style, label }} controlId={name || id}>
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
