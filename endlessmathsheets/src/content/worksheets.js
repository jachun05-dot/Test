// Every worksheet page on the site. One entry = one URL.
import { MINUS, TIMES, DIVIDE } from '../engine/numbers.js';
import { range } from '../engine/generators.js';

export const CONTROLS = {
  tables: { id: 'tables', label: 'Times tables', type: 'chips', options: range(0, 12).map((n) => [n, String(n)]) },
  divisors: { id: 'divisors', label: 'Divide by', type: 'chips', options: range(1, 12).map((n) => [n, String(n)]) },
  upTo: { id: 'upTo', label: 'Facts up to', type: 'select', options: [[10, `${TIMES} 10`], [12, `${TIMES} 12`]] },
  divUpTo: { id: 'upTo', label: 'Answers up to', type: 'select', options: [[10, '10'], [12, '12']] },
  order: { id: 'order', label: 'Order', type: 'select', options: [['shuffled', 'Mixed up'], ['ordered', 'In order first']] },
  mode: { id: 'mode', label: 'Task', type: 'select', options: [['read', 'Read the clock'], ['draw', 'Draw the hands']] },
  step: { id: 'step', label: 'Time to the', type: 'select', options: [[60, 'Hour'], [30, 'Half hour'], [15, 'Quarter hour'], [5, '5 minutes'], [1, 'Minute']] },
  level: { id: 'level', label: 'Level', type: 'select', options: [[4, 'Grade 4 (easier)'], [5, 'Grade 5'], [6, 'Grade 6 (harder)']] },
  pairs: { id: 'pairs', label: 'Pairs', type: 'select', options: [['tens', 'Multiples of 10'], ['fives', 'Multiples of 5'], ['any', 'Any numbers']] },
  place: { id: 'place', label: 'Round to the', type: 'select', options: [['mixed', 'Mixed places'], ['whole', 'Whole number'], ['tenth', 'Tenth'], ['hundredth', 'Hundredth']] },
};

export const FORMAT_LABELS = { vertical: 'Stacked', horizontal: 'In a row', longdiv: 'Long division', clock: 'Clock' };

const W = [];
const ws = (o) => W.push({ formats: undefined, layout: undefined, controls: [], ...o });

const FACT_COUNTS = [10, 20, 30, 40];
const V_COUNTS = [10, 15, 20, 25, 30];
const DRILL = { count: 100, counts: [50, 100], layout: { horizontal: { cols: 4, rows: 25 } } };
const CLOCK = { format: 'clock', count: 12, counts: [6, 9, 12] };
const TIME_INSTR = { by: 'mode', values: { read: 'Write the time shown on each clock.', draw: 'Draw the hands to show each time.', default: 'Write the time shown on each clock.' } };

// ---------------- Addition ----------------

