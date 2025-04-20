import { observer } from 'mobx-react';
import { DataObject } from 'mobx-restful';
import { Modal } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

import { RestForm, RestFormProps } from './RestForm';

export const RestFormModal = observer(
  <T extends DataObject>({
    fields,
    store,
    translator,
    uploader,
  }: RestFormProps<T>) => {
    const { indexKey, currentOne } = store;

    const editing = !isEmpty(currentOne),
      ID = currentOne[indexKey];

    return (
      <Modal show={editing} onHide={() => store.clearCurrent()}>
        <Modal.Header closeButton>{ID}</Modal.Header>

        <Modal.Body>
          <RestForm id={ID} {...{ fields, store, translator, uploader }} />
        </Modal.Body>
      </Modal>
    );
  },
);
