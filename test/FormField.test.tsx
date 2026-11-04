import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen, within } from '@testing-library/react';

import './setup';
import { FormField } from '../source/FormField';

it('renders a text input with its label as placeholder', () => {
  render(<FormField name="language" label="Language" defaultValue="TypeScript" />);

  const input = screen.getByLabelText('Language') as HTMLInputElement,
    label = screen.getByText('Language');

  assert.equal(input.id, 'language');
  assert.equal(input.name, 'language');
  assert.equal(input.placeholder, 'Language');
  assert.equal(input.value, 'TypeScript');
  assert.ok(input.classList.contains('form-control'));

  assert.equal(label.tagName, 'LABEL');
  assert.equal(label.getAttribute('for'), 'language');
});

it('renders a textarea with the requested rows', () => {
  render(<FormField as="textarea" name="bio" label="Bio" rows={3} />);

  const textarea = screen.getByLabelText('Bio') as HTMLTextAreaElement;

  assert.equal(textarea.tagName, 'TEXTAREA');
  assert.equal(textarea.name, 'bio');
  assert.equal(textarea.rows, 3);
  assert.ok(textarea.classList.contains('form-control'));
  assert.ok(textarea.classList.contains('h-auto'));
});

it('renders select options', () => {
  render(
    <FormField
      name="framework"
      label="Framework"
      options={[
        { value: 'react', text: 'React' },
        { value: 'vue', label: 'Vue', disabled: true },
      ]}
    />,
  );
  const select = screen.getByRole('combobox', { name: 'Framework' }),
    options = within(select).getAllByRole('option') as HTMLOptionElement[];

  assert.equal(select.id, 'framework');
  assert.equal(select.getAttribute('name'), 'framework');
  assert.equal(options.length, 2);
  assert.equal(options[0].value, 'react');
  assert.equal(options[0].textContent, 'React');
  assert.equal(options[1].value, 'vue');
  assert.equal(options[1].textContent, 'vue');
  assert.equal(options[1].getAttribute('label'), 'Vue');
  assert.ok(options[1].disabled);
});

it('renders a multiple select with the given rows as size', () => {
  const { container } = render(
    <FormField name="tags" multiple rows={4} options={[{ value: 'a' }, { value: 'b' }]} />,
  );
  const select = container.querySelector('select') as HTMLSelectElement,
    options = within(select).getAllByRole('option') as HTMLOptionElement[];

  assert.ok(select.multiple);
  assert.equal(select.getAttribute('size'), '4');
  assert.deepEqual(
    options.map(({ value }) => value),
    ['a', 'b'],
  );
  assert.equal(options[0].textContent, 'a');
});

it('passes control state, size and container attributes through', () => {
  const { container } = render(
    <FormField
      name="code"
      className="custom"
      style={{ width: '50%' }}
      size="sm"
      required
      readOnly
      disabled
      pattern="[A-Z]+"
    />,
  );
  const wrapper = container.querySelector('.form-floating') as HTMLElement,
    input = container.querySelector('input') as HTMLInputElement;

  assert.ok(wrapper.classList.contains('form-floating'));
  assert.ok(wrapper.classList.contains('custom'));
  assert.equal(wrapper.style.width, '50%');

  assert.ok(input.classList.contains('form-control'));
  assert.ok(input.classList.contains('form-control-sm'));
  assert.equal(input.getAttribute('pattern'), '[A-Z]+');
  assert.ok(input.required);
  assert.ok(input.readOnly);
  assert.ok(input.disabled);
});

it('marks the field invalid on blur and clears it when valid', () => {
  const onBlur = mock.fn();

  const { container } = render(
    <FormField name="code" label="Code" required pattern="[A-Z]+" onBlur={onBlur} />,
  );
  const wrapper = container.querySelector('.form-floating') as HTMLElement,
    input = screen.getByLabelText('Code') as HTMLInputElement;

  fireEvent.blur(input);

  assert.ok(input.classList.contains('is-invalid'));
  assert.ok(wrapper.classList.contains('is-invalid'));
  assert.equal(onBlur.mock.callCount(), 1);

  fireEvent.change(input, { target: { value: 'ABC' } });
  fireEvent.blur(input);

  assert.ok(!input.classList.contains('is-invalid'));
  assert.ok(!wrapper.classList.contains('is-invalid'));
  assert.equal(onBlur.mock.callCount(), 2);
});
