import { ListModel } from 'mobx-restful';
import { FC } from 'react';
import { Pagination, Form } from 'react-bootstrap';

export type PageMeta = Pick<ListModel<{}>, 'pageSize' | 'pageIndex'>;

export interface PagerProps extends PageMeta {
  pageCount: number;
  onChange?: (meta: PageMeta) => any;
}

export const Pager: FC<PagerProps> = ({
  pageSize,
  pageIndex,
  pageCount,
  onChange,
}) => (
  <div className="d-flex align-items-center gap-3">
    <Form.Control
      type="number"
      name="pageSize"
      defaultValue={pageSize}
      min={1}
      required
      onChange={({ currentTarget: input }) =>
        input.reportValidity() &&
        onChange?.({ pageSize: +input.value, pageIndex })
      }
    />
    x
    <Form.Control
      type="number"
      name="pageIndex"
      defaultValue={pageIndex || 1}
      min={1}
      max={pageCount}
      required
      onChange={({ currentTarget: input }) =>
        input.reportValidity() &&
        onChange?.({ pageSize, pageIndex: +input.value })
      }
    />
    <Pagination className="my-0">
      {pageIndex > 1 && (
        <Pagination.Item onClick={() => onChange?.({ pageSize, pageIndex: 1 })}>
          1
        </Pagination.Item>
      )}
      {pageIndex > 3 && <Pagination.Ellipsis />}
      {pageIndex > 2 && (
        <Pagination.Item
          onClick={() => onChange?.({ pageSize, pageIndex: pageIndex - 1 })}
        >
          {pageIndex - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{pageIndex}</Pagination.Item>
      {pageCount - pageIndex > 1 && (
        <Pagination.Item
          onClick={() => onChange?.({ pageSize, pageIndex: pageIndex + 1 })}
        >
          {pageIndex + 1}
        </Pagination.Item>
      )}
      {pageCount - pageIndex > 2 && <Pagination.Ellipsis />}
      {pageIndex < pageCount && (
        <Pagination.Item
          onClick={() => onChange?.({ pageSize, pageIndex: pageCount })}
        >
          {pageCount}
        </Pagination.Item>
      )}
    </Pagination>
  </div>
);

Pager.displayName = 'Pager';
