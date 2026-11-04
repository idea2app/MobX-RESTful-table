import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { render, screen, waitFor } from '@testing-library/react';

import { MockIntersectionObserver } from './setup';
import { ScrollList } from '../source/ScrollList';
import { createListStore, translator } from './helper';

it('renders the items and a load-more hint', () => {
  const { container } = render(
    <ScrollList
      className="custom"
      translator={translator}
      store={createListStore({ allItems: [{ id: 1, name: 'A' }], noMore: false })}
      renderList={items => (
        <ul>
          {items.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
    />,
  );
  const wrapper = container.firstElementChild as HTMLElement,
    hint = screen.getByText('Load more');

  assert.ok(wrapper.classList.contains('position-relative'));
  assert.ok(wrapper.classList.contains('custom'));

  assert.equal(screen.getByText('A').tagName, 'LI');

  assert.equal(hint.tagName, 'FOOTER');
  assert.ok(hint.classList.contains('text-center'));
  assert.ok(hint.classList.contains('fg-secondary'));
});

it('renders the no-more hint when the store is exhausted', () => {
  render(
    <ScrollList
      translator={translator}
      store={createListStore({ allItems: [{ id: 1 }], noMore: true })}
      renderList={() => null}
    />,
  );
  assert.ok(screen.getByText('No more'));
});

it('renders the no-more hint for an empty list', () => {
  render(
    <ScrollList
      translator={translator}
      store={createListStore({ allItems: [], noMore: false })}
      renderList={() => null}
    />,
  );
  assert.ok(screen.getByText('No more'));
});

it('passes the whole item list to renderList', () => {
  render(
    <ScrollList
      translator={translator}
      store={createListStore({ allItems: [{ id: 1 }, { id: 2 }], noMore: true })}
      renderList={items => <b>{items.length}</b>}
    />,
  );
  assert.equal(screen.getByText('2').tagName, 'B');
});

it('requests the next page when the bottom edge is reached', async () => {
  const getList = mock.fn(async () => []),
    store = createListStore({ allItems: [{ id: 1 }], noMore: false, getList });

  render(<ScrollList translator={translator} store={store} renderList={() => null} />);

  await waitFor(() => assert.ok(getList.mock.callCount() > 0));

  const before = getList.mock.callCount();

  MockIntersectionObserver.instances.at(-1)?.trigger(true);

  await waitFor(() => assert.equal(getList.mock.callCount(), before + 1));

  assert.equal(MockIntersectionObserver.instances.length, 4);
});
