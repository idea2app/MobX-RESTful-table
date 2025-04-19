import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { DataObject, Filter, IDType, ListModel } from 'mobx-restful';
import { Component, FormEvent, InputHTMLAttributes, ReactNode } from 'react';
import { Button, Form } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { FilePreview } from './FilePreview';
import { FileModel, FileUploader } from './FileUploader';
import { FormField } from './FormField';

export interface Field<T extends DataObject>
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'type'
    | 'readOnly'
    | 'required'
    | 'min'
    | 'minLength'
    | 'max'
    | 'maxLength'
    | 'step'
    | 'multiple'
    | 'accept'
    | 'placeholder'
  > {
  key?: keyof T;
  renderLabel?: ReactNode | ((data: keyof T) => ReactNode);
  renderInput?: (data: T, meta: Field<T>) => ReactNode;
}

export interface RestFormProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> {
  id?: IDType;
  fields: Field<D>[];
  store: ListModel<D, F>;
  translator: TranslationModel<string, 'submit' | 'cancel'>;
  uploader?: FileModel;
  onSubmit?: (data: D) => any;
}

@observer
export class RestForm<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends Component<RestFormProps<D, F>> {
  static readonly displayName = 'RestForm';

  componentDidMount() {
    const { id, store } = this.props;

    if (id) store.getOne(id);
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id, store, onSubmit } = this.props;

    const updated = await store.updateOne(formToJSON(event.currentTarget), id);

    onSubmit?.(updated);

    store.clearCurrent();
  };

  get fields(): Field<D>[] {
    const { fields, uploader } = this.props;

    return fields.map(
      ({
        type,
        key,
        readOnly,
        required,
        multiple,
        accept,
        renderInput,
        ...field
      }) => ({
        ...field,
        type,
        key,
        readOnly,
        required,
        multiple,
        accept,
        renderInput:
          renderInput ??
          (type === 'file'
            ? ({ [key]: path }) =>
                uploader ? (
                  <FileUploader
                    store={uploader}
                    name={key?.toString()}
                    {...{ required, multiple, accept }}
                    defaultValue={path}
                  />
                ) : (
                  readOnly && <FilePreview {...{ type, path }} />
                )
            : undefined),
      }),
    );
  }

  renderInput = ({ key, renderLabel, renderInput, ...props }: Field<D>) => {
    const { currentOne } = this.props.store;
    const label =
      typeof renderLabel === 'function'
        ? renderLabel?.(key)
        : renderLabel || (key as string);

    return (
      renderInput?.(currentOne, { key, ...props }) ||
      (key && (
        <FormField
          {...props}
          className="mb-3"
          key={key.toString()}
          label={label}
          name={key.toString()}
          defaultValue={currentOne[key]}
        />
      ))
    );
  };

  render() {
    const { fields } = this,
      { store, translator } = this.props;
    const { downloading, uploading } = store,
      { t } = translator;
    const loading = downloading > 0 || uploading > 0;

    return (
      <Form onSubmit={this.handleSubmit} onReset={() => store.clearCurrent()}>
        {fields.map(this.renderInput)}

        <footer className="d-flex gap-3">
          <Button className="flex-fill" type="submit" disabled={loading}>
            {t('submit')}
          </Button>
          <Button
            className="flex-fill"
            type="reset"
            variant="danger"
            disabled={loading}
          >
            {t('cancel')}
          </Button>
        </footer>
      </Form>
    );
  }
}