ws({
  slug: 'addition/within-5', cat: 'addition', group: 'Facts', card: 'Within 5',
  title: 'Addition Within 5 Worksheets', sheet: 'Addition Within 5', instr: 'Add.',
  grades: ['K'], std: ['K.OA.A.5'],
  gen: 'add', params: { a: [0, 5], b: [0, 5], sum: [0, 5] }, format: 'horizontal', count: 20, counts: [10, 20, 30],
  intro: 'The first addition facts children meet: two small numbers with a sum of 5 or less. These sheets work well once kids can count objects to 5 and are ready to write the matching number sentence.',
  onSheet: 'Every problem adds two numbers from 0 to 5, and no sum is greater than 5.',
  tips: [
    'Let children use fingers or five counters at first. Speed comes after they can show each sum with objects.',
    'Point out facts with 0 early. Adding 0 keeps a number the same, which takes several problems off the "to learn" list.',
    'Switch to the stacked format once kids are comfortable, so the layout is familiar before multi-digit addition.',
  ],
});
ws({
  slug: 'addition/within-10', cat: 'addition', group: 'Facts', card: 'Within 10',
  title: 'Addition Within 10 Worksheets', sheet: 'Addition Within 10', instr: 'Add.',
  grades: ['K', 1], std: ['K.OA.A.2', '1.OA.C.6'],
  gen: 'add', params: { a: [0, 10], b: [0, 10], sum: [0, 10] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Sums up to 10 are the backbone of every later addition skill. Kids who know these facts quickly can focus on place value when bigger numbers arrive.',
  onSheet: 'Two numbers from 0 to 10 with sums no greater than 10, in a new random order on every sheet.',
  tips: [
    'Practice the "make 10" pairs (1 + 9, 2 + 8, 3 + 7, 4 + 6, 5 + 5) on their own before mixing them in.',
    'Teach turn-around facts: a child who knows 2 + 7 also knows 7 + 2.',
    'A ten-frame drawn on scrap paper is a quick support for children who still count every object.',
  ],
});
ws({
  slug: 'addition/within-20', cat: 'addition', group: 'Facts', card: 'Within 20',
  title: 'Addition Within 20 Worksheets', sheet: 'Addition Within 20', instr: 'Add.',
  grades: [1, 2], std: ['1.OA.C.6', '2.OA.B.2'],
  gen: 'add', params: { a: [0, 20], b: [0, 20], sum: [0, 20] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Adding within 20 is where children move from counting on to real strategies such as making ten and using doubles. By the end of second grade, students are expected to know all sums of two one-digit numbers from memory.',
  onSheet: 'Two numbers from 0 to 20 with sums up to 20. Many problems cross ten, like 8 + 7 or 9 + 6.',
  tips: [
    'For 8 + 7, model "make ten": 8 + 2 = 10, then 5 more makes 15.',
    'Doubles and near doubles (6 + 6, then 6 + 7) are easier anchors than counting on.',
    'Time a sheet only once accuracy is high. Speed drills on facts a child does not know yet build anxiety, not fluency.',
  ],
});
ws({
  slug: 'addition/single-digit', cat: 'addition', group: 'Facts', card: 'Single-digit facts',
  title: 'Single-Digit Addition Worksheets', sheet: 'Single-Digit Addition', instr: 'Add.',
  grades: [1, 2], std: ['2.OA.B.2'],
  gen: 'add', params: { a: [0, 9], b: [0, 9] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'These sheets cover all 100 basic addition facts, from 0 + 0 to 9 + 9. They are the facts students need to recall instantly before they meet regrouping in two-digit addition.',
  onSheet: 'Both numbers are single digits (0 to 9), so sums range from 0 to 18.',
  tips: [
    'Sort the facts into strategy groups: +0, +1, +2, doubles, near doubles and make ten. Only a handful of "hard" facts are left.',
    'Use the stacked format to preview how columns work in two-digit addition.',
    'Keep a list of the facts a child misses and print the next sheet when those are the focus of the week.',
  ],
});
ws({
  slug: 'addition/adding-three-numbers', cat: 'addition', group: 'Facts', card: 'Three numbers',
  title: 'Adding Three Numbers Worksheets', sheet: 'Adding Three Numbers', instr: 'Add.',
  grades: [1, 2], std: ['1.OA.B.3'],
  gen: 'add', params: { addends: 3, a: [1, 9], b: [1, 9], c: [1, 9], sum: [3, 20] }, format: 'vertical', count: 20, counts: [12, 16, 20, 24],
  intro: 'Adding three numbers lets children use what they know about addition order. They can look for a pair that makes 10 or a double, add those first, and then add the third number.',
  onSheet: 'Each problem adds three numbers from 1 to 9 with a sum of 20 or less.',
  tips: [
    'Ask "Which two numbers would you add first?" before solving. There is no single right order.',
    'Circle pairs that make 10, such as 3 and 7, to show the shortcut.',
    'The stacked layout prepares students for adding longer columns of numbers later.',
  ],
});
ws({
  slug: 'addition/2-digit-plus-1-digit', cat: 'addition', group: 'Multi-digit', card: '2-digit + 1-digit',
  title: '2-Digit Plus 1-Digit Addition Worksheets', sheet: '2-Digit + 1-Digit Addition', instr: 'Add. Regroup when you need to.',
  grades: [1, 2], std: ['1.NBT.C.4'],
  gen: 'add', params: { a: [10, 99], b: [1, 9] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Adding a one-digit number to a two-digit number connects addition facts to place value. When the ones add up to 10 or more, students make a new ten.',
  onSheet: 'A two-digit number plus a one-digit number. Some problems need regrouping and some do not, so students have to check the ones column every time.',
  tips: [
    'Have students say the fact hiding in the ones column: 47 + 8 uses 7 + 8.',
    'Use a hundreds chart to show the jump to the next ten.',
    'Ask for an estimate first. 47 + 8 has to be more than 50, which catches many errors.',
  ],
});
ws({
  slug: 'addition/2-digit-no-regrouping', cat: 'addition', group: 'Multi-digit', card: '2-digit, no regrouping',
  title: '2-Digit Addition Without Regrouping Worksheets', sheet: '2-Digit Addition', instr: 'Add the ones, then add the tens.',
  grades: [1, 2], std: ['1.NBT.C.4', '2.NBT.B.5'],
  gen: 'add', params: { a: [10, 99], b: [10, 99], regroup: 'none' }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Adding two-digit numbers without regrouping teaches the column habit: add the ones, then add the tens. Because no column goes past 9, students can focus on lining up digits by place value.',
  onSheet: 'Both numbers have two digits. Neither the ones nor the tens add up to 10 or more, so no carrying is needed.',
  tips: [
    'Always start in the ones column, even though the order does not matter yet. It will matter on the next sheet.',
    'Base-ten blocks (rods and units) make each column visible.',
    'Move on to regrouping once students line up digits correctly without reminders.',
  ],
});
ws({
  slug: 'addition/2-digit-with-regrouping', cat: 'addition', group: 'Multi-digit', card: '2-digit, with regrouping',
  title: '2-Digit Addition With Regrouping Worksheets', sheet: '2-Digit Addition With Regrouping', instr: 'Add. Regroup when you need to.',
  grades: [2], std: ['2.NBT.B.5'],
  gen: 'add', params: { a: [10, 99], b: [10, 99], regroup: 'required' }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'This is where carrying begins. When the ones add up to 10 or more, students trade 10 ones for 1 ten and write it at the top of the tens column.',
  onSheet: 'Two two-digit numbers, and every problem needs at least one regroup.',
  tips: [
    'Say "10 ones make 1 ten" rather than "carry the 1". The words explain why the 1 moves.',
    'The stacked format gives the regrouped ten a clear place to go, at the top of the tens column.',
    'Mix in a no-regrouping sheet now and then so students check each column instead of carrying out of habit.',
  ],
});
ws({
  slug: 'addition/3-digit-no-regrouping', cat: 'addition', group: 'Multi-digit', card: '3-digit, no regrouping',
  title: '3-Digit Addition Without Regrouping Worksheets', sheet: '3-Digit Addition', instr: 'Add.',
  grades: [2], std: ['2.NBT.B.7'],
  gen: 'add', params: { a: [100, 999], b: [100, 999], regroup: 'none' }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit addition without regrouping extends the column method to the hundreds place. It is a short, confidence-building step before regrouping across two columns.',
  onSheet: 'Two three-digit numbers where no column adds up to 10 or more.',
  tips: [
    'Label the columns H, T and O at the top of the first few sheets.',
    'Ask students to read each answer aloud as a number ("five hundred sixty-eight") to keep place value in view.',
  ],
});
ws({
  slug: 'addition/3-digit-with-regrouping', cat: 'addition', group: 'Multi-digit', card: '3-digit, with regrouping',
  title: '3-Digit Addition With Regrouping Worksheets', sheet: '3-Digit Addition With Regrouping', instr: 'Add. Regroup when you need to.',
  grades: [2, 3], std: ['2.NBT.B.7', '3.NBT.A.2'],
  gen: 'add', params: { a: [100, 999], b: [100, 999], regroup: 'required' }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit addition with regrouping asks students to carry from ones to tens, from tens to hundreds, or both. It is a core third-grade fluency skill.',
  onSheet: 'Two three-digit numbers with at least one regroup. Many problems regroup twice, and some sums reach the thousands.',
  tips: [
    'Watch for a two-digit column sum, like 13, written in a single column. It is the most common regrouping error.',
    'Have students estimate by rounding to the nearest hundred, then compare with the exact answer.',
  ],
});
ws({
  slug: 'addition/4-digit', cat: 'addition', group: 'Multi-digit', card: '4-digit',
  title: '4-Digit Addition Worksheets', sheet: '4-Digit Addition', instr: 'Add.',
  grades: [4], std: ['4.NBT.B.4'],
  gen: 'add', params: { a: [1000, 9999], b: [1000, 9999] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Four-digit addition uses the standard algorithm, the same steps students learned with smaller numbers, carried through the thousands place.',
  onSheet: 'Two four-digit numbers. Regrouping can happen in any column, so some sums have five digits.',
  tips: [
    'Neat columns matter more as numbers grow. If alignment slips, try grid paper with one digit per square.',
    'Check answers with subtraction: the sum minus one number should give the other.',
  ],
});
ws({
  slug: 'addition/5-digit', cat: 'addition', group: 'Multi-digit', card: '5-digit',
  title: '5-Digit Addition Worksheets', sheet: '5-Digit Addition', instr: 'Add.',
  grades: [4, 5], std: ['4.NBT.B.4'],
  gen: 'add', params: { a: [10000, 99999], b: [10000, 99999] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Large-number addition gives students practice with the standard algorithm across five columns, where steady regrouping matters more than any single fact.',
  onSheet: 'Two five-digit numbers with regrouping in any column.',
  tips: [
    'Ask students to rewrite each answer with a comma to practice reading large numbers.',
    'Pair these with rounding to the nearest thousand to check whether each answer is reasonable.',
  ],
});
ws({
  slug: 'addition/missing-addend', cat: 'addition', group: 'Practice formats', card: 'Missing addend',
  title: 'Missing Addend Worksheets', sheet: 'Find the Missing Number', instr: 'Write the missing number.',
  grades: [1, 2], std: ['1.OA.D.8'],
  gen: 'missing', params: { ops: ['+'], max: 20 }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Missing addend problems such as 7 + ___ = 12 build the link between addition and subtraction. Students learn that an equation is a balance, not just an instruction to compute.',
  onSheet: 'Addition sentences within 20 with one number missing. The blank moves between the first and second position.',
  tips: [
    'Encourage counting up from the number you know: from 7, count up to 12.',
    'Ask students to write the related subtraction fact: 12 − 7 = 5.',
  ],
});
ws({
  slug: 'addition/100-facts-timed-test', cat: 'addition', group: 'Practice formats', card: '100-problem timed test',
  title: 'Addition Facts Timed Test Worksheets (100 Problems)', sheet: 'Addition Facts Timed Test', instr: 'Add. Work as quickly and carefully as you can.',
  grades: [1, 2, 3], std: ['2.OA.B.2'],
  gen: 'add', params: { a: [0, 10], b: [0, 10] }, format: 'horizontal', formats: ['horizontal'], ...DRILL,
  intro: 'A one-page drill of 100 addition facts for fluency checks. Give it the same way each time, for example with a five-minute limit, and track scores over several weeks.',
  onSheet: 'One hundred facts with numbers from 0 to 10, in random order.',
  tips: [
    "Compare a child's score only with their own earlier scores.",
    'Record which facts were missed, not just the total.',
    'Set the count to 50 for younger students or for a shorter warm-up.',
  ],
});

// ---------------- Subtraction ----------------

ws({
  slug: 'subtraction/within-5', cat: 'subtraction', group: 'Facts', card: 'Within 5',
  title: 'Subtraction Within 5 Worksheets', sheet: 'Subtraction Within 5', instr: 'Subtract.',
  grades: ['K'], std: ['K.OA.A.5'],
  gen: 'sub', params: { a: [0, 5], b: [0, 5] }, format: 'horizontal', count: 20, counts: [10, 20, 30],
  intro: 'Subtraction within 5 introduces taking away with numbers small enough to act out on fingers or with a handful of counters.',
  onSheet: 'Starting numbers from 0 to 5. The answer is never negative.',
  tips: [
    'Act out each problem first: start with 5 blocks and take away 2.',
    'Connect each fact to an addition fact children already know: 5 − 2 = 3 because 3 + 2 = 5.',
  ],
});
ws({
  slug: 'subtraction/within-10', cat: 'subtraction', group: 'Facts', card: 'Within 10',
  title: 'Subtraction Within 10 Worksheets', sheet: 'Subtraction Within 10', instr: 'Subtract.',
  grades: ['K', 1], std: ['K.OA.A.2', '1.OA.C.6'],
  gen: 'sub', params: { a: [0, 10], b: [0, 10] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Subtraction facts within 10 are the partners of the addition facts children learn at the same time. Knowing both makes word problems and later multi-digit work much easier.',
  onSheet: 'Starting numbers up to 10 with no negative answers.',
  tips: [
    'Teach "think addition": to find 9 − 6, ask "6 plus what makes 9?"',
    'Count back only when taking away 1, 2 or 3. For bigger numbers, counting up is faster and more accurate.',
  ],
});
ws({
  slug: 'subtraction/within-20', cat: 'subtraction', group: 'Facts', card: 'Within 20',
  title: 'Subtraction Within 20 Worksheets', sheet: 'Subtraction Within 20', instr: 'Subtract.',
  grades: [1, 2], std: ['1.OA.C.6', '2.OA.B.2'],
  gen: 'sub', params: { a: [0, 20], b: [0, 20] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Subtracting within 20 is where strategies like "subtract to ten" pay off. For 15 − 7, take 5 to reach 10, then 2 more to reach 8.',
  onSheet: 'Starting numbers up to 20. Many problems cross ten, such as 13 − 6.',
  tips: [
    'Model "subtract to ten" with a ten-frame drawing.',
    'Fact families (8 + 5, 5 + 8, 13 − 5, 13 − 8) let students see four facts at once.',
  ],
});
ws({
  slug: 'subtraction/2-digit-minus-1-digit', cat: 'subtraction', group: 'Multi-digit', card: '2-digit − 1-digit',
  title: '2-Digit Minus 1-Digit Subtraction Worksheets', sheet: '2-Digit − 1-Digit Subtraction', instr: 'Subtract. Regroup when you need to.',
  grades: [2], std: ['2.NBT.B.5'],
  gen: 'sub', params: { a: [10, 99], b: [1, 9], diff: [1, 99] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Taking a one-digit number from a two-digit number is the bridge between subtraction facts and regrouping. When the ones digit on top is too small, students break a ten into ten ones.',
  onSheet: 'A two-digit number minus a one-digit number. Some problems need regrouping, like 42 − 7, and some do not.',
  tips: [
    'Before solving, have students say whether a problem needs regrouping.',
    'Show 42 − 7 on a number line: jump back 2 to 40, then 5 more to 35.',
  ],
});
ws({
  slug: 'subtraction/2-digit-no-regrouping', cat: 'subtraction', group: 'Multi-digit', card: '2-digit, no regrouping',
  title: '2-Digit Subtraction Without Regrouping Worksheets', sheet: '2-Digit Subtraction', instr: 'Subtract the ones, then subtract the tens.',
  grades: [1, 2], std: ['2.NBT.B.5'],
  gen: 'sub', params: { a: [10, 99], b: [10, 99], regroup: 'none', diff: [1, 99] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Two-digit subtraction without regrouping practices the column method: subtract the ones, then the tens. Each top digit is at least as big as the digit below it, so no borrowing is needed.',
  onSheet: 'Two-digit numbers where the top digit in each column is greater than or equal to the bottom digit.',
  tips: [
    'Remind students to subtract the bottom digit from the top digit in each column, not the smaller from the larger.',
    'Check by adding: the answer plus the bottom number should equal the top number.',
  ],
});
ws({
  slug: 'subtraction/2-digit-with-regrouping', cat: 'subtraction', group: 'Multi-digit', card: '2-digit, with regrouping',
  title: '2-Digit Subtraction With Regrouping Worksheets', sheet: '2-Digit Subtraction With Regrouping', instr: 'Subtract. Regroup when you need to.',
  grades: [2], std: ['2.NBT.B.5'],
  gen: 'sub', params: { a: [10, 99], b: [10, 99], regroup: 'required', diff: [1, 99] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Two-digit subtraction with regrouping (also called borrowing) teaches students to trade 1 ten for 10 ones when there are not enough ones on top to subtract from.',
  onSheet: 'Two two-digit numbers, and every problem needs regrouping from the tens to the ones.',
  tips: [
    'The classic mistake is subtracting the smaller digit from the larger one in the ones column (52 − 38 = 26). Ask "Is there enough to take away?" for each column.',
    'Cross out the tens digit and write the new value above it. A clear record makes errors easy to find.',
  ],
});
ws({
  slug: 'subtraction/3-digit-no-regrouping', cat: 'subtraction', group: 'Multi-digit', card: '3-digit, no regrouping',
  title: '3-Digit Subtraction Without Regrouping Worksheets', sheet: '3-Digit Subtraction', instr: 'Subtract.',
  grades: [2], std: ['2.NBT.B.7'],
  gen: 'sub', params: { a: [100, 999], b: [100, 999], regroup: 'none', diff: [1, 999] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit subtraction without regrouping gives students practice with the hundreds column before borrowing gets more complicated.',
  onSheet: 'Three-digit numbers with no regrouping in any column.',
  tips: [
    'Label the H, T and O columns on early sheets.',
    'Ask students to read each answer as a whole number, not as separate digits.',
  ],
});
ws({
  slug: 'subtraction/3-digit-with-regrouping', cat: 'subtraction', group: 'Multi-digit', card: '3-digit, with regrouping',
  title: '3-Digit Subtraction With Regrouping Worksheets', sheet: '3-Digit Subtraction With Regrouping', instr: 'Subtract. Regroup when you need to.',
  grades: [2, 3], std: ['2.NBT.B.7', '3.NBT.A.2'],
  gen: 'sub', params: { a: [100, 999], b: [100, 999], regroup: 'required', diff: [1, 999] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit subtraction with regrouping can require borrowing once or twice. It is a core skill in third grade and the setup for subtracting across zeros.',
  onSheet: 'Three-digit numbers where at least one column needs regrouping.',
  tips: [
    'Work one column at a time and finish its regrouping before moving left.',
    'Estimate by rounding to the nearest hundred to catch answers that are far off.',
  ],
});
ws({
  slug: 'subtraction/across-zeros', cat: 'subtraction', group: 'Multi-digit', card: 'Across zeros',
  title: 'Subtracting Across Zeros Worksheets', sheet: 'Subtracting Across Zeros', instr: 'Subtract. Regroup across the zeros.',
  grades: [3, 4], std: ['3.NBT.A.2', '4.NBT.B.4'],
  gen: 'sub', params: { acrossZeros: true, digits: [3, 4] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Subtracting across zeros, as in 400 − 127 or 3,005 − 1,268, is the trickiest kind of regrouping. Students have to borrow from a place that is itself zero.',
  onSheet: 'Three- and four-digit starting numbers with a zero in the tens place (and sometimes the hundreds), where the ones column needs regrouping.',
  tips: [
    'Show 400 as 40 tens: take 1 ten to leave 39 tens and 10 ones. Many students find this easier than borrowing twice.',
    'Another approach is to subtract 1 from both numbers first: 400 − 127 is the same as 399 − 126, which needs no regrouping.',
  ],
});
ws({
  slug: 'subtraction/4-digit', cat: 'subtraction', group: 'Multi-digit', card: '4-digit',
  title: '4-Digit Subtraction Worksheets', sheet: '4-Digit Subtraction', instr: 'Subtract.',
  grades: [4], std: ['4.NBT.B.4'],
  gen: 'sub', params: { a: [1000, 9999], b: [1000, 9999], diff: [1, 9999] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Four-digit subtraction uses the standard algorithm through the thousands place. Regrouping can happen in any column, sometimes several times in a row.',
  onSheet: 'Two four-digit numbers with any amount of regrouping.',
  tips: [
    'Check each answer with addition.',
    'If a student gets stuck, rewrite the problem on grid paper with one digit per square.',
  ],
});
ws({
  slug: 'subtraction/100-facts-timed-test', cat: 'subtraction', group: 'Practice formats', card: '100-problem timed test',
  title: 'Subtraction Facts Timed Test Worksheets (100 Problems)', sheet: 'Subtraction Facts Timed Test', instr: 'Subtract. Work as quickly and carefully as you can.',
  grades: [1, 2, 3], std: ['2.OA.B.2'],
  gen: 'sub', params: { a: [0, 20], b: [0, 10], diff: [0, 10] }, format: 'horizontal', formats: ['horizontal'], ...DRILL,
  intro: 'One hundred subtraction facts on a single page for fluency checks. Use the same time limit each time so scores can be compared.',
  onSheet: 'Facts with starting numbers up to 20, taking away 0 to 10, with answers from 0 to 10.',
  tips: [
    'Give the addition timed test first. Subtraction facts usually lag behind addition facts by a few weeks.',
    'Circle missed facts and practice them as fact families.',
  ],
});

// ---------------- Mixed operations ----------------

const ADD10 = { gen: 'add', params: { a: [0, 10], b: [0, 10], sum: [0, 10] } };
const SUB10 = { gen: 'sub', params: { a: [0, 10], b: [0, 10] } };
const ADD20 = { gen: 'add', params: { a: [0, 20], b: [0, 20], sum: [0, 20] } };
const SUB20 = { gen: 'sub', params: { a: [0, 20], b: [0, 20] } };
const MULF = { gen: 'mul', params: { tables: range(0, 10), from: 0, upTo: 10 } };
const DIVF = { gen: 'div', params: { divisors: range(1, 10), qFrom: 0, upTo: 10 } };

ws({
  slug: 'mixed-operations/addition-and-subtraction-within-10', cat: 'mixed-operations', group: 'Mixed practice', card: 'Add and subtract within 10',
  title: 'Addition and Subtraction Within 10 Worksheets', sheet: 'Add and Subtract Within 10', instr: 'Look at each sign, then solve.',
  grades: [1], std: ['1.OA.C.6'],
  gen: 'mixed', params: { ops: [ADD10, SUB10] }, format: 'horizontal', formats: ['horizontal', 'vertical'], count: 30, counts: FACT_COUNTS,
  intro: 'Mixing addition and subtraction makes students read each sign before they compute. At this stage, that habit matters more than speed.',
  onSheet: 'Half addition and half subtraction, all within 10, in random order.',
  tips: [
    'Have students circle or highlight the sign before solving.',
    'Use these after students are comfortable with each operation on its own.',
  ],
});
ws({
  slug: 'mixed-operations/addition-and-subtraction-within-20', cat: 'mixed-operations', group: 'Mixed practice', card: 'Add and subtract within 20',
  title: 'Addition and Subtraction Within 20 Worksheets', sheet: 'Add and Subtract Within 20', instr: 'Look at each sign, then solve.',
  grades: [1, 2], std: ['2.OA.B.2'],
  gen: 'mixed', params: { ops: [ADD20, SUB20] }, format: 'horizontal', formats: ['horizontal', 'vertical'], count: 30, counts: FACT_COUNTS,
  intro: 'Addition and subtraction facts within 20 on the same page. It is good practice for the fact fluency second graders are expected to reach.',
  onSheet: 'Half addition and half subtraction with numbers up to 20.',
  tips: [
    'Point out pairs that belong to the same fact family when they appear on the sheet.',
    'For a quick check, ask students to explain one addition and one subtraction strategy they used.',
  ],
});
ws({
  slug: 'mixed-operations/2-digit-addition-and-subtraction', cat: 'mixed-operations', group: 'Mixed practice', card: '2-digit add and subtract',
  title: '2-Digit Addition and Subtraction Worksheets', sheet: '2-Digit Addition and Subtraction', instr: 'Look at each sign. Regroup when you need to.',
  grades: [2], std: ['2.NBT.B.5'],
  gen: 'mixed', params: { ops: [{ gen: 'add', params: { a: [10, 99], b: [10, 99] } }, { gen: 'sub', params: { a: [10, 99], b: [10, 99], diff: [1, 99] } }] },
  format: 'vertical', formats: ['vertical', 'horizontal'], count: 25, counts: V_COUNTS,
  intro: 'Two-digit addition and subtraction on the same page, with and without regrouping. Students decide whether to carry or borrow based on the sign and the digits.',
  onSheet: 'Two-digit numbers, half addition and half subtraction. Regrouping appears in both.',
  tips: [
    'Ask "Do I need to regroup?" before each problem, then check the answer by using the opposite operation.',
    'If a student mixes up carrying and borrowing, go back to a single-operation sheet for a day.',
  ],
});
ws({
  slug: 'mixed-operations/multiplication-and-division-facts', cat: 'mixed-operations', group: 'Mixed practice', card: 'Multiply and divide facts',
  title: 'Multiplication and Division Facts Worksheets', sheet: 'Multiplication and Division Facts', instr: 'Look at each sign, then solve.',
  grades: [3], std: ['3.OA.C.7'],
  gen: 'mixed', params: { ops: [MULF, DIVF] }, format: 'horizontal', formats: ['horizontal'], count: 30, counts: FACT_COUNTS,
  intro: 'Multiplication and division facts together, the way students meet them in fact families. Seeing 6 × 7 next to 42 ÷ 7 reinforces that division is multiplication in reverse.',
  onSheet: 'Multiplication facts up to 10 × 10 mixed with the matching division facts.',
  tips: [
    'For each division problem, ask students to say the multiplication fact that solves it.',
    'Triangle fact cards (42 at the top, 6 and 7 at the bottom) are a good companion to this sheet.',
  ],
});
ws({
  slug: 'mixed-operations/all-four-operations', cat: 'mixed-operations', group: 'Mixed practice', card: 'All four operations',
  title: 'Mixed Operations Worksheets (All Four Operations)', sheet: 'Mixed Facts: +, −, ×, ÷', instr: 'Look at each sign, then solve.',
  grades: [3, 4], std: ['2.OA.B.2', '3.OA.C.7'],
  gen: 'mixed', params: { ops: [ADD20, SUB20, MULF, DIVF] }, format: 'horizontal', formats: ['horizontal'], count: 32, counts: [20, 32, 40],
  intro: 'Addition, subtraction, multiplication and division facts on one page. A good weekly review once students have learned all four sets of facts.',
  onSheet: 'Addition and subtraction within 20, plus multiplication and division facts up to 10 × 10, in equal shares.',
  tips: [
    'Use it as a short warm-up and keep a record of which operation causes the most errors.',
    'Students who rush tend to misread × as +. Ask them to trace each sign with their pencil.',
  ],
});

// ---------------- Multiplication ----------------

const TABLE_NOTES = {
  2: ['The 2 times table is doubling. Children who know their addition doubles (6 + 6 = 12) already know most of these facts.', ['Skip count by 2s out loud: 2, 4, 6, 8, 10 and so on.', 'Every product is even, so an answer ending in 1, 3, 5, 7 or 9 is a mistake.']],
  3: ['The 3 times table is often the first table without a quick doubling trick, so steady skip counting and practice matter here.', ['Skip count by 3s with a rhythm or a song.', 'Use the digit-sum check: the digits of every multiple of 3 add up to a multiple of 3 (for 27, 2 + 7 = 9).', 'Think of 3 × 7 as 2 × 7 plus one more 7.']],
  4: ['Multiplying by 4 is doubling twice. If a student knows 2 × 8 = 16, then 4 × 8 is 16 doubled, which is 32.', ['Write "double, then double again" at the top of the sheet as a reminder.', 'Every product of 4 is even.']],
  5: ['The 5s are among the easiest facts to learn. Every product ends in 0 or 5, and the products match the minutes on a clock.', ['Skip count by 5s using the numbers on a clock face.', 'For an even number, halve it and multiply by 10: 5 × 8 is half of 80, which is 40.']],
  6: ['The 6 times table builds on the 5s: 6 × 7 is 5 × 7 plus one more 7. Students who know the 5s and 3s have a head start.', ['Use the 5s fact and add one group: 6 × 8 = 40 + 8 = 48.', 'Double the 3s fact: 3 × 7 = 21, so 6 × 7 = 42.', 'When 6 is multiplied by an even number, the product ends in that number: 6 × 4 = 24, 6 × 8 = 48.']],
  7: ['The 7s have a reputation as the hardest table, but by the time students reach them they already know most of these facts from other tables. Only 7 × 7, 7 × 8 and 7 × 9 tend to be new.', ['Before starting, ask students to mark the facts they already know from the 2s, 5s and 10s.', 'Remember 56 = 7 × 8 with the sequence 5, 6, 7, 8.', '7 × 6 is 7 × 5 plus one more 7.']],
  8: ['Multiplying by 8 is doubling three times. For 8 × 6: 6 doubled is 12, doubled again is 24, and doubled once more is 48.', ['If a student knows the 4s, double the answer: 4 × 7 = 28, so 8 × 7 = 56.', 'All products of 8 are even.']],
  9: ['The 9 times table is full of patterns. Up to 9 × 10, the digits of each product add up to 9, and the tens digit is one less than the number being multiplied.', ['For 9 × 7, the tens digit is 6 (one less than 7) and the ones digit makes the digits add to 9, so the answer is 63.', 'Try the finger trick: hold up ten fingers and fold down the seventh. Six fingers are on the left and three on the right: 63.', 'Or multiply by 10 and subtract once: 9 × 7 = 70 − 7.']],
  10: ['Multiplying by 10 gives a pattern students can see right away. Each digit moves one place to the left and a zero fills the ones place.', ['Say "each digit moves one place left" instead of "just add a zero". That understanding is needed when decimals arrive.', 'Pair the 10s with the 5s: 5 × n is half of 10 × n.']],
  11: ['The 11s up to 11 × 9 repeat the digit: 11 × 4 = 44. The facts 11 × 10, 11 × 11 and 11 × 12 need a little more thought.', ['For 11 × 12, think 11 × 10 + 11 × 2 = 110 + 22 = 132.', 'Set "Facts up to" to × 10 for younger students who only need facts through 11 × 10.']],
  12: ['The 12s show up in measurement (12 inches in a foot), time (12 months, 12 hours) and counting by the dozen. Each fact splits into a 10s fact and a 2s fact.', ['12 × 7 = 10 × 7 + 2 × 7 = 70 + 14 = 84.', 'Learning the 12s this way is a first look at the distributive property, which students use later for multi-digit multiplication.']],
};

for (let n = 2; n <= 12; n++) {
  const [intro, tips] = TABLE_NOTES[n];
  ws({
    slug: `multiplication/${n}-times-table`, cat: 'multiplication', group: 'Times tables', card: `${n} times table`,
    title: `${n} Times Table Worksheets`, sheet: `Multiplying by ${n}`, instr: 'Multiply.',
    grades: [3], std: ['3.OA.C.7'],
    gen: 'mul', params: { tables: [n], from: 1, upTo: 12, order: 'shuffled' }, controls: ['upTo', 'order'],
    format: 'horizontal', count: 20, counts: [12, 20, 30, 40],
    intro,
    onSheet: `Facts from ${n} ${TIMES} 1 to ${n} ${TIMES} 12, with ${n} sometimes first and sometimes second. Choose "In order first" to start with ${n} ${TIMES} 1, ${n} ${TIMES} 2, ${n} ${TIMES} 3 and so on.`,
    tips,
  });
}

ws({
  slug: 'multiplication/facts-0-10', cat: 'multiplication', group: 'Facts', card: 'Mixed facts 0–10',
  title: 'Multiplication Facts Worksheets (0–10)', sheet: 'Multiplication Facts', instr: 'Multiply.',
  grades: [3], std: ['3.OA.C.7'],
  gen: 'mul', params: { tables: range(0, 10), from: 0, upTo: 10 }, controls: ['tables'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Mixed multiplication facts from 0 × 0 to 10 × 10, the facts third graders are expected to know from memory by the end of the year. Choose exactly which times tables to include.',
  onSheet: 'Facts from the tables you select, each multiplied by 0 to 10. All tables from 0 to 10 are on by default.',
  tips: [
    'Turn off tables a student has mastered so each sheet focuses on the facts still being learned.',
    'Facts with 0 and 1 make quick confidence builders at the start of a sheet.',
  ],
});
ws({
  slug: 'multiplication/facts-0-12', cat: 'multiplication', group: 'Facts', card: 'Mixed facts 0–12',
  title: 'Multiplication Facts Worksheets (0–12)', sheet: 'Multiplication Facts to 12', instr: 'Multiply.',
  grades: [3, 4], std: ['3.OA.C.7'],
  gen: 'mul', params: { tables: range(0, 12), from: 0, upTo: 12 }, controls: ['tables'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'All the facts up to 12 × 12. Many schools add the 11s and 12s to their fluency goals in fourth grade.',
  onSheet: 'Facts from the tables you select, each multiplied by 0 to 12.',
  tips: [
    'Start with the tables a student knows and add one new table at a time.',
    'For the 12s, split the fact: 12 × 6 = 10 × 6 + 2 × 6.',
  ],
});
ws({
  slug: 'multiplication/100-facts-timed-test', cat: 'multiplication', group: 'Facts', card: '100-problem timed test',
  title: 'Multiplication Facts Timed Test Worksheets (100 Problems)', sheet: 'Multiplication Timed Test', instr: 'Multiply. Work as quickly and carefully as you can.',
  grades: [3, 4], std: ['3.OA.C.7'],
  gen: 'mul', params: { tables: range(0, 10), from: 0, upTo: 10 }, controls: ['tables'], format: 'horizontal', formats: ['horizontal'], ...DRILL,
  intro: 'The classic 100-problem multiplication drill, sometimes called a "mad minute" sheet when given with a short time limit. Choose the tables to include so the drill matches what your class has learned.',
  onSheet: 'One hundred facts from the tables you select, each multiplied by 0 to 10.',
  tips: [
    'Give the same time limit every time and chart scores over a few weeks.',
    'Some students freeze under time pressure. Let them do the sheet untimed first, then time the second attempt.',
  ],
});
ws({
  slug: 'multiplication/multiples-of-10', cat: 'multiplication', group: 'Multi-digit', card: 'By multiples of 10',
  title: 'Multiplying by Multiples of 10 Worksheets', sheet: 'Multiplying by Multiples of 10', instr: 'Multiply.',
  grades: [3], std: ['3.NBT.A.3'],
  gen: 'mul', params: { tens: true }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Problems like 6 × 40 use a basic fact (6 × 4 = 24) and place value (24 tens is 240). This step makes multi-digit multiplication possible.',
  onSheet: 'A one-digit number from 2 to 9 times a multiple of 10 from 10 to 90.',
  tips: [
    'Read 6 × 40 as "6 times 4 tens" to keep place value in view.',
    'Ask students to explain why every answer ends in zero.',
  ],
});
ws({
  slug: 'multiplication/2-digit-by-1-digit', cat: 'multiplication', group: 'Multi-digit', card: '2-digit × 1-digit',
  title: '2-Digit by 1-Digit Multiplication Worksheets', sheet: '2-Digit × 1-Digit Multiplication', instr: 'Multiply.',
  grades: [4], std: ['4.NBT.B.5'],
  gen: 'mul', params: { a: [12, 99], b: [2, 9], noTrailingZero: true }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Two-digit by one-digit multiplication is the first step into the standard algorithm. Students multiply the ones, regroup, then multiply the tens and add the regrouped amount.',
  onSheet: 'A two-digit number times a one-digit number from 2 to 9.',
  tips: [
    'Show the partial products method next to the standard algorithm: 34 × 6 = 30 × 6 + 4 × 6 = 180 + 24.',
    'Remind students to add the regrouped digit after multiplying the tens, not before.',
  ],
});
ws({
  slug: 'multiplication/3-digit-by-1-digit', cat: 'multiplication', group: 'Multi-digit', card: '3-digit × 1-digit',
  title: '3-Digit by 1-Digit Multiplication Worksheets', sheet: '3-Digit × 1-Digit Multiplication', instr: 'Multiply.',
  grades: [4], std: ['4.NBT.B.5'],
  gen: 'mul', params: { a: [101, 999], b: [2, 9], noTrailingZero: true }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Three-digit by one-digit multiplication repeats the same steps across one more column, with regrouping possible in every column.',
  onSheet: 'A three-digit number times a one-digit number from 2 to 9.',
  tips: [
    'Estimate first: 487 × 6 is close to 500 × 6 = 3,000.',
    'Write regrouped digits small, above the next column, and cross them out once they are used.',
  ],
});
ws({
  slug: 'multiplication/4-digit-by-1-digit', cat: 'multiplication', group: 'Multi-digit', card: '4-digit × 1-digit',
  title: '4-Digit by 1-Digit Multiplication Worksheets', sheet: '4-Digit × 1-Digit Multiplication', instr: 'Multiply.',
  grades: [4], std: ['4.NBT.B.5'],
  gen: 'mul', params: { a: [1001, 9999], b: [2, 9], noTrailingZero: true }, format: 'vertical', count: 20, counts: [10, 15, 20],
  intro: 'Four-digit by one-digit multiplication is the largest one-digit multiplier case in the fourth-grade standards.',
  onSheet: 'A four-digit number times a one-digit number from 2 to 9.',
  tips: [
    'Neat columns prevent most errors at this size.',
    'Check that each answer is reasonable by rounding the four-digit number to the nearest thousand.',
  ],
});
ws({
  slug: 'multiplication/2-digit-by-2-digit', cat: 'multiplication', group: 'Multi-digit', card: '2-digit × 2-digit',
  title: '2-Digit by 2-Digit Multiplication Worksheets', sheet: '2-Digit × 2-Digit Multiplication', instr: 'Multiply. Show your partial products.',
  grades: [4], std: ['4.NBT.B.5'],
  gen: 'mul', params: { a: [11, 99], b: [11, 99], noTrailingZero: true }, format: 'vertical', count: 12, counts: [6, 9, 12, 16],
  layout: { vertical: { cols: 4, rows: 3 } },
  intro: 'Two-digit by two-digit multiplication introduces partial products: multiply by the ones digit, multiply by the tens digit, then add the two rows.',
  onSheet: 'Two two-digit numbers, with room under each problem for the partial products.',
  tips: [
    'Write a 0 in the ones place of the second row before multiplying by the tens digit, and talk about why it is there.',
    'The area model (a 2-by-2 box) is a strong visual for students who lose track of the steps.',
  ],
});
ws({
  slug: 'multiplication/3-digit-by-2-digit', cat: 'multiplication', group: 'Multi-digit', card: '3-digit × 2-digit',
  title: '3-Digit by 2-Digit Multiplication Worksheets', sheet: '3-Digit × 2-Digit Multiplication', instr: 'Multiply. Show your partial products.',
  grades: [5], std: ['5.NBT.B.5'],
  gen: 'mul', params: { a: [101, 999], b: [11, 99], noTrailingZero: true }, format: 'vertical', count: 12, counts: [6, 9, 12],
  layout: { vertical: { cols: 4, rows: 3 } },
  intro: 'Three-digit by two-digit multiplication is a fifth-grade fluency goal for the standard algorithm.',
  onSheet: 'A three-digit number times a two-digit number, with work space for two partial products.',
  tips: [
    'Estimate: 312 × 47 is about 300 × 50 = 15,000.',
    'Check that the partial product rows are lined up before adding them.',
  ],
});
ws({
  slug: 'multiplication/3-digit-by-3-digit', cat: 'multiplication', group: 'Multi-digit', card: '3-digit × 3-digit',
  title: '3-Digit by 3-Digit Multiplication Worksheets', sheet: '3-Digit × 3-Digit Multiplication', instr: 'Multiply. Show your partial products.',
  grades: [5, 6], std: ['5.NBT.B.5'],
  gen: 'mul', params: { a: [101, 999], b: [101, 999], noTrailingZero: true }, format: 'vertical', count: 9, counts: [6, 9],
  layout: { vertical: { cols: 3, rows: 3 } },
  intro: 'Three-digit by three-digit multiplication is the longest standard-algorithm practice on this site. Each problem has three partial products before the final sum.',
  onSheet: 'Two three-digit numbers with generous space for three rows of partial products.',
  tips: [
    'Encourage graph paper for the partial products.',
    'Use these as a challenge set once two-digit multipliers are secure.',
  ],
});
ws({
  slug: 'multiplication/missing-factor', cat: 'multiplication', group: 'Facts', card: 'Missing factor',
  title: 'Missing Factor Worksheets', sheet: 'Find the Missing Factor', instr: 'Write the missing number.',
  grades: [3], std: ['3.OA.A.4'],
  gen: 'missing', params: { ops: [TIMES], lo: 1, hi: 10 }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Missing factor problems such as 6 × ___ = 42 are division in disguise. They help students see multiplication and division as one family of facts.',
  onSheet: 'Multiplication sentences with one factor missing. Factors range from 1 to 10.',
  tips: [
    'Ask "6 times what makes 42?" and then connect it to 42 ÷ 6.',
    'Students who know their tables well can solve these as fast as regular facts.',
  ],
});

// ---------------- Division ----------------

const DIV_NOTES = {
  2: ['Dividing by 2 means splitting into two equal groups, or finding half. These facts mirror the 2 times table.', ['Ask "What number doubled makes this?"', 'Every number being divided on this sheet is even.']],
  3: ['Dividing by 3 asks how many groups of 3 fit into a number. Students who know the 3 times table can turn each problem around: 24 ÷ 3 = 8 because 3 × 8 = 24.', ['Skip count by 3s up to the number being divided, keeping track of the jumps.', 'The digits of every number being divided add up to a multiple of 3.']],
  4: ['Dividing by 4 is the same as halving twice. 36 ÷ 4 is half of 36 (18), then half again (9).', ['Use "half, then half again" on any problem that feels hard.', 'Connect each problem to the matching 4s multiplication fact.']],
  5: ['Every number being divided in the 5s family ends in 0 or 5, which makes this a friendly set for building division confidence.', ['Count by 5s around a clock face to find each answer.', 'Double the number and divide by 10: 35 ÷ 5 is 70 ÷ 10 = 7.']],
  6: ['Dividing by 6 relies on knowing the 6 times table. Students can also divide by 2 and then by 3.', ['42 ÷ 6: half of 42 is 21, and 21 ÷ 3 = 7.', 'Write out the fact family for any problem a student misses.']],
  7: ['The 7s have no shortcut trick, so this set is about recalling the 7 times table quickly and accurately.', ['Ask "7 times what?" for each problem.', 'Spend extra time on 49, 56 and 63, which students most often confuse.']],
  8: ['Dividing by 8 is halving three times: 64 → 32 → 16 → 8.', ['Try "half, half, half" on any problem that feels hard.', 'Pair each problem with its 8s multiplication fact.']],
  9: ['Dividing by 9 uses the patterns of the 9 times table. For numbers up to 90, the answer is one more than the tens digit.', ['For 63 ÷ 9, the tens digit is 6, so the answer is 7.', 'The digits of every number being divided add up to 9 or a multiple of 9.']],
  10: ['Dividing by 10 moves each digit one place to the right. For these whole numbers, the answer is the number without its final zero.', ['Use place value language: 70 is 7 tens, so 70 ÷ 10 = 7.', 'The same pattern returns later when students divide decimals by 10.']],
  11: ['Dividing by 11 is quick for numbers up to 99, which are repeated digits like 44 and 77. The numbers 110, 121 and 132 need the full fact.', ['Set "Answers up to" to 10 for a simpler sheet.', '132 ÷ 11 = 12 because 11 × 12 = 110 + 22.']],
  12: ['Dividing by 12 connects to measurement, such as turning inches into feet. The answers match the 12 times table.', ['Split the problem: 84 ÷ 12 is the same as 84 ÷ 2 ÷ 6 = 42 ÷ 6 = 7.', 'Practice "how many dozen?" questions alongside the sheet.']],
};

for (let n = 2; n <= 12; n++) {
  const [intro, tips] = DIV_NOTES[n];
  ws({
    slug: `division/dividing-by-${n}`, cat: 'division', group: 'Dividing by one number', card: `Dividing by ${n}`,
    title: `Dividing by ${n} Worksheets`, sheet: `Dividing by ${n}`, instr: 'Divide.',
    grades: [3], std: ['3.OA.C.7'],
    gen: 'div', params: { divisors: [n], qFrom: 1, upTo: 12, order: 'shuffled' }, controls: ['divUpTo', 'order'],
    format: 'horizontal', count: 20, counts: [12, 20, 30, 40],
    intro,
    onSheet: `Every problem divides by ${n} with no remainder. Answers run from 1 to 12. Switch the format to "Long division" for bracket-style practice.`,
    tips,
  });
}

ws({
  slug: 'division/facts', cat: 'division', group: 'Facts', card: 'Mixed division facts',
  title: 'Division Facts Worksheets', sheet: 'Division Facts', instr: 'Divide.',
  grades: [3], std: ['3.OA.C.7'],
  gen: 'div', params: { divisors: range(1, 10), qFrom: 0, upTo: 10 }, controls: ['divisors'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Mixed division facts within 100. Pick the numbers to divide by, from 1 to 12, and every sheet matches what your class is working on.',
  onSheet: 'Facts for the divisors you select, with answers from 0 to 10. Every problem divides evenly.',
  tips: [
    'Turn off the divisors a student already knows well.',
    'Any number divided by 1 is itself, and 0 divided by any number is 0. Those facts are quick wins.',
  ],
});
ws({
  slug: 'division/100-facts-timed-test', cat: 'division', group: 'Facts', card: '100-problem timed test',
  title: 'Division Facts Timed Test Worksheets (100 Problems)', sheet: 'Division Timed Test', instr: 'Divide. Work as quickly and carefully as you can.',
  grades: [3, 4], std: ['3.OA.C.7'],
  gen: 'div', params: { divisors: range(1, 10), qFrom: 0, upTo: 10 }, controls: ['divisors'], format: 'horizontal', formats: ['horizontal'], ...DRILL,
  intro: 'One hundred division facts on one page. Once multiplication facts are solid, division facts usually catch up quickly with this kind of practice.',
  onSheet: 'One hundred facts for the divisors you select, with answers from 0 to 10.',
  tips: [
    'Give the multiplication timed test first. Division fluency depends on it.',
    'Track progress with the same time limit each week.',
  ],
});
ws({
  slug: 'division/with-remainders', cat: 'division', group: 'Facts', card: 'Facts with remainders',
  title: 'Division With Remainders Worksheets', sheet: 'Division With Remainders', instr: 'Divide. Write the remainder.',
  grades: [3, 4], std: ['4.NBT.B.6'],
  gen: 'div', params: { factsRem: true, rem: 'required' }, format: 'horizontal', count: 20, counts: [12, 20, 30],
  intro: 'Not every number divides evenly. These problems have a remainder, the amount left over after making as many equal groups as possible.',
  onSheet: 'Numbers under 100 divided by 2 to 9. Every problem has a remainder from 1 up to one less than the divisor.',
  tips: [
    'Check that each remainder is smaller than the divisor. If it is not, another group fits.',
    'Use real objects: 23 crayons shared by 4 children leaves 3 crayons over.',
  ],
});

const LD = { format: 'longdiv', formats: ['longdiv', 'horizontal'] };
ws({
  slug: 'division/long-division-2-digit-by-1-digit', cat: 'division', group: 'Long division', card: '2-digit ÷ 1-digit',
  title: 'Long Division Worksheets: 2-Digit by 1-Digit', sheet: 'Long Division: 2-Digit ÷ 1-Digit', instr: 'Divide. Show your work.',
  grades: [4], std: ['4.NBT.B.6'],
  gen: 'div', params: { digits: 2, divisor: [2, 9], rem: 'none' }, ...LD, count: 12, counts: [6, 9, 12],
  intro: 'Two-digit by one-digit long division is the place to teach the steps: divide, multiply, subtract, bring down. Every problem on this sheet divides evenly.',
  onSheet: 'Two-digit numbers divided by 2 to 9, with no remainders.',
  tips: [
    'Some students remember the steps with "Does McDonald\'s Sell Burgers?" (divide, multiply, subtract, bring down).',
    'Write each digit of the answer directly above the digit being divided.',
  ],
});
ws({
  slug: 'division/long-division-3-digit-by-1-digit', cat: 'division', group: 'Long division', card: '3-digit ÷ 1-digit',
  title: 'Long Division Worksheets: 3-Digit by 1-Digit', sheet: 'Long Division: 3-Digit ÷ 1-Digit', instr: 'Divide. Show your work.',
  grades: [4], std: ['4.NBT.B.6'],
  gen: 'div', params: { digits: 3, divisor: [2, 9], rem: 'none' }, ...LD, count: 12, counts: [6, 9, 12],
  intro: 'Three-digit by one-digit long division repeats the divide, multiply, subtract, bring down cycle two or three times. There are no remainders, so students can check each answer by multiplying.',
  onSheet: 'Three-digit numbers divided by 2 to 9, with no remainders.',
  tips: [
    'If the first digit is smaller than the divisor, the first digit of the answer goes above the second digit.',
    'Check every answer: the answer times the divisor should equal the number you started with.',
  ],
});
ws({
  slug: 'division/long-division-with-remainders', cat: 'division', group: 'Long division', card: 'With remainders',
  title: 'Long Division With Remainders Worksheets', sheet: 'Long Division With Remainders', instr: 'Divide. Show your work and write the remainder.',
  grades: [4], std: ['4.NBT.B.6'],
  gen: 'div', params: { digits: 3, divisor: [2, 9], rem: 'required' }, ...LD, count: 12, counts: [6, 9, 12],
  intro: 'Long division with remainders: three-digit numbers, one-digit divisors and a remainder in every problem. Students write each answer with an R, such as 47 R3.',
  onSheet: 'Three-digit numbers divided by 2 to 9. Every problem has a remainder.',
  tips: [
    'To check, multiply the answer by the divisor and add the remainder.',
    'A remainder that is equal to or larger than the divisor means a digit of the answer is too small.',
  ],
});
ws({
  slug: 'division/long-division-4-digit-by-1-digit', cat: 'division', group: 'Long division', card: '4-digit ÷ 1-digit',
  title: 'Long Division Worksheets: 4-Digit by 1-Digit', sheet: 'Long Division: 4-Digit ÷ 1-Digit', instr: 'Divide. Show your work.',
  grades: [4], std: ['4.NBT.B.6'],
  gen: 'div', params: { digits: 4, divisor: [2, 9], rem: 'any' }, ...LD, count: 9, counts: [6, 9],
  layout: { longdiv: { cols: 3, rows: 3 } },
  intro: 'Four-digit numbers with one-digit divisors, the largest case in the fourth-grade standards. Some problems divide evenly and some leave a remainder.',
  onSheet: 'Four-digit numbers divided by 2 to 9, with and without remainders.',
  tips: [
    'Zeros in the answer are a common stumbling block. If the divisor does not fit, write 0 above that digit and bring down the next one.',
    'Estimate first: 4,236 ÷ 7 is about 4,200 ÷ 7 = 600.',
  ],
});
ws({
  slug: 'division/long-division-2-digit-divisors', cat: 'division', group: 'Long division', card: '2-digit divisors',
  title: 'Long Division With 2-Digit Divisors Worksheets', sheet: 'Long Division With 2-Digit Divisors', instr: 'Divide. Show your work.',
  grades: [5], std: ['5.NBT.B.6'],
  gen: 'div', params: { digits: 3, divisor: [11, 99], noRound: true, rem: 'any' }, ...LD, count: 9, counts: [6, 9],
  layout: { longdiv: { cols: 3, rows: 3 } },
  intro: 'Dividing by a two-digit number means estimating each digit of the answer. These problems use three-digit numbers, so students practice estimating without very long calculations.',
  onSheet: 'Three-digit numbers divided by two-digit numbers (not multiples of 10), with and without remainders.',
  tips: [
    'Round the divisor to estimate: for 384 ÷ 29, think 384 ÷ 30.',
    'If an estimate is too big or too small, adjust by one and try again. That is a normal part of the method, not a mistake.',
  ],
});
ws({
  slug: 'division/long-division-4-digit-by-2-digit', cat: 'division', group: 'Long division', card: '4-digit ÷ 2-digit',
  title: 'Long Division Worksheets: 4-Digit by 2-Digit', sheet: 'Long Division: 4-Digit ÷ 2-Digit', instr: 'Divide. Show your work.',
  grades: [5, 6], std: ['5.NBT.B.6', '6.NS.B.2'],
  gen: 'div', params: { digits: 4, divisor: [11, 99], noRound: true, rem: 'any' }, ...LD, count: 9, counts: [6, 9],
  layout: { longdiv: { cols: 3, rows: 3 } },
  intro: 'Four-digit numbers and two-digit divisors give students full practice with the standard division algorithm, a sixth-grade fluency goal.',
  onSheet: 'Four-digit numbers divided by two-digit numbers, with and without remainders.',
  tips: [
    'Write the multiples of the divisor (×1 to ×9) in the margin before starting a hard problem.',
    'Check with multiplication, then add the remainder.',
  ],
});

// ---------------- Fractions ----------------

const FR = { format: 'horizontal', count: 16, counts: [8, 12, 16, 24] };
ws({
  slug: 'fractions/equivalent-fractions', cat: 'fractions', group: 'Fraction sense', card: 'Equivalent fractions',
  title: 'Equivalent Fractions Worksheets', sheet: 'Equivalent Fractions', instr: 'Write the missing number.',
  grades: [3, 4], std: ['4.NF.A.1'],
  gen: 'fracEquiv', params: {}, format: 'horizontal', count: 24, counts: [12, 16, 24, 32],
  intro: 'Equivalent fractions name the same amount with different numbers, like 2/3 and 8/12. Students find the missing numerator or denominator by multiplying both parts by the same number.',
  onSheet: 'A fraction in simplest form and an equivalent fraction with one number missing. Denominators go up to 100.',
  tips: [
    'Ask "What was the denominator multiplied by?" Then do the same to the numerator.',
    'Fraction strips make it clear that 2/3 and 8/12 cover the same length.',
  ],
});
ws({
  slug: 'fractions/simplifying-fractions', cat: 'fractions', group: 'Fraction sense', card: 'Simplifying fractions',
  title: 'Simplifying Fractions Worksheets', sheet: 'Simplifying Fractions', instr: 'Write each fraction in simplest form.',
  grades: [4, 5], std: ['4.NF.A.1'],
  gen: 'fracSimplify', params: {}, format: 'horizontal', count: 24, counts: [12, 16, 24, 32],
  intro: 'A fraction is in simplest form when its numerator and denominator have no common factor except 1. These sheets practice dividing both parts by their greatest common factor.',
  onSheet: 'Fractions that can be simplified, with denominators up to 72.',
  tips: [
    'Divide by the greatest common factor in one step, or by small factors like 2 and 3 several times. Both work.',
    'Listing the factors of the numerator and denominator helps students who are unsure where to start.',
  ],
});
ws({
  slug: 'fractions/comparing-fractions', cat: 'fractions', group: 'Fraction sense', card: 'Comparing fractions',
  title: 'Comparing Fractions Worksheets', sheet: 'Comparing Fractions', instr: 'Write <, > or = in each circle.',
  grades: [3, 4], std: ['3.NF.A.3.d', '4.NF.A.2'],
  gen: 'fracCompare', params: {}, format: 'horizontal', count: 24, counts: [12, 16, 24, 32],
  intro: 'Comparing fractions with different numerators and denominators asks students to reason about size, using common denominators, benchmarks like 1/2, or cross-multiplication.',
  onSheet: 'Pairs of fractions with denominators from 2 to 12. A few pairs are equal.',
  tips: [
    'Compare each fraction to 1/2 first. 3/8 is less than half and 4/7 is more than half, so no calculation is needed.',
    'When the numerators match, the fraction with the smaller denominator is larger because its pieces are bigger.',
  ],
});
ws({
  slug: 'fractions/improper-fractions-to-mixed-numbers', cat: 'fractions', group: 'Fraction sense', card: 'Improper to mixed',
  title: 'Improper Fractions to Mixed Numbers Worksheets', sheet: 'Improper Fractions to Mixed Numbers', instr: 'Write each improper fraction as a mixed number.',
  grades: [4, 5, 6], std: ['4.NF.B.3'],
  gen: 'fracToMixed', params: { level: 5 }, controls: ['level'], format: 'horizontal', count: 24, counts: [12, 16, 24, 32],
  intro: 'An improper fraction such as 17/5 has a numerator larger than its denominator. Students divide to find how many wholes it holds and what is left over: 17/5 = 3 2/5. Choose a grade 4, 5 or 6 level to match your class.',
  onSheet: 'Improper fractions that do not simplify, so each answer has one correct form. The grade 4 level uses denominators up to 6, grade 5 up to 12, and grade 6 up to 20 with larger whole numbers.',
  tips: [
    'Connect this to division with remainders: 17 ÷ 5 = 3 R2.',
    'The remainder becomes the new numerator. The denominator stays the same.',
  ],
  byGrade: [
    ['Grade 4', 'Mixed numbers first appear when students add and subtract fractions with like denominators (4.NF.B.3). Sums such as 5/6 + 4/6 = 9/6 are rewritten as 1 3/6. The grade 4 level keeps denominators at 6 or less.'],
    ['Grade 5', 'Answers to fraction addition and multiplication are often improper, and students are expected to write them as mixed numbers (5.NF.A.1, 5.NF.B.4). The grade 5 level uses denominators up to 12.'],
    ['Grade 6', 'Quotients of fractions, such as 3/4 ÷ 1/6 = 18/4, are rewritten as mixed numbers in simplest form (6.NS.A.1). The grade 6 level uses denominators up to 20 and answers with whole parts up to 12.'],
  ],
});
ws({
  slug: 'fractions/mixed-numbers-to-improper-fractions', cat: 'fractions', group: 'Fraction sense', card: 'Mixed to improper',
  title: 'Mixed Numbers to Improper Fractions Worksheets', sheet: 'Mixed Numbers to Improper Fractions', instr: 'Write each mixed number as an improper fraction.',
  grades: [4, 5, 6], std: ['4.NF.B.3'],
  gen: 'fracToImproper', params: { level: 5 }, controls: ['level'], format: 'horizontal', count: 24, counts: [12, 16, 24, 32],
  intro: 'Turning a mixed number into an improper fraction is a key step before multiplying or dividing mixed numbers. For 2 3/4, multiply 2 by 4 and add 3 to get 11/4. Choose a grade 4, 5 or 6 level to match your class.',
  onSheet: 'Mixed numbers in simplest form. The grade 4 level uses denominators up to 6 and whole numbers up to 5, grade 5 uses denominators up to 12, and grade 6 uses denominators up to 20 and whole numbers up to 12.',
  tips: [
    'Ask "How many fourths are in 2 wholes?" before showing the shortcut.',
    'Check by converting the answer back into a mixed number.',
  ],
  byGrade: [
    ['Grade 4', 'Students learn that a mixed number such as 2 3/4 is the same as 11/4 while adding and subtracting mixed numbers with like denominators (4.NF.B.3). The grade 4 level keeps denominators at 6 or less.'],
    ['Grade 5', 'Rewriting mixed numbers as improper fractions is the usual first step for multiplying them, as in 2 1/3 × 3/4 (5.NF.B.6). The grade 5 level uses denominators up to 12.'],
    ['Grade 6', 'Dividing with mixed numbers, such as 3 1/2 ÷ 1 3/4, starts by converting both to improper fractions (6.NS.A.1). The grade 6 level uses denominators up to 20 and whole numbers up to 12.'],
  ],
});
ws({
  slug: 'fractions/adding-like-denominators', cat: 'fractions', group: 'Adding and subtracting', card: 'Add, like denominators',
  title: 'Adding Fractions With Like Denominators Worksheets', sheet: 'Adding Fractions: Like Denominators', instr: 'Add. Simplify your answer.',
  grades: [4], std: ['4.NF.B.3'],
  gen: 'frac', params: { op: '+', like: true, d: [2, 12] }, ...FR,
  intro: 'When the denominators match, adding fractions means adding the numerators: 3/8 + 2/8 = 5/8. These sheets build that idea and the habit of simplifying.',
  onSheet: 'Two fractions with the same denominator (2 to 12). Some sums are greater than 1, and the answer key shows those as mixed numbers.',
  tips: [
    'Stress that the denominator stays the same because the size of the pieces does not change.',
    'If students have not learned to simplify yet, accept unsimplified answers. The key shows both forms.',
  ],
});
ws({
  slug: 'fractions/subtracting-like-denominators', cat: 'fractions', group: 'Adding and subtracting', card: 'Subtract, like denominators',
  title: 'Subtracting Fractions With Like Denominators Worksheets', sheet: 'Subtracting Fractions: Like Denominators', instr: 'Subtract. Simplify your answer.',
  grades: [4], std: ['4.NF.B.3'],
  gen: 'frac', params: { op: '-', like: true, d: [2, 12] }, ...FR,
  intro: 'Subtracting fractions with like denominators means subtracting the numerators and keeping the denominator: 7/10 − 3/10 = 4/10.',
  onSheet: 'Two fractions with the same denominator, larger fraction first, so answers are never negative.',
  tips: [
    'Fraction strips or a drawn bar make the "take away" visible.',
    'Ask students to simplify when they can: 4/10 = 2/5.',
  ],
});
ws({
  slug: 'fractions/adding-mixed-numbers', cat: 'fractions', group: 'Adding and subtracting', card: 'Adding mixed numbers',
  title: 'Adding Mixed Numbers Worksheets', sheet: 'Adding Mixed Numbers', instr: 'Add. Write your answer in simplest form.',
  grades: [4, 5], std: ['4.NF.B.3.c'],
  gen: 'frac', params: { op: '+', mixed: true, d: [2, 12] }, ...FR,
  intro: 'Adding mixed numbers with like denominators: add the whole numbers, add the fractions, then regroup if the fraction part is 1 or more.',
  onSheet: 'Two mixed numbers with the same denominator. Answers are simplified mixed numbers.',
  tips: [
    'For 2 5/6 + 1 4/6, the fractions make 9/6 = 1 3/6, so the total is 4 3/6 = 4 1/2.',
    'Another method is to change both numbers to improper fractions first. Let students choose.',
  ],
});
ws({
  slug: 'fractions/adding-unlike-denominators', cat: 'fractions', group: 'Adding and subtracting', card: 'Add, unlike denominators',
  title: 'Adding Fractions With Unlike Denominators Worksheets', sheet: 'Adding Fractions: Unlike Denominators', instr: 'Add. Simplify your answer.',
  grades: [5], std: ['5.NF.A.1'],
  gen: 'frac', params: { op: '+', like: false, d: [2, 12] }, ...FR,
  intro: 'Fractions with different denominators cannot be added until they describe pieces of the same size. Students find a common denominator, rewrite both fractions, then add.',
  onSheet: 'Two proper fractions in simplest form with different denominators from 2 to 12.',
  tips: [
    'The least common denominator keeps numbers small, but any common denominator works if the answer is simplified at the end.',
    'Multiplying the two denominators always gives a common denominator, which is a good fallback.',
  ],
});
ws({
  slug: 'fractions/subtracting-unlike-denominators', cat: 'fractions', group: 'Adding and subtracting', card: 'Subtract, unlike denominators',
  title: 'Subtracting Fractions With Unlike Denominators Worksheets', sheet: 'Subtracting Fractions: Unlike Denominators', instr: 'Subtract. Simplify your answer.',
  grades: [5], std: ['5.NF.A.1'],
  gen: 'frac', params: { op: '-', like: false, d: [2, 12] }, ...FR,
  intro: 'Subtracting fractions with unlike denominators starts the same way as adding: rewrite both fractions with a common denominator.',
  onSheet: 'Two proper fractions with different denominators, larger fraction first.',
  tips: [
    'Draw both fractions as bars of the same length to show why the pieces must match.',
    'After rewriting, compare the numerators to confirm the first fraction is larger.',
  ],
});
ws({
  slug: 'fractions/multiplying-fractions-by-whole-numbers', cat: 'fractions', group: 'Multiplying and dividing', card: 'Fraction × whole number',
  title: 'Multiplying Fractions by Whole Numbers Worksheets', sheet: 'Multiplying Fractions by Whole Numbers', instr: 'Multiply. Simplify your answer.',
  grades: [4], std: ['4.NF.B.4'],
  gen: 'frac', params: { op: TIMES, whole: true, d: [2, 12] }, ...FR,
  intro: 'Multiplying a fraction by a whole number is repeated addition: 3 × 2/5 means 2/5 + 2/5 + 2/5 = 6/5.',
  onSheet: 'A proper fraction and a whole number from 2 to 12, in either order.',
  tips: [
    'Write the whole number as a fraction over 1 when students move on to multiplying two fractions.',
    'Convert improper answers to mixed numbers: 6/5 = 1 1/5.',
  ],
});
ws({
  slug: 'fractions/multiplying-fractions', cat: 'fractions', group: 'Multiplying and dividing', card: 'Multiplying fractions',
  title: 'Multiplying Fractions Worksheets', sheet: 'Multiplying Fractions', instr: 'Multiply. Simplify your answer.',
  grades: [5], std: ['5.NF.B.4'],
  gen: 'frac', params: { op: TIMES, d: [2, 12] }, ...FR,
  intro: 'To multiply fractions, multiply the numerators and multiply the denominators. Students are often surprised that the product of two proper fractions is smaller than either one.',
  onSheet: 'Two proper fractions in simplest form with denominators from 2 to 12.',
  tips: [
    'Cross-simplify before multiplying to keep numbers small: in 4/9 × 3/8, divide 4 and 8 by 4, and 3 and 9 by 3.',
    'Use an area model: 2/3 × 3/4 is the overlap of two shaded rectangles.',
  ],
});
ws({
  slug: 'fractions/dividing-fractions', cat: 'fractions', group: 'Multiplying and dividing', card: 'Dividing fractions',
  title: 'Dividing Fractions Worksheets', sheet: 'Dividing Fractions', instr: 'Divide. Simplify your answer.',
  grades: [6], std: ['6.NS.A.1'],
  gen: 'frac', params: { op: DIVIDE, d: [2, 12] }, ...FR,
  intro: 'Dividing by a fraction is the same as multiplying by its reciprocal. These sheets practice the "keep, change, flip" steps until they become automatic.',
  onSheet: 'Two proper fractions with denominators from 2 to 12. Answers are simplified and shown as mixed numbers when greater than 1.',
  tips: [
    'Ask what the problem means: 3/4 ÷ 1/8 asks how many eighths fit in three quarters.',
    'Only the second fraction (the divisor) is flipped.',
  ],
});

// ---------------- Decimals ----------------

ws({
  slug: 'decimals/decimal-place-value', cat: 'decimals', group: 'Place value', card: 'Decimal place value',
  title: 'Decimal Place Value Worksheets', sheet: 'Decimal Place Value', instr: 'Write the value of the underlined digit.',
  grades: [5], std: ['5.NBT.A.1', '5.NBT.A.3'],
  gen: 'decPlace', params: {}, format: 'horizontal', count: 20, counts: [10, 20, 30, 40],
  intro: 'Each place in a decimal is worth ten times the place to its right: tens, ones, tenths, hundredths, thousandths. These sheets ask for the value of an underlined digit, the skill behind reading, comparing and rounding decimals in 5th grade.',
  onSheet: 'Numbers with one to three whole-number digits and two or three decimal places. Students write the value of the underlined digit, such as 0.07 for the 7 in 45.372.',
  tips: [
    'Have students read each number aloud with its place names: 45.372 is forty-five and three hundred seventy-two thousandths.',
    'A place value chart with columns for tens, ones, tenths, hundredths and thousandths makes the value of each digit easy to see.',
    'Ask what happens to the value of a digit when it moves one place to the left. It becomes ten times greater.',
  ],
});
ws({
  slug: 'decimals/adding-decimals', cat: 'decimals', group: 'Decimal operations', card: 'Adding decimals',
  title: 'Adding Decimals Worksheets', sheet: 'Adding Decimals', instr: 'Add. Line up the decimal points.',
  grades: [5], std: ['5.NBT.B.7'],
  gen: 'decAddSub', params: { op: '+', w: [0, 99], dp: [1, 2] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Adding decimals works just like adding whole numbers once the decimal points are lined up. The stacked layout keeps every place value in its column.',
  onSheet: 'Decimals with tenths and hundredths, such as 34.7 + 8.25. Lengths are mixed so students practice lining up the point.',
  tips: [
    'Fill empty places with zeros: 34.7 becomes 34.70 so both numbers have hundredths.',
    'Estimate with whole numbers first: 34.7 + 8.25 is about 35 + 8 = 43.',
  ],
});
ws({
  slug: 'decimals/subtracting-decimals', cat: 'decimals', group: 'Decimal operations', card: 'Subtracting decimals',
  title: 'Subtracting Decimals Worksheets', sheet: 'Subtracting Decimals', instr: 'Subtract. Line up the decimal points.',
  grades: [5], std: ['5.NBT.B.7'],
  gen: 'decAddSub', params: { op: '-', w: [0, 99], dp: [1, 2] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Subtracting decimals uses the same regrouping as whole-number subtraction, with the decimal point lined up and brought straight down into the answer.',
  onSheet: 'Decimals with tenths and hundredths, larger number first.',
  tips: [
    'Write a zero in empty places before subtracting: 12.4 − 3.75 becomes 12.40 − 3.75.',
    'Check by adding the answer to the number you subtracted.',
  ],
});
ws({
  slug: 'decimals/adding-and-subtracting-decimals', cat: 'decimals', group: 'Decimal operations', card: 'Adding and subtracting',
  title: 'Adding and Subtracting Decimals Worksheets', sheet: 'Adding and Subtracting Decimals', instr: 'Look at each sign. Line up the decimal points.',
  grades: [5, 6, 7], std: ['5.NBT.B.7', '6.NS.B.3'],
  gen: 'mixed', params: { ops: [{ gen: 'decAddSub', params: { op: '+', w: [0, 99], dp: [1, 2] } }, { gen: 'decAddSub', params: { op: '-', w: [0, 99], dp: [1, 2] } }] },
  format: 'vertical', formats: ['vertical', 'horizontal'], count: 20, counts: [10, 15, 20, 25],
  intro: 'Addition and subtraction of decimals on the same page, so students check the sign and line up the decimal points every time. This mixed practice is a 5th grade skill and a quick review in 6th and 7th grade.',
  onSheet: 'Half addition and half subtraction with tenths and hundredths of different lengths, such as 34.7 + 8.25 and 52.4 − 17.86.',
  tips: [
    'Write a zero in empty places so both numbers have the same number of decimal places.',
    'Check each subtraction by adding the answer to the number you subtracted.',
    'For 6th and 7th grade review, ask students to estimate each answer to the nearest whole number first.',
  ],
});
ws({
  slug: 'decimals/multiplying-decimals', cat: 'decimals', group: 'Decimal operations', card: 'Multiplying decimals',
  title: 'Multiplying Decimals Worksheets', sheet: 'Multiplying Decimals', instr: 'Multiply.',
  grades: [5, 6], std: ['5.NBT.B.7', '6.NS.B.3'],
  gen: 'decMul', params: {}, format: 'horizontal', count: 18, counts: [12, 18, 24],
  intro: 'To multiply decimals, multiply as if they were whole numbers, then count the decimal places in both factors to place the point in the answer.',
  onSheet: 'A decimal with tenths or hundredths times a whole number from 2 to 9 or a decimal with tenths, with space to work.',
  tips: [
    'Estimate first: 4.8 × 3 is about 5 × 3 = 15, so the answer must be near 15.',
    'The answer key drops zeros at the end of a product, so 0.5 × 0.4 shows as 0.2.',
  ],
});
ws({
  slug: 'decimals/dividing-decimals-by-whole-numbers', cat: 'decimals', group: 'Decimal operations', card: 'Dividing decimals',
  title: 'Dividing Decimals by Whole Numbers Worksheets', sheet: 'Dividing Decimals by Whole Numbers', instr: 'Divide. Place the decimal point first.',
  grades: [5, 6], std: ['5.NBT.B.7', '6.NS.B.3'],
  gen: 'decDiv', params: {}, format: 'longdiv', formats: ['longdiv', 'horizontal'], count: 12, counts: [6, 9, 12],
  intro: 'Dividing a decimal by a whole number uses ordinary long division. The only new step is placing the decimal point in the answer directly above the point in the number being divided.',
  onSheet: 'Decimals with tenths or hundredths divided by 2 to 9. Every problem divides evenly.',
  tips: [
    'Put the decimal point in the answer before dividing anything.',
    'If a student ends with a remainder, a step went wrong. Every problem here comes out even.',
  ],
});
ws({
  slug: 'decimals/rounding-decimals', cat: 'decimals', group: 'Decimal operations', card: 'Rounding decimals',
  title: 'Rounding Decimals Worksheets', sheet: 'Rounding Decimals', instr: 'Round each number to the place shown in brackets.',
  grades: [5], std: ['5.NBT.A.4'],
  gen: 'decRound', params: { place: 'mixed' }, controls: ['place'], format: 'horizontal', count: 20, counts: [10, 20, 30],
  intro: 'Rounding decimals follows the same rule as rounding whole numbers: look at the digit to the right of the rounding place, and round up if it is 5 or more.',
  onSheet: 'Numbers with three decimal places to round to the nearest whole number, tenth or hundredth. Pick one place or mix them.',
  tips: [
    'Underline the digit in the rounding place and circle the digit to its right.',
    'Drop the digits after the rounding place: 4.376 rounded to the nearest tenth is 4.4, not 4.400.',
  ],
});

// ---------------- Integers ----------------

const INT = { format: 'horizontal', count: 30, counts: FACT_COUNTS };
ws({
  slug: 'integers/adding-integers', cat: 'integers', group: 'Integer operations', card: 'Adding integers',
  title: 'Adding Integers Worksheets', sheet: 'Adding Integers', instr: 'Add.',
  grades: [7], std: ['7.NS.A.1'],
  gen: 'int', params: { op: '+', range: [-20, 20] }, ...INT,
  intro: 'Adding integers combines positive and negative numbers. Students learn that adding a negative number moves left on the number line.',
  onSheet: 'Integers from −20 to 20, with at least one negative number in every problem. A negative number after the first is written in parentheses.',
  tips: [
    'Same signs: add and keep the sign. Different signs: subtract and take the sign of the number farther from zero.',
    'Sketch a number line for the first few problems.',
  ],
});
ws({
  slug: 'integers/subtracting-integers', cat: 'integers', group: 'Integer operations', card: 'Subtracting integers',
  title: 'Subtracting Integers Worksheets', sheet: 'Subtracting Integers', instr: 'Subtract.',
  grades: [7], std: ['7.NS.A.1'],
  gen: 'int', params: { op: MINUS, range: [-20, 20] }, ...INT,
  intro: 'Subtracting an integer is the same as adding its opposite: 5 − (−3) = 5 + 3 = 8. These sheets give plenty of practice with that rewrite.',
  onSheet: 'Integers from −20 to 20, with at least one negative number in every problem.',
  tips: [
    'Have students rewrite each problem as addition before solving.',
    'Expect errors when both numbers are negative, such as −4 − (−9). Slow down on those.',
  ],
});
ws({
  slug: 'integers/multiplying-integers', cat: 'integers', group: 'Integer operations', card: 'Multiplying integers',
  title: 'Multiplying Integers Worksheets', sheet: 'Multiplying Integers', instr: 'Multiply.',
  grades: [7], std: ['7.NS.A.2'],
  gen: 'int', params: { op: TIMES, range: [-12, 12] }, ...INT,
  intro: 'Multiplying integers uses the facts students already know plus one sign rule: same signs give a positive product, and different signs give a negative product.',
  onSheet: 'Integers from −12 to 12, with at least one negative number in every problem.',
  tips: [
    'Decide the sign first, then multiply the numbers without their signs.',
    'Use a pattern to show why a negative times a negative is positive: −3 × 2 = −6, −3 × 1 = −3, −3 × 0 = 0, so −3 × −1 = 3.',
  ],
});
ws({
  slug: 'integers/dividing-integers', cat: 'integers', group: 'Integer operations', card: 'Dividing integers',
  title: 'Dividing Integers Worksheets', sheet: 'Dividing Integers', instr: 'Divide.',
  grades: [7], std: ['7.NS.A.2'],
  gen: 'int', params: { op: DIVIDE, range: [-12, 12] }, ...INT,
  intro: 'Dividing integers follows the same sign rules as multiplying. Every problem here divides evenly so students can focus on the signs.',
  onSheet: 'Divisors and answers from −12 to 12, with at least one negative number in every problem.',
  tips: [
    'Same signs: positive answer. Different signs: negative answer.',
    'Check with multiplication: −36 ÷ 4 = −9 because 4 × −9 = −36.',
  ],
});

// ---------------- Rounding ----------------

const RD = { format: 'horizontal', count: 30, counts: [20, 30], layout: { horizontal: { cols: 3, rows: 10 } } };
ws({
  slug: 'rounding/nearest-10', cat: 'rounding', group: 'Rounding whole numbers', card: 'Nearest 10',
  title: 'Rounding to the Nearest 10 Worksheets', sheet: 'Rounding to the Nearest Ten', instr: 'Round each number to the nearest ten.',
  grades: [3], std: ['3.NBT.A.1'],
  gen: 'round', params: { place: 10 }, ...RD,
  intro: 'Rounding to the nearest ten finds the closest multiple of 10. It is the basis for estimating sums and differences in third grade.',
  onSheet: 'Two- and three-digit numbers that are not already multiples of 10.',
  tips: [
    'Ask "Which two tens is this number between?" and then "Which one is it closer to?"',
    'Numbers ending in 5 round up by convention, even though they are exactly halfway.',
  ],
});
ws({
  slug: 'rounding/nearest-100', cat: 'rounding', group: 'Rounding whole numbers', card: 'Nearest 100',
  title: 'Rounding to the Nearest 100 Worksheets', sheet: 'Rounding to the Nearest Hundred', instr: 'Round each number to the nearest hundred.',
  grades: [3], std: ['3.NBT.A.1'],
  gen: 'round', params: { place: 100 }, ...RD,
  intro: 'Rounding to the nearest hundred uses the tens digit to decide: 0 to 4 rounds down and 5 to 9 rounds up.',
  onSheet: 'Three- and four-digit numbers that are not already multiples of 100.',
  tips: [
    'Use a number line marked in hundreds.',
    'Watch numbers like 962, which round up to 1,000.',
  ],
});
ws({
  slug: 'rounding/nearest-1000', cat: 'rounding', group: 'Rounding whole numbers', card: 'Nearest 1,000',
  title: 'Rounding to the Nearest 1,000 Worksheets', sheet: 'Rounding to the Nearest Thousand', instr: 'Round each number to the nearest thousand.',
  grades: [4], std: ['4.NBT.A.3'],
  gen: 'round', params: { place: 1000 }, ...RD,
  intro: 'Rounding to the nearest thousand looks at the hundreds digit. These sheets use four- and five-digit numbers.',
  onSheet: 'Four- and five-digit numbers that are not already multiples of 1,000.',
  tips: [
    'Cover every digit to the right of the hundreds place with a finger. They do not affect the answer.',
    'Read each answer aloud to practice large-number names.',
  ],
});
ws({
  slug: 'rounding/mixed-places', cat: 'rounding', group: 'Rounding whole numbers', card: 'Mixed places',
  title: 'Rounding Whole Numbers Worksheets (Mixed Places)', sheet: 'Rounding Whole Numbers', instr: 'Round each number to the place shown in brackets.',
  grades: [4], std: ['4.NBT.A.3'],
  gen: 'round', params: { place: 'mixed' }, format: 'horizontal', count: 20, counts: [10, 20, 30],
  intro: 'Mixed rounding practice: each problem names a different place, so students have to find the right digit before they round.',
  onSheet: 'Four- and five-digit numbers to round to the nearest ten, hundred or thousand.',
  tips: [
    'Have students underline the rounding digit before deciding anything else.',
    'This sheet is a good check after students have practiced each place on its own.',
  ],
});

// ---------------- Telling time ----------------

const TIME_CONTROLS = ['mode', 'step'];
ws({
  slug: 'telling-time/hour', cat: 'telling-time', group: 'Reading clocks', card: 'To the hour',
  title: 'Telling Time to the Hour Worksheets', sheet: "Telling Time: O'Clock", instr: TIME_INSTR,
  grades: [1], std: ['1.MD.B.3'],
  gen: 'clock', params: { step: 60, mode: 'read' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'Telling time to the hour is the starting point: the minute hand points straight up at 12 and the hour hand points to the hour.',
  onSheet: 'Analog clocks showing times on the hour, from 1:00 to 12:00.',
  tips: [
    'Teach the hour hand first. A clock with only an hour hand still shows roughly what time it is.',
    'Have children say "o\'clock" with each answer.',
  ],
});
ws({
  slug: 'telling-time/half-hour', cat: 'telling-time', group: 'Reading clocks', card: 'To the half hour',
  title: 'Telling Time to the Half Hour Worksheets', sheet: 'Telling Time: Half Hours', instr: TIME_INSTR,
  grades: [1], std: ['1.MD.B.3'],
  gen: 'clock', params: { step: 30, mode: 'read' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'At half past the hour, the minute hand points to 6 and the hour hand sits halfway between two numbers. That halfway position is what most children need to practice.',
  onSheet: 'Times on the hour and half hour, such as 3:00 and 3:30.',
  tips: [
    'Point out that at 4:30 the hour hand is between 4 and 5, not on the 5.',
    'Connect "half past" to cutting the clock face in half.',
  ],
});
ws({
  slug: 'telling-time/quarter-hour', cat: 'telling-time', group: 'Reading clocks', card: 'To the quarter hour',
  title: 'Telling Time to the Quarter Hour Worksheets', sheet: 'Telling Time: Quarter Hours', instr: TIME_INSTR,
  grades: [2], std: ['2.MD.C.7'],
  gen: 'clock', params: { step: 15, mode: 'read' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'Quarter hours (:15, :30 and :45) divide the clock into four equal parts and introduce "quarter past" and "quarter to".',
  onSheet: 'Times on the hour, quarter past, half past and quarter to.',
  tips: [
    'Shade a clock face in four parts to show where the quarters are.',
    'Practice both ways of saying 3:45: "three forty-five" and "quarter to four".',
  ],
});
ws({
  slug: 'telling-time/5-minutes', cat: 'telling-time', group: 'Reading clocks', card: 'To 5 minutes',
  title: 'Telling Time to 5 Minutes Worksheets', sheet: 'Telling Time to 5 Minutes', instr: TIME_INSTR,
  grades: [2], std: ['2.MD.C.7'],
  gen: 'clock', params: { step: 5, mode: 'read' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'Reading time to the nearest five minutes means counting by 5s around the clock face. It is the second-grade standard for telling time.',
  onSheet: 'Times in five-minute steps, such as 7:25 and 11:50.',
  tips: [
    'Skip count by 5s from the 12 to the minute hand.',
    'Write the minute values (5, 10, 15 and so on) around the outside of a practice clock.',
  ],
});
ws({
  slug: 'telling-time/1-minute', cat: 'telling-time', group: 'Reading clocks', card: 'To the minute',
  title: 'Telling Time to the Minute Worksheets', sheet: 'Telling Time to the Minute', instr: TIME_INSTR,
  grades: [3], std: ['3.MD.A.1'],
  gen: 'clock', params: { step: 1, mode: 'read' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'Telling time to the nearest minute combines counting by 5s with counting on by 1s for the small marks in between.',
  onSheet: 'Any time of day to the minute, such as 2:37 or 9:08.',
  tips: [
    'Count by 5s to the last numbered mark before the minute hand, then count the small marks.',
    'Check whether the hour hand has passed the number. At 7:52 it is just before the 8, so the hour is still 7.',
  ],
});
ws({
  slug: 'telling-time/drawing-clock-hands', cat: 'telling-time', group: 'Drawing hands', card: 'Draw the hands',
  title: 'Drawing Clock Hands Worksheets', sheet: 'Draw the Clock Hands', instr: TIME_INSTR,
  grades: [1, 2, 3], std: ['1.MD.B.3', '2.MD.C.7'],
  gen: 'clock', params: { step: 5, mode: 'draw' }, controls: TIME_CONTROLS, ...CLOCK,
  intro: 'Drawing the hands is the reverse of reading a clock. Students see a digital time and draw the hour and minute hands on a blank clock face.',
  onSheet: 'Blank clock faces with a time under each one. Choose times to the hour, half hour, quarter hour, 5 minutes or minute.',
  tips: [
    'Draw the minute hand longer than the hour hand.',
    'Unless the time is on the hour, the hour hand goes partway between two numbers.',
  ],
});

// ---------------- Comparing numbers ----------------

const CMP = { format: 'horizontal', count: 30, counts: [20, 30], layout: { horizontal: { cols: 3, rows: 10 } } };
ws({
  slug: 'comparing-numbers/up-to-100', cat: 'comparing-numbers', group: 'Comparing whole numbers', card: 'Up to 100',
  title: 'Comparing Numbers to 100 Worksheets', sheet: 'Comparing Numbers to 100', instr: 'Write <, > or = in each circle.',
  grades: [1], std: ['1.NBT.B.3'],
  gen: 'compare', params: { range: [0, 100] }, ...CMP,
  intro: 'Comparing two-digit numbers with <, > and = starts with the tens digit. The number with more tens is larger, no matter what the ones digits are.',
  onSheet: 'Pairs of numbers from 0 to 100, including reversed digits like 47 and 74.',
  tips: [
    'The open side of the symbol faces the larger number.',
    'Ask students to say the comparison aloud: "47 is less than 74."',
  ],
});
ws({
  slug: 'comparing-numbers/3-digit', cat: 'comparing-numbers', group: 'Comparing whole numbers', card: '3-digit numbers',
  title: 'Comparing 3-Digit Numbers Worksheets', sheet: 'Comparing 3-Digit Numbers', instr: 'Write <, > or = in each circle.',
  grades: [2], std: ['2.NBT.A.4'],
  gen: 'compare', params: { range: [100, 999] }, ...CMP,
  intro: 'Comparing three-digit numbers means checking hundreds first, then tens, then ones. Pairs with the same hundreds digit, like 438 and 483, need careful attention.',
  onSheet: 'Pairs of three-digit numbers, many of them close together.',
  tips: [
    'Line the numbers up by place value and compare from the left.',
    'Have students explain which place decided the answer.',
  ],
});
ws({
  slug: 'comparing-numbers/large-numbers', cat: 'comparing-numbers', group: 'Comparing whole numbers', card: 'Large numbers',
  title: 'Comparing Large Numbers Worksheets', sheet: 'Comparing Large Numbers', instr: 'Write <, > or = in each circle.',
  grades: [4], std: ['4.NBT.A.2'],
  gen: 'compare', params: { range: [1000, 999999] }, format: 'horizontal', count: 24, counts: [12, 24],
  layout: { horizontal: { cols: 2, rows: 12 } },
  intro: 'Comparing multi-digit numbers up to the hundred thousands. Students compare digits from left to right until they find a difference.',
  onSheet: 'Pairs of numbers from 1,000 to 999,999, written with commas.',
  tips: [
    'A whole number with more digits is always larger.',
    'If a student is unsure, line the numbers up by place value.',
  ],
});

// ---------------- Order of operations ----------------

ws({
  slug: 'order-of-operations/basic', cat: 'order-of-operations', group: 'Expressions', card: 'Order of operations',
  title: 'Order of Operations Worksheets', sheet: 'Order of Operations', instr: 'Evaluate each expression. Show your steps.',
  grades: [5, 6], std: ['5.OA.A.1'],
  gen: 'orderOps', params: { exponents: false }, format: 'horizontal', count: 12, counts: [8, 12, 16],
  layout: { horizontal: { cols: 2, rows: 6 } },
  intro: 'Order of operations problems check whether students evaluate an expression in the right sequence: parentheses first, then multiplication and division from left to right, then addition and subtraction from left to right.',
  onSheet: 'Whole-number expressions with two or three operations, some with parentheses. Every answer is a whole number.',
  tips: [
    'PEMDAS (US), BODMAS (UK) and BIDMAS all describe the same rules.',
    'The most common error is doing addition before subtraction, or multiplication before division, when the rule is simply left to right.',
  ],
});
ws({
  slug: 'order-of-operations/with-exponents', cat: 'order-of-operations', group: 'Expressions', card: 'With exponents',
  title: 'Order of Operations With Exponents Worksheets', sheet: 'Order of Operations With Exponents', instr: 'Evaluate each expression. Show your steps.',
  grades: [6], std: ['6.EE.A.1', '6.EE.A.2.c'],
  gen: 'orderOps', params: { exponents: true }, format: 'horizontal', count: 12, counts: [8, 12, 16],
  layout: { horizontal: { cols: 2, rows: 6 } },
  intro: 'Expressions with exponents add one more step to the order of operations: evaluate powers right after parentheses.',
  onSheet: 'Expressions with squares and cubes, parentheses and the four operations. Every answer is a whole number.',
  tips: [
    'Remind students that 3² means 3 × 3, not 3 × 2.',
    'Work line by line, rewriting the expression after each step.',
  ],
});
ws({
  slug: 'order-of-operations/exponents', cat: 'order-of-operations', group: 'Expressions', card: 'Exponents',
  title: 'Exponents Worksheets', sheet: 'Evaluating Exponents', instr: 'Find the value of each power.',
  grades: [6], std: ['6.EE.A.1'],
  gen: 'powers', params: {}, format: 'horizontal', count: 30, counts: [20, 30],
  layout: { horizontal: { cols: 3, rows: 10 } },
  intro: 'An exponent tells how many times to use the base as a factor: 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. These sheets practice evaluating whole-number powers.',
  onSheet: 'Bases from 2 to 12 with exponents from 2 to 6 (values up to 10,000), plus powers of 10.',
  tips: [
    'Have students write out the repeated multiplication for the first few problems.',
    'Point out the pattern in powers of 10: the exponent equals the number of zeros.',
  ],
});


// ---------------- Holiday worksheets ----------------

const MIX2 = { ops: [{ gen: 'add', params: { a: [10, 99], b: [10, 99] } }, { gen: 'sub', params: { a: [10, 99], b: [10, 99], diff: [1, 99] } }] };
const HOLIDAY = {
  thanksgiving: {
    name: 'Thanksgiving',
    addition: ['Addition facts within 20 with a Thanksgiving turkey frame. A festive way to keep 1st and 2nd graders practicing facts in the busy week before the holiday.',
      ['Run a "gobble race": students solve as many problems as they can in three minutes, then check with the answer key.', 'Ask early finishers to write their own turkey word problem using one fact from the sheet.']],
    subtraction: ['Subtraction facts within 20 on a Thanksgiving sheet with turkeys, pumpkins and fall leaves, for 1st and 2nd grade.',
      ['Tell a story for one problem before starting: "There were 15 pies and the family ate 7. How many are left?"', 'Pair this sheet with the Thanksgiving addition sheet to review fact families.']],
    mixed2: ['Two-digit addition and subtraction, with and without regrouping, on a Thanksgiving-themed sheet for 2nd grade.',
      ['Have students circle the sign in each problem before solving.', 'Use it as a pre-break review of the regrouping skills taught this fall.']],
    multiplication: ['Multiplication facts on a Thanksgiving-themed sheet for 3rd and 4th grade. Tick the times tables you want so the sheet matches what your class is learning.',
      ['Make it a "turkey time" challenge: how many facts can students finish before the timer runs out?', 'Turn off tables students already know to focus on the trickier facts.']],
    division: ['Division facts within 100 with a Thanksgiving frame for 3rd and 4th grade. Choose the divisors to match your class.',
      ['Use a sharing story: 24 slices of pie shared by 6 people.', 'Ask students to write the matching multiplication fact beside each problem.']],
  },
  christmas: {
    name: 'Christmas',
    addition: ['Addition facts within 20 on a Christmas sheet with a tree, ornaments and snowflakes. Good practice for 1st and 2nd graders in the weeks before winter break.',
      ['Hold an "elf check": students swap sheets and check each other\'s answers with the key.', 'Write one fact on the board each day of December and solve it together before starting the sheet.']],
    subtraction: ['Subtraction facts within 20 with a Christmas theme for 1st and 2nd grade. Ornaments, gifts and candy canes line the bottom of the page.',
      ['Use a story: 18 presents under the tree and 9 are opened. How many are still wrapped?', 'Count up to find the difference: from 9, count up to 18.']],
    mixed2: ['A festive review of two-digit addition and subtraction for 2nd grade, with regrouping in some problems.',
      ['Ask students to estimate each answer to the nearest ten first.', 'Great for the last week before break, when students need practice that feels different.']],
    multiplication: ['Multiplication facts with a Christmas tree frame for 3rd and 4th grade. Tick the times tables you want on the sheet.',
      ['Pick one "tree table" a day in December and tick only that table.', 'Students who finish can draw arrays of ornaments for two facts from the sheet.']],
    division: ['Division facts within 100 on a Christmas sheet for 3rd and 4th grade. Choose the divisors to match your class.',
      ['Use sharing stories: 32 candy canes shared among 4 stockings.', 'Pair it with the Christmas multiplication sheet to practice fact families.']],
  },
};

for (const [theme, h] of Object.entries(HOLIDAY)) {
  const cat = `${theme}-math-worksheets`;
  const group = `${h.name} worksheets`;
  const base = { cat, group, theme };
  ws({
    ...base, slug: `${cat}/addition`, card: 'Addition within 20',
    title: `${h.name} Addition Worksheets`, sheet: `${h.name} Addition`, instr: 'Add. Then color the pictures!',
    grades: [1, 2], std: ['1.OA.C.6', '2.OA.B.2'],
    gen: 'add', params: { a: [0, 20], b: [0, 20], sum: [0, 20] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
    intro: h.addition[0],
    onSheet: 'Two numbers from 0 to 20 with sums up to 20. The holiday pictures around the page can be colored when the problems are done.',
    tips: h.addition[1],
  });
  ws({
    ...base, slug: `${cat}/subtraction`, card: 'Subtraction within 20',
    title: `${h.name} Subtraction Worksheets`, sheet: `${h.name} Subtraction`, instr: 'Subtract. Then color the pictures!',
    grades: [1, 2], std: ['1.OA.C.6', '2.OA.B.2'],
    gen: 'sub', params: { a: [0, 20], b: [0, 20] }, format: 'horizontal', count: 30, counts: FACT_COUNTS,
    intro: h.subtraction[0],
    onSheet: 'Starting numbers up to 20 with no negative answers, on a holiday-themed page.',
    tips: h.subtraction[1],
  });
  ws({
    ...base, slug: `${cat}/2-digit-addition-and-subtraction`, card: '2-digit add and subtract',
    title: `${h.name} 2-Digit Addition and Subtraction Worksheets`, sheet: `${h.name} 2-Digit Math`, instr: 'Look at each sign. Regroup when you need to.',
    grades: [2], std: ['2.NBT.B.5'],
    gen: 'mixed', params: MIX2, format: 'vertical', formats: ['vertical', 'horizontal'], count: 25, counts: V_COUNTS,
    intro: h.mixed2[0],
    onSheet: 'Half addition and half subtraction with two-digit numbers, stacked in columns. Some problems need regrouping.',
    tips: h.mixed2[1],
  });
  ws({
    ...base, slug: `${cat}/multiplication`, card: 'Multiplication facts',
    title: `${h.name} Multiplication Worksheets`, sheet: `${h.name} Multiplication`, instr: 'Multiply. Then color the pictures!',
    grades: [3, 4], std: ['3.OA.C.7'],
    gen: 'mul', params: { tables: range(1, 10), from: 0, upTo: 10 }, controls: ['tables'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
    intro: h.multiplication[0],
    onSheet: 'Facts from the times tables you choose (1 to 10 by default), each multiplied by 0 to 10.',
    tips: h.multiplication[1],
  });
  ws({
    ...base, slug: `${cat}/division`, card: 'Division facts',
    title: `${h.name} Division Worksheets`, sheet: `${h.name} Division`, instr: 'Divide. Then color the pictures!',
    grades: [3, 4], std: ['3.OA.C.7'],
    gen: 'div', params: { divisors: range(1, 10), qFrom: 1, upTo: 10 }, controls: ['divisors'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
    intro: h.division[0],
    onSheet: 'Division facts for the divisors you choose (1 to 10 by default), with answers from 1 to 10.',
    tips: h.division[1],
  });
}

// ---------------- UK & Australia (maths) ----------------
// locale 'uk': A4 paper, UK terms, National Curriculum years instead of US grades.
// alt: the matching US page, used for hreflang links.

const UK = { cat: 'maths', locale: 'uk', paper: 'a4', grades: [], std: [] };
const UK_TIME_INSTR = { by: 'mode', values: { read: 'Write the time shown on each clock.', draw: 'Draw the hands to show each time.', default: 'Write the time shown on each clock.' } };

ws({
  ...UK, slug: 'maths/number-bonds-to-10', group: 'Number bonds', card: 'Number bonds to 10',
  title: 'Number Bonds to 10 Worksheets', sheet: 'Number Bonds to 10', instr: 'Fill in the missing number.',
  years: [1], nc: 'Year 1: represent and use number bonds and related subtraction facts within 20.',
  gen: 'bonds', params: { total: 10 }, format: 'horizontal', count: 30, counts: [20, 30, 40],
  intro: 'Number bonds to 10 are the pairs of numbers that make 10: 0 and 10, 1 and 9, 2 and 8, and so on. Knowing them by heart makes adding and subtracting across 10 much easier in Year 1 and Year 2.',
  onSheet: 'Every number bond to 10 in four forms: 4 + __ = 10, __ + 6 = 10, 10 = 4 + __ and 10 − 4 = __, in a new order each time.',
  tips: [
    'Use a ten frame or ten fingers: the empty spaces show the missing part.',
    'Practise the bonds in order first (0 + 10, 1 + 9, 2 + 8 …) so children see the pattern, then mix them up.',
    'Link each bond to its subtraction fact: if 7 + 3 = 10, then 10 − 3 = 7.',
  ],
});
ws({
  ...UK, slug: 'maths/number-bonds-to-20', group: 'Number bonds', card: 'Number bonds to 20',
  title: 'Number Bonds to 20 Worksheets', sheet: 'Number Bonds to 20', instr: 'Fill in the missing number.',
  years: [1, 2], nc: 'Year 1: number bonds within 20. Year 2: recall and use addition and subtraction facts to 20 fluently.',
  gen: 'bonds', params: { total: 20 }, format: 'horizontal', count: 30, counts: [20, 30, 40],
  intro: 'Number bonds to 20 build on bonds to 10: if 3 + 7 = 10, then 13 + 7 = 20. These sheets practise every pair of whole numbers that makes 20.',
  onSheet: 'Every pair that makes 20, written as missing number additions and subtractions.',
  tips: [
    'Show how each bond to 20 comes from a bond to 10 by adding a ten.',
    'A bead string or two ten frames side by side help children see both parts.',
  ],
});
ws({
  ...UK, slug: 'maths/number-bonds-to-100', group: 'Number bonds', card: 'Number bonds to 100',
  title: 'Number Bonds to 100 Worksheets', sheet: 'Number Bonds to 100', instr: 'Fill in the missing number.',
  years: [2, 3], nc: 'Year 2: derive and use related facts up to 100, such as 30 + 70 = 100.',
  gen: 'bonds', params: { total: 100, pairs: 'tens' }, controls: ['pairs'], format: 'horizontal', count: 30, counts: [20, 30, 40],
  intro: 'Number bonds to 100 start with multiples of 10 (30 + 70) in Year 2 and move on to any pair (37 + 63) in Year 3. Choose the type of pairs in the options.',
  onSheet: 'Pairs that make 100. Choose multiples of 10, multiples of 5, or any whole numbers.',
  tips: [
    'Use known bonds to 10: 3 + 7 = 10, so 30 + 70 = 100.',
    'For any pair, make the next ten first, then count on in tens: 37 + 3 = 40, then 40 + 60 = 100.',
  ],
});

const COL_ADD = 'Year 3: add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction.';
const COL_ADD4 = 'Year 4: add and subtract numbers with up to 4 digits using the formal written methods of columnar addition and subtraction.';
ws({
  ...UK, slug: 'maths/column-addition-2-digit', group: 'Column addition and subtraction', card: 'Column addition, 2-digit',
  title: 'Column Addition Worksheets: 2-Digit Numbers', sheet: 'Column Addition', instr: 'Use column addition. Exchange when you need to.',
  years: [3], nc: COL_ADD,
  gen: 'add', params: { a: [10, 99], b: [10, 99] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Column addition is the formal written method children learn in Year 3: line the numbers up in columns, add the ones, then the tens, exchanging 10 ones for 1 ten when a column makes 10 or more. Two-digit numbers are a good place to start.',
  onSheet: 'Two two-digit numbers set out in columns. Some sums need an exchange and some do not.',
  tips: [
    'Many UK schools write the exchanged ten small, under the answer line of the tens column. Follow the layout your school uses.',
    'Ask children to estimate first by rounding each number to the nearest 10.',
  ],
});
ws({
  ...UK, slug: 'maths/column-addition-3-digit', group: 'Column addition and subtraction', card: 'Column addition, 3-digit', alt: 'addition/3-digit-with-regrouping',
  title: 'Column Addition Worksheets: 3-Digit Numbers', sheet: 'Column Addition', instr: 'Use column addition. Exchange when you need to.',
  years: [3], nc: COL_ADD,
  gen: 'add', params: { a: [100, 999], b: [100, 999] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit column addition is the main Year 3 written method for addition. Children add ones, tens and hundreds in turn and exchange whenever a column makes 10 or more.',
  onSheet: 'Two three-digit numbers in columns, with exchanges in some, all or none of the columns.',
  tips: [
    'Check each answer with the inverse: subtract one number from the total.',
    'Place value counters on a hundreds, tens and ones chart show exactly what an exchange is.',
  ],
});
ws({
  ...UK, slug: 'maths/column-addition-4-digit', group: 'Column addition and subtraction', card: 'Column addition, 4-digit', alt: 'addition/4-digit',
  title: 'Column Addition Worksheets: 4-Digit Numbers', sheet: 'Column Addition', instr: 'Use column addition. Exchange when you need to.',
  years: [4], nc: COL_ADD4,
  gen: 'add', params: { a: [1000, 9999], b: [1000, 9999] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'In Year 4, column addition extends to four-digit numbers. The method is the same, with one more column and more chances to exchange.',
  onSheet: 'Two four-digit numbers in columns. Some answers have five digits.',
  tips: [
    'Neat columns matter at this size. Squared maths books help children keep one digit per square.',
    'Round both numbers to the nearest 1,000 to estimate before working it out.',
  ],
});
ws({
  ...UK, slug: 'maths/column-subtraction-2-digit', group: 'Column addition and subtraction', card: 'Column subtraction, 2-digit',
  title: 'Column Subtraction Worksheets: 2-Digit Numbers', sheet: 'Column Subtraction', instr: 'Use column subtraction. Exchange when you need to.',
  years: [3], nc: COL_ADD,
  gen: 'sub', params: { a: [10, 99], b: [10, 99], diff: [1, 99] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Column subtraction sets the larger number on top and subtracts one column at a time. When the top digit is too small, children exchange 1 ten for 10 ones.',
  onSheet: 'Two-digit numbers in columns. Some problems need an exchange and some do not.',
  tips: [
    'Ask "Can I take this away?" for each column before subtracting.',
    'Cross out the tens digit and write the new value above it, then add the 10 ones to the ones digit.',
  ],
});
ws({
  ...UK, slug: 'maths/column-subtraction-3-digit', group: 'Column addition and subtraction', card: 'Column subtraction, 3-digit', alt: 'subtraction/3-digit-with-regrouping',
  title: 'Column Subtraction Worksheets: 3-Digit Numbers', sheet: 'Column Subtraction', instr: 'Use column subtraction. Exchange when you need to.',
  years: [3], nc: COL_ADD,
  gen: 'sub', params: { a: [100, 999], b: [100, 999], diff: [1, 999] }, format: 'vertical', count: 25, counts: V_COUNTS,
  intro: 'Three-digit column subtraction is a core Year 3 skill. Some problems need an exchange from the tens, some from the hundreds, and some from both.',
  onSheet: 'Three-digit numbers in columns with any number of exchanges.',
  tips: [
    'Numbers with a zero in the tens, like 503, need an exchange from the hundreds first. Model these carefully.',
    'Check by adding the answer to the number that was taken away.',
  ],
});
ws({
  ...UK, slug: 'maths/column-subtraction-4-digit', group: 'Column addition and subtraction', card: 'Column subtraction, 4-digit', alt: 'subtraction/4-digit',
  title: 'Column Subtraction Worksheets: 4-Digit Numbers', sheet: 'Column Subtraction', instr: 'Use column subtraction. Exchange when you need to.',
  years: [4], nc: COL_ADD4,
  gen: 'sub', params: { a: [1000, 9999], b: [1000, 9999], diff: [1, 9999] }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Four-digit column subtraction is the Year 4 written method for subtraction, with exchanges possible in every column.',
  onSheet: 'Two four-digit numbers in columns, with the larger number first.',
  tips: [
    'Work from the ones column to the left and finish each exchange before moving on.',
    'Use the inverse to check: answer + smaller number = larger number.',
  ],
});
ws({
  ...UK, slug: 'maths/times-tables', group: 'Times tables, multiplication and division', card: 'Times tables 2 to 12', alt: 'multiplication/facts-0-12',
  title: 'Times Tables Worksheets', sheet: 'Times Tables', instr: 'Multiply.',
  years: [2, 3, 4], nc: 'Year 2: the 2, 5 and 10 times tables. Year 3: the 3, 4 and 8 times tables. Year 4: all multiplication tables up to 12 × 12.',
  gen: 'mul', params: { tables: range(2, 12), from: 1, upTo: 12 }, controls: ['tables'], format: 'horizontal', count: 30, counts: FACT_COUNTS,
  intro: 'Times tables practice for every table from 2 to 12. Children learn the 2, 5 and 10 times tables in Year 2, the 3, 4 and 8 times tables in Year 3, and all tables up to 12 × 12 by the end of Year 4. Tick the tables you want on the sheet.',
  onSheet: 'Facts from the times tables you choose, each multiplied by 1 to 12.',
  tips: [
    'Year 2: tick only 2, 5 and 10. Year 3: add 3, 4 and 8.',
    'Practise the related division facts too: if 6 × 8 = 48, then 48 ÷ 8 = 6.',
  ],
});
ws({
  ...UK, slug: 'maths/multiplication-tables-check', group: 'Times tables, multiplication and division', card: 'Times tables check practice',
  title: 'Multiplication Tables Check Practice Sheets', sheet: 'Times Tables Check Practice', instr: 'Answer all 25 questions. In the real check you get 6 seconds for each one.',
  years: [4], nc: 'Year 4: recall multiplication and division facts for multiplication tables up to 12 × 12. Pupils in England take the multiplication tables check in Year 4.',
  gen: 'mul', params: { tables: range(2, 12), from: 2, upTo: 12 }, format: 'horizontal', formats: ['horizontal'], count: 25, counts: [25, 50],
  intro: 'Year 4 pupils in England take the multiplication tables check (MTC) every June: 25 times tables questions on screen, with 6 seconds to answer each one. These printable sheets give the same 25-question practice on paper, with an answer key.',
  onSheet: '25 multiplication questions from the 2 to 12 times tables, mixed up like the real check.',
  tips: [
    'Time the sheet: 25 questions at 6 seconds each is 2 minutes 30 seconds.',
    'Mark the sheet together and list the facts that took longest. Those are the ones to practise.',
    'Choose 50 questions for two practice rounds on one print.',
  ],
});
ws({
  ...UK, slug: 'maths/short-multiplication', group: 'Times tables, multiplication and division', card: 'Short multiplication', alt: 'multiplication/3-digit-by-1-digit',
  title: 'Short Multiplication Worksheets', sheet: 'Short Multiplication', instr: 'Use short multiplication.',
  years: [4], nc: 'Year 4: multiply two-digit and three-digit numbers by a one-digit number using formal written layout.',
  gen: 'mul', params: { a: [12, 999], b: [2, 9], noTrailingZero: true }, format: 'vertical', count: 20, counts: [10, 15, 20, 25],
  intro: 'Short multiplication is the Year 4 formal written method for multiplying a two- or three-digit number by a one-digit number. Children multiply each digit from right to left and carry into the next column.',
  onSheet: 'Two- and three-digit numbers multiplied by 2 to 9, set out in columns.',
  tips: [
    'Write carried digits small under the answer line, then add them on after multiplying the next digit.',
    'Estimate first: 386 × 7 is about 400 × 7 = 2,800.',
  ],
});
ws({
  ...UK, slug: 'maths/long-multiplication', group: 'Times tables, multiplication and division', card: 'Long multiplication', alt: 'multiplication/3-digit-by-2-digit',
  title: 'Long Multiplication Worksheets', sheet: 'Long Multiplication', instr: 'Use long multiplication. Show both rows.',
  years: [5, 6], nc: 'Year 5: multiply numbers up to 4 digits by a one- or two-digit number using a formal written method, including long multiplication for two-digit numbers.',
  gen: 'mul', params: { a: [101, 999], b: [11, 99], noTrailingZero: true }, format: 'vertical', count: 12, counts: [6, 9, 12],
  layout: { vertical: { cols: 4, rows: 3 } },
  intro: 'Long multiplication is the formal written method for multiplying by a two-digit number, introduced in Year 5 and used with up to four-digit numbers in Year 6. Children multiply by the ones digit, then by the tens digit with a zero placeholder, and add the two rows.',
  onSheet: 'Three-digit numbers multiplied by two-digit numbers, with space for both rows of working.',
  tips: [
    'Remind children to write the placeholder zero before multiplying by the tens digit.',
    'The grid method is a useful check: split both numbers into hundreds, tens and ones.',
  ],
});
ws({
  ...UK, slug: 'maths/short-division', group: 'Times tables, multiplication and division', card: 'Short division (bus stop)', alt: 'division/long-division-4-digit-by-1-digit',
  title: 'Short Division Worksheets (Bus Stop Method)', sheet: 'Short Division', instr: 'Use the bus stop method. Write any remainder.',
  years: [5], nc: 'Year 5: divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately.',
  gen: 'div', params: { digits: 4, divisor: [2, 9], rem: 'any' }, format: 'longdiv', formats: ['longdiv', 'horizontal'], count: 12, counts: [6, 9, 12],
  layout: { longdiv: { cols: 3, rows: 4 } },
  intro: 'Short division, often called the bus stop method, is the formal written method for dividing by a one-digit number. It is taught in Year 5 with numbers up to four digits: the number being divided sits under the bus stop and each remainder is carried to the next digit.',
  onSheet: 'Four-digit numbers divided by 2 to 9 in the bus stop layout. Some divide exactly and some leave a remainder.',
  tips: [
    'Carry each remainder as a small digit in front of the next digit inside the bus stop.',
    'Check answers with multiplication, adding on any remainder.',
    'Year 6 pupils can write remainders as fractions or decimals as well as with r.',
  ],
});
ws({
  ...UK, slug: 'maths/long-division', group: 'Times tables, multiplication and division', card: 'Long division', alt: 'division/long-division-4-digit-by-2-digit',
  title: 'Long Division Worksheets: 4-Digit by 2-Digit Numbers', sheet: 'Long Division', instr: 'Use long division. Show your working.',
  years: [6], nc: 'Year 6: divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division, and interpret remainders.',
  gen: 'div', params: { digits: 4, divisor: [11, 99], noRound: true, rem: 'any' }, format: 'longdiv', formats: ['longdiv', 'horizontal'], count: 9, counts: [6, 9],
  layout: { longdiv: { cols: 3, rows: 3 } },
  intro: 'Long division is the Year 6 formal written method for dividing numbers up to four digits by a two-digit number. Children write each subtraction step under the bus stop, which makes larger divisors easier to manage than short division.',
  onSheet: 'Four-digit numbers divided by two-digit numbers, with space for every step.',
  tips: [
    'Write the multiples of the divisor down the side before starting.',
    'Decide what the remainder means for the question: a whole-number remainder, a fraction, or a rounded answer.',
  ],
});

const UK_CLOCK = { ...CLOCK, controls: ['mode', 'step'], instr: UK_TIME_INSTR };
ws({
  ...UK, ...UK_CLOCK, slug: 'maths/telling-the-time-oclock-and-half-past', group: 'Telling the time', card: "O'clock and half past", alt: 'telling-time/half-hour',
  title: "Telling the Time Worksheets: O'Clock and Half Past", sheet: "O'Clock and Half Past",
  years: [1], nc: 'Year 1: tell the time to the hour and half past the hour, and draw the hands on a clock face to show these times.',
  gen: 'clock', params: { step: 30, mode: 'read' },
  intro: "Year 1 children learn to tell the time to the hour and half past the hour, and to draw the hands on a clock face to show these times. Switch the task to drawing the hands in the options.",
  onSheet: "Clock faces showing o'clock and half past times, from 1 o'clock to half past 12.",
  tips: [
    'At half past, the minute hand points to 6 and the hour hand is halfway between two numbers.',
    'Say each time in words as well: half past four.',
  ],
});
ws({
  ...UK, ...UK_CLOCK, slug: 'maths/telling-the-time-quarter-past-and-quarter-to', group: 'Telling the time', card: 'Quarter past and quarter to', alt: 'telling-time/quarter-hour',
  title: 'Telling the Time Worksheets: Quarter Past and Quarter To', sheet: 'Quarter Past and Quarter To',
  years: [2], nc: 'Year 2: tell and write the time to five minutes, including quarter past/to the hour.',
  gen: 'clock', params: { step: 15, mode: 'read' },
  intro: "In Year 2, children learn quarter past and quarter to the hour before moving on to five-minute intervals. These sheets mix o'clock, quarter past, half past and quarter to.",
  onSheet: "Clock faces at o'clock, quarter past, half past and quarter to.",
  tips: [
    'Shade a clock face in quarters to show where quarter past and quarter to sit.',
    'Remind children that at quarter to five the hour hand is nearly at 5, but the hour is still 4.',
  ],
});
ws({
  ...UK, ...UK_CLOCK, slug: 'maths/telling-the-time-5-minutes', group: 'Telling the time', card: 'To 5 minutes', alt: 'telling-time/5-minutes',
  title: 'Telling the Time to 5 Minutes Worksheets', sheet: 'Telling the Time to 5 Minutes',
  years: [2], nc: 'Year 2: tell and write the time to five minutes, including quarter past/to the hour, and draw the hands on a clock face to show these times.',
  gen: 'clock', params: { step: 5, mode: 'read' },
  intro: 'Telling the time to five minutes is a Year 2 objective: children count in fives around the clock and say times such as twenty-five past three or ten to six.',
  onSheet: 'Clock faces showing times in five-minute steps.',
  tips: [
    'Count in fives from 12 to the minute hand, then decide whether it is past or to the hour.',
    'Write the minutes around the outside of a practice clock: 5, 10, 15 and so on.',
  ],
});
ws({
  ...UK, ...UK_CLOCK, slug: 'maths/telling-the-time-to-the-minute', group: 'Telling the time', card: 'To the minute', alt: 'telling-time/1-minute',
  title: 'Telling the Time to the Minute Worksheets', sheet: 'Telling the Time to the Minute',
  years: [3], nc: 'Year 3: tell and write the time from an analogue clock, including using Roman numerals from I to XII, and 12-hour and 24-hour clocks.',
  gen: 'clock', params: { step: 1, mode: 'read' },
  intro: 'In Year 3, children tell the time to the nearest minute on an analogue clock. Counting in fives to the last numbered mark, then on in ones, is the key step.',
  onSheet: 'Clock faces showing any time to the minute.',
  tips: [
    'Count in fives to the last number before the minute hand, then count the small marks.',
    'Ask children to write each time in words and as it would appear on a 24-hour clock.',
  ],
});

export const WORKSHEETS = W;
