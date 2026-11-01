import { ListModel } from 'mobx-restful';
import { FC, MouseEvent } from 'react';
import { FormControl } from 'idea-react';
import { buildURLData, parseURLData } from 'web-utility';

export type PageMeta = Pick<ListModel<{}>, 'pageSize' | 'pageIndex'>;

export interface PagerProps extends PageMeta {
  pageCount: number;
  onChange?: (meta: PageMeta) => any;
}

export const Pager: FC<PagerProps> = ({ pageSize, pageIndex, pageCount, onChange }) => {
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
      onSubmit={onChange && (event => (event.preventDefault(), event.stopPropagation()))}
    >
      <FormControl
        type="number"
        name="pageSize"
        defaultValue={pageSize}
        min={1}
        required
        onChange={({ currentTarget: input }) =>
          input.reportValidity() && onChange?.({ pageSize: +input.value, pageIndex })
        }
      />
      x
      <FormControl
        type="number"
        name="pageIndex"
        defaultValue={pageIndex || 1}
        min={1}
        max={pageCount}
        required
        onChange={({ currentTarget: input }) =>
          input.reportValidity() && onChange?.({ pageSize, pageIndex: +input.value })
        }
      />
      <nav aria-label="Pagination">
        <ul className="pagination m-0">
          {pageIndex > 1 && (
            <li className="page-item">
              <a className="page-link" {...propsOf(1)}>
                1
              </a>
            </li>
          )}
          {pageIndex > 3 && (
            <li className="page-item disabled" aria-hidden="true">
              <span className="page-link">…</span>
            </li>
          )}
          {pageIndex > 2 && (
            <li className="page-item">
              <a className="page-link" {...propsOf(pageIndex - 1)}>
                {pageIndex - 1}
              </a>
            </li>
          )}
          <li className="page-item active" aria-current="page">
            <span className="page-link">{pageIndex}</span>
          </li>
          {pageCount - pageIndex > 1 && (
            <li className="page-item">
              <a className="page-link" {...propsOf(pageIndex + 1)}>
                {pageIndex + 1}
              </a>
            </li>
          )}
          {pageCount - pageIndex > 2 && (
            <li className="page-item disabled" aria-hidden="true">
              <span className="page-link">…</span>
            </li>
          )}
          {pageIndex < pageCount && (
            <li className="page-item">
              <a className="page-link" {...propsOf(pageCount)}>
                {pageCount}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </form>
  );
};

Pager.displayName = 'Pager';
