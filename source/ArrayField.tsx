import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps } from 'mobx-react-helper';
import { DataObject } from 'mobx-restful';
import { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { formToJSON, isEmpty, uniqueID } from 'web-utility';

export type ArrayFieldProps<T extends DataObject = DataObject> = Pick<
  HTMLAttributes<HTMLFieldSetElement>,
  'className' | 'style'
> &
  FormComponentProps<T[]> & {
    renderItem: (item: T, index: number) => ReactNode;
  };

@observer
export class ArrayField<T extends DataObject = DataObject> extends FormComponent<
  ArrayFieldProps<T>
> {
  static displayName = 'ArrayField';

  protected readonly rowIds = new WeakMap<object, string>();

  protected readRowId(item: T) {
    return this.rowIds.get(item as object);
  }

  protected writeRowId(item: T, rowId = uniqueID()) {
    this.rowIds.set(item as object, rowId);

    return rowId;
  }

  protected getRowId(item: T) {
    return this.readRowId(item) || this.writeRowId(item);
  }

  componentDidMount() {
    super.componentDidMount();

    if (isEmpty(this.value)) this.insert();
  }

  insert = (index = 0) => {
    const { innerValue = [] } = this,
      item = {} as T;

    this.writeRowId(item);
    this.innerValue = [...innerValue.slice(0, index), item, ...innerValue.slice(index)];
  };

  remove = (index: number) => (this.innerValue = this.innerValue?.filter((_, i) => i !== index));

  handleChange =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement),
        { innerValue = [] } = this;
      const currentItem = innerValue[index];

      this.writeRowId(item, this.readRowId(currentItem));

      this.innerValue = [...innerValue.slice(0, index), item, ...innerValue.slice(index + 1)];
    };

  handleUpdate =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement),
        currentItem = this.innerValue![index];

      this.writeRowId(item, this.readRowId(currentItem));
      this.innerValue![index] = item;
    };

  render() {
    const { className = '', style, name, renderItem } = this.props;

    return (
      <>
        {this.value?.map((item, index, { length }) => (
          <fieldset
            key={this.getRowId(item)}
            className={`d-flex align-items-center my-2 gap-2 ${className}`}
            {...{ style, name }}
            onChange={this.handleChange(index)}
            onBlur={this.handleUpdate(index)}
          >
            <div className="flex-fill">{renderItem(item, index)}</div>
            <ButtonGroup>
              <Button
                type="button"
                size="sm"
                variant="warning"
                onClick={() => this.insert(index + 1)}
              >
                +
              </Button>
              <Button
                type="button"
                size="sm"
                variant="danger"
                disabled={length < 2}
                onClick={() => this.remove(index)}
              >
                -
              </Button>
            </ButtonGroup>
          </fieldset>
        ))}
      </>
    );
  }
}
