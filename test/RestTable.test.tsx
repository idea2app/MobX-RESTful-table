import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import './setup';
import { RestTable } from '../source/RestTable';
import { createListStore, translator } from './helper';

const store = () =>
  createListStore({
    indexKey: 'id',
    currentPage: [{ id: 1, name: 'A', url: 'https://a.com' }],
    totalCount: 1,
  });

it('renders headers, rows and the pager from the store', () => {
  const { container } = render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[
        { key: 'name', renderHead: 'Name' },
        { key: 'url', type: 'url' },
      ]}
    />,
  );
  const table = container.querySelector('table') as HTMLTableElement,
    pagerForm = container.querySelector('footer form') as HTMLFormElement;

  assert.ok(table.classList.contains('table'));

  assert.equal(screen.getByRole('columnheader', { name: 'Name' }).textContent, 'Name');
  assert.equal(screen.getByRole('cell', { name: 'A' }).textContent, 'A');

  const link = screen.getByRole('link', { name: 'https://a.com' });

  assert.equal(link.getAttribute('href'), 'https://a.com');
  assert.equal(link.getAttribute('target'), '_blank');

  assert.equal(screen.getByText('Total 1 rows').className, 'mx-5 fs-sm');

  assert.ok(pagerForm.classList.contains('m-0'));
  assert.ok(pagerForm.classList.contains('d-flex'));
  assert.ok(pagerForm.classList.contains('align-items-center'));
});

it('renders custom body and footer cells', () => {
  const { container } = render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[
        {
          key: 'name',
          renderHead: 'Name',
          renderBody: ({ name }) => <b>{name}</b>,
          renderFoot: 'Footer',
        },
      ]}
    />,
  );
  assert.equal(screen.getByText('A').tagName, 'B');

  const tfoot = container.querySelector('tfoot') as HTMLTableSectionElement;

  assert.equal(within(tfoot).getByText('Footer').tagName, 'TD');
});

it('renders a check column when onCheck is given', () => {
  const onCheck = mock.fn();

  render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[{ key: 'name' }]}
      onCheck={onCheck}
    />,
  );
  const [checkAll, checkRow] = screen.getAllByRole('checkbox') as HTMLInputElement[];

  assert.equal(checkAll.getAttribute('name'), 'all-id');
  assert.equal(checkRow.getAttribute('name'), 'id');
  assert.equal(checkRow.value, '1');

  fireEvent.click(checkRow);

  assert.deepEqual(onCheck.mock.calls[0].arguments[0], [1]);
  assert.ok(checkRow.checked);

  fireEvent.click(checkAll);

  assert.deepEqual(onCheck.mock.calls[1].arguments[0], []);
  assert.ok(!checkRow.checked);
});

it('renders create, edit and delete controls when editable and deletable', () => {
  const { container } = render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[{ key: 'name' }]}
      editable
      deletable
    />,
  );
  const [deleteAll, deleteRow] = screen.getAllByRole('button', { name: 'Delete' });

  assert.ok((deleteAll as HTMLButtonElement).disabled);
  assert.ok(deleteAll.classList.contains('theme-danger'));
  assert.ok(!(deleteRow as HTMLButtonElement).disabled);

  assert.ok(screen.getByRole('button', { name: 'Create' }));
  assert.ok(screen.getByRole('button', { name: 'Edit' }));

  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  assert.equal(dialog.hasAttribute('open'), false);
});

it('renders view instead of edit for read-only columns', () => {
  render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[{ key: 'name', readOnly: true }]}
      editable
    />,
  );
  assert.ok(screen.getByRole('button', { name: 'View' }));
  assert.ok(!screen.queryByRole('button', { name: 'Edit' }));
});

it('renders a filter form when filter fields are given', () => {
  const { container } = render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[{ key: 'name' }]}
      filterFields={[{ key: 'name' }]}
    />,
  );
  const header = container.querySelector('header') as HTMLElement;

  assert.ok(within(header).getByLabelText('name'));
  assert.equal(container.querySelectorAll('form').length, 2);
});

it('submits the filter form to the store', async () => {
  const getList = mock.fn(async filter => []),
    listStore = createListStore({
      indexKey: 'id',
      currentPage: [{ id: 1, name: 'A' }],
      getList,
    });
  const { container } = render(
    <RestTable
      store={listStore}
      translator={translator}
      columns={[{ key: 'name' }]}
      filterFields={[{ key: 'name' }]}
    />,
  );
  const header = container.querySelector('header') as HTMLElement,
    form = header.querySelector('form') as HTMLFormElement;

  fireEvent.change(within(header).getByLabelText('name'), { target: { value: 'A' } });
  fireEvent.submit(form);

  await waitFor(() =>
    assert.ok(getList.mock.calls.some(({ arguments: [filter] }) => filter?.name === 'A')),
  );
});

it('renders a spinner row while downloading', () => {
  const { container } = render(
    <RestTable
      store={createListStore({ downloading: 1, currentPage: [] })}
      translator={translator}
      columns={[{ key: 'name' }]}
    />,
  );
  const cell = container.querySelector('tbody td') as HTMLTableCellElement;

  assert.equal(cell.getAttribute('colspan'), '1');
  assert.ok(cell.classList.contains('text-center'));
  assert.ok(cell.querySelector('.spinner-border'));
});

it('passes table variants through', () => {
  const { container } = render(
    <RestTable
      store={store()}
      translator={translator}
      columns={[{ key: 'name' }]}
      striped
      bordered
      hover
      small
      responsive={false}
    />,
  );
  const table = container.querySelector('table') as HTMLTableElement;

  for (const className of ['table-striped', 'table-bordered', 'table-hover', 'table-sm'])
    assert.ok(table.classList.contains(className));

  assert.ok(!container.querySelector('.table-responsive'));
});

it('opens the edit dialog with the current row data', async () => {
  const listStore = store();

  const { container } = render(
    <RestTable store={listStore} translator={translator} columns={[{ key: 'name' }]} editable />,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  await waitFor(() => assert.ok(dialog.hasAttribute('open')));

  const input = within(dialog).getByLabelText('name') as HTMLInputElement;

  assert.equal(input.value, 'A');
});

it('starts creation with a blank form after editing, and preserves the row', () => {
  const listStore = store();
  listStore.clearCurrent = () => {
    listStore.currentOne = {} as typeof listStore.currentOne;
  };
  const { container } = render(
    <RestTable store={listStore} translator={translator} columns={[{ key: 'name' }]} editable />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
  assert.equal((within(dialog).getByLabelText('name') as HTMLInputElement).value, 'A');

  fireEvent.change(within(dialog).getByLabelText('name'), { target: { value: 'Changed' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  assert.equal((within(dialog).getByLabelText('name') as HTMLInputElement).value, '');
  assert.deepEqual(listStore.currentOne, { id: '' });
  assert.equal(listStore.currentPage[0].name, 'A');

  fireEvent.change(within(dialog).getByLabelText('name'), { target: { value: 'Draft' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  assert.equal((within(dialog).getByLabelText('name') as HTMLInputElement).value, '');
});

it('replaces the edit record when switching directly to creation', () => {
  const listStore = store();
  const { container } = render(
    <RestTable store={listStore} translator={translator} columns={[{ key: 'name' }]} editable />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create', hidden: true }));

  assert.equal((within(dialog).getByLabelText('name') as HTMLInputElement).value, '');
  assert.deepEqual(listStore.currentOne, { id: '' });
  assert.deepEqual(listStore.currentPage[0], { id: 1, name: 'A', url: 'https://a.com' });
});
