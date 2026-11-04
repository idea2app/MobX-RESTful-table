import { afterEach } from 'node:test';

import { cleanup } from '@testing-library/react';
import { configure } from 'mobx';

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true);

// test stores are mutated directly by component event handlers
configure({ enforceActions: 'never' });

// jsdom never loads image resources, so `ImagePreview` would wait forever
export class MockImage {
  onload: ((event: Event) => unknown) | null = null;
  onerror: ((event: Event) => unknown) | null = null;

  #src = '';

  get src() {
    return this.#src;
  }

  set src(value: string) {
    this.#src = value;

    queueMicrotask(() => this.onload?.(new window.Event('load')));
  }
}

globalThis.Image = MockImage as unknown as typeof Image;

export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly scrollMargin: string;
  readonly thresholds: ReadonlyArray<number> = [0];

  #callback: IntersectionObserverCallback;
  #targets = new Set<Element>();

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.#callback = callback;
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.scrollMargin = options.scrollMargin ?? '0px';

    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.#targets.add(target);
  }

  unobserve(target: Element) {
    this.#targets.delete(target);
  }

  disconnect() {
    this.#targets.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting = true) {
    const entries = [...this.#targets].map(
      target => ({ target, isIntersecting }) as IntersectionObserverEntry,
    );

    this.#callback(entries, this);
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.ResizeObserver ??= MockResizeObserver as unknown as typeof ResizeObserver;

globalThis.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
})) as typeof matchMedia;

const dialogProto = HTMLDialogElement.prototype;

dialogProto.show ??= function () {
  this.setAttribute('open', '');
};

dialogProto.showModal ??= function () {
  this.setAttribute('open', '');
};

dialogProto.close ??= function () {
  this.removeAttribute('open');

  this.dispatchEvent(new window.Event('close'));
};

HTMLMediaElement.prototype.play = async () => {};
HTMLMediaElement.prototype.pause = () => {};

Element.prototype.scrollIntoView ??= () => {};

// `FilePicker` restores string values through `fetch`, which jsdom doesn't implement
globalThis.fetch = async () => new Response(new Blob([''], { type: 'image/png' }));

afterEach(() => {
  cleanup();

  MockIntersectionObserver.instances = [];
});
