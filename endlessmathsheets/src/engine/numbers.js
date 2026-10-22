export const MINUS = '−';
export const TIMES = '×';
export const DIVIDE = '÷';

export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export const lcm = (a, b) => (a / gcd(a, b)) * b;

export const digitAt = (n, i) => Math.floor(Math.abs(n) / 10 ** i) % 10;
export const numDigits = (n) => String(Math.abs(n)).length;

// Number of columns that carry when the numbers are added in columns.
export function carryCount(nums) {
  const cols = Math.max(...nums.map(numDigits));
  let carry = 0;
  let count = 0;
  for (let i = 0; i < cols; i++) {
    let s = carry;
    for (const n of nums) s += digitAt(n, i);
    carry = Math.floor(s / 10);
    if (carry) count++;
  }
  return count;
}

// Number of columns that need a borrow when computing a - b (a >= b).
export function borrowCount(a, b) {
  const cols = numDigits(a);
  let borrow = 0;
  let count = 0;
  for (let i = 0; i < cols; i++) {
    const top = digitAt(a, i) - borrow;
    if (top < digitAt(b, i)) {
      borrow = 1;
      count++;
    } else borrow = 0;
  }
  return count;
}

export const groupThousands = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function fmtInt(n, commas = false) {
  const s = String(Math.abs(n));
  return (n < 0 ? MINUS : '') + (commas ? groupThousands(s) : s);
}

// v is an integer scaled by 10^dp (so 1234 with dp 2 is 12.34).
export function fmtDec(v, dp, trim = false) {
  let s = String(Math.abs(v));
  if (dp > 0) {
    s = s.padStart(dp + 1, '0');
    s = s.slice(0, -dp) + '.' + s.slice(-dp);
    if (trim) s = s.replace(/0+$/, '').replace(/\.$/, '');
  }
  return (v < 0 ? MINUS : '') + s;
}
