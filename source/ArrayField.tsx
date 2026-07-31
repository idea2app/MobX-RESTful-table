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

  protected readonly rowIds: string[] = [];

  protected getRowId(index: number) {
    return (this.rowIds[index] ||= uniqueID());
  }

  componentDidMount() {
    super.componentDidMount();

    if (isEmpty(this.value)) this.insert();
  }

  insert = (index = 0) => {
    const { innerValue = [] } = this,
      item = {} as T;

    this.rowIds.splice(index, 0, uniqueID());
    this.innerValue = [...innerValue.slice(0, index), item, ...innerValue.slice(index)];
  };

  remove = (index: number) => {
    this.rowIds.splice(index, 1);

    this.innerValue = this.innerValue?.filter((_, i) => i !== index);
  };

  handleChange =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement),
        { innerValue = [] } = this;

      this.innerValue = [...innerValue.slice(0, index), item, ...innerValue.slice(index + 1)];
    };

  handleUpdate =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement);

      this.innerValue![index] = item;
    };

  render() {
    const { className = '', style, name, renderItem } = this.props,
      { value, rowIds } = this;
    const length = value?.length || 0;

    if (rowIds.length > length) rowIds.length = length;

    return (
      <>
        {value?.map((item, index, { length }) => (
          <fieldset
            key={this.getRowId(index)}
            className={`d-flex align-items-center my-2 gap-2 ${className}`}
            {...{ style, name }}
            onBlur={this.handleChange(index)}
            onChange={this.handleUpdate(index)}
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
