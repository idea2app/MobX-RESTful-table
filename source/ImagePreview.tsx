import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent, reaction } from 'mobx-react-helper';
import { Image, ImageProps, Modal, Spinner } from 'react-bootstrap';

export type ImagePreviewProps = ImageProps & Partial<Pick<HTMLMediaElement, 'srcObject'>> ;

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

  @reaction(({ observedProps }) => observedProps.src + observedProps.srcObject)
  componentDidMount() {
    const { src, srcObject } = this.observedProps;

    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
      this.objectURL = '';
    }
    this.loadedPath = '';

    if (srcObject instanceof Blob || srcObject instanceof MediaSource) {
      this.objectURL = URL.createObjectURL(srcObject);
      this.load(this.objectURL);
    } else if (src) {
      this.load(src);
    }
  }

  componentWillUnmount() {
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
              className="object-fit-contain"
              {...{ loading, fluid, rounded, roundedCircle, thumbnail }}
              src={loadedPath}
              onClick={() => (this.viewing = true)}
            />
          )
        )}
        <Modal centered show={viewing} onHide={() => (this.viewing = false)}>
          <Modal.Body className="text-center">
            <Image fluid src={loadedPath} />
          </Modal.Body>
          <Modal.Footer
            className="justify-content-center"
            as="a"
            href={loadedPath}
            target="_blank"
            download={loadedPath.split('/').pop()}
          >
            {loadedPath}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
