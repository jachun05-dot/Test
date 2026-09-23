import type { App } from '../context.js';
import { confirmButton, fmt, h } from '../dom.js';
import { exportState, importState, resetToExamples } from '../store.js';

export function logView(app: App): HTMLElement {
  const cat = app.activeCat();
  const entries = app.state.logs
    .filter((l) => l.catId === cat?.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const history = h(
    'section',
    { class: 'log', 'aria-labelledby': 'log-title' },
    h('header', { class: 'editor-head' }, h('h2', { id: 'log-title' }, cat ? `${cat.name}의 급여 기록` : '급여 기록')),
    entries.length === 0
      ? h('p', { class: 'hint' }, '"식단 분석" 화면에서 "오늘 식단 기록하기"를 누르면 여기에 쌓입니다.')
      : h(
          'div',
          { class: 'table-wrap' },
          h(
            'table',
            { class: 'data-table' },
            h('thead', null, h('tr', null,
              h('th', { scope: 'col' }, '날짜'),
              h('th', { scope: 'col', class: 'num' }, '체중'),
              h('th', { scope: 'col', class: 'num' }, '칼로리 / 목표'),
              h('th', { scope: 'col' }, '식단'),
              h('th', { scope: 'col' }, h('span', { class: 'sr-only' }, '삭제')))),
            h('tbody', null, entries.map((entry) =>
              h('tr', null,
                h('th', { scope: 'row', class: 'num' }, entry.date),
                h('td', { class: 'num' }, `${fmt(entry.weightKg, 2)} kg`),
                h('td', { class: 'num' }, `${fmt(entry.kcal, 0)} / ${fmt(entry.targetKcal, 0)}`),
                h('td', null, entry.items.map((i) => `${i.name} ${i.grams}g`).join(', ')),
                h('td', null, confirmButton('삭제', '확인', () => {
                  app.state.logs = app.state.logs.filter((l) => l.id !== entry.id);
                  app.commit();
                })),
              ))),
          ),
        ),
  );

  const backupText = h('textarea', { id: 'backup-text', rows: '6', readonly: true, spellcheck: 'false' });
  const restoreText = h('textarea', { id: 'restore-text', rows: '6', spellcheck: 'false', placeholder: '백업해 둔 내용을 여기에 붙여넣으세요' });
  const restoreError = h('p', { class: 'form-error', role: 'alert' });

  const backup = h(
    'section',
    { class: 'backup', 'aria-labelledby': 'backup-title' },
    h('h2', { id: 'backup-title' }, '데이터 백업'),
    h('p', { class: 'hint' }, '모든 데이터는 이 브라우저에만 저장됩니다. 다른 기기로 옮기거나 브라우저 데이터를 지우기 전에 백업하세요.'),
    h('div', { class: 'backup-grid' },
      h('div', { class: 'field' },
        h('label', { for: 'backup-text' }, '내 데이터'),
        backupText,
        h('button', {
          type: 'button',
          class: 'btn',
          on: {
            click: () => {
              backupText.value = exportState(app.state);
              const fallback = () => {
                backupText.select();
                app.toast('자동 복사가 막혀 있어요. 선택된 내용을 직접 복사하세요');
              };
              if (!navigator.clipboard) return fallback();
              navigator.clipboard
                .writeText(backupText.value)
                .then(() => app.toast('백업 내용을 복사했습니다. 메모장 등에 붙여넣어 보관하세요'), fallback);
            },
          },
        }, '백업 내용 복사')),
      h('div', { class: 'field' },
        h('label', { for: 'restore-text' }, '백업에서 복원'),
        restoreText,
        restoreError,
        h('button', {
          type: 'button',
          class: 'btn',
          on: {
            click: () => {
              try {
                app.state = importState(restoreText.value);
                restoreError.textContent = '';
                app.commit();
                app.toast('백업에서 복원했습니다');
              } catch (error) {
                restoreError.textContent = error instanceof SyntaxError
                  ? '내용이 올바르지 않습니다. 백업한 내용을 빠짐없이 붙여넣었는지 확인하세요.'
                  : (error as Error).message;
              }
            },
          },
        }, '복원하기'))),
    h('div', { class: 'actions' },
      confirmButton('예시 데이터로 초기화', '한 번 더 누르면 모든 데이터가 지워집니다', () => {
        app.state = resetToExamples();
        app.commit();
        app.toast('예시 데이터로 초기화했습니다');
      })),
  );

  return h('div', { class: 'stack' }, history, backup);
}
