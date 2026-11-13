import { observer } from 'mobx-react';
import { DataObject, Filter, ListModel } from 'mobx-restful';
import { CloseButton, DialogBody, DialogHeader, NativeDialog } from 'idea-react';
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
      <NativeDialog open={editing} onClose={() => store?.clearCurrent()}>
        <DialogHeader className="d-flex align-items-center justify-content-between">
          {ID}
          <CloseButton onClick={() => store?.clearCurrent()} />
        </DialogHeader>

        <DialogBody>
          {editing && <RestForm key={ID} id={ID} {...{ fields, store, translator, ...props }} />}
        </DialogBody>
      </NativeDialog>
    );
  },
);
