import { isEmpty, uniqueID, formToJSON } from 'web-utility';
import classNames from 'classnames';
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
  Row,
  Col,
  Table,
  TableProps,
  Spinner,
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import { Pager } from './Pager';

export interface Column<T extends DataObject>
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  key?: keyof T;
  renderHead?: ReactNode | ((data: keyof T) => ReactNode);
  renderBody?: (data: T) => ReactNode;
  renderFoot?: ReactNode | ((data: keyof T) => ReactNode);
}

export interface RestTableProps<T extends DataObject> extends TableProps {
  editable?: boolean;
  columns: Column<T>[];
  store: ListModel<T>;
  translater: TranslationModel<
    string,
    'create' | 'submit' | 'cancel' | 'total_x_rows'
  >;
}

@observer
export class RestTable<T extends DataObject> extends PureComponent<
  RestTableProps<T>
> {
  static displayName = 'RestTable';

  get hasHeader() {
    return this.props.columns.some(({ renderHead }) => renderHead);
  }

  get hasFooter() {
    return this.props.columns.some(({ renderFoot }) => renderFoot);
  }

  componentDidMount() {
    const { store } = this.props;

    store.clear();
    store.getList();
  }

  renderTable() {
    const {
        className,
        columns,
        store,
        translater,
        responsive = true,
        ...tableProps
      } = this.props,
      { hasHeader, hasFooter } = this;
    const { indexKey, downloading, currentPage } = store;

    return (
      <Table {...tableProps} responsive={responsive}>
        {hasHeader && (
          <thead>
            <tr className="align-middle text-nowrap">
              {columns.map(({ key, renderHead }, index) => (
                <th key={key?.toString() || index}>
                  {key && typeof renderHead === 'function'
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
                  {key && typeof renderFoot === 'function'
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

    return (
      key && (
        <Form.Group
          as={Row}
          className="align-items-center mb-3"
          key={key.toString()}
          controlId={key.toString()}
        >
          <Form.Label column sm={3}>
            {typeof renderHead === 'function'
              ? renderHead?.(key)
              : renderHead || key}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type={type}
              name={key.toString()}
              defaultValue={currentOne[key]}
            />
          </Col>
        </Form.Group>
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

  render() {
    const { className, editable, store, translater } = this.props;
    const { indexKey, pageIndex, pageCount, totalCount } = store,
      { t } = translater;

    return (
      <div className={classNames('h-100 overflow-auto', className)}>
        <header className="d-flex justify-content-between sticky-top bg-white py-3">
          <nav className="d-flex align-items-center">
            <Pager
              {...{ pageIndex, pageCount }}
              onChange={index => store.getList({}, index)}
            />
            {totalCount && (
              <span className="mx-3 fs14">
                {t('total_x_rows', { totalCount })}
              </span>
            )}
          </nav>
          {editable && (
            <Button
              onClick={() => (store.currentOne[indexKey] = '' as T[keyof T])}
            >
              {t('create')}
            </Button>
          )}
        </header>

        {this.renderTable()}

        {editable && this.renderDialog()}
      </div>
    );
  }
}
