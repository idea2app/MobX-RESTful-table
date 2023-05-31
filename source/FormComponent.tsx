import { computed, observable } from 'mobx';
import { Component, createRef, InputHTMLAttributes } from 'react';

export interface FormComponentProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (
    value: InputHTMLAttributes<HTMLInputElement>['value'],
    ...extra: any[]
  ) => any;
}

export abstract class FormComponent<
  P extends FormComponentProps = FormComponentProps,
  S = {},
  SS = any,
> extends Component<P, S, SS> {
  ref = createRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>();

  @observable
  innerValue = this.props.defaultValue;

  @computed
  get value() {
    return this.props.value ?? this.innerValue;
  }

  reset = () => {
    this.innerValue = this.props.defaultValue;

    this.props.onChange?.(this.innerValue);
  };

  componentDidMount() {
    this.ref.current?.form?.addEventListener('reset', this.reset);
  }

  componentWillUnmount() {
    this.ref.current?.form?.removeEventListener('reset', this.reset);
  }
}
