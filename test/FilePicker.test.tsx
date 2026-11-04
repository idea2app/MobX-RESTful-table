import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import './setup';
import { FilePicker } from '../source/FilePicker';

it('renders a placeholder and an empty file input without a value', () => {
  const { container } = render(
    <FilePicker name="avatar" accept="image/*" required className="custom" />,
  );
  const wrapper = container.firstElementChild as HTMLElement,
    placeholder = container.querySelector('.bi-plus')!.parentElement!,
    fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

  assert.ok(wrapper.classList.contains('filePicker'));
  assert.ok(wrapper.classList.contains('custom'));
  assert.ok(wrapper.classList.contains('border'));
  assert.ok(wrapper.classList.contains('position-relative'));

  assert.ok(placeholder.classList.contains('fs-6xl'));
  assert.equal(placeholder.querySelector('.bi-plus')?.tagName, 'SPAN');

  assert.equal(fileInput.type, 'file');
  assert.equal(fileInput.name, 'avatar');
  assert.equal(fileInput.accept, 'image/*');
  assert.ok(fileInput.required);
  assert.ok(!container.querySelector('input[type="hidden"]'));
});

it('renders a preview and toolbar for an existing value', async () => {
  const { container } = render(<FilePicker name="avatar" value="https://example.com/demo.png" />);

  const figure = container.querySelector('figure') as HTMLElement,
    hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement,
    toolbar = screen.getByRole('group');

  assert.ok(figure.classList.contains('m-0'));
  assert.ok(figure.classList.contains('w-100'));
  assert.ok(figure.classList.contains('h-100'));

  assert.equal(hidden.name, 'avatar');
  assert.equal(hidden.value, 'https://example.com/demo.png');
  assert.equal(toolbar.getAttribute('role'), 'group');
  assert.ok(toolbar.classList.contains('position-absolute'));
  assert.ok(toolbar.classList.contains('toolbar'));

  assert.equal(container.querySelector('input[type="file"]')?.getAttribute('name'), null);

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));
});

it('renders a view button only when onView is given', async () => {
  const { container, unmount } = render(<FilePicker value="https://example.com/demo.png" />);

  assert.ok(!container.querySelector('.bi-eye-fill'));

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  unmount();

  const onView = mock.fn();
  const withView = render(<FilePicker value="https://example.com/demo.png" onView={onView} />);

  const viewButton = withView.container.querySelector('.bi-eye-fill')?.closest('button');

  assert.ok(viewButton);

  fireEvent.click(viewButton!);

  assert.equal(onView.mock.callCount(), 1);
  assert.deepEqual(onView.mock.calls[0].arguments[0], {
    path: 'https://example.com/demo.png',
    file: undefined,
  });

  await waitFor(() => assert.ok(withView.container.querySelector('img.object-fit-contain')));
});

it('applies custom container styles and disabled state', () => {
  const { container } = render(<FilePicker style={{ width: '6rem', height: '6rem' }} disabled />);

  const wrapper = container.firstElementChild as HTMLElement,
    fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

  assert.equal(wrapper.style.width, '6rem');
  assert.equal(wrapper.style.height, '6rem');
  assert.ok(fileInput.disabled);
});

it('clears an existing value through its remove button', async () => {
  const onChange = mock.fn();

  const { container } = render(
    <FilePicker name="avatar" defaultValue="https://example.com/demo.png" onChange={onChange} />,
  );
  const removeButton = within(container)
    .getByRole('group')
    .querySelector('.bi-x-lg')
    ?.closest('button');

  assert.ok(container.querySelector('input[type="hidden"]'));
  assert.ok(removeButton);

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  fireEvent.click(removeButton!);

  await waitFor(() => assert.ok(!container.querySelector('input[type="hidden"]')));

  assert.ok(container.querySelector('.bi-plus'));
  assert.ok(container.querySelector('input[type="file"]'));
  assert.deepEqual(onChange.mock.calls.at(-1)?.arguments, ['']);
});
