import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import './setup';
import { Pager } from '../source/Pager';

it('renders page size and index controls with the current page active', () => {
  const { container } = render(<Pager pageSize={10} pageIndex={2} pageCount={5} />);

  const [size, index] = screen.getAllByRole('spinbutton') as HTMLInputElement[],
    active = container.querySelector('.page-item.active')!;

  assert.equal(size.value, '10');
  assert.equal(index.value, '2');

  assert.equal(active.getAttribute('aria-current'), 'page');
  assert.equal(active.textContent, '2');
});

it('renders the first and last page links around the current page', () => {
  const { container } = render(<Pager pageSize={10} pageIndex={2} pageCount={5} />);

  const pages = [...container.querySelectorAll('a.page-link')].map(
    ({ textContent }) => textContent,
  );
  assert.deepEqual(pages, ['1', '3', '5']);
});

it('renders ellipses for distant pages', () => {
  const { container } = render(<Pager pageSize={10} pageIndex={5} pageCount={10} />);

  const ellipses = container.querySelectorAll('li.page-item.disabled');

  assert.equal(ellipses.length, 2);
  assert.ok([...ellipses].every(({ textContent }) => textContent === '…'));
});

it('renders only the active page for a single-page list', () => {
  const { container } = render(<Pager pageSize={10} pageIndex={1} pageCount={1} />);

  assert.equal(container.querySelectorAll('li.page-item').length, 1);
  assert.equal(container.querySelectorAll('a.page-link').length, 0);
});

it('reports page changes from links and number inputs', () => {
  const onChange = mock.fn();

  render(<Pager pageSize={10} pageIndex={2} pageCount={5} {...{ onChange }} />);

  fireEvent.click(screen.getByRole('link', { name: '3' }));

  assert.deepEqual(onChange.mock.calls[0].arguments[0], { pageSize: 10, pageIndex: 3 });

  fireEvent.change(screen.getAllByRole('spinbutton')[1], { target: { value: '4' } });

  assert.deepEqual(onChange.mock.calls[1].arguments[0], { pageSize: 10, pageIndex: 4 });
});
