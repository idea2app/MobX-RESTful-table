import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Image, ImageProps, Modal, Spinner } from 'react-bootstrap';

@observer
export class ImagePreview extends Component<ImageProps> {
  static readonly displayName = 'ImagePreview';

  @observable
  accessor downloading = false;

  @observable
  accessor loadedPath = '';

  @observable
  accessor viewing = false;

  componentDidMount() {
    const { src } = this.props;

    this.loadedPath = '';

    if (src) this.load(src);
  }

  componentDidUpdate({ src }: Readonly<ImageProps>) {
    if (src !== this.props.src) this.componentDidMount();
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
              className="w-100 h-100 object-fit-contain"
              {...{ loading, fluid, rounded, roundedCircle, thumbnail }}
              src={loadedPath}
              onClick={() => (this.viewing = true)}
            />
          )
        )}
        <Modal centered show={viewing} onHide={() => (this.viewing = false)}>
          <Modal.Header>{loadedPath}</Modal.Header>
          <Modal.Body>
            <Image fluid src={loadedPath} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
