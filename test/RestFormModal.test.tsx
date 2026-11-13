import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { act, fireEvent, render, screen, within } from '@testing-library/react';

import './setup';
import { RestFormModal } from '../source/RestFormModal';
import { createListStore, translator } from './helper';

it('does not mount the form while the dialog is closed', () => {
  const { container } = render(
    <RestFormModal fields={[{ key: 'name' }]} translator={translator} />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement,
    header = dialog.querySelector('.dialog-header') as HTMLElement;

  assert.equal(dialog.hasAttribute('open'), false);
  assert.ok(header.classList.contains('d-flex'));
  assert.ok(header.classList.contains('align-items-center'));

  assert.equal(dialog.querySelector('form'), null);
});

it('renders the current item id in the dialog header', () => {
  const { container } = render(
    <RestFormModal
      fields={[{ key: 'name' }]}
      translator={translator}
      store={createListStore({ indexKey: 'id', currentOne: { id: 7, name: 'Demo' } })}
    />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement,
    header = dialog.querySelector('.dialog-header') as HTMLElement;

  assert.ok(dialog.hasAttribute('open'));
  assert.ok(header.textContent?.startsWith('7'));

  const close = within(dialog).getByRole('button', { name: 'Close' }),
    input = within(dialog).getByLabelText('name') as HTMLInputElement;

  assert.equal(close.className, 'btn-close');
  assert.equal(input.value, 'Demo');
});

it('clears the current item when the close button is clicked', () => {
  const clearCurrent = mock.fn();

  render(
    <RestFormModal
      fields={[{ key: 'id' }]}
      translator={translator}
      store={createListStore({ indexKey: 'id', currentOne: { id: 7 }, clearCurrent })}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));

  assert.equal(clearCurrent.mock.callCount(), 1);
});

it('uses fresh prefilled values when reopening a creation form', () => {
  const store = createListStore({ currentOne: { name: 'First' } });
  store.clearCurrent = () => {
    store.currentOne = {} as typeof store.currentOne;
  };
  const { container } = render(
    <RestFormModal fields={[{ key: 'name' }]} translator={translator} store={store} />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  fireEvent.change(within(dialog).getByLabelText('name'), { target: { value: 'Draft' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  act(() => (store.currentOne = { name: 'Second' }));

  assert.equal((within(dialog).getByLabelText('name') as HTMLInputElement).value, 'Second');
});
