import type { State, StoredCat } from './store.js';

export type ViewId = 'cats' | 'foods' | 'diet' | 'compare' | 'log';

export interface App {
  state: State;
  /** Persist state and redraw the header and current view. */
  commit(): void;
  /** Persist state without redrawing (for live edits that update in place). */
  persist(): void;
  rerender(): void;
  activeCat(): StoredCat | undefined;
  go(view: ViewId): void;
  toast(message: string): void;
}
