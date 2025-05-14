import { computed } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { DataObject, Filter, IDType, ListModel } from 'mobx-restful';
import { FormEvent, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { Button, Form, FormProps } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { FilePreview } from './FilePreview';
import { FileModel, FileUploader } from './FileUploader';
import { FormField, FormFieldProps } from './FormField';

export interface Field<T extends DataObject>
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'type'
      | 'readOnly'
      | 'disabled'
      | 'required'
      | 'min'
      | 'minLength'
      | 'max'
      | 'maxLength'
      | 'step'
      | 'multiple'
      | 'accept'
      | 'placeholder'
    >,
    Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'>,
    Pick<FormFieldProps, 'options'> {
  key?: keyof T;
  renderLabel?: ReactNode | ((data: keyof T) => ReactNode);
  renderInput?: (data: T, meta: Field<T>) => ReactNode;
  uploader?: FileModel;
}

export interface RestFormProps<D extends DataObject, F extends Filter<D> = Filter<D>>
  extends Pick<FormProps, 'className' | 'style'> {
  id?: IDType;
  fields: Field<D>[];
  store: ListModel<D, F>;
  translator: TranslationModel<string, 'submit' | 'cancel'>;
  onSubmit?: (data: D) => any;
}

@observer
export class RestForm<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends ObservedComponent<RestFormProps<D, F>> {
  static readonly displayName = 'RestForm';

  componentDidMount() {
    const { id, store } = this.props;

    if (id) store.getOne(id);
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { id, store, onSubmit } = this.props;

    const updated = await store.updateOne(formToJSON(event.currentTarget), id);

    onSubmit?.(updated);

    store.clearCurrent();
  };

  @computed
  get fields(): Field<D>[] {
    const { fields } = this.observedProps;

    return fields.map(({ renderInput, ...meta }) => ({
      ...meta,
      renderInput:
        renderInput ??
        (meta.type === 'file'
          ? this.renderFile(meta)
          : meta.key && this.renderField(meta, meta.rows ? { as: 'textarea' } : {})),
    }));
  }

  @computed
  get readOnly() {
    return this.fields.every(({ readOnly, disabled }) => readOnly || disabled);
  }

  renderFile =
    ({ key, renderLabel, type, required, multiple, accept, uploader }: Field<D>) =>
    ({ [key]: paths }: D) => {
      const value = ((Array.isArray(paths) ? paths : [paths]) as string[]).filter(Boolean);

      return (
        <Form.Group>
          <Form.Label>
            {typeof renderLabel === 'function'
              ? renderLabel?.(key)
              : renderLabel || (key as string)}
          </Form.Label>
          {uploader ? (
            <FileUploader
              store={uploader}
              name={key?.toString()}
              {...{ required, multiple, accept }}
              defaultValue={value}
            />
          ) : (
            value.map(path => <FilePreview {...{ type, path }} />)
          )}
        </Form.Group>
      );
    };

  renderField = (
    { key, renderLabel, renderInput, ...meta }: Field<D>,
    props: Partial<FormFieldProps> = {},
  ) => {
    const label =
      typeof renderLabel === 'function' ? renderLabel?.(key) : renderLabel || (key as string);

    return (data: D) => (
      <FormField
        {...props}
        {...meta}
        key={key.toString()}
        label={label}
        name={key.toString()}
        defaultValue={data[key]}
      />
    );
  };

  render() {
    const { fields, readOnly } = this,
      { id, className = '', store, translator, ...props } = this.observedProps;
    const { downloading, uploading, currentOne } = store,
      { t } = translator;
    const loading = downloading > 0 || uploading > 0;

    return (
      <Form
        className={`d-flex flex-column gap-3 ${className}`}
        {...props}
        onSubmit={this.handleSubmit}
        onReset={() => store.clearCurrent()}
      >
        {fields.map(({ renderInput, ...meta }) => renderInput?.(currentOne, meta))}
        {!readOnly && (
          <footer className="d-flex gap-3">
            <Button className="flex-fill" type="submit" disabled={loading}>
              {t('submit')}
            </Button>
            <Button className="flex-fill" type="reset" variant="danger" disabled={loading}>
              {t('cancel')}
            </Button>
          </footer>
        )}
      </Form>
    );
  }
}
