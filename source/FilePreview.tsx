import { HTMLAttributes, InputHTMLAttributes, FC } from 'react';
import { Image, ImageProps } from 'react-bootstrap';

export type FilePreviewProps = ImageProps &
  HTMLAttributes<HTMLAudioElement> &
  HTMLAttributes<HTMLVideoElement> &
  HTMLAttributes<HTMLAnchorElement> & {
    type?: InputHTMLAttributes<HTMLInputElement>['accept'];
    path: string;
  };

export const FilePreview: FC<FilePreviewProps> = ({
  type = '*/*',
  path,
  ...props
}) => {
  const [kind] = type.split('/'),
    [name, ...rest] =
      new URL(path, 'http://localhost').pathname
        .split('/')
        .at(-1)
        ?.split('.') || [];
  const extension = rest.join('.');

  return kind === 'image' ? (
    <Image fluid src={path} {...props} />
  ) : kind === 'audio' ? (
    <audio controls src={path} {...props} />
  ) : kind === 'video' ? (
    <video
      muted
      src={path}
      onMouseEnter={({ currentTarget }) => currentTarget.play()}
      onMouseLeave={({ currentTarget }) => currentTarget.pause()}
      {...props}
    />
  ) : (
    <a className="d-inline-block px-3 py-2" download href={path} {...props}>
      {extension ? <i className={`bi bi-filetype-${extension} fs-1`} /> : path}
    </a>
  );
};

FilePreview.displayName = 'FilePreview';
