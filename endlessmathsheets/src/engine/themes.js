// Holiday line art for themed sheets. Icons use a 32x32 box; shapes with class
// "f" are filled with the paper colour so they hide what is behind them.
// Styles live in site.css (.ti).

const r1 = (n) => Math.round(n * 10) / 10;

const TURKEY =
  [-72, -36, 0, 36, 72].map((a) => `<ellipse class="f" cx="16" cy="9.5" rx="3.4" ry="7.2" transform="rotate(${a} 16 18)"/>`).join('') +
  '<circle class="f" cx="16" cy="19.5" r="7"/><circle class="f" cx="16" cy="12.5" r="3.8"/>' +
  '<path class="f" d="M15.1 13.6 16 15.4 16.9 13.6Z"/><path d="M16.4 15.3c1.2 1.4.3 2.9-.7 2.5"/>' +
  '<path d="M13 26.4v2.4M19 26.4v2.4M11.8 28.8h2.4M17.8 28.8h2.4"/>' +
  '<circle class="d" cx="14.6" cy="12" r=".75"/><circle class="d" cx="17.4" cy="12" r=".75"/>';

const PUMPKIN =
  '<path d="M16 10.5c-.8-3 .6-5 3.2-6"/><ellipse class="f" cx="16" cy="19" rx="12" ry="9"/>' +
  '<ellipse cx="16" cy="19" rx="6.5" ry="9"/><path d="M16 10v18"/>';

const LEAF =
  '<path class="f" d="M16 3c6 4 10 9 8 15-1.5 4.5-5 7-8 9-3-2-6.5-4.5-8-9-2-6 2-11 8-15Z"/>' +
  '<path d="M16 6.5V30M16 13l-4-3M16 13l4-3M16 19.5l-5-3M16 19.5l5-3"/>';

const TREE =
  '<path class="f" d="M14 24h4v5h-4z"/><path class="f" d="M16 4.5 24.5 14H20l6.5 10h-21L12 14H7.5Z"/>' +
  '<path class="d" d="M16 .8l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3Z"/>' +
  '<circle class="d" cx="13" cy="18.5" r="1.1"/><circle class="d" cx="19.5" cy="20.5" r="1.1"/><circle class="d" cx="17" cy="12" r="1.1"/>';

const ORNAMENT =
  '<path d="M16 6.5c0-2.5 2-3.5 3.5-2.5"/><rect class="f" x="13" y="6.5" width="6" height="3.5" rx=".8"/>' +
  '<circle class="f" cx="16" cy="19.5" r="9.5"/><path d="M7.2 16.5c5.8 2.5 11.8 2.5 17.6 0M7.2 22.5c5.8 2.5 11.8 2.5 17.6 0"/>';

const SNOWFLAKE = (() => {
  let d = '';
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3;
    const ux = Math.sin(a);
    const uy = -Math.cos(a);
    d += `M16 16L${r1(16 + 13 * ux)} ${r1(16 + 13 * uy)}`;
    // a small V on each arm, pointing outwards
    const px = 16 + 8 * ux;
    const py = 16 + 8 * uy;
    const ex = 2.6 * ux;
    const ey = 2.6 * uy;
    d += `M${r1(px + ex - 2.6 * uy)} ${r1(py + ey + 2.6 * ux)}L${r1(px)} ${r1(py)}L${r1(px + ex + 2.6 * uy)} ${r1(py + ey - 2.6 * ux)}`;
  }
  return `<path d="${d}"/>`;
})();

const GIFT =
  '<rect class="f" x="6" y="13" width="20" height="15" rx="1"/><rect class="f" x="4.5" y="9.5" width="23" height="4.5" rx="1"/>' +
  '<path d="M16 9.5V28"/><path class="f" d="M16 9.5c-3-5-8-4-6.5-1 1 1.8 4.5 1.5 6.5 1ZM16 9.5c3-5 8-4 6.5-1-1 1.8-4.5 1.5-6.5 1Z"/>';

const CANDY_CANE =
  '<path class="cc-o" d="M12 29V11a5 5 0 0 1 10 0v2"/><path class="cc-i" d="M12 29V11a5 5 0 0 1 10 0v2"/>' +
  '<path d="M10.8 26.5l2.4-1.6M10.8 21.5l2.4-1.6M10.8 16.5l2.4-1.6M12.6 8.4l2-1.9M18.6 6.7l1.6 2.2"/>';

export const ICONS = { TURKEY, PUMPKIN, LEAF, TREE, ORNAMENT, SNOWFLAKE, GIFT, CANDY_CANE };

export const THEMES = {
  thanksgiving: { icon: TURKEY, strip: [LEAF, PUMPKIN, TURKEY, PUMPKIN, LEAF] },
  christmas: { icon: TREE, strip: [SNOWFLAKE, ORNAMENT, GIFT, CANDY_CANE, SNOWFLAKE] },
};

export const svgIcon = (body, cls = '') => `<svg viewBox="0 0 32 32" class="ti${cls ? ` ${cls}` : ''}" aria-hidden="true">${body}</svg>`;
