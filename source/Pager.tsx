import { ListModel } from 'mobx-restful';
import { FC, MouseEvent } from 'react';
import { Pagination, Form } from 'react-bootstrap';
import { buildURLData, parseURLData } from 'web-utility';

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
}) => {
  function propsOf(pageIndex = 1) {
    const pagination = { pageSize, pageIndex };

    return {
      href: `?${buildURLData({ ...parseURLData(), ...pagination })}`,
      onClick:
        onChange &&
        ((event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();

          onChange(pagination);
        }),
    };
  }

  return (
    <form
      className="m-0 d-flex align-items-center gap-2"
      onSubmit={onChange && (event => event.preventDefault())}
    >
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
      <Pagination>
        {pageIndex > 1 && <Pagination.Item {...propsOf(1)}>1</Pagination.Item>}
        {pageIndex > 3 && <Pagination.Ellipsis />}
        {pageIndex > 2 && (
          <Pagination.Item {...propsOf(pageIndex - 1)}>
            {pageIndex - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{pageIndex}</Pagination.Item>
        {pageCount - pageIndex > 1 && (
          <Pagination.Item {...propsOf(pageIndex + 1)}>
            {pageIndex + 1}
          </Pagination.Item>
        )}
        {pageCount - pageIndex > 2 && <Pagination.Ellipsis />}
        {pageIndex < pageCount && (
          <Pagination.Item {...propsOf(pageCount)}>{pageCount}</Pagination.Item>
        )}
      </Pagination>
    </form>
  );
};

Pager.displayName = 'Pager';
