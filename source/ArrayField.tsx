import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps } from 'mobx-react-helper';
import { DataObject } from 'mobx-restful';
import { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { formToJSON, isEmpty } from 'web-utility';

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

  componentDidMount() {
    super.componentDidMount();

    if (isEmpty(this.value)) this.add();
  }

  add = () => (this.innerValue = [...(this.innerValue || []), {} as T]);

  remove = (index: number) => (this.innerValue = this.innerValue?.filter((_, i) => i !== index));

  handleChange =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) => {
      const item = formToJSON<T>(currentTarget as HTMLFieldSetElement),
        { innerValue } = this;

      const list = [...innerValue!.slice(0, index), item, ...innerValue!.slice(index + 1)].map(
        item => toJS(item),
      );
      this.props.onChange?.(list);
    };

  handleUpdate =
    (index: number) =>
    ({ currentTarget }: ChangeEvent<EventTarget>) =>
      (this.innerValue![index] = formToJSON<T>(currentTarget as HTMLFieldSetElement));

  render() {
    const { className = '', style, name, renderItem } = this.props;

    return (
      <>
        {this.value?.map((item, index, { length }) => (
          <fieldset
            key={JSON.stringify(item)}
            className={`d-flex align-items-center my-2 gap-2 ${className}`}
            {...{ style, name }}
            onChange={this.handleChange(index)}
            onBlur={this.handleUpdate(index)}
          >
            <div className="flex-fill">{renderItem(item, index)}</div>
            <ButtonGroup>
              <Button type="button" size="sm" variant="warning" onClick={this.add}>
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
