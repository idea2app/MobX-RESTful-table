import { FC, HTMLAttributes, InputHTMLAttributes } from 'react';
import { ImageProps } from 'react-bootstrap';

import { ImagePreview } from './ImagePreview';

export type FilePreviewProps = ImageProps &
  HTMLAttributes<HTMLAudioElement> &
  HTMLAttributes<HTMLVideoElement> &
  HTMLAttributes<HTMLAnchorElement> & {
    type?: InputHTMLAttributes<HTMLInputElement>['accept'];
    path?: string;
    file?: HTMLMediaElement['srcObject'];
  };

export const FileTypeMap = {
  stream: 'binary',
  compressed: 'zip',
  msword: 'doc',
  document: 'docx',
  powerpoint: 'ppt',
  presentation: 'pptx',
  excel: 'xls',
  sheet: 'xlsx',
};

export const FilePreview: FC<FilePreviewProps> = ({
  className = '',
  style,
  hidden,
  type,
  path,
  file,
  ...props
}) => {
  const [category, ...kind] = type?.split(/\W+/) || [],
    fileName =
      file instanceof File
        ? file.name
        : path && decodeURI(new URL(path, 'http://localhost').pathname.split('/').at(-1) || '');
  const extension =
    FileTypeMap[kind.at(-1)] ||
    (fileName?.includes('.') ? fileName.split('.').at(-1) : kind.at(-1));

  return (
    <figure
      className={`d-flex flex-column align-items-center justify-content-center m-0 ${className}`}
      {...{ style, hidden }}
    >
      {category === 'image' ? (
        <ImagePreview
          className="h-100"
          fluid
          loading="lazy"
          src={file instanceof Blob ? file : path}
          {...props}
        />
      ) : category === 'audio' ? (
        <audio
          controls
          src={path}
          ref={node => {
            if (node) node.srcObject = file;
          }}
          {...props}
        />
      ) : category === 'video' ? (
        <video
          muted
          src={path}
          ref={node => {
            if (node) node.srcObject = file;
          }}
          onMouseEnter={({ currentTarget }) => currentTarget.play()}
          onMouseLeave={({ currentTarget }) => currentTarget.pause()}
          {...props}
        />
      ) : (
        <>
          <a
            className="d-inline-flex justify-content-center align-items-center"
            href={path}
            target="_blank"
            download={fileName}
            {...props}
          >
            <i className={`bi bi-filetype-${extension || 'file-earmark'} fs-1`} />
          </a>
          <figcaption className="mw-100 text-truncate">{fileName}</figcaption>
        </>
      )}
    </figure>
  );
};

FilePreview.displayName = 'FilePreview';
