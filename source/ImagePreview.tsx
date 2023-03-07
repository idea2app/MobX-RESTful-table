import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import { Image, ImageProps, Modal, Spinner } from 'react-bootstrap';

@observer
export class ImagePreview extends PureComponent<ImageProps> {
  @observable
  downloading = false;

  @observable
  loadedPath = '';

  @observable
  viewing = false;

  componentDidUpdate(prevProps: Readonly<ImageProps>) {
    const { src } = this.props;

    if (prevProps.src === src) return;

    this.loadedPath = '';

    if (src) this.load(src);
  }

  async load(path: string) {
    this.downloading = true;

    await new Promise((resolve, reject) => {
      const image = new globalThis.Image();

      image.onload = resolve;
      image.onerror = reject;

      image.src = path;
    });

    this.loadedPath = path;
    this.downloading = false;
  }

  render() {
    const { downloading, loadedPath, viewing } = this,
      {
        className,
        loading,
        src,
        fluid,
        rounded,
        roundedCircle,
        thumbnail,
        ...props
      } = this.props;

    return (
      <figure
        className={classNames(downloading && 'p-5', className)}
        {...props}
      >
        {downloading ? (
          <Spinner />
        ) : (
          loadedPath && (
            <Image
              {...{ loading, fluid, rounded, roundedCircle, thumbnail }}
              src={loadedPath}
            />
          )
        )}
        <Modal centered show={viewing} onHide={() => (this.viewing = false)}>
          <Modal.Body>
            <img src={loadedPath} />
          </Modal.Body>
        </Modal>
      </figure>
    );
  }
}
