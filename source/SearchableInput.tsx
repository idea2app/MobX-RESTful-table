import { debounce } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps } from 'mobx-react-helper';
import { DataObject, Filter } from 'mobx-restful';
import { FocusEvent } from 'react';
import { Button, Form, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { Second } from 'web-utility';

import { BadgeBar } from './BadgeBar';
import { TextInputTypes } from './BadgeInput';
import { RestFormProps } from './RestForm';
import { RestFormModal } from './RestFormModal';
import { ScrollList, ScrollListProps } from './ScrollList';

export type OptionData = Record<'label' | 'value', string>;

export type SearchableInputProps<D extends DataObject, F extends Filter<D> = Filter<D>> = Omit<
  ScrollListProps<D, F>,
  'id' | 'defaultValue' | 'onChange' | 'defaultData' | 'renderList'
> &
  FormComponentProps<OptionData[]> &
  Omit<RestFormProps<D, F>, 'fields'> & {
    translator: RestFormProps<D, F>['translator'] & ScrollListProps<D, F>['translator'];
    fields?: RestFormProps<D, F>['fields'];
    labelKey: keyof D;
    valueKey: keyof D;
    renderList?: ScrollListProps<D, F>['renderList'];
    type?: (typeof TextInputTypes)[number];
    multiple?: boolean;
  };

@observer
export class SearchableInput<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends FormComponent<SearchableInputProps<D, F>> {
  static readonly displayName = 'SearchableInput';

  @observable
  accessor filter = this.props.filter;

  @observable
  accessor listShown = false;

  search = debounce(async (value: string) => {
    const { store, labelKey } = this.props;

    value = value.trim();

    this.filter = { ...this.filter, [labelKey]: value || undefined };

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
    const selectedOptions = this.value || [];

    if (selectedOptions.find(({ value: v }) => v === value)) return;

    this.innerValue = [...selectedOptions, { label, value }];

    if (!this.props.multiple) this.listShown = false;
  };

  delete = (index: number) =>
    (this.innerValue = [...this.value.slice(0, index), ...this.value.slice(index + 1)]);

  handleBlur = ({ target, relatedTarget }: FocusEvent<HTMLElement>) => {
    if (target.parentElement !== relatedTarget?.parentElement) this.listShown = false;
  };

  renderList: ScrollListProps<D, F>['renderList'] = allItems =>
    allItems[0] ? (
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
    ) : (
      this.observedProps.store.downloading > 0 && (
        <div className="text-center my-3">
          <Spinner />
        </div>
      )
    );

  renderOverlay() {
    const { filter } = this;
    const { translator, fields, store, labelKey, renderList = this.renderList } = this.props;

    const keyword = filter[labelKey] as string;

    const needNew = !store.allItems.some(({ [labelKey]: label }) => label === keyword);

    return (
      <div
        className="position-absolute start-0 z-3 overflow-auto py-1 bg-white shadow-sm"
        style={{ top: '100%', maxHeight: '30vh' }}
        onBlurCapture={this.handleBlur}
      >
        {needNew && fields?.[0] && (
          <Button
            className="w-100 sticky-top"
            variant="warning"
            size="sm"
            type="button"
            onClick={() => (store.currentOne = { [labelKey]: keyword } as D)}
          >
            + {keyword}
          </Button>
        )}
        <ScrollList {...{ translator, store, filter, renderList }} />
      </div>
    );
  }

  render() {
    const { value, listShown } = this,
      {
        translator,
        fields,
        store,
        labelKey,
        valueKey,
        type = 'search',
        name,
        required,
        readOnly,
        disabled,
        placeholder,
      } = this.props;

    return (
      <InputGroup className="position-relative">
        <InputGroup.Text className="d-flex flex-wrap align-items-center gap-2">
          <BadgeBar
            list={(value || []).map(({ label }) => ({ text: label }))}
            onDelete={({}, index) => this.delete(index)}
          />
        </InputGroup.Text>

        {listShown && this.renderOverlay()}

        {fields?.[0] && (
          <RestFormModal
            {...{ translator, fields, store }}
            onSubmit={({ [labelKey]: label, [valueKey]: value }) => {
              this.add(label, value);
              this.listShown = false;
            }}
          />
        )}
        <input type="hidden" name={name} value={JSON.stringify(value?.map(({ value }) => value))} />
        <Form.Control
          {...{ type, placeholder, required, readOnly, disabled }}
          onChange={({ currentTarget: { value } }) => this.search(value)}
        />
      </InputGroup>
    );
  }
}
