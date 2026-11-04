import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen, within } from '@testing-library/react';

import './setup';
import { SearchableInput } from '../source/SearchableInput';
import { createListStore, translator } from './helper';

const commonProps = {
  store: createListStore(),
  translator,
  labelKey: 'name' as const,
  valueKey: 'id' as const,
  name: 'topics',
};

it('renders selected options as badges and a hidden input', () => {
  const { container } = render(
    <SearchableInput
      {...commonProps}
      value={[
        { label: 'React', value: '1' },
        { label: 'MobX', value: '2' },
      ]}
    />,
  );
  const group = container.querySelector('.input-group') as HTMLElement,
    search = screen.getByRole('searchbox'),
    hidden = container.querySelector('input[type="hidden"][name="topics"]') as HTMLInputElement,
    badges = container.querySelectorAll('.badge');

  assert.ok(group.classList.contains('position-relative'));
  assert.equal(badges.length, 2);
  assert.equal(badges[0].textContent, 'React');
  assert.equal(badges[1].textContent, 'MobX');

  assert.deepEqual(JSON.parse(hidden.value), ['1', '2']);
  assert.ok(search.classList.contains('form-control'));
});

it('hides the delete buttons for read-only or disabled inputs', () => {
  const readOnly = render(
    <SearchableInput {...commonProps} readOnly value={[{ label: 'React', value: '1' }]} />,
  );
  const readOnlyInput = screen.getByRole('searchbox') as HTMLInputElement;

  assert.equal(readOnly.container.querySelector('.btn-close'), null);
  assert.ok(readOnlyInput.readOnly);

  readOnly.unmount();

  const disabled = render(
    <SearchableInput {...commonProps} disabled value={[{ label: 'React', value: '1' }]} />,
  );
  const disabledInput = screen.getByRole('searchbox') as HTMLInputElement;

  assert.equal(disabled.container.querySelector('.btn-close'), null);
  assert.ok(disabledInput.disabled);
});

it('renders the given input type and states', () => {
  const { container } = render(
    <SearchableInput {...commonProps} type="text" placeholder="Search" required disabled />,
  );
  const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

  assert.equal(input.type, 'text');
  assert.ok(input.required);
  assert.ok(input.disabled);
  assert.ok(container.querySelector('input[type="hidden"][name="topics"]'));
});

it('renders a creation form when fields are configured', () => {
  const { container } = render(
    <SearchableInput {...commonProps} fields={[{ key: 'name', required: true }]} />,
  );
  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  assert.equal(dialog.hasAttribute('open'), false);
  assert.ok(within(dialog).getByLabelText('name'));
  assert.ok(within(dialog).getByRole('button', { name: 'Submit', hidden: true }));
});

it('removes a selected option through its close button', () => {
  const onChange = mock.fn();

  const { container } = render(
    <SearchableInput
      {...commonProps}
      defaultValue={[
        { label: 'React', value: '1' },
        { label: 'MobX', value: '2' },
      ]}
      onChange={onChange}
    />,
  );
  fireEvent.click(screen.getAllByLabelText('Close')[0]);

  assert.ok(!screen.queryByText('React'));
  assert.ok(screen.getByText('MobX'));

  const hidden = container.querySelector('input[type="hidden"][name="topics"]') as HTMLInputElement;

  assert.deepEqual(JSON.parse(hidden.value), ['2']);
  assert.deepEqual(onChange.mock.calls[0].arguments[0], [{ label: 'MobX', value: '2' }]);
});
