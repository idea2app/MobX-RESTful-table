import { debounce } from 'lodash';
import { when } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { DataObject, Filter, ListModel, Stream } from 'mobx-restful';
import { Component, ReactNode } from 'react';
import {
  EdgePosition,
  ScrollBoundary,
  ScrollBoundaryProps,
} from './ScrollBoundary';

export interface ScrollListProps<T extends DataObject = DataObject>
  extends Pick<ScrollBoundaryProps, 'className'> {
  translator: TranslationModel<string, 'load_more' | 'no_more'>;
  store: ListModel<T>;
  filter?: Filter<T>;
  defaultData?: T[];
  renderList(allItems: T[]): ReactNode;
}

@observer
export class ScrollList<T extends DataObject = DataObject> extends Component<
  ScrollListProps<T>
> {
  constructor(props: ScrollListProps<T>) {
    super(props);

    this.boot();
  }

  async boot() {
    const BaseStream = Stream<DataObject>,
      { filter, defaultData } = this.props;

    const store = this.props.store as unknown as InstanceType<
      ReturnType<typeof BaseStream>
    >;
    await when(() => store.downloading < 1);

    store.clear();

    if (defaultData) await store.restoreList({ allItems: defaultData, filter });

    await store.getList(filter, store.pageList.length + 1);
  }

  componentWillUnmount() {
    this.props.store.clear();
  }

  loadMore = debounce((edge: EdgePosition) => {
    const { store } = this.props;

    if (edge === 'bottom' && store.downloading < 1 && !store.noMore)
      store.getList();
  });

  render() {
    const { className, translator, store, renderList } = this.props;
    const { t } = translator,
      { noMore, allItems } = store;

    return (
      <ScrollBoundary className={className} onTouch={this.loadMore}>
        <div>
          {renderList(allItems)}

          <footer className="mt-4 text-center text-muted small">
            {noMore || !allItems.length ? t('no_more') : t('load_more')}
          </footer>
        </div>
      </ScrollBoundary>
    );
  }
}
