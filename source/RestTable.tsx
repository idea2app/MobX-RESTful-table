import classNames from 'classnames';
import { debounce } from 'lodash';
import * as MobX from 'mobx';
import { computed, observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { observePropsState } from 'mobx-react-helper';
import { DataObject, IDType } from 'mobx-restful';
import { Component, ReactNode } from 'react';
import {
  Button,
  Form,
  Modal,
  Spinner,
  Table,
  TableProps,
} from 'react-bootstrap';
import { isEmpty } from 'web-utility';

import { FilePreview } from './FilePreview';
import { Pager } from './Pager';
import { Field, RestForm, RestFormProps } from './RestForm';

export interface Column<T extends DataObject>
  extends Omit<Field<T>, 'renderLabel'> {
  renderHead?: Field<T>['renderLabel'];
  renderBody?: (data: T) => ReactNode;
  renderFoot?: ReactNode | ((data: keyof T) => ReactNode);
}

export interface RestTableProps<T extends DataObject>
  extends TableProps,
    Omit<RestFormProps<T>, 'id' | 'fields' | 'translator'> {
  editable?: boolean;
  deletable?: boolean;
  columns: Column<T>[];
  translator: RestFormProps<T>['translator'] &
    TranslationModel<
      string,
      'create' | 'edit' | 'delete' | 'total_x_rows' | 'sure_to_delete_x'
    >;
  onCheck?: (keys: IDType[]) => any;
}

@observer
@observePropsState
export class RestTable<T extends DataObject> extends Component<
  RestTableProps<T>
> {
  static displayName = 'RestTable';

  constructor(props: RestTableProps<T>) {
    super(props);
    MobX.makeObservable?.(this);
  }

  componentDidMount() {
    const { store } = this.props;

    store.clear();
    store.getList();
  }

  declare observedProps: RestTableProps<T>;

  @observable
  checkedKeys: IDType[] = [];

  toggleCheck(key: IDType) {
    const { checkedKeys } = this;
    const index = checkedKeys.indexOf(key);

    this.checkedKeys =
      index < 0
        ? [...checkedKeys, key]
        : [...checkedKeys.slice(0, index), ...checkedKeys.slice(index + 1)];

    this.props.onCheck?.(this.checkedKeys);
  }

  toggleCheckAll = () => {
    const { store, onCheck } = this.props;
    const { indexKey, currentPage } = store;

    this.checkedKeys = this.checkedKeys.length
      ? []
      : currentPage.map(({ [indexKey]: ID }) => ID);

    onCheck?.(this.checkedKeys);
  };

  @computed
  get checkColumn(): Column<T> {
    const { checkedKeys, toggleCheckAll } = this,
      { indexKey, currentPage } = this.observedProps.store;

    return {
      renderHead: () => (
        <Form.Check
          type="checkbox"
          name={`all-${indexKey.toString()}`}
          value={checkedKeys + ''}
          checked={
            !!currentPage[0] &&
            currentPage.every(({ [indexKey]: ID }) => checkedKeys.includes(ID))
          }
          // https://github.com/facebook/react/issues/1798
          ref={(input: HTMLInputElement | null) =>
            input &&
            (input.indeterminate =
              !!checkedKeys.length && checkedKeys.length < currentPage.length)
          }
          onClick={toggleCheckAll}
          onKeyUp={({ key }) => key === ' ' && toggleCheckAll()}
        />
      ),
      renderBody: ({ [indexKey]: ID }) => (
        <Form.Check
          type="checkbox"
          name={indexKey.toString()}
          value={ID}
          checked={checkedKeys.includes(ID)}
          onClick={() => this.toggleCheck(ID)}
          onKeyUp={({ key }) => key === ' ' && this.toggleCheck(ID)}
        />
      ),
    };
  }

  @computed
  get operateColumn(): Column<T> {
    const { editable, deletable, store, translator } = this.observedProps;
    const { t } = translator;

    return {
      renderHead: () => <></>,
      renderBody: data => (
        <>
          {editable && (
            <Button
              className="text-nowrap m-1"
              variant="warning"
              size="sm"
              onClick={() => (store.currentOne = data)}
            >
              {t('edit')}
            </Button>
          )}
          {deletable && (
            <Button
              className="text-nowrap m-1"
              variant="danger"
              size="sm"
              onClick={() => this.deleteList([data.id])}
            >
              {t('delete')}
            </Button>
          )}
        </>
      ),
    };
  }

  @computed
  get columns(): Column<T>[] {
    const { editable, deletable, columns, onCheck } = this.observedProps;

    return [
      onCheck && this.checkColumn,

      ...columns.map(
        ({ type, key, accept, renderBody, ...column }) =>
          ({
            ...column,
            type,
            key,
            renderBody:
              renderBody ??
              (type === 'url'
                ? ({ [key]: value }) =>
                    value && (
                      <a target="_blank" href={value}>
                        {value}
                      </a>
                    )
                : type === 'file'
                ? ({ [key]: value }) => (
                    <FilePreview type={accept} path={value} />
                  )
                : undefined),
          }) as Column<T>,
      ),

      (editable || deletable) && this.operateColumn,
    ].filter(Boolean);
  }

  @computed
  get hasHeader() {
    return this.columns.some(({ renderHead }) => renderHead);
  }

  @computed
  get hasFooter() {
    return this.columns.some(({ renderFoot }) => renderFoot);
  }

  @computed
  get editing() {
    return !isEmpty(this.observedProps.store.currentOne);
  }

  renderTable() {
    const {
        className,
        columns: _,
        store,
        translator,
        editable,
        deletable,
        onCheck,
        responsive = true,
        ...tableProps
      } = this.props,
      { hasHeader, hasFooter, columns, editing } = this;
    const { indexKey, downloading, currentPage } = store;

    return (
      <Table {...tableProps} responsive={responsive}>
        {hasHeader && (
          <thead>
            <tr className="align-middle text-nowrap">
              {columns.map(
                ({ key, renderHead }, index) =>
                  (key || renderHead) && (
                    <th key={key?.toString() || index}>
                      {typeof renderHead === 'function'
                        ? renderHead(key)
                        : renderHead || (key as string)}
                    </th>
                  ),
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {!editing && downloading > 0 ? (
            <tr>
              <td className="text-center p-3" colSpan={columns.length}>
                <Spinner />
              </td>
            </tr>
          ) : (
            currentPage.map(data => (
              <tr key={data[indexKey]} className="align-middle">
                {columns.map(
                  ({ key, renderBody }, index) =>
                    (key || renderBody) && (
                      <td key={key?.toString() || index}>
                        {renderBody?.(data) || (key && data[key])}
                      </td>
                    ),
                )}
              </tr>
            ))
          )}
        </tbody>

        {hasFooter && (
          <tfoot>
            <tr className="align-middle">
              {columns.map(
                ({ key, renderFoot }, index) =>
                  (key || renderFoot) && (
                    <td key={key?.toString() || index}>
                      {typeof renderFoot === 'function'
                        ? renderFoot(key)
                        : renderFoot || (key as string)}
                    </td>
                  ),
              )}
            </tr>
          </tfoot>
        )}
      </Table>
    );
  }

  renderDialog() {
    const { columns, store, translator, uploader } = this.props,
      { editing } = this;
    const { indexKey, currentOne } = store;

    const ID = currentOne[indexKey];

    return (
      <Modal show={editing} onHide={() => store.clearCurrent()}>
        <Modal.Header closeButton>{ID}</Modal.Header>

        <Modal.Body>
          <RestForm
            id={ID}
            fields={columns.map(({ renderHead, ...field }) => ({
              ...field,
              renderLabel: renderHead,
            }))}
            {...{ store, translator, uploader }}
          />
        </Modal.Body>
      </Modal>
    );
  }

  getList = debounce(({ pageIndex, pageSize }) => {
    const { store } = this.props;

    if (store.downloading < 1) store.getList({}, pageIndex, pageSize);
  });

  async deleteList(keys: IDType[]) {
    const { translator, store } = this.props;

    if (confirm(translator.t('sure_to_delete_x', { keys })))
      for (const key of keys) await store.deleteOne(key);
  }

  render() {
    const { className, editable, deletable, store, translator } = this.props;
    const { indexKey, pageSize, pageIndex, pageCount, totalCount } = store,
      { t } = translator;

    return (
      <div className={classNames('overflow-auto', className)}>
        <header className="d-flex justify-content-between sticky-top bg-white py-3">
          <nav className="d-flex align-items-center">
            <Pager
              {...{ pageSize, pageIndex, pageCount }}
              onChange={this.getList}
            />
            {!!totalCount && (
              <span className="mx-3 fs14">
                {t('total_x_rows', { totalCount })}
              </span>
            )}
          </nav>
          <div>
            {deletable && (
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => this.deleteList(this.checkedKeys)}
              >
                {t('delete')}
              </Button>
            )}
            {editable && (
              <Button
                onClick={() => (store.currentOne[indexKey] = '' as T[keyof T])}
              >
                {t('create')}
              </Button>
            )}
          </div>
        </header>

        {this.renderTable()}

        {editable && this.renderDialog()}
      </div>
    );
  }
}
