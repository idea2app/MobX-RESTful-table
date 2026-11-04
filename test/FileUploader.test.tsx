import assert from 'node:assert/strict';
import { it, mock } from 'node:test';

import { fireEvent, render, waitFor } from '@testing-library/react';

import './setup';
import { FileModel, FileUploader, FileUploaderProps } from '../source/FileUploader';

class MockFileModel extends FileModel {}

const renderUploader = (props: Partial<FileUploaderProps> = {}) =>
  render(<FileUploader store={new MockFileModel()} name="files" {...props} />);

it('renders one picker per uploaded file without an extra picker', async () => {
  const { container } = renderUploader({
    defaultValue: ['https://example.com/a.png', 'https://example.com/b.png'],
  });
  const list = container.querySelector('ol') as HTMLOListElement;

  assert.ok(list.classList.contains('list-inline'));
  assert.ok(list.classList.contains('d-flex'));
  assert.equal(container.querySelectorAll('.filePicker').length, 2);
  assert.equal(container.querySelectorAll('input[type="hidden"][name="files"]').length, 2);

  await waitFor(() => assert.equal(container.querySelectorAll('img.object-fit-contain').length, 2));
});

it('renders an empty picker when there are no files', () => {
  const { container } = renderUploader();

  assert.equal(container.querySelectorAll('.filePicker').length, 1);
  assert.ok(container.querySelector('.bi-plus')?.parentElement?.classList.contains('fs-6xl'));
});

it('always renders an additional picker in multiple mode', async () => {
  const { container } = renderUploader({
    multiple: true,
    defaultValue: ['https://example.com/a.png', 'https://example.com/b.png'],
  });
  assert.equal(container.querySelectorAll('.filePicker').length, 3);

  await waitFor(() => assert.equal(container.querySelectorAll('img.object-fit-contain').length, 2));
});

it('passes the list classes and styles through', () => {
  const { container } = renderUploader({ className: 'custom', style: { gap: '1rem' } });

  const list = container.querySelector('ol') as HTMLOListElement;

  assert.ok(list.classList.contains('custom'));
  assert.equal(list.style.gap, '1rem');
});

it('removes an uploaded file through its picker', async () => {
  const onChange = mock.fn();

  const { container } = renderUploader({
    defaultValue: ['https://example.com/a.png'],
    onChange,
  });
  const removeButton = container.querySelector('.bi-x-lg')?.closest('button');

  assert.ok(container.querySelector('input[type="hidden"][name="files"]'));
  assert.ok(removeButton);

  await waitFor(() => assert.ok(container.querySelector('img.object-fit-contain')));

  fireEvent.click(removeButton!);

  await waitFor(() =>
    assert.equal(container.querySelectorAll('input[type="hidden"][name="files"]').length, 0),
  );
  assert.ok(container.querySelector('.bi-plus'));
  assert.deepEqual(onChange.mock.calls.at(-1)?.arguments, [[]]);
});
