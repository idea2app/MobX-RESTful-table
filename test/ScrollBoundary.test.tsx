import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { render, screen } from '@testing-library/react';

import { MockIntersectionObserver } from './setup';
import { ScrollBoundary } from '../source/ScrollBoundary';

it('renders every edge slot around the children', () => {
  const { container } = render(
    <ScrollBoundary
      top={<span>top</span>}
      right={<span>right</span>}
      bottom={<span>bottom</span>}
      left={<span>left</span>}
      onTouch={() => {}}
    >
      <p>content</p>
    </ScrollBoundary>,
  );
  const wrapper = container.firstElementChild as HTMLElement;

  assert.ok(wrapper.classList.contains('position-relative'));
  assert.equal(wrapper.querySelectorAll('.position-absolute').length, 4);

  assert.ok(screen.getByText('top').parentElement?.classList.contains('top-0'));
  assert.ok(screen.getByText('left').parentElement?.classList.contains('h-100'));
  assert.ok(screen.getByText('content'));
  assert.ok(screen.getByText('right').parentElement?.classList.contains('right-0'));
  assert.ok(screen.getByText('bottom').parentElement?.classList.contains('top-100'));
});

it('merges custom classes and attributes', () => {
  const { container } = render(
    <ScrollBoundary className="custom" aria-label="scroll area" onTouch={() => {}}>
      <p>content</p>
    </ScrollBoundary>,
  );
  const wrapper = container.firstElementChild as HTMLElement;

  assert.ok(wrapper.classList.contains('position-relative'));
  assert.ok(wrapper.classList.contains('custom'));
  assert.equal(wrapper.getAttribute('aria-label'), 'scroll area');
});

it('renders empty edge slots when no nodes are given', () => {
  const { container } = render(
    <ScrollBoundary onTouch={() => {}}>
      <p>content</p>
    </ScrollBoundary>,
  );
  assert.equal(container.querySelectorAll('.position-absolute').length, 4);
});

it('reports the touched edges through IntersectionObserver', () => {
  const onTouch = mock.fn();

  render(
    <ScrollBoundary onTouch={onTouch}>
      <p>content</p>
    </ScrollBoundary>,
  );
  assert.equal(MockIntersectionObserver.instances.length, 4);

  for (const observer of MockIntersectionObserver.instances) observer.trigger(true);

  assert.deepEqual(
    new Set(onTouch.mock.calls.map(({ arguments: [edge] }) => edge)),
    new Set(['top', 'left', 'right', 'bottom']),
  );
});
