import { observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { DataObject, ListModel } from 'mobx-restful';

export const translator = new TranslationModel({
  en_US: {
    load_more: 'Load more',
    no_more: 'No more',
    create: 'Create',
    view: 'View',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    total_x_rows: ({ totalCount }: { totalCount: number }) => `Total ${totalCount} rows`,
    sure_to_delete_x: ({ keys }: { keys: string[] }) => `Delete ${keys.join(', ')}?`,
  },
});

export const createListStore = <D extends DataObject = DataObject>(
  props: Partial<ListModel<D, any>> = {},
) =>
  observable({
    indexKey: 'id',
    pageSize: 10,
    pageIndex: 1,
    pageCount: 1,
    totalCount: 0,
    pageList: [],
    currentPage: [],
    allItems: [],
    noMore: true,
    downloading: 0,
    uploading: 0,
    currentOne: {},
    clear: () => {},
    clearCurrent: () => {},
    clearList: () => {},
    getList: async () => [],
    getOne: async () => ({}),
    updateOne: async (data: D) => data,
    deleteOne: async () => {},
    restoreList: async () => [],
    ...props,
  }) as unknown as ListModel<D, any>;
