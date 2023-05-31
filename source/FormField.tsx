import { FC, InputHTMLAttributes } from 'react';
import { FloatingLabelProps, Form, FormControlProps } from 'react-bootstrap';

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FormControlProps &
  Pick<FloatingLabelProps, 'label'>;

export const FormField: FC<FormFieldProps> = ({
  className,
  style,
  label,
  id,
  name,
  ...controlProps
}) => (
  <Form.FloatingLabel {...{ className, style, label }} controlId={name || id}>
    <Form.Control name={name} placeholder={name || id} {...controlProps} />
  </Form.FloatingLabel>
);

FormField.displayName = 'FormField';
