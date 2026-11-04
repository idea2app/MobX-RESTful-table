import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import './setup';
import { RestForm } from '../source/RestForm';
import { translator } from './helper';

it('renders text, textarea and select fields from metadata', () => {
  render(
    <RestForm
      translator={translator}
      fields={[
        { key: 'name', required: true },
        { key: 'bio', rows: 3 },
        {
          key: 'language',
          options: [
            { value: 'ts', text: 'TypeScript' },
            { value: 'js', text: 'JavaScript' },
          ],
        },
      ]}
    />,
  );
  const name = screen.getByLabelText('name') as HTMLInputElement,
    bio = screen.getByLabelText('bio') as HTMLTextAreaElement,
    language = screen.getByRole('combobox', { name: 'language' });

  assert.equal(name.name, 'name');
  assert.ok(name.required);

  assert.equal(bio.tagName, 'TEXTAREA');
  assert.equal(bio.name, 'bio');
  assert.equal(bio.rows, 3);

  assert.equal(language.getAttribute('name'), 'language');
  assert.deepEqual(
    within(language)
      .getAllByRole('option')
      .map(({ textContent }) => textContent),
    ['TypeScript', 'JavaScript'],
  );
  const submit = screen.getByRole('button', { name: 'Submit' }),
    reset = screen.getByRole('button', { name: 'Cancel' });

  assert.equal(submit.getAttribute('type'), 'submit');
  assert.equal(reset.getAttribute('type'), 'reset');
});

it('renders custom labels, validation messages and multiple inputs', () => {
  const { container } = render(
    <RestForm
      translator={translator}
      fields={[
        { key: 'name', renderLabel: 'Display name', invalidMessage: 'Required' },
        { key: 'tags', multiple: true },
      ]}
    />,
  );
  assert.ok(screen.getByLabelText('Display name'));
  assert.ok(screen.getByText('Required'));

  const hidden = container.querySelector('input[type="hidden"][name="tags"]');

  assert.ok(hidden);
});

it('hides the action buttons when every field is read-only', () => {
  render(
    <RestForm
      translator={translator}
      fields={[
        { key: 'name', readOnly: true },
        { key: 'bio', disabled: true },
      ]}
    />,
  );
  assert.ok(!screen.queryByRole('button', { name: 'Submit' }));
  assert.ok(!screen.queryByRole('button', { name: 'Cancel' }));
});

it('passes size and container classes to the form and buttons', () => {
  const { container } = render(
    <RestForm fields={[{ key: 'name' }]} translator={translator} size="sm" className="custom" />,
  );

  const form = container.querySelector('form') as HTMLFormElement,
    submit = screen.getByRole('button', { name: 'Submit' });

  assert.ok(form.classList.contains('custom'));
  assert.equal(form.hasAttribute('fields'), false);
  assert.ok(submit.classList.contains('btn-sm'));
});

it('renders file fields without a preview when no path is stored', () => {
  const { container } = render(
    <RestForm
      translator={translator}
      fields={[{ key: 'avatar', type: 'file', accept: 'image/*' }]}
    />,
  );
  const label = screen.getByText('avatar');

  assert.equal(label.tagName, 'LABEL');
  assert.equal(label.getAttribute('for'), 'avatar');
  assert.ok(!container.querySelector('figure'));
});

it('submits and resets the form with its current data', async () => {
  const onSubmit = mock.fn(),
    onReset = mock.fn();

  const { container } = render(
    <RestForm fields={[{ key: 'name' }]} translator={translator} {...{ onSubmit, onReset }} />,
  );
  const input = screen.getByLabelText('name'),
    form = container.querySelector('form') as HTMLFormElement;

  fireEvent.change(input, { target: { value: 'Demo' } });
  fireEvent.submit(form);

  await waitFor(() => assert.equal(onSubmit.mock.callCount(), 1));
  assert.deepEqual(onSubmit.mock.calls[0].arguments[0], { name: 'Demo' });

  fireEvent.reset(form);

  assert.equal(onReset.mock.callCount(), 1);
  assert.deepEqual(onReset.mock.calls[0].arguments[0], { name: 'Demo' });
});
