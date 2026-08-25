import { observer } from 'mobx-react';
import { DataObject, Filter, ListModel } from 'mobx-restful';
import { Modal } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

import { RestForm, RestFormProps } from './RestForm';

export const RestFormModal = observer(
  <D extends DataObject, F extends Filter<D> = Filter<D>>({
    fields,
    store,
    translator,
    ...props
  }: RestFormProps<D, F>) => {
    const { indexKey, currentOne } = store || ({} as ListModel<D, F>);

    const editing = !isEmpty(currentOne),
      ID = currentOne?.[indexKey];

    return (
      <Modal show={editing} onHide={() => store?.clearCurrent()}>
        <Modal.Header closeButton>{ID}</Modal.Header>

        <Modal.Body>
          <RestForm id={ID} {...{ fields, store, translator, ...props }} />
        </Modal.Body>
      </Modal>
    );
  },
);
