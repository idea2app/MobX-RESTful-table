import {
  imagePlugin,
  officePlugin,
  pdfPlugin,
  PreviewSource,
  textPlugin,
} from '@open-file-viewer/core';
import '@open-file-viewer/core/style.css';
import { FileViewer } from '@open-file-viewer/react';
import { FC } from 'react';
import { DialogBody, Dialog } from 'idea-react';

const workerSrc = new URL('../node_modules/pdfjs-dist/build/pdf.worker.mjs', import.meta.url) + '';

const plugins = [
  imagePlugin(),
  textPlugin(),
  pdfPlugin({ workerSrc, useFetchData: true }),
  officePlugin(),
];

export interface FileViewProps {
  file?: PreviewSource;
  onClose?: () => unknown;
}

export const FileView: FC<FileViewProps> = ({ file, onClose }) => (
  <Dialog open={!!file} style={{ width: 'min(90vw, 72rem)' }} onClose={onClose}>
    <DialogBody>
      {file && (
        <FileViewer
          plugins={plugins}
          theme="auto"
          width="100%"
          height="100%"
          fit="contain"
          file={file}
        />
      )}
    </DialogBody>
  </Dialog>
);
FileView.displayName = 'FileView';
