/// <reference types="@types/react/experimental" />

import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent, reaction } from 'mobx-react-helper';
import { DialogBody, DialogFooter, Image, ImageProps, NativeDialog, Spinner } from 'idea-react';
import { fileNameOf } from 'web-utility';

export type ImagePreviewProps = ImageProps & Partial<Record<`rounded${'' | 'Circle'}`, boolean>>;

@observer
export class ImagePreview extends ObservedComponent<ImagePreviewProps> {
  static readonly displayName = 'ImagePreview';

  @observable
  accessor downloading = false;

  @observable
  accessor loadedPath = '';

  @observable
  accessor viewing = false;

  objectURL = '';

  componentDidMount() {
    super.componentDidMount();
    this.init();
  }

  @reaction(({ observedProps: { src } }) => src)
  init() {
    const { src } = this.observedProps;

    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
      this.objectURL = '';
    }
    this.loadedPath = '';

    if (src instanceof Blob) {
      this.objectURL = URL.createObjectURL(src);
      this.load(this.objectURL);
    } else if (src) {
      this.load(src);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.objectURL) URL.revokeObjectURL(this.objectURL);
  }

  async load(path: string) {
    this.downloading = true;

    try {
      await new Promise((resolve, reject) => {
        const image = new globalThis.Image();

        image.onload = resolve;
        image.onerror = reject;

        image.src = path;
      });

      this.loadedPath = path;
    } finally {
      this.downloading = false;
    }
  }

  render() {
    const { downloading, loadedPath, viewing } = this,
      { className, loading, src, fluid, rounded, roundedCircle, thumbnail, ...props } = this.props;

    return (
      <div
        className={classNames(
          'm-0',
          downloading && 'd-flex justify-content-center align-items-center',
          className,
        )}
        {...props}
      >
        {downloading ? (
          <Spinner />
        ) : (
          loadedPath && (
            <Image
              className={classNames(
                'object-fit-contain',
                { rounded },
                roundedCircle && 'rounded-circle',
              )}
              {...{ loading, fluid, rounded, roundedCircle, thumbnail }}
              src={loadedPath}
              onClick={() => (this.viewing = true)}
            />
          )
        )}
        <NativeDialog open={viewing} onClose={() => (this.viewing = false)}>
          <DialogBody className="text-center">
            <Image fluid src={loadedPath} />
          </DialogBody>
          <DialogFooter
            className="justify-content-center max-w-100 text-break"
            as="a"
            href={loadedPath}
            target="_blank"
            download={fileNameOf(loadedPath)}
          >
            {loadedPath}
          </DialogFooter>
        </NativeDialog>
      </div>
    );
  }
}
