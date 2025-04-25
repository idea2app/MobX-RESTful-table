import { IReactionDisposer, observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { BaseModel } from 'mobx-restful';
import { DragEvent } from 'react';

import { FilePicker } from './FilePicker';

export abstract class FileModel extends BaseModel {
  @observable
  accessor files: string[] = [];

  clear() {
    super.clear();

    this.files = [];
  }

  /**
   * Override this method for Network calling,
   * then call `super.upload(fileURL)` to update `this.files` array.
   */
  async upload(file: string | Blob) {
    if (file instanceof Blob) file = URL.createObjectURL(file);

    const { files } = this;

    if (!files.includes(file)) this.files = [...files, file];

    return file;
  }

  /**
   * Override this method for Network calling,
   * then call `super.delete(fileURL)` to update `this.files` array.
   */
  async delete(file: string) {
    const { files } = this;
    const index = files.indexOf(file);

    this.files = [...files.slice(0, index), ...files.slice(index + 1)];
  }

  move(sourceIndex: number, targetIndex: number) {
    const { files } = this;
    const sourceFile = files[sourceIndex],
      targetFile = files[targetIndex];
    const frontIndex = Math.min(sourceIndex, targetIndex),
      backIndex = Math.max(sourceIndex, targetIndex);

    const front = files.slice(0, frontIndex),
      middle = files.slice(frontIndex + 1, backIndex),
      back = files.slice(backIndex + 1);

    this.files =
      sourceIndex < targetIndex
        ? [...front, ...middle, targetFile, sourceFile, ...back]
        : [...front, sourceFile, targetFile, ...middle, ...back];
  }
}

export interface FileUploaderProps extends FormComponentProps<string[]> {
  store: FileModel;
}

@observer
@observePropsState
export class FileUploader extends FormComponent<FileUploaderProps> {
  static readonly displayName = 'FileUploader';

  @observable
  accessor pickIndex: number | undefined;

  #disposer?: IReactionDisposer;

  componentDidMount() {
    super.componentDidMount();

    const { store } = this.props;

    store.files = this.value || [];

    this.#disposer = reaction(
      () => this.value,
      value => (store.files = value),
    );
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.#disposer?.();
    this.#disposer = undefined;
  }

  handleDrop = (index: number) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();

    const { props, pickIndex } = this;

    if (!(pickIndex != null)) return;

    props.store.move(pickIndex, index);

    this.innerValue = props.store.files;
  };

  handleChange =
    (oldURI = '') =>
    async (file: File) => {
      const { store } = this.props;

      if (oldURI) await store.delete(oldURI);
      if (file) await store.upload(file);

      this.innerValue = store.files;
    };

  render() {
    const {
      className = 'm-0',
      style,
      multiple,
      store,
      value: _,
      defaultValue,
      onChange,
      ...props
    } = this.props;

    const { value } = this;

    return (
      <ol
        className={`list-inline d-flex ${className}`}
        style={style}
        onDragOver={event => event.preventDefault()}
      >
        {value?.map((file, index) => (
          <li
            key={file}
            className="list-inline-item"
            draggable
            onDragStart={() => (this.pickIndex = index)}
            onDrop={this.handleDrop(index)}
          >
            <FilePicker
              {...props}
              value={file}
              onChange={this.handleChange(file)}
            />
          </li>
        ))}
        {(multiple || !value?.[0]) && (
          <li className="list-inline-item">
            <FilePicker
              {...props}
              name={undefined}
              value=""
              required={!value?.[0] && props.required}
              onChange={this.handleChange()}
            />
          </li>
        )}
      </ol>
    );
  }
}
