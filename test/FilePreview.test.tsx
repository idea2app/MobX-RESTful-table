import assert from 'node:assert/strict';
import { it } from 'node:test';

import { render, screen, waitFor } from '@testing-library/react';

import './setup';
import { FilePreview } from '../source/FilePreview';

it('renders images through ImagePreview', async () => {
  const path = 'https://example.com/demo.png',
    { container } = render(<FilePreview className="custom" path={path} />);

  const figure = container.querySelector('figure') as HTMLElement,
    dialog = container.querySelector('dialog') as HTMLDialogElement;

  assert.ok(figure.classList.contains('d-flex'));
  assert.ok(figure.classList.contains('align-items-center'));
  assert.ok(figure.classList.contains('custom'));

  assert.equal(dialog.hasAttribute('open'), false);
  assert.ok(!container.querySelector('img.object-fit-contain'));
  assert.equal(container.querySelectorAll('figure img[src]').length, 0);

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  assert.equal(container.querySelector('img.object-fit-contain')?.getAttribute('src'), path);
  assert.ok(container.querySelector('.m-0.h-100'));
});

it('renders audio players', () => {
  const { container } = render(<FilePreview path="https://example.com/demo.mp3" />);

  const audio = container.querySelector('audio') as HTMLAudioElement;

  assert.ok(audio.controls);
  assert.equal(audio.getAttribute('src'), 'https://example.com/demo.mp3');
});

it('renders muted video players', () => {
  const { container } = render(<FilePreview path="https://example.com/demo.mp4" />);

  const video = container.querySelector('video') as HTMLVideoElement;

  assert.ok(video.muted);
  assert.equal(video.getAttribute('src'), 'https://example.com/demo.mp4');
});

it('renders a download link and caption for other files', () => {
  const path = 'https://example.com/report.pdf',
    { container } = render(<FilePreview path={path} />);

  const link = screen.getByRole('link'),
    icon = container.querySelector('.bi-filetype-pdf') as HTMLElement,
    caption = container.querySelector('figcaption') as HTMLElement;

  assert.equal(link.getAttribute('href'), path);
  assert.equal(link.getAttribute('target'), '_blank');
  assert.equal(link.getAttribute('download'), 'report.pdf');
  assert.ok(link.classList.contains('d-inline-flex'));
  assert.ok(link.classList.contains('justify-content-center'));

  assert.ok(icon.classList.contains('bi-filetype-pdf'));
  assert.ok(icon.classList.contains('fs-3xl'));
  assert.equal(icon.tagName, 'SPAN');

  assert.equal(caption.textContent, 'report.pdf');
  assert.ok(caption.classList.contains('text-truncate'));
});

it('renders a generic file icon when the path has no extension', () => {
  const { container } = render(<FilePreview path="https://example.com/download" />);

  assert.ok(container.querySelector('.bi-file-earmark'));
  assert.ok(!container.querySelector('.bi-filetype-file-earmark'));
});

it('passes container attributes through', () => {
  const { container } = render(
    <FilePreview path="https://example.com/report.pdf" style={{ width: '8rem' }} hidden />,
  );
  const figure = container.querySelector('figure') as HTMLElement;

  assert.equal(figure.style.width, '8rem');
  assert.ok(figure.hidden);
});

it('requires a file or a path', () => {
  assert.throws(() => render(<FilePreview />), URIError);
});
