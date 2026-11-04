import assert from 'node:assert/strict';
import { it } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import './setup';
import { RangeInput } from '../source/RangeInput';

it('renders one icon per step and clamps each icon value', () => {
  const { container } = render(
    <RangeInput name="score" defaultValue="2" max={3} icon={value => <span>{value}</span>} />,
  );
  const items = container.querySelectorAll('li');

  assert.equal(items.length, 3);
  assert.deepEqual(
    [...items].map(({ textContent }) => textContent),
    ['1', '1', '0'],
  );
  assert.ok(screen.getByRole('slider').classList.contains('opacity-0'));
  assert.equal(container.firstElementChild!.getAttribute('title'), '2');
});

it('defaults to 100 steps without a custom icon', () => {
  const { container } = render(<RangeInput />);

  assert.equal(container.querySelectorAll('li').length, 100);

  const range = screen.getByRole('slider') as HTMLInputElement;

  assert.equal(range.max, '100');
  assert.equal(range.value, '0');
  assert.equal(container.firstElementChild!.getAttribute('title'), '0');
});

it('passes range attributes and container classes through', () => {
  const { container } = render(
    <RangeInput className="custom" min={1} max={5} step={2} defaultValue="3" />,
  );
  const range = screen.getByRole('slider') as HTMLInputElement;

  assert.ok(container.firstElementChild!.classList.contains('custom'));
  assert.equal(container.firstElementChild!.getAttribute('title'), '3');

  assert.equal(range.min, '1');
  assert.equal(range.max, '5');
  assert.equal(range.step, '2');
  assert.equal(range.value, '3');
});

it('updates its value when the range changes', () => {
  const { container } = render(
    <RangeInput min={0} max={5} defaultValue="1" icon={value => <b>{value}</b>} />,
  );
  fireEvent.change(screen.getByRole('slider'), { target: { value: '4' } });

  assert.equal(container.firstElementChild!.getAttribute('title'), '4');
  assert.equal(container.querySelector('li')!.textContent, '1');
  assert.equal(container.querySelector('li:last-child')!.textContent, '0');
});
