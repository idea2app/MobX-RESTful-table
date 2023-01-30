import { debounce } from 'lodash';
import { TranslationModel } from 'mobx-i18n';
import { DataObject, NewData, ListModel, Stream } from 'mobx-restful';
import { Component, ReactNode } from 'react';
import {
  EdgePosition,
  ScrollBoundary,
  ScrollBoundaryProps,
} from './ScrollBoundary';

export interface ScrollListProps<T extends DataObject = DataObject>
  extends Pick<ScrollBoundaryProps, 'className'> {
  defaultData?: T[];
}

export type DataType<P> = P extends ScrollListProps<infer D> ? D : never;

export abstract class ScrollList<
  P extends ScrollListProps,
> extends Component<P> {
  abstract store: ListModel<DataType<P>>;
  abstract translater: TranslationModel<string, 'load_more' | 'no_more'>;

  filter: NewData<DataType<P>> = {};

  async boot() {
    const BaseStream = Stream<DataObject>;

    const store = this.store as unknown as InstanceType<
        ReturnType<typeof BaseStream>
      >,
      { defaultData } = this.props,
      { filter } = this;

    if (store.downloading > 0) return;

    store.clear();

    if (defaultData) await store.restoreList({ allItems: defaultData, filter });

    await store.getList(filter, store.pageList.length + 1);
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
    const { className } = this.props,
      { t } = this.translater,
      { noMore, allItems } = this.store;

    return (
      <ScrollBoundary className={className} onTouch={this.loadMore}>
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
