import { FormControl, FormFloatingLabel, FormSelect, FormTextArea } from 'idea-react';
import {
  FC,
  FocusEvent,
  FocusEventHandler,
  ComponentPropsWithRef,
  ReactNode,
  ChangeEventHandler,
} from 'react';
import { FormControlProps, FormSelectProps, FormTextAreaProps } from 'idea-react';
import { uniqueID } from 'web-utility';

export interface SelectOption extends Partial<
  Pick<HTMLOptionElement, 'text' | 'label' | 'disabled'>
> {
  value: string;
}

export type FormFieldProps = Omit<
  ComponentPropsWithRef<'input'>,
  'size' | 'onBlur' | 'onChange' | 'color'
> &
  Pick<ComponentPropsWithRef<'textarea'>, 'rows'> & {
    as?: 'textarea';
    label?: ReactNode;
    options?: SelectOption[];
    size?: 'sm' | 'lg';
    color?: boolean;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  };

export type HTMLFieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
      const control = event.target as HTMLFieldElement;

      if (control.checkValidity()) {
        control.classList.remove('is-invalid');
        event.currentTarget.classList.remove('is-invalid');
      } else {
        control.classList.add('is-invalid');
        event.currentTarget.classList.add('is-invalid');
      }
      onBlur(event as unknown as FocusEvent<HTMLFieldElement>);
    });

  return (
    <FormFloatingLabel {...{ className, style }} onBlur={handleBlur}>
      {options ? (
        <FormSelect
          {...(controlProps as unknown as FormSelectProps)}
          className={multiple ? 'h-auto' : ''}
          size={multiple ? rows || undefined : undefined}
          controlSize={size}
          {...{ id, name, multiple }}
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
          className={rows > 1 ? 'h-auto' : ''}
          rows={rows || undefined}
          {...{ id, name, placeholder }}
        />
      ) : (
        <FormControl
          {...(controlProps as unknown as FormControlProps)}
          {...{ id, name, multiple, placeholder }}
          controlSize={size}
        />
      )}
      {label && <label htmlFor={id}>{label}</label>}
    </FormFloatingLabel>
  );
};

FormField.displayName = 'FormField';
