import { debounce } from 'lodash';
import { computed, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { observePropsState } from 'mobx-react-helper';
import { DataObject, Filter, ListModel } from 'mobx-restful';
import { Component, FocusEvent } from 'react';
import {
  Badge,
  CloseButton,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { Second } from 'web-utility';

import { BaseInputProps, TextInputTypes } from './BadgeInput';
import { ScrollList, ScrollListProps } from './ScrollList';

export type OptionData = Record<'label' | 'value', string>;

export interface SearchableInputProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends Omit<
      ScrollListProps<D, F>,
      'defaultValue' | 'onChange' | 'defaultData' | 'renderList'
    >,
    BaseInputProps<OptionData[]> {
  store: ListModel<D, F>;
  labelKey: keyof D;
  valueKey: keyof D;
  renderList?: ScrollListProps<D, F>['renderList'];
  type?: (typeof TextInputTypes)[number];
  multiple?: boolean;
}

@observer
@observePropsState
export class SearchableInput<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends Component<SearchableInputProps<D, F>> {
  static readonly displayName = 'SearchableInput';

  declare observedProps: SearchableInputProps<D, F>;

  @observable
  accessor filter = {} as F;

  @observable
  accessor innerValue = this.props.defaultValue || [];

  @computed
  get selectedOptions() {
    return this.observedProps.value || this.innerValue;
  }

  @observable
  accessor listShown = false;

  componentWillUnmount =
    this.props.onChange &&
    reaction(
      () => this.innerValue,
      value => this.props.onChange(toJS(value)),
    );

  search = debounce(async (value: string) => {
    const { store, labelKey } = this.props;

    value = value.trim();

    this.filter = (value ? { [labelKey]: value } : {}) as F;

    if (store.downloading < 1)
      if (value) {
        if (!this.listShown) this.listShown = true;
        else await store.getList(this.filter, 1);
      } else {
        this.listShown = false;
        store.clearList();
      }
  }, Second);

  add = (label: string, value: string) => {
    const { selectedOptions } = this;

    if (selectedOptions.find(({ value: v }) => v === value)) return;

    this.innerValue = [...selectedOptions, { label, value }];

    if (!this.props.multiple) this.listShown = false;
  };

  delete = (value: string) =>
    (this.innerValue = this.selectedOptions.filter(
      option => option.value !== value,
    ));

  handleBlur = ({ target, relatedTarget }: FocusEvent<HTMLElement>) => {
    if (target.parentElement !== relatedTarget?.parentElement)
      this.listShown = false;
  };

  renderList: ScrollListProps<D, F>['renderList'] = allItems => (
    <ListGroup>
      {allItems.map(data => {
        const { labelKey, valueKey } = this.observedProps;

        const label = data[labelKey],
          value = data[valueKey];

        return (
          <ListGroup.Item
            key={value}
            as="button"
            type="button"
            action
            onClick={() => this.add(label, value)}
          >
            {label}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );

  render() {
    const { filter, selectedOptions, listShown } = this,
      {
        type = 'search',
        name,
        required,
        placeholder,
        defaultValue,
        value,
        labelKey,
        renderList = this.renderList,
        onChange,
        ...props
      } = this.props;

    return (
      <InputGroup className="position-relative">
        <InputGroup.Text className="d-flex flex-wrap align-items-center gap-2">
          {selectedOptions.map(({ value, label }) => (
            <Badge
              key={value}
              className="d-inline-flex align-items-center gap-1"
              bg="info"
              text="dark"
            >
              {label}
              <CloseButton onClick={() => this.delete(value)} />
            </Badge>
          ))}
        </InputGroup.Text>

        {listShown && (
          <div
            className="position-absolute start-0 z-1 bg-white overflow-auto py-1"
            style={{ top: '100%', maxHeight: '30vh' }}
            onBlurCapture={this.handleBlur}
          >
            <ScrollList {...props} {...{ filter, renderList }} />
          </div>
        )}
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(selectedOptions.map(({ value }) => value))}
        />
        <Form.Control
          {...{ type, placeholder, required }}
          onChange={({ currentTarget: { value } }) => this.search(value)}
        />
      </InputGroup>
    );
  }
}
