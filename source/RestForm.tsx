import { computed, observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { DataObject, Filter, IDType, ListModel } from 'mobx-restful';
import { FormEvent, Fragment, InputHTMLAttributes, ReactNode } from 'react';
import { Button, Form, FormGroupProps, FormProps, InputGroup } from 'react-bootstrap';
import { Editor, EditorProps } from 'react-bootstrap-editor';
import { formatDate, formToJSON, isEmpty } from 'web-utility';

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
    Pick<FormFieldProps, 'options' | 'rows' | 'contentEditable'>,
    Pick<EditorProps, 'tools'>,
    Partial<Record<`${'' | 'in'}validMessage`, ReactNode>> {
  key?: keyof T;
  renderLabel?: ReactNode | ((data: keyof T) => ReactNode);
  renderInput?: (data: T, meta: Field<T>) => ReactNode;
  uploader?: FileModel;
}

export interface FieldBoxProps<D extends DataObject>
  extends FormGroupProps,
    Pick<Field<D>, 'renderLabel' | `${'' | 'in'}validMessage`> {
  name: Field<D>['key'];
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

  static dateValueOf = <D extends DataObject>({ type, step = '60' }: Field<D>, raw: D[keyof D]) =>
    isEmpty(raw)
      ? raw
      : type === 'month'
        ? formatDate(raw, 'YYYY-MM')
        : type === 'date'
          ? formatDate(raw, 'YYYY-MM-DD')
          : type === 'datetime-local'
            ? formatDate(raw, `YYYY-MM-DDTHH:mm${+step < 60 ? ':ss' : ''}`)
            : raw;

  static FieldBox = <D extends DataObject>({
    name,
    renderLabel,
    validMessage,
    invalidMessage,
    children,
    ...props
  }: FieldBoxProps<D>) => (
    <Form.Group {...props}>
      <Form.Label>
        {typeof renderLabel === 'function' ? renderLabel(name) : renderLabel || (name as string)}
      </Form.Label>
      {children}
      {validMessage && (
        <Form.Control.Feedback tooltip type="valid">
          {validMessage}
        </Form.Control.Feedback>
      )}
      {invalidMessage && (
        <Form.Control.Feedback tooltip type="invalid">
          {invalidMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );

  @observable
  accessor validated = false;

  componentDidMount() {
    const { id, store } = this.props;

    if (id) store.getOne(id);
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const valid = form.checkValidity();

    this.validated = true;

    if (valid) {
      const { id, store, onSubmit } = this.props;

      const updated = await store.updateOne(formToJSON(form), id);

      onSubmit?.(updated);

      store.clearCurrent();
    }
    this.validated = false;
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
          : (meta.type === 'radio' || meta.type === 'checkbox') && meta.options
            ? this.renderCheckGroup(meta)
            : meta.contentEditable
              ? this.renderHTMLEditor(meta)
              : meta.key &&
                this.renderField(meta, meta.rows && !meta.options ? { as: 'textarea' } : {})),
    }));
  }

  @computed
  get readOnly() {
    return this.fields.every(({ readOnly, disabled }) => readOnly || disabled);
  }

  @computed
  get customValidation() {
    return this.fields.some(({ validMessage, invalidMessage }) => validMessage || invalidMessage);
  }

  @computed
  get fieldReady() {
    const { id, store } = this.observedProps;

    return !id || store.downloading < 1;
  }

  renderFile =
    ({ key, type, required, multiple, accept, uploader, ...meta }: Field<D>) =>
    ({ [key]: paths }: D) => {
      const value = ((Array.isArray(paths) ? paths : [paths]) as string[]).filter(Boolean);

      return (
        <RestForm.FieldBox name={key} {...meta}>
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
        </RestForm.FieldBox>
      );
    };
  renderCheckGroup =
    ({ key, type, options, ...meta }: Field<D>) =>
    (data: D) => (
      <RestForm.FieldBox name={key} {...meta}>
        <div>
          {this.fieldReady &&
            options.map(({ value, text = value }) => (
              <Form.Check
                key={value}
                id={[key, value] + ''}
                label={text}
                inline
                type={type as 'radio' | 'checkbox'}
                name={key.toString()}
                value={value}
                defaultChecked={data[key]?.includes(value)}
              />
            ))}
        </div>
      </RestForm.FieldBox>
    );

  renderHTMLEditor =
    ({ key, contentEditable, ...meta }: Field<D>) =>
    (data: D) => (
      <RestForm.FieldBox name={key} {...meta}>
        {this.fieldReady && <Editor name={key?.toString()} defaultValue={data[key!] as string} />}
      </RestForm.FieldBox>
    );

  renderField = (
    { key, type, step, renderLabel, renderInput, validMessage, invalidMessage, ...meta }: Field<D>,
    props: Partial<FormFieldProps> = {},
  ) => {
    const label =
      typeof renderLabel === 'function' ? renderLabel?.(key) : renderLabel || (key as string);

    return (data: D) => (
      <InputGroup hasValidation={this.customValidation}>
        {this.fieldReady && (
          <FormField
            {...props}
            {...meta}
            {...{ type, step, label }}
            name={key.toString()}
            defaultValue={RestForm.dateValueOf({ type, step }, data[key])}
          />
        )}
        {validMessage && (
          <Form.Control.Feedback tooltip type="valid">
            {validMessage}
          </Form.Control.Feedback>
        )}
        {invalidMessage && (
          <Form.Control.Feedback tooltip type="invalid">
            {invalidMessage}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    );
  };

  render() {
    const { fields, readOnly, customValidation, validated } = this,
      { id, className = '', store, translator, ...props } = this.observedProps;
    const { downloading, uploading, currentOne } = store,
      { t } = translator;
    const loading = downloading > 0 || uploading > 0;

    return (
      <Form
        className={`d-flex flex-column gap-3 ${className}`}
        {...props}
        noValidate={customValidation}
        validated={validated}
        onSubmit={this.handleSubmit}
        onReset={() => store.clearCurrent()}
      >
        {fields.map(({ renderInput, ...meta }) => (
          <Fragment key={meta.key?.toString()}>{renderInput?.(currentOne, meta)}</Fragment>
        ))}
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
