/**
 * - `PageLogic`, `ListLogic` · the runtime's base class a page's logic extends
 * - `REACT`, `LIST_REACT` · the runtime's React, as much as a page's logic reaches
 */

// a page's state merges each setState, as the runtime does
class PageLogic {
  props: unknown;
  state: unknown;
  constructor(props?: unknown) {
    this.props = props || {};
    this.state = {};
  }
  setState(next: unknown): void {
    this.state = {
      ...Object(this.state),
      ...(typeof next === 'function' ? next(this.state) : Object(next)),
    };
  }
  forceUpdate(): void {
    this.state = Object(this.state);
  }
}

// the list's harness never redraws: its state is set before each read
class ListLogic {
  props: unknown;
  constructor(props?: unknown) {
    this.props = props || {};
  }
  setState(): void {
    this.props = Object(this.props);
  }
  forceUpdate(): void {
    this.props = Object(this.props);
  }
}

const REACT = {
  createRef: (): { current: null } => ({ current: null }),
  createElement: (): null => null,
  Fragment: 'f',
};

const LIST_REACT = { createRef: (): object => ({}) };

export { LIST_REACT, ListLogic, PageLogic, REACT };
