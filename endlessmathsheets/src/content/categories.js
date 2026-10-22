// Topic hubs. `guide` paragraphs and `faq` appear on the hub page only.
export const CATEGORIES = [
  {
    slug: 'addition',
    tile: 'addition/2-digit-with-regrouping',
    name: 'Addition',
    title: 'Addition Worksheets',
    lede: 'From adding within 5 to five-digit sums. Every sheet is generated fresh and prints with its answer key.',
    groups: ['Facts', 'Multi-digit', 'Practice formats'],
    guide: [
      'Children usually learn addition in three stages. First come the facts: sums within 10, then within 20, until all single-digit sums can be recalled without counting. Next comes multi-digit addition without regrouping, which teaches the habit of adding one place value at a time. Last comes regrouping (carrying), where a column adds up to 10 or more and a new ten, hundred or thousand is made.',
      'Use the stacked format for anything with two or more digits. Lining numbers up by place value is half of the skill, and a printed column layout makes alignment errors easy to spot. The in-a-row format suits facts practice and mental math.',
      'Speed comes after accuracy. When a child gets most problems right without counting on fingers, a timed sheet with the same facts is a good way to build fluency and to see progress from week to week.',
    ],
    faq: [
      ['What order should addition skills be taught in?', 'A common sequence is: adding within 5, within 10, within 20, two-digit plus one-digit, two-digit without regrouping, two-digit with regrouping, three-digit, and then four or more digits. The worksheets on this page are listed in that order.'],
      ['What is regrouping in addition?', 'Regrouping, also called carrying, happens when the digits in one column add up to 10 or more. Ten ones become one ten, so a 1 is written at the top of the next column to the left.'],
      ['Do these worksheets include answer keys?', 'Yes. Every worksheet prints with a matching answer key on a separate page. Untick "Answer key" before printing if you only want the problems.'],
    ],
  },
  {
    slug: 'subtraction',
    tile: 'subtraction/3-digit-with-regrouping',
    name: 'Subtraction',
    title: 'Subtraction Worksheets',
    lede: 'Subtraction facts, borrowing and subtracting across zeros. A new set of problems every time you click.',
    groups: ['Facts', 'Multi-digit', 'Practice formats'],
    guide: [
      'Subtraction is usually taught alongside addition, using the same number ranges. Children who understand that 13 − 5 = 8 because 8 + 5 = 13 learn their subtraction facts much faster than those who only count back.',
      'Multi-digit subtraction introduces regrouping, often called borrowing: when the top digit in a column is smaller than the bottom digit, one unit from the next place to the left is traded for ten in the current place. Start with problems that need no regrouping, then regroup once, then work up to subtracting across zeros.',
      'Encourage students to check each answer by adding. The difference plus the number taken away should equal the starting number. It turns every problem into two pieces of practice.',
    ],
    faq: [
      ['What is the difference between borrowing and regrouping?', 'They mean the same thing. Many classrooms now say "regrouping" because it describes what happens: one ten is regrouped as ten ones. "Borrowing" is the older term.'],
      ['Why is subtracting across zeros so hard?', 'In a problem like 400 − 128 there is nothing in the tens place to regroup from, so students must regroup from the hundreds first. Thinking of 400 as 40 tens, or rewriting the problem as 399 − 127, makes it easier.'],
      ['Can answers be negative?', 'No. On every subtraction sheet here, the first number is at least as large as the second. For negative numbers, see the integer worksheets.'],
    ],
  },
  {
    slug: 'mixed-operations',
    tile: 'mixed-operations/all-four-operations',
    name: 'Mixed Operations',
    title: 'Mixed Operations Worksheets',
    lede: 'Addition with subtraction, multiplication with division, or all four on one page.',
    groups: ['Mixed practice'],
    guide: [
      'Mixed sheets make students read each sign before they compute. That small step catches a surprising number of errors, especially after a week of practising one operation at a time.',
      'They also work well as review. Once facts for all four operations have been taught, a short mixed sheet a few times a week keeps every set of facts fresh.',
    ],
    faq: [
      ['When should students start mixed practice?', 'After they are accurate with each operation on its own. Mixing too early can make it hard to tell whether an error comes from a fact a student does not know or from misreading the sign.'],
      ['Are the operations evenly balanced?', 'Yes. Each operation gets an equal share of the problems, then the problems are shuffled.'],
    ],
  },
  {
    slug: 'multiplication',
    tile: 'multiplication/2-digit-by-1-digit',
    name: 'Multiplication',
    title: 'Multiplication Worksheets',
    lede: 'Times tables from 2 to 12, mixed facts, timed tests and multi-digit multiplication.',
    groups: ['Times tables', 'Facts', 'Multi-digit'],
    guide: [
      'Most students learn the times tables in an order that builds on what they already know: 2s, 5s and 10s first, then 3s and 4s, then 6s, 7s, 8s and 9s, and finally 11s and 12s. Each table page below has tips specific to that table.',
      'Once the facts are secure, multiplying by multiples of 10 (such as 6 × 40) connects them to place value. That is the bridge to multi-digit multiplication, where students multiply one digit at a time and regroup, then add partial products for two-digit multipliers.',
      'For the multi-digit sheets, the stacked format leaves room under each problem for partial products. Graph paper helps students who struggle to keep digits lined up.',
    ],
    faq: [
      ['Which times tables should my child learn first?', 'Start with 2, 5 and 10, which follow easy patterns. Then 3 and 4, then 6 through 9. Because 3 × 7 and 7 × 3 are the same fact, each new table has fewer new facts than the one before.'],
      ['How do I make a worksheet for just a few times tables?', 'Open the mixed facts worksheet and tick only the tables you want. The sheet updates right away and you can print it.'],
      ['By what grade should students know their multiplication facts?', 'In the Common Core standards, students are expected to know all products of two one-digit numbers from memory by the end of third grade.'],
    ],
  },
  {
    slug: 'division',
    tile: 'division/dividing-by-7',
    name: 'Division',
    title: 'Division Worksheets',
    lede: 'Division facts for every divisor from 2 to 12, remainders, and long division with one- and two-digit divisors.',
    groups: ['Dividing by one number', 'Facts', 'Long division'],
    guide: [
      'Division facts are the multiplication facts in reverse. A student who knows 6 × 7 = 42 can answer 42 ÷ 6 and 42 ÷ 7, so the division pages below follow the same order as the times tables.',
      'Long division follows a repeating cycle: divide, multiply, subtract, bring down. Start with two-digit dividends that divide evenly, then three-digit dividends, then remainders, and finally two-digit divisors, where estimating each quotient digit is the main new skill.',
      'Long division sheets use the familiar bracket layout and leave work space under each problem. Switch the format to "In a row" for quick fact practice instead.',
    ],
    faq: [
      ['What are the steps of long division?', 'Divide, multiply, subtract, bring down, and repeat until there are no digits left to bring down. Whatever is left over at the end is the remainder.'],
      ['How do I write a remainder?', 'Most elementary classes write it after the quotient with an R, as in 47 R3. Older students also learn to write it as a fraction (47 3/7) or a decimal.'],
      ['Can I print long division without remainders?', 'Yes. The two- and three-digit long division sheets divide evenly. The remainder sheets always have one.'],
    ],
  },
  {
    slug: 'fractions',
    tile: 'fractions/adding-unlike-denominators',
    name: 'Fractions',
    title: 'Fraction Worksheets',
    lede: 'Equivalent fractions, simplifying, comparing, and all four operations with fractions and mixed numbers.',
    groups: ['Fraction sense', 'Adding and subtracting', 'Multiplying and dividing'],
    guide: [
      'Fraction work starts with what a fraction means: equivalent fractions, simplifying and comparing. Those ideas carry the rest of the topic. Adding fractions with unlike denominators, for example, is really just rewriting them as equivalent fractions first.',
      'Answer keys show each answer in simplest form. When the unsimplified answer is different, the key shows both, as in 10/8 = 1 1/4, so you can accept either form depending on what your students have learned.',
      'Fraction bars, number lines and area models make each operation easier to picture. Pair a few problems from each sheet with a drawing before moving to symbols only.',
    ],
    faq: [
      ['Are answers simplified?', 'Yes. Answers appear in simplest form, and improper fractions are written as mixed numbers. If the unsimplified answer is different, the key shows it too.'],
      ['How do you add fractions with different denominators?', 'Find a common denominator, rewrite both fractions with it, add the numerators, and simplify. For 1/4 + 1/6, the least common denominator is 12, so 3/12 + 2/12 = 5/12.'],
      ['What does "keep, change, flip" mean?', 'It is a reminder for dividing fractions: keep the first fraction, change ÷ to ×, and flip the second fraction to its reciprocal.'],
    ],
  },
  {
    slug: 'decimals',
    tile: 'decimals/adding-decimals',
    name: 'Decimals',
    title: 'Decimal Worksheets',
    lede: 'Adding, subtracting, multiplying, dividing and rounding decimals to hundredths.',
    groups: ['Decimal operations'],
    guide: [
      'Decimal arithmetic is place-value arithmetic with a point. For adding and subtracting, the decimal points must line up, which is why the stacked sheets here align every number on its point, even when the numbers have different lengths.',
      'For multiplying, students multiply as if the numbers were whole and then place the decimal point by counting decimal places. For dividing a decimal by a whole number, the point in the quotient goes straight above the point in the dividend.',
    ],
    faq: [
      ['Why line up the decimal points?', 'Lining up the points lines up the place values: tenths under tenths, hundredths under hundredths. Adding digits from different places is the most common decimal error.'],
      ['Do I need to write zeros at the end?', 'Writing 3.5 as 3.50 does not change its value. It can make subtraction easier because every place has a digit.'],
    ],
  },
  {
    slug: 'integers',
    tile: 'integers/adding-integers',
    name: 'Integers',
    title: 'Integer Worksheets',
    lede: 'Adding, subtracting, multiplying and dividing positive and negative numbers.',
    groups: ['Integer operations'],
    guide: [
      'Integer operations are a seventh-grade topic built on two ideas: a number line that extends left of zero, and sign rules. Adding a negative number moves left. Subtracting a number is the same as adding its opposite.',
      'Multiplying and dividing use the familiar facts plus one rule: same signs make a positive answer, and different signs make a negative answer. Negative numbers after the first are written in parentheses so the signs are easy to read.',
    ],
    faq: [
      ['What is the rule for subtracting a negative number?', 'Subtracting a negative is the same as adding a positive: 6 − (−4) = 6 + 4 = 10.'],
      ['Why is a negative times a negative positive?', 'One way to see it: −3 × 2 = −6, −3 × 1 = −3, −3 × 0 = 0. Each step adds 3, so −3 × −1 = 3.'],
    ],
  },
  {
    slug: 'rounding',
    tile: 'rounding/nearest-100',
    name: 'Rounding',
    title: 'Rounding Worksheets',
    lede: 'Round whole numbers to the nearest ten, hundred or thousand.',
    groups: ['Rounding whole numbers'],
    guide: [
      'To round, find the digit in the place you are rounding to and look at the digit just to its right. If that digit is 5 or more, round up. If it is 4 or less, round down. Every digit after the rounding place becomes zero.',
      'Rounding is the basis of estimation. Students who can round quickly can check whether an exact answer is reasonable, which catches many errors in multi-digit work.',
    ],
    faq: [
      ['Does 5 round up or down?', 'In school math, 5 rounds up. 45 rounded to the nearest ten is 50, and 250 rounded to the nearest hundred is 300.'],
      ['What happens when rounding up makes a new place?', 'The number simply gets another digit. 962 rounded to the nearest hundred is 1,000.'],
    ],
  },
  {
    slug: 'telling-time',
    tile: 'telling-time/5-minutes',
    name: 'Telling Time',
    title: 'Telling Time Worksheets',
    lede: 'Analog clocks to the hour, half hour, quarter hour, five minutes and minute. Read the clock or draw the hands.',
    groups: ['Reading clocks', 'Drawing hands'],
    guide: [
      'Children learn to read clocks in a clear progression: to the hour, to the half hour (first grade), to five minutes (second grade), and to the minute (third grade). Quarter hours fit between the half hour and five minutes.',
      'Every time page can switch between two tasks. "Read the clock" shows the hands and asks for the time. "Draw the hands" gives the time and asks students to draw the hands on a blank face. The answer key shows the matching time or hands.',
      'The most common mistake is the hour hand. Between 4:00 and 5:00, the hour hand moves from 4 toward 5, so at 4:45 it is close to 5 but the hour is still 4.',
    ],
    faq: [
      ['In what order should children learn to tell time?', 'Hour, half hour, quarter hour, five minutes, then one minute. Each step reuses the one before it.'],
      ['Can I make worksheets where kids draw the hands?', 'Yes. On any telling time worksheet, set "Task" to "Draw the hands".'],
    ],
  },
  {
    slug: 'comparing-numbers',
    tile: 'comparing-numbers/3-digit',
    name: 'Comparing Numbers',
    title: 'Comparing Numbers Worksheets',
    lede: 'Greater than, less than or equal to, from two-digit numbers to the hundred thousands.',
    groups: ['Comparing whole numbers'],
    guide: [
      'Comparing numbers means comparing place by place, starting from the left. The first place where the digits differ decides which number is larger.',
      'Students write <, > or = in the circle between the two numbers. Pairs on these sheets are often close, such as 438 and 483, so students have to check every digit.',
    ],
    faq: [
      ['How do kids remember which way < and > go?', 'The open side faces the larger number. Some classes describe it as an alligator mouth that eats the bigger number.'],
    ],
  },
  {
    slug: 'order-of-operations',
    tile: 'order-of-operations/basic',
    name: 'Order of Operations',
    title: 'Order of Operations & Exponents Worksheets',
    lede: 'Evaluate expressions with parentheses, the four operations and exponents.',
    groups: ['Expressions'],
    guide: [
      'The order of operations is: parentheses, then exponents, then multiplication and division from left to right, then addition and subtraction from left to right. US classrooms call it PEMDAS. The UK and other countries use BODMAS or BIDMAS for the same rules.',
      'The left-to-right rule causes the most errors. PEMDAS lists multiplication before division, but they have equal priority, so 24 ÷ 4 × 2 is 12, not 3. These sheets include problems that test exactly that.',
    ],
    faq: [
      ['Is PEMDAS the same as BODMAS?', 'Yes. Both mean brackets or parentheses, then powers, then multiplication and division, then addition and subtraction.'],
      ['Do multiplication and division have the same priority?', 'Yes. Do whichever comes first from left to right. The same goes for addition and subtraction.'],
    ],
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));
