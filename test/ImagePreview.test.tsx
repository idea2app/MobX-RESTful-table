import assert from 'node:assert/strict';
import { it } from 'node:test';

import { fireEvent, render, waitFor } from '@testing-library/react';

import './setup';
import { ImagePreview } from '../source/ImagePreview';

const path = 'https://example.com/demo.png';

it('renders a loading container and a closed dialog before the image loads', async () => {
  const { container } = render(<ImagePreview className="custom" src={path} />);

  const wrapper = container.firstElementChild as HTMLElement,
    dialog = container.querySelector('dialog') as HTMLDialogElement;

  assert.ok(wrapper.classList.contains('m-0'));
  assert.ok(wrapper.classList.contains('custom'));
  assert.equal(dialog.hasAttribute('open'), false);
  assert.ok(container.querySelector('.spinner-border'));

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  assert.ok(!container.querySelector('.spinner-border'));
  assert.equal(container.querySelector('img.object-fit-contain')?.getAttribute('src'), path);
});

it('passes container attributes through', async () => {
  const { container } = render(
    <ImagePreview src={path} style={{ width: '8rem' }} aria-label="Demo" />,
  );
  const wrapper = container.firstElementChild as HTMLElement;

  assert.equal(wrapper.style.width, '8rem');
  assert.equal(wrapper.getAttribute('aria-label'), 'Demo');

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));
});

it('opens the dialog when the preview is clicked', async () => {
  const { container } = render(<ImagePreview src={path} />);

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  fireEvent.click(container.querySelector('img.object-fit-contain')!);

  const dialog = container.querySelector('dialog') as HTMLDialogElement;

  assert.ok(dialog.hasAttribute('open'));

  const link = container.querySelector('a.dialog-footer') as HTMLAnchorElement;

  assert.equal(link.getAttribute('href'), path);
  assert.equal(link.getAttribute('target'), '_blank');
  assert.ok(link.classList.contains('justify-content-center'));
});
