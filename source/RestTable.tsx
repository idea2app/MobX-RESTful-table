import classNames from 'classnames';
import { debounce } from 'lodash';
import { computed, observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { DataObject, IDType } from 'mobx-restful';
import { Component, ReactNode } from 'react';
import { Button, Form, Spinner, Table, TableProps } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

import { BadgeBar } from './BadgeBar';
import { FilePreview } from './FilePreview';
import { Pager } from './Pager';
import { Field, RestFormProps } from './RestForm';
import { RestFormModal } from './RestFormModal';

export interface Column<T extends DataObject> extends Omit<Field<T>, 'renderLabel'> {
  renderHead?: Field<T>['renderLabel'];
  renderBody?: (data: T) => ReactNode;
  renderFoot?: ReactNode | ((data: keyof T) => ReactNode);
}

type Translator<T extends DataObject> = RestFormProps<T>['translator'] &
  TranslationModel<
    string,
    'create' | 'view' | 'edit' | 'delete' | 'total_x_rows' | 'sure_to_delete_x'
  >;
export interface RestTableProps<T extends DataObject>
  extends Omit<TableProps, 'onSubmit'>,
    Omit<RestFormProps<T>, 'id' | 'fields' | 'translator'> {
  editable?: boolean;
  deletable?: boolean;
  columns: Column<T>[];
  translator: Translator<T>;
  onCheck?: (keys: IDType[]) => any;
}

@observer
export class RestTable<T extends DataObject> extends ObservedComponent<RestTableProps<T>> {
  static readonly displayName = 'RestTable';

  componentDidMount() {
    const { store } = this.props;

    store.clear();
    store.getList();
  }

  @observable
  accessor checkedKeys: IDType[] = [];

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

    this.checkedKeys = this.checkedKeys.length ? [] : currentPage.map(({ [indexKey]: ID }) => ID);

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
            !!currentPage[0] && currentPage.every(({ [indexKey]: ID }) => checkedKeys.includes(ID))
          }
          // https://github.com/facebook/react/issues/1798
          ref={(input: HTMLInputElement | null) => {
            if (input)
              input.indeterminate = !!checkedKeys.length && checkedKeys.length < currentPage.length;
          }}
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
    const { editable, deletable, columns, store, translator } = this.observedProps;
    const { t } = translator,
      readOnly = columns.every(({ readOnly }) => readOnly),
      disabled = columns.every(({ disabled }) => disabled);

    return {
      renderHead: () => <></>,
      renderBody: data => (
        <>
          {disabled ? (
            <></>
          ) : (
            editable && (
              <Button
                className="text-nowrap m-1"
                variant={readOnly ? 'primary' : 'warning'}
                size="sm"
                onClick={() => (store.currentOne = data)}
              >
                {readOnly ? t('view') : t('edit')}
              </Button>
            )
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
        ({ renderBody, ...column }) =>
          ({ ...column, renderBody: renderBody ?? this.renderCustomBody(column) }) as Column<T>,
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

  renderCustomBody = ({
    key,
    type,
    multiple,
    options,
    accept,
    rows,
  }: Column<T>): Column<T>['renderBody'] =>
    type === 'url'
      ? ({ [key]: value }) =>
          value && (
            <a target="_blank" href={value}>
              {value}
            </a>
          )
      : type === 'email'
        ? ({ [key]: value }) => value && <a href={`mailto:${value}`}>{value}</a>
        : type === 'tel'
          ? ({ [key]: value }) => value && <a href={`tel:${value}`}>{value}</a>
          : type === 'file'
            ? ({ [key]: value }) =>
                ((Array.isArray(value) ? value : [value]) as string[]).map(
                  path => path && <FilePreview key={path} type={accept} path={path} />,
                )
            : options || multiple
              ? ({ [key]: value }) =>
                  value && <BadgeBar list={(value as string[]).map(text => ({ text }))} />
              : !options && rows
                ? ({ [key]: value }) => (
                    <p className="m-0 text-truncate" style={{ maxWidth: '20rem' }} title={value}>
                      {value}
                    </p>
                  )
                : undefined;

  renderTable() {
    const {
        className,
        columns: _,
        store,
        translator,
        editable,
        deletable,
        onCheck,
        onSubmit,
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
    const { className, editable, deletable, store, translator, onSubmit } = this.props;
    const { t } = translator,
      { indexKey, pageSize, pageIndex, pageCount, totalCount } = store;

    return (
      <div className={classNames('overflow-auto', className)}>
        <header className="d-flex justify-content-between sticky-top bg-white py-3">
          <nav className="d-flex align-items-center">
            <Pager {...{ pageSize, pageIndex, pageCount }} onChange={this.getList} />

            {!!totalCount && <span className="mx-3 fs14">{t('total_x_rows', { totalCount })}</span>}
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
              <Button onClick={() => (store.currentOne[indexKey] = '' as T[keyof T])}>
                {t('create')}
              </Button>
            )}
          </div>
        </header>

        {this.renderTable()}

        {editable && (
          <RestFormModal
            fields={this.columns.map(({ renderHead, ...field }) => ({
              ...field,
              renderLabel: renderHead,
            }))}
            {...{ store, translator, onSubmit }}
          />
        )}
      </div>
    );
  }
}
