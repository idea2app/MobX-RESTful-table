import { debounce } from 'lodash';
import { computed, observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { DataObject, Filter, IDType } from 'mobx-restful';
import { ReactNode } from 'react';
import { Button, Form, Spinner, Table, TableProps } from 'react-bootstrap';
import { isEmpty } from 'web-utility';

import { BadgeBar } from './BadgeBar';
import { FilePreview } from './FilePreview';
import { Pager } from './Pager';
import { Field, RestForm, RestFormProps } from './RestForm';
import { RestFormModal } from './RestFormModal';

import * as styles from './RestTable.module.less';

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
export interface RestTableProps<D extends DataObject, F extends Filter<D> = Filter<D>>
  extends
    Omit<TableProps, 'onSubmit' | 'onReset'>,
    Omit<RestFormProps<D>, 'id' | 'size' | 'fields' | 'translator'> {
  filter?: F;
  filterFields?: Field<F>[];
  editable?: boolean;
  deletable?: boolean;
  columns: Column<D>[];
  translator: Translator<D>;
  onCheck?: (keys: IDType[]) => any;
}

@observer
export class RestTable<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends ObservedComponent<RestTableProps<D, F>> {
  static readonly displayName = 'RestTable';

  componentDidMount() {
    const { store, filter } = this.props;

    store.clear();
    store.getList(filter);
  }

  @computed
  get fieldSize() {
    const { size } = this.observedProps;

    return !size ? undefined : size === 'sm' ? 'sm' : 'lg';
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
  get checkColumn(): Column<D> {
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
  get operateColumn(): Column<D> {
    const { editable, deletable, columns, store, translator } = this.observedProps,
      { fieldSize } = this;
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
                size={fieldSize}
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
              size={fieldSize}
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
  get columns(): Column<D>[] {
    const { editable, deletable, columns, onCheck } = this.observedProps;

    return [
      onCheck && this.checkColumn,
      ...columns.map(
        ({ renderBody, ...column }) =>
          ({ ...column, renderBody: renderBody ?? this.renderCustomBody(column) }) as Column<D>,
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
  }: Column<D>): Column<D>['renderBody'] =>
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
        onReset,
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
    const { store, filter } = this.props;

    if (store.downloading < 1) store.getList(filter, pageIndex, pageSize);
  });

  async deleteList(keys: IDType[]) {
    const { translator, store } = this.props;

    if (confirm(translator.t('sure_to_delete_x', { keys })))
      for (const key of keys) await store.deleteOne(key);
  }

  render() {
    const {
        className = 'overflow-auto d-flex flex-column gap-3',
        editable,
        deletable,
        filterFields,
        store,
        translator,
        onSubmit,
        onReset,
        ...props
      } = this.props,
      { fieldSize } = this;
    const { t } = translator,
      { indexKey, pageSize, pageIndex, pageCount, totalCount } = store;

    return (
      <div className={className} {...props}>
        <header className="sticky-top bg-white py-3 d-flex flex-column gap-3">
          {filterFields && (
            <RestForm
              className={`d-flex flex-wrap align-items-center gap-3 pb-3 border-bottom ${styles.filterBar}`}
              size={fieldSize}
              translator={translator}
              fields={filterFields}
              onSubmit={filter => store.getList(filter, 1)}
              onReset={() => store.getList({}, 1)}
            />
          )}
          <div className="d-flex justify-content-between align-items-center">
            {deletable && (
              <Button
                className="mx-2"
                variant="danger"
                size={fieldSize}
                onClick={() => this.deleteList(this.checkedKeys)}
              >
                {t('delete')}
              </Button>
            )}
            {editable && (
              <Button
                size={fieldSize}
                onClick={() => (store.currentOne[indexKey] = '' as D[keyof D])}
              >
                {t('create')}
              </Button>
            )}
          </div>
        </header>

        {this.renderTable()}

        <footer className="d-flex justify-content-between align-items-center">
          {!!totalCount && <span className="mx-3 fs14">{t('total_x_rows', { totalCount })}</span>}

          <Pager {...{ pageSize, pageIndex, pageCount }} onChange={this.getList} />
        </footer>

        {editable && (
          <RestFormModal
            size={fieldSize}
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
