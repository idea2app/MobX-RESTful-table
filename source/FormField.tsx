import { InputHTMLAttributes, FC } from 'react';
import { FloatingLabelProps, FormControlProps, Form } from 'react-bootstrap';

import { FilePicker } from './FilePicker';

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FormControlProps &
  Pick<FloatingLabelProps, 'label'>;

export const FormField: FC<FormFieldProps> = ({
  className,
  style,
  label,
  type,
  id,
  name,
  ...controlProps
}) =>
  type === 'file' ? (
    <Form.Group {...{ className, style }}>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      <FilePicker {...{ id, name }} {...controlProps} />
    </Form.Group>
  ) : (
    <Form.FloatingLabel {...{ className, style, label }} controlId={name || id}>
      <Form.Control
        {...{ type, name }}
        placeholder={name || id}
        {...controlProps}
      />
    </Form.FloatingLabel>
  );

FormField.displayName = 'FormField';
