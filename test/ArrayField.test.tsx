import assert from 'node:assert/strict';
import { it } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import './setup';
import { ArrayField } from '../source/ArrayField';

it('renders one row for each value item', () => {
  const { container } = render(
    <ArrayField
      name="topics"
      className="custom"
      value={[{ name: 'React' }, { name: 'MobX' }]}
      renderItem={({ name }) => <input defaultValue={name} />}
    />,
  );
  const rows = container.querySelectorAll('fieldset');

  assert.equal(rows.length, 2);
  assert.ok(rows[0].classList.contains('custom'));
  assert.ok(rows[0].classList.contains('d-flex'));
  assert.equal(rows[0].getAttribute('name'), 'topics');
  assert.equal((rows[0].querySelector('input') as HTMLInputElement).value, 'React');
  assert.equal((rows[1].querySelector('input') as HTMLInputElement).value, 'MobX');
});

it('starts with one empty row when the initial value is empty', () => {
  const { container } = render(<ArrayField defaultValue={[]} renderItem={() => null} />);

  assert.equal(container.querySelectorAll('fieldset').length, 1);
});

it('passes the item index to renderItem', () => {
  render(
    <ArrayField
      value={[{ name: 'a' }, { name: 'b' }]}
      renderItem={({ name }, index) => `${index}:${name}`}
    />,
  );
  assert.ok(screen.getByText('0:a'));
  assert.ok(screen.getByText('1:b'));
});

it('adds rows after a row and removes them when more than one remains', () => {
  const { container } = render(
    <ArrayField
      defaultValue={[{ name: 'a' }, { name: 'b' }]}
      renderItem={({ name }) => name || 'new row'}
    />,
  );
  fireEvent.click(screen.getAllByRole('button', { name: 'Add row' })[0]);

  assert.equal(container.querySelectorAll('fieldset').length, 3);

  const removeButtons = screen.getAllByRole('button', { name: 'Remove row' });

  assert.ok(removeButtons.every(button => !(button as HTMLButtonElement).disabled));
  assert.equal(removeButtons[0].querySelector('.bi-dash')?.tagName, 'SPAN');

  fireEvent.click(removeButtons[0]);

  assert.equal(container.querySelectorAll('fieldset').length, 2);
});
