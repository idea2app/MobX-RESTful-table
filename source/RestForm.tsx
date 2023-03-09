import { formToJSON } from 'web-utility';
import { TranslationModel } from 'mobx-i18n';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { observer } from 'mobx-react';
import {
  FormEvent,
  InputHTMLAttributes,
  PureComponent,
  ReactNode,
} from 'react';
import { Form, Button } from 'react-bootstrap';

import { FormField } from './FormField';

export interface Field<T extends DataObject>
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept'> {
  key?: keyof T;
  renderLabel?: ReactNode | ((data: keyof T) => ReactNode);
  renderInput?: (data: T) => ReactNode;
}

export interface RestFormProps<T extends DataObject> {
  id?: IDType;
  fields: Field<T>[];
  store: ListModel<T>;
  translator: TranslationModel<string, 'submit' | 'cancel'>;
}

@observer
export class RestForm<T extends DataObject> extends PureComponent<
  RestFormProps<T>
> {
  componentDidMount() {
    const { id, store } = this.props;

    if (id) store.getOne(id);
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id, store } = this.props;

    await store.updateOne(formToJSON(event.currentTarget), id);

    store.clearCurrent();
  };

  renderInput = ({ key, renderLabel, renderInput, ...props }: Field<T>) => {
    const { currentOne } = this.props.store;
    const label =
      typeof renderLabel === 'function'
        ? renderLabel?.(key)
        : renderLabel || key;

    return (
      renderInput?.(currentOne) ||
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
    const { fields, store, translator } = this.props;
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
