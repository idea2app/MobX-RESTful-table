import { observable } from 'mobx';
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

export interface FileUploaderProps extends FormComponentProps {
  store: FileModel;
}

@observer
@observePropsState
export class FileUploader extends FormComponent<FileUploaderProps> {
  static readonly displayName = 'FileUploader';

  @observable
  accessor pickIndex: number | undefined;

  componentDidMount() {
    super.componentDidMount();

    const { defaultValue, store } = this.props;

    store.files =
      defaultValue instanceof Array
        ? (defaultValue as string[])
        : defaultValue
          ? [defaultValue as string]
          : [];
  }

  componentDidUpdate(prevProps: Readonly<FileUploaderProps>) {
    const { value, store } = this.props;

    if (prevProps.value !== value)
      store.files =
        value instanceof Array
          ? (value as string[])
          : value
            ? [value as string]
            : [];
  }

  handleDrop = (index: number) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();

    const { pickIndex } = this;

    if (pickIndex != null) return this.props.store.move(pickIndex, index);
  };

  handleChange =
    (oldURI = '') =>
    async (URI: string, file?: File) => {
      const { store, onChange } = this.props;

      if (oldURI) await store.delete(oldURI);
      if (file) await store.upload(file);

      onChange?.([...store.files]);
    };

  render() {
    const {
      className = 'm-0',
      style,
      multiple,
      store,
      value,
      defaultValue,
      onChange,
      ...props
    } = this.props;

    const { files } = store;

    return (
      <ol
        className={`list-inline d-flex ${className}`}
        style={style}
        onDragOver={event => event.preventDefault()}
      >
        {files.map((file, index) => (
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
        {(multiple || !files[0]) && (
          <li className="list-inline-item">
            <FilePicker
              {...props}
              name={undefined}
              value=""
              required={!store.files[0] && props.required}
              onChange={this.handleChange()}
            />
          </li>
        )}
      </ol>
    );
  }
}
