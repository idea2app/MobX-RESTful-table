import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import './setup';
import { BadgeBar, text2color } from '../source/BadgeBar';

it('renders a badge list with the default color resolver', () => {
  const { container } = render(<BadgeBar list={[{ text: 'React' }]} />);

  const list = container.querySelector('ul')!,
    badge = screen.getByText('React').closest('span')!;

  assert.ok(list.classList.contains('list-unstyled'));
  assert.ok(list.classList.contains('d-flex'));

  assert.ok(badge.classList.contains('badge'));
  assert.ok(badge.classList.contains(`theme-${text2color('React')}`));
});

it('merges custom classes and background colors', () => {
  const { container } = render(
    <BadgeBar className="custom" list={[{ text: 'React' }]} bgResolver={() => 'success'} />,
  );
  assert.ok(container.querySelector('ul')!.classList.contains('custom'));
  assert.ok(screen.getByText('React').closest('span')!.classList.contains('theme-success'));
});

it('renders links for link items and URL-like text', () => {
  render(
    <BadgeBar
      list={[{ text: 'GitHub', link: 'https://github.com' }, { text: 'https://example.com' }]}
    />,
  );
  const [first, second] = screen.getAllByRole('link');

  assert.equal(first.getAttribute('href'), 'https://github.com');
  assert.equal(first.textContent, 'GitHub');
  assert.equal(second.getAttribute('href'), 'https://example.com');
  assert.ok(first.classList.contains('text-decoration-none'));
});

it('reports checked and deleted items', () => {
  const onCheck = mock.fn(),
    onDelete = mock.fn();

  render(<BadgeBar list={[{ text: 'React' }]} {...{ onCheck, onDelete }} />);

  fireEvent.click(screen.getByRole('button', { name: 'React' }));
  fireEvent.click(screen.getByLabelText('Close'));

  assert.deepEqual(onCheck.mock.calls[0].arguments, [{ text: 'React', link: undefined }, 0]);
  assert.deepEqual(onDelete.mock.calls[0].arguments, [{ text: 'React', link: undefined }, 0]);
});
