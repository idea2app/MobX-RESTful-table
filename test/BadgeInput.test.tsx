import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import './setup';
import { BadgeInput } from '../source/BadgeInput';

it('renders selected values as removable badges and a hidden input', () => {
  const { container } = render(
    <BadgeInput name="keywords" value={['React', 'MobX']} placeholder="Add keyword" />,
  );
  const badges = container.querySelectorAll('li.badge'),
    hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement,
    input = screen.getByPlaceholderText('Add keyword');

  assert.equal(badges.length, 2);
  assert.equal(badges[0].textContent, 'React');
  assert.equal(badges[1].textContent, 'MobX');

  assert.equal(hidden.name, 'keywords');
  assert.deepEqual(JSON.parse(hidden.value), ['React', 'MobX']);

  assert.ok(input.classList.contains('border-0'));
  assert.ok(input.classList.contains('flex-fill'));
});

it('merges custom classes, styles and input type', () => {
  const { container } = render(
    <BadgeInput className="custom" style={{ width: '20rem' }} type="email" />,
  );
  const wrapper = container.firstElementChild as HTMLElement,
    input = screen.getByRole('textbox');

  assert.ok(wrapper.classList.contains('form-control'));
  assert.ok(wrapper.classList.contains('custom'));
  assert.equal(wrapper.style.width, '20rem');

  assert.equal(input.getAttribute('type'), 'email');
});

it('marks the input as required only while empty', () => {
  const { unmount } = render(<BadgeInput required />);

  assert.ok((screen.getByRole('textbox') as HTMLInputElement).required);

  unmount();

  render(<BadgeInput required value={['React']} />);

  assert.ok(!(screen.getByRole('textbox') as HTMLInputElement).required);
});

it('adds a badge on Enter and removes the last one on Backspace', () => {
  const { container } = render(<BadgeInput name="keywords" />);

  const input = screen.getByRole('textbox') as HTMLInputElement,
    hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'React' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  assert.equal(screen.getByText('React').textContent, 'React');
  assert.deepEqual(JSON.parse(hidden.value), ['React']);
  assert.equal(input.value, '');

  fireEvent.keyDown(input, { key: 'Backspace' });

  assert.ok(!screen.queryByText('React'));
  assert.deepEqual(JSON.parse(hidden.value), []);
});

it('removes a badge through its close button', () => {
  const onChange = mock.fn();

  const { container } = render(<BadgeInput defaultValue={['React', 'MobX']} onChange={onChange} />);

  fireEvent.click(screen.getAllByLabelText('Close')[0]);

  assert.ok(!screen.queryByText('React'));
  assert.equal(screen.getByText('MobX').textContent, 'MobX');

  const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;

  assert.deepEqual(JSON.parse(hidden.value), ['MobX']);
  assert.deepEqual(onChange.mock.calls[0].arguments[0], ['MobX']);
});
