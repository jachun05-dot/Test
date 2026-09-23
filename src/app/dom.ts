export type Child = Node | string | number | null | undefined | false | Child[];

type Handler = (event: Event) => void;

export interface Props {
  class?: string;
  on?: Partial<Record<keyof HTMLElementEventMap, Handler>>;
  [attr: string]: unknown;
}

const PROPERTY_KEYS = new Set(['value', 'checked', 'disabled', 'selected', 'hidden', 'open']);

/** Minimal element builder. Text is always inserted as text nodes, never as HTML. */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props | null = null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null || value === false) continue;
      if (key === 'class') el.className = String(value);
      else if (key === 'on') {
        for (const [event, handler] of Object.entries(value as Props['on'] & object)) {
          el.addEventListener(event, handler as Handler);
        }
      } else if (PROPERTY_KEYS.has(key)) (el as unknown as Record<string, unknown>)[key] = value;
      else el.setAttribute(key, value === true ? '' : String(value));
    }
  }
  append(el, children);
  return el;
}

function append(parent: Node, children: Child[]): void {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) append(parent, child);
    else if (child instanceof Node) parent.appendChild(child);
    else parent.appendChild(document.createTextNode(String(child)));
  }
}

export function replaceChildren(parent: Element, ...children: Child[]): void {
  parent.replaceChildren();
  append(parent, children);
}

const formatters = new Map<number, Intl.NumberFormat>();

export function fmt(value: number | undefined, digits = 1): string {
  if (value === undefined || !Number.isFinite(value)) return '—';
  let formatter = formatters.get(digits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: digits });
    formatters.set(digits, formatter);
  }
  return formatter.format(value);
}

/** Parses an optional numeric input; blank means "not provided". */
export function readNumber(input: HTMLInputElement): number | undefined {
  const raw = input.value.trim().replace(',', '.');
  if (raw === '') return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

/** A delete button that asks for a second click instead of a native confirm dialog. */
export function confirmButton(label: string, confirmLabel: string, onConfirm: () => void): HTMLButtonElement {
  let armed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const button = h('button', {
    type: 'button',
    class: 'btn btn-danger',
    on: {
      click: () => {
        if (armed) {
          clearTimeout(timer);
          onConfirm();
          return;
        }
        armed = true;
        button.textContent = confirmLabel;
        button.classList.add('is-armed');
        timer = setTimeout(() => {
          armed = false;
          button.textContent = label;
          button.classList.remove('is-armed');
        }, 4000);
      },
    },
  }, label);
  return button;
}
