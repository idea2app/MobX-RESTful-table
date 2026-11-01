import { FormControl, FormFloatingLabel, FormSelect, FormTextArea } from 'idea-react';
import {
  FC,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  ChangeEventHandler,
  TextareaHTMLAttributes,
} from 'react';
import { FormControlProps, FormSelectProps, FormTextAreaProps } from 'idea-react';
import { uniqueID } from 'web-utility';

export interface SelectOption extends Partial<
  Pick<HTMLOptionElement, 'text' | 'label' | 'disabled'>
> {
  value: string;
}

export type FormFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onBlur' | 'onChange' | 'color'
> &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> & {
    label?: ReactNode;
    options?: SelectOption[];
    size?: 'sm' | 'lg';
    as?: 'textarea';
    color?: boolean;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  };

export const FormField: FC<FormFieldProps> = ({
  className,
  style,
  as,
  name,
  id = name || `form-field-${uniqueID()}`,
  label,
  placeholder = typeof label === 'string' ? label : id,
  options,
  multiple,
  size,
  rows = 0,
  onBlur,
  ...controlProps
}) => {
  const handleBlur =
    onBlur &&
    ((event: FocusEvent<HTMLDivElement>) => {
      const control = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

      if (control.checkValidity()) {
        control.classList.remove('is-invalid');
        event.currentTarget.classList.remove('is-invalid');
      } else {
        control.classList.add('is-invalid');
        event.currentTarget.classList.add('is-invalid');
      }
      onBlur(
        event as unknown as FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
      );
    });

  return (
    <FormFloatingLabel {...{ className, style }} onBlur={handleBlur}>
      {options ? (
        <FormSelect
          {...(controlProps as unknown as FormSelectProps)}
          id={id}
          name={name}
          multiple={multiple}
          size={multiple ? rows || undefined : undefined}
          controlSize={size}
          className={multiple ? 'h-auto' : ''}
        >
          {options.map(({ value, text, label, disabled }) => (
            <option key={value} {...{ value, label, disabled }}>
              {text || value}
            </option>
          ))}
        </FormSelect>
      ) : as === 'textarea' ? (
        <FormTextArea
          {...(controlProps as unknown as FormTextAreaProps)}
          id={id}
          name={name}
          rows={rows || undefined}
          placeholder={placeholder}
          className={rows > 1 ? 'h-auto' : ''}
        />
      ) : (
        <FormControl
          {...(controlProps as unknown as FormControlProps)}
          id={id}
          name={name}
          multiple={multiple}
          placeholder={placeholder}
          controlSize={size}
        />
      )}
      {label && <label htmlFor={id}>{label}</label>}
    </FormFloatingLabel>
  );
};

FormField.displayName = 'FormField';
