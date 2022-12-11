import { debounce } from 'lodash';
import { observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { IDType, DataObject, ListModel, Stream } from 'mobx-restful';
import { Component, ReactNode } from 'react';

import { EdgePosition, ScrollBoundary } from './ScrollBoundary';

export interface ScrollListProps<T extends DataObject = DataObject> {
  defaultData?: T[];
  onCheck?: (keys: IDType[]) => any;
}

export type DataType<P> = P extends ScrollListProps<infer D> ? D : never;

export abstract class ScrollList<
  P extends ScrollListProps,
> extends Component<P> {
  abstract store: ListModel<DataType<P>>;
  abstract translater: TranslationModel<string, 'load_more' | 'no_more'>;

  @observable
  selectedIds: string[] = [];

  async boot() {
    const BaseStream = Stream<DataObject>;

    const store = this.store as unknown as InstanceType<
        ReturnType<typeof BaseStream>
      >,
      { defaultData } = this.props;

    store.clear();

    if (defaultData) await store.restoreList({ allItems: defaultData });

    await store.getList(store.filter, store.pageList.length + 1);
  }

  componentWillUnmount() {
    this.store.clear();
  }

  loadMore = debounce((edge: EdgePosition) => {
    const { store } = this;

    if (edge === 'bottom' && store.downloading < 1 && !store.noMore)
      store.getList();
  });

  abstract renderList(): ReactNode;

  render() {
    const { t } = this.translater,
      { noMore, allItems } = this.store;

    return (
      <ScrollBoundary onTouch={this.loadMore}>
        <div>
          {this.renderList()}

          <footer className="mt-4 text-center text-muted small">
            {noMore || !allItems.length ? t('no_more') : t('load_more')}
          </footer>
        </div>
      </ScrollBoundary>
    );
  }
}
