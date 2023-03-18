import { computed, observable } from 'mobx';
import { createRef, InputHTMLAttributes, PureComponent } from 'react';

export type FormComponentProps = InputHTMLAttributes<HTMLInputElement>;

export abstract class FormComponent<
  P extends FormComponentProps = FormComponentProps,
  S = {},
  SS = any,
> extends PureComponent<P, S, SS> {
  ref = createRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>();

  @observable
  innerValue = this.props.defaultValue;

  @computed
  get value() {
    return this.props.value || this.innerValue;
  }

  reset = () => (this.innerValue = this.props.defaultValue);

  componentDidMount() {
    this.ref.current?.form?.addEventListener('reset', this.reset);
  }

  componentWillUnmount() {
    this.ref.current?.form?.removeEventListener('reset', this.reset);
  }
}
