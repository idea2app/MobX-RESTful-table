import { computed, makeObservable, observable } from 'mobx';
import {
  Component,
  ComponentClass,
  InputHTMLAttributes,
  createRef,
} from 'react';

/**
 * @see {@link https://github.com/mobxjs/mobx/blob/main/packages/mobx-react/README.md#note-on-using-props-and-state-in-derivations}
 */
export function observePropsState<T extends ComponentClass>(
  ComponentBaseClass: T,
) {
  class ObservedComponent extends (ComponentBaseClass as ComponentClass) {
    constructor(props: InstanceType<ComponentClass>['props']) {
      super(props);
      makeObservable?.(this);
    }

    @observable
    observedProps = this.props;

    @observable
    observedState = {} as InstanceType<ComponentClass>['state'];

    protected syncPropsState() {
      this.observedProps = this.props;
      this.observedState = this.state;
    }

    componentDidMount() {
      this.syncPropsState();

      super.componentDidMount?.();
    }

    componentDidUpdate(
      prevProps: Readonly<InstanceType<ComponentClass>['props']>,
      prevState: Readonly<InstanceType<ComponentClass>['state']>,
      snapshot?: any,
    ) {
      this.syncPropsState();

      super.componentDidUpdate?.(prevProps, prevState, snapshot);
    }
  }
  return ObservedComponent as unknown as T;
}

export interface FormComponentProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (
    value: InputHTMLAttributes<HTMLInputElement>['value'],
    ...extra: any[]
  ) => any;
}

/**
 * @example
 * ```tsx
 * export interface MyFieldProps
 *     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
 *     onChange?: (value: string) => any;
 * }
 *
 * @observer
 * @observePropsState
 * export class MyField extend FormComponent<MyFieldProps> {
 *     handleChange = ({ currentTarget: { value }}: MouseEvent<HTMLInputElement>) => {
 *         this.innerValue = value;
 *
 *         this.props.onChange?.(this.innerValue);
 *     };
 *
 *     render() {
 *         const { onChange, ...props } = this.props,
 *             { value, handleChange } = this;
 *
 *         return <>
 *             <input {...props} onChange={handleChange} />
 *
 *             <output>{value}</output>
 *         <>;
 *     }
 * }
 * ```
 */
export abstract class FormComponent<
  P extends FormComponentProps = FormComponentProps,
  S = {},
  SS = any,
> extends Component<P, S, SS> {
  constructor(props: P) {
    super(props);
    makeObservable?.(this);
  }

  ref = createRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>();

  @observable
  innerValue = this.props.defaultValue;

  declare observedProps: P;

  @computed
  get value() {
    return this.observedProps.value ?? this.innerValue;
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
