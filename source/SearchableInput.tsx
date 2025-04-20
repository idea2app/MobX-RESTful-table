import { debounce } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  FormComponent,
  FormComponentProps,
  observePropsState,
} from 'mobx-react-helper';
import { DataObject, Filter } from 'mobx-restful';
import { FocusEvent } from 'react';
import {
  Badge,
  Button,
  CloseButton,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import { Second } from 'web-utility';

import { TextInputTypes } from './BadgeInput';
import { RestFormProps } from './RestForm';
import { RestFormModal } from './RestFormModal';
import { ScrollList, ScrollListProps } from './ScrollList';

export type OptionData = Record<'label' | 'value', string>;

export type SearchableInputProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> = Omit<
  ScrollListProps<D, F>,
  'id' | 'defaultValue' | 'onChange' | 'defaultData' | 'renderList'
> &
  FormComponentProps<OptionData[]> &
  Omit<RestFormProps<D, F>, 'fields'> & {
    translator: RestFormProps<D, F>['translator'] &
      ScrollListProps<D, F>['translator'];
    fields?: RestFormProps<D, F>['fields'];
    labelKey: keyof D;
    valueKey: keyof D;
    renderList?: ScrollListProps<D, F>['renderList'];
    type?: (typeof TextInputTypes)[number];
    multiple?: boolean;
  };

@observer
@observePropsState
export class SearchableInput<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends FormComponent<SearchableInputProps<D, F>> {
  static readonly displayName = 'SearchableInput';

  @observable
  accessor filter = {} as F;

  @observable
  accessor listShown = false;

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
    const selectedOptions = this.value || [];

    if (selectedOptions.find(({ value: v }) => v === value)) return;

    this.innerValue = [...selectedOptions, { label, value }];

    if (!this.props.multiple) this.listShown = false;
  };

  delete = (value: string) =>
    (this.innerValue = this.value.filter(option => option.value !== value));

  handleBlur = ({ target, relatedTarget }: FocusEvent<HTMLElement>) => {
    if (target.parentElement !== relatedTarget?.parentElement)
      this.listShown = false;
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
      <div className="text-center my-3">
        <Spinner />
      </div>
    );

  renderOverlay() {
    const { filter } = this;
    const {
      translator,
      fields,
      store,
      labelKey,
      renderList = this.renderList,
    } = this.props;

    const keyword = filter[labelKey] as string;

    const needNew = !store.allItems.some(
      ({ [labelKey]: label }) => label === keyword,
    );

    return (
      <div
        className="position-absolute start-0 z-3 overflow-auto py-1 bg-white shadow-sm"
        style={{ top: '100%', maxHeight: '30vh' }}
        onBlurCapture={this.handleBlur}
      >
        {needNew && fields && (
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
        uploader,
        type = 'search',
        name,
        required,
        placeholder,
      } = this.props;

    return (
      <InputGroup className="position-relative">
        <InputGroup.Text className="d-flex flex-wrap align-items-center gap-2">
          {value?.map(({ value, label }) => (
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

        {listShown && this.renderOverlay()}

        {fields && (
          <RestFormModal {...{ translator, fields, store, uploader }} />
        )}
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(value?.map(({ value }) => value))}
        />
        <Form.Control
          {...{ type, placeholder, required }}
          onChange={({ currentTarget: { value } }) => this.search(value)}
        />
      </InputGroup>
    );
  }
}
