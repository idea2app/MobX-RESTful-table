import { isEmpty, uniqueID, formToJSON } from 'web-utility';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { observer } from 'mobx-react';
import {
  InputHTMLAttributes,
  FormEvent,
  PureComponent,
  ReactNode,
} from 'react';
import {
  Table,
  TableProps,
  Spinner,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';

import { Pager } from './Pager';
import { FormField } from './FormField';

export interface Column<T extends DataObject>
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  key?: keyof T;
  renderHead?: ReactNode | ((data: keyof T) => ReactNode);
  renderBody?: (data: T) => ReactNode;
  renderFoot?: ReactNode | ((data: keyof T) => ReactNode);
}

export interface RestTableProps<T extends DataObject> extends TableProps {
  editable?: boolean;
  deletable?: boolean;
  columns: Column<T>[];
  store: ListModel<T>;
  translater: TranslationModel<
    string,
    | 'create'
    | 'edit'
    | 'delete'
    | 'submit'
    | 'cancel'
    | 'total_x_rows'
    | 'sure_to_delete_x'
  >;
  onCheck?: (keys: IDType[]) => any;
}

@observer
export class RestTable<T extends DataObject> extends PureComponent<
  RestTableProps<T>
> {
  static displayName = 'RestTable';

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

  get columns(): Column<T>[] {
    const { checkedKeys, toggleCheckAll } = this,
      { editable, deletable, columns, store, translater, onCheck } = this.props;
    const { t } = translater,
      { indexKey, currentPage } = store;

    return [
      onCheck &&
        ({
          renderHead: () => (
            <Form.Check
              type="checkbox"
              name={`all-${indexKey.toString()}`}
              value={checkedKeys + ''}
              checked={
                !!currentPage[0] &&
                currentPage.every(({ [indexKey]: ID }) =>
                  checkedKeys.includes(ID),
                )
              }
              ref={(input: HTMLInputElement | null) =>
                input &&
                (input.indeterminate =
                  !!checkedKeys.length &&
                  checkedKeys.length < currentPage.length)
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
        } as Column<T>),

      ...columns,

      (editable || deletable) &&
        ({
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
        } as Column<T>),
    ].filter(Boolean);
  }

  get hasHeader() {
    return this.columns.some(({ renderHead }) => renderHead);
  }

  get hasFooter() {
    return this.columns.some(({ renderFoot }) => renderFoot);
  }

  componentDidMount() {
    const { store } = this.props;

    store.clear();
    store.getList();
  }

  renderTable() {
    const {
        className,
        columns: _,
        store,
        translater,
        editable,
        deletable,
        onCheck,
        responsive = true,
        ...tableProps
      } = this.props,
      { hasHeader, hasFooter, columns } = this;
    const { indexKey, downloading, currentPage } = store;

    return (
      <Table {...tableProps} responsive={responsive}>
        {hasHeader && (
          <thead>
            <tr className="align-middle text-nowrap">
              {columns.map(({ key, renderHead }, index) => (
                <th key={key?.toString() || index}>
                  {typeof renderHead === 'function'
                    ? renderHead(key)
                    : renderHead || key}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {downloading > 0 ? (
            <tr>
              <td className="text-center p-3" colSpan={columns.length}>
                <Spinner />
              </td>
            </tr>
          ) : (
            currentPage.map(data => (
              <tr key={data[indexKey]} className="align-middle">
                {columns.map(({ key, renderBody }, index) => (
                  <td key={key?.toString() || index}>
                    {renderBody?.(data) || (key && data[key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

        {hasFooter && (
          <tfoot>
            <tr className="align-middle">
              {columns.map(({ key, renderFoot }, index) => (
                <td key={key?.toString() || index}>
                  {typeof renderFoot === 'function'
                    ? renderFoot(key)
                    : renderFoot || key}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </Table>
    );
  }

  handleSubmit = (ID: IDType) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { store } = this.props;

    await store.updateOne(formToJSON(event.currentTarget), ID);

    store.clearCurrent();
  };

  renderInput = ({ key, type, renderHead }: Column<T>) => {
    const { currentOne } = this.props.store;
    const label =
      typeof renderHead === 'function' ? renderHead?.(key) : renderHead || key;

    return (
      key && (
        <FormField
          className="mb-3"
          key={key.toString()}
          label={label}
          type={type}
          name={key.toString()}
          defaultValue={currentOne[key]}
        />
      )
    );
  };

  renderDialog() {
    const { columns, store, translater } = this.props,
      formId = uniqueID();
    const { indexKey, uploading, currentOne } = store,
      { t } = translater;
    const ID = currentOne[indexKey];

    return (
      <Modal
        show={!isEmpty(store.currentOne)}
        onHide={() => store.clearCurrent()}
      >
        <Modal.Header closeButton>{ID}</Modal.Header>

        <Modal.Body>
          <Form
            id={formId}
            onSubmit={this.handleSubmit(ID)}
            onReset={() => store.clearCurrent()}
          >
            {columns.map(this.renderInput)}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form={formId} disabled={uploading > 0}>
            {t('submit')}
          </Button>
          <Button
            type="reset"
            variant="danger"
            form={formId}
            disabled={uploading > 0}
          >
            {t('cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  getList = debounce(({ pageIndex, pageSize }) => {
    const { store } = this.props;

    if (store.downloading < 1) store.getList({}, pageIndex, pageSize);
  });

  async deleteList(keys: IDType[]) {
    const { translater, store } = this.props;

    if (confirm(translater.t('sure_to_delete_x', { keys })))
      for (const key of keys) await store.deleteOne(key);
  }

  render() {
    const { className, editable, deletable, store, translater } = this.props;
    const { indexKey, pageSize, pageIndex, pageCount, totalCount } = store,
      { t } = translater;

    return (
      <div className={classNames('h-100 overflow-auto', className)}>
        <header className="d-flex justify-content-between sticky-top bg-white py-3">
          <nav className="d-flex align-items-center">
            <Pager
              {...{ pageSize, pageIndex, pageCount }}
              onChange={this.getList}
            />
            {totalCount && (
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
