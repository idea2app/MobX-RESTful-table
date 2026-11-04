import { ListModel } from 'mobx-restful';
import { FC, MouseEvent } from 'react';
import { FormControl, Pagination, PageItem, PageText, PageLink } from 'idea-react';
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
      <Pagination className="m-0">
        {pageIndex > 1 && (
          <PageItem>
            <PageLink {...propsOf(1)}>1</PageLink>
          </PageItem>
        )}
        {pageIndex > 3 && <PageText>...</PageText>}
        {pageIndex > 2 && (
          <PageItem>
            <PageLink {...propsOf(pageIndex - 1)}>{pageIndex - 1}</PageLink>
          </PageItem>
        )}
        <PageItem active>
          <PageLink>{pageIndex}</PageLink>
        </PageItem>
        {pageCount - pageIndex > 1 && (
          <PageItem>
            <PageLink {...propsOf(pageIndex + 1)}>{pageIndex + 1}</PageLink>
          </PageItem>
        )}
        {pageCount - pageIndex > 2 && <PageText>...</PageText>}
        {pageIndex < pageCount && (
          <PageItem>
            <PageLink {...propsOf(pageCount)}>{pageCount}</PageLink>
          </PageItem>
        )}
      </Pagination>
    </form>
  );
};

Pager.displayName = 'Pager';
