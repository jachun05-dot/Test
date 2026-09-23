import type { App, ViewId } from './context.js';
import { h, replaceChildren } from './dom.js';
import { loadState, saveState } from './store.js';
import { catsView } from './views/cats.js';
import { compareView } from './views/compare.js';
import { dietView } from './views/diet.js';
import { foodsView } from './views/foods.js';
import { logView } from './views/log.js';

const VIEWS: { id: ViewId; label: string; render: (app: App) => HTMLElement }[] = [
  { id: 'diet', label: '식단 분석', render: dietView },
  { id: 'cats', label: '고양이', render: catsView },
  { id: 'foods', label: '사료', render: foodsView },
  { id: 'compare', label: '사료 비교', render: compareView },
  { id: 'log', label: '기록·백업', render: logView },
];

function currentView(): ViewId {
  const hash = location.hash.replace('#', '');
  return VIEWS.some((v) => v.id === hash) ? (hash as ViewId) : 'diet';
}

function mount(root: HTMLElement): void {
  const catPicker = h('select', { id: 'active-cat', 'aria-label': '현재 고양이' });
  const nav = h('nav', { class: 'tabs', 'aria-label': '화면' });
  const main = h('main', { id: 'main', class: 'view', tabindex: '-1' });
  const toastRegion = h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
  const storageNotice = h('p', { class: 'storage-notice', hidden: true },
    '이 브라우저에서는 데이터를 저장할 수 없어요 (비공개 모드 등). 창을 닫으면 입력한 내용이 사라집니다.');
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const app: App = {
    state: loadState(),
    persist() {
      storageNotice.hidden = saveState(app.state);
    },
    commit() {
      app.persist();
      app.rerender();
    },
    rerender() {
      renderHeader();
      const view = VIEWS.find((v) => v.id === currentView())!;
      replaceChildren(main, view.render(app));
    },
    activeCat() {
      const { cats, activeCatId } = app.state;
      return cats.find((c) => c.id === activeCatId) ?? cats[0];
    },
    go(view) {
      location.hash = view;
    },
    toast(message) {
      toastRegion.textContent = message;
      toastRegion.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastRegion.classList.remove('is-visible'), 2800);
    },
  };

  catPicker.addEventListener('change', () => {
    app.state.activeCatId = catPicker.value;
    app.commit();
  });

  function renderHeader(): void {
    const active = app.activeCat();
    replaceChildren(
      catPicker,
      app.state.cats.length === 0
        ? h('option', { value: '' }, '등록된 고양이 없음')
        : app.state.cats.map((c) => h('option', { value: c.id, selected: c.id === active?.id }, c.name)),
    );
    catPicker.disabled = app.state.cats.length === 0;
    const current = currentView();
    replaceChildren(
      nav,
      VIEWS.map((v) =>
        h('a', { href: `#${v.id}`, class: `tab${v.id === current ? ' is-current' : ''}`, 'aria-current': v.id === current ? 'page' : undefined }, v.label),
      ),
    );
  }

  replaceChildren(
    root,
    h(
      'div',
      { class: 'shell' },
      h(
        'header',
        { class: 'masthead' },
        h('div', { class: 'brand' },
          h('p', { class: 'brand-name' }, '냥식단'),
          h('p', { class: 'brand-sub' }, '아픈 고양이를 위한 사료 성분 계산기')),
        h('div', { class: 'cat-switch' }, h('label', { for: 'active-cat' }, '현재 고양이'), catPicker),
      ),
      h('p', { class: 'disclaimer' },
        '참고용 계산입니다. 진단과 처방은 반드시 수의사와 상의하세요. 질환별 기준치는 공개 가이드라인과 처방식 성분 범위를 바탕으로 했으며 수의사 검토 전입니다.'),
      storageNotice,
      nav,
      main,
      toastRegion,
    ),
  );

  window.addEventListener('hashchange', () => {
    app.rerender();
    main.focus({ preventScroll: true });
  });
  app.rerender();
}

const root = document.getElementById('app');
if (root) mount(root);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    // Offline support is optional; some hosts (e.g. sandboxed previews) refuse service workers.
  });
}
