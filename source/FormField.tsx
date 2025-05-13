import { FC } from 'react';
import { FloatingLabelProps, Form, FormControlProps, FormSelectProps } from 'react-bootstrap';

export interface SelectOption
  extends Partial<Pick<HTMLOptionElement, 'text' | 'label' | 'disabled'>> {
  value: string;
}

export type FormFieldProps = FormControlProps &
  FormSelectProps &
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
  ...controlProps
}) => (
  <Form.FloatingLabel {...{ className, style, label }} controlId={name || id}>
    {options ? (
      <Form.Select name={name} {...controlProps}>
        {options.map(({ value, text, label, disabled }) => (
          <option key={value} {...{ value, label, disabled }}>
            {text || value}
          </option>
        ))}
      </Form.Select>
    ) : (
      <Form.Control
        name={name}
        placeholder={placeholder || (typeof label === 'string' ? label : name || id)}
        {...controlProps}
      />
    )}
  </Form.FloatingLabel>
);

FormField.displayName = 'FormField';
