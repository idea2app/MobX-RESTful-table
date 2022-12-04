import { ListModel } from 'mobx-restful';
import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

export interface PagerProps
  extends Pick<ListModel<{}>, 'pageIndex' | 'pageCount'> {
  onChange?: (index: number) => any;
}

export const Pager: FC<PagerProps> = ({ pageIndex, pageCount, onChange }) => (
  <Pagination className="my-0">
    {pageIndex > 1 && (
      <Pagination.Item onClick={() => onChange?.(1)}>1</Pagination.Item>
    )}
    {pageIndex > 3 && <Pagination.Ellipsis />}
    {pageIndex > 2 && (
      <Pagination.Item onClick={() => onChange?.(pageIndex - 1)}>
        {pageIndex - 1}
      </Pagination.Item>
    )}
    <Pagination.Item active>{pageIndex}</Pagination.Item>
    {pageCount - pageIndex > 1 && (
      <Pagination.Item onClick={() => onChange?.(pageIndex + 1)}>
        {pageIndex + 1}
      </Pagination.Item>
    )}
    {pageCount - pageIndex > 2 && <Pagination.Ellipsis />}
    {pageIndex < pageCount && (
      <Pagination.Item onClick={() => onChange?.(pageCount)}>
        {pageCount}
      </Pagination.Item>
    )}
  </Pagination>
);

Pager.displayName = 'Pager';
