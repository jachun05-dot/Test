// Small building blocks for problems written in a row.
// n: number, o: operator, x: word, p: power, s: superscript after a bracket,
// f: fraction (n and d can be numbers or blanks), b: answer blank.

export const N = (v) => ({ t: 'n', v: String(v) });
export const O = (v) => ({ t: 'o', v });
export const X = (v) => ({ t: 'x', v });
export const P = (b, e) => ({ t: 'p', b: String(b), e: String(e) });
export const S = (v) => ({ t: 's', v: String(v) });
export const F = (n, d, w) => (w ? { t: 'f', n, d, w: String(w) } : { t: 'f', n, d });
export const B = (a, s) => (s ? { t: 'b', a: [].concat(a), s } : { t: 'b', a: [].concat(a) });
