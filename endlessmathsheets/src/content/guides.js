// Teaching guides: long-form, step-by-step explanations with worked examples.
// Bodies are trusted HTML written here. Worked examples come from src/site/work.js,
// which computes (and checks) every number it draws.
const PUBLISHED = '2026-10-31';

const steps = (lines) => `<ol class="eqs">${lines.map(([ex, why]) => `<li><span class="ex">${ex}</span>${why ? `<span class="why">${why}</span>` : ''}</li>`).join('')}</ol>`;

const additionWithRegrouping = {
  slug: 'addition-with-regrouping',
  title: 'How to Teach Addition With Regrouping (Carrying), Step by Step',
  short: 'Addition with regrouping',
  description: 'A step-by-step guide to teaching addition with regrouping: what carrying means, worked 2- and 3-digit examples, common mistakes and a teaching order.',
  summary: 'What regrouping really means, how to model it with base-ten blocks, worked two- and three-digit examples, and the mistakes to watch for.',
  level: 'Grades 1–3',
  cats: ['addition'],
  worksheets: ['addition/2-digit-no-regrouping', 'addition/2-digit-with-regrouping', 'addition/3-digit-no-regrouping', 'addition/3-digit-with-regrouping', 'addition/4-digit', 'addition/adding-three-numbers'],
  body: ({ h2, add, a }) => `
${h2('What regrouping means')}
<p>When the digits in a column add up to 10 or more, that column can't hold the answer. Ten ones are traded for one ten, and the new ten moves to the tens column. That trade is regrouping. Many parents learned it as carrying; most US classrooms now say regrouping because the word describes what happens to the number, not just where the pencil goes.</p>
<p>Regrouping only makes sense once a child understands that the 4 in 47 means four tens. If a student can tell you that 47 is 4 tens and 7 ones, and can count on from a multiple of ten (40, 41, 42 …), they are ready. If not, spend a few days on place value first. In the Common Core standards, 1st graders add a two-digit number and a one-digit number and sometimes compose a ten (1.NBT.C.4), 2nd graders add within 100 using place value (2.NBT.B.5) and within 1,000 with models (2.NBT.B.7), and 3rd graders become fluent within 1,000 (3.NBT.A.2).</p>

${h2('Start with blocks, then the written method')}
<p>Before any written method, have students build both numbers with base-ten blocks. For 47 + 38, that's four rods and seven units, then three rods and eight units. Push the units together: 15 units. Ask, "Can we make a ten?" Students count out ten units, swap them for one rod, and see 5 units left over. Then count the rods: 4 + 3 + the new one = 8 rods. The answer is 8 tens and 5 ones, or 85.</p>
<p>Now show the written method next to the blocks. The small 1 written above the tens column is the rod they just made. Students who connect the two rarely forget to add it.</p>

${h2('Worked example: 47 + 38')}
${add(47, 38, 'The small 1 above the tens column is the ten made from 7 + 8 = 15 ones.')}
<ol>
<li>Add the ones: 7 + 8 = 15. Fifteen ones is 1 ten and 5 ones.</li>
<li>Write 5 in the ones place of the answer. Write a small 1 above the tens column for the new ten.</li>
<li>Add the tens, including the regrouped ten: 1 + 4 + 3 = 8 tens.</li>
<li>Write 8 in the tens place. The answer is 85.</li>
</ol>
<p>Check with an estimate: 47 is about 50 and 38 is about 40, so the answer should be about 90. 85 is close, so it makes sense.</p>

${h2('Worked example: 586 + 275, regrouping twice')}
${add(586, 275, 'Two regroups: the ones make a new ten, and the tens make a new hundred.')}
<ol>
<li>Ones: 6 + 5 = 11. Write 1 and regroup 1 ten.</li>
<li>Tens: 1 + 8 + 7 = 16 tens. Sixteen tens is 1 hundred and 6 tens, so write 6 and regroup 1 hundred.</li>
<li>Hundreds: 1 + 5 + 2 = 8 hundreds. Write 8. The answer is 861.</li>
</ol>
<p>The tens step is where students slip. They see 16 and "carry the 1", but 16 here means 16 tens, so the 1 they carry is a hundred. Saying the place value out loud ("sixteen tens is one hundred and six tens") makes the step make sense rather than a rule to memorize.</p>

${h2('Five common mistakes')}
<ul>
<li><b>Writing the whole column sum.</b> 47 + 38 becomes 715 because the student writes 15 under the ones and 7 under the tens. Ask, "Can one place hold two digits?"</li>
<li><b>Forgetting the regrouped ten.</b> The student writes the small 1 but doesn't add it, and gets 75. Have them say the carried digit first when they add the next column: "one, plus four, plus three."</li>
<li><b>Adding the regrouped digit to the wrong column.</b> This usually comes from crowded work. Grid paper, or a worksheet with wide spacing, keeps the columns apart.</li>
<li><b>Starting on the left.</b> Some children add the tens first because we read left to right. Then a regroup from the ones means going back and changing an answer they already wrote. Starting with the ones avoids crossed-out work.</li>
<li><b>Misaligned numbers.</b> In 352 + 47, the 4 must sit under the 5, not under the 3. Have students line up the ones digits first, then write the rest.</li>
</ul>

${h2('A teaching order that works')}
<ol>
<li>${a('addition/2-digit-no-regrouping', 'Two-digit addition with no regrouping')}, like 34 + 25, so the column method is familiar before anything new happens.</li>
<li>${a('addition/2-digit-with-regrouping', 'Two-digit addition with regrouping')}, where every problem regroups in the ones.</li>
<li>${a('addition/3-digit-no-regrouping', 'Three-digit addition without regrouping')}, then ${a('addition/3-digit-with-regrouping', 'with regrouping')} in one or both places.</li>
<li>${a('addition/4-digit', 'Four-digit addition')} and ${a('addition/adding-three-numbers', 'adding three numbers')}. With three addends, a column can reach 20 or more: 8 + 9 + 7 = 24 means write 4 and regroup 2.</li>
</ol>
<p>Move on when a student gets about 9 out of 10 right without help, not when they finish a set number of pages. A short daily set of 10 to 15 problems does more than one long sheet a week.</p>

${h2('How to check the answer')}
<p>Two quick checks catch most errors. First, estimate by rounding each number to the nearest ten or hundred before adding; if the exact answer is far from the estimate, look again. Second, check with subtraction: if 47 + 38 = 85, then 85 − 38 should be 47. Checking by subtraction also gives practice with regrouping in the other direction.</p>

${h2('Using the worksheets')}
<p>Each addition worksheet on this site follows a strict rule. On the two-digit regrouping sheet, every problem regroups in the ones; on the no-regrouping sheet, none do. So a sheet practices exactly one step of the teaching order above. Press New worksheet for a fresh set, print the answer key for self-checking, and use the sheet code in the corner to print the same problems again for a retake.</p>
`,
};

const subtractionWithRegrouping = {
  slug: 'subtraction-with-regrouping',
  title: 'Subtraction With Regrouping (Borrowing), Including Across Zeros',
  short: 'Subtraction with regrouping',
  description: 'How to teach subtraction with regrouping: trading a ten for ten ones, worked examples including subtracting across zeros, common mistakes and checks.',
  summary: 'How to explain trading a ten for ten ones, worked examples from 62 − 27 to 400 − 127, and the mistakes behind most wrong answers.',
  level: 'Grades 2–4',
  cats: ['subtraction'],
  worksheets: ['subtraction/2-digit-no-regrouping', 'subtraction/2-digit-with-regrouping', 'subtraction/3-digit-no-regrouping', 'subtraction/3-digit-with-regrouping', 'subtraction/across-zeros', 'subtraction/4-digit'],
  body: ({ h2, sub, a }) => `
${h2('What regrouping means in subtraction')}
<p>In 62 − 27, the ones column asks for 2 − 7. There aren't enough ones, so one of the 6 tens is broken into 10 ones. Now the top number is 5 tens and 12 ones, which is still 62, just written differently. Then 12 − 7 = 5 and 5 − 2 = 3. That trade is regrouping. Many adults learned it as borrowing, but nothing is ever paid back; the ten is exchanged, which is why schools now say regrouping (or exchanging, in the UK).</p>
<p>The key idea for students: regrouping changes how the top number is written, never its value. 62 can be 6 tens and 2 ones, or 5 tens and 12 ones. If students can show both with base-ten blocks, the written steps will make sense. Two-digit subtraction with regrouping is a 2nd grade skill (2.NBT.B.5), three-digit subtraction comes in 2nd and 3rd grade (2.NBT.B.7, 3.NBT.A.2), and the standard algorithm with larger numbers in 4th grade (4.NBT.B.4).</p>

${h2('Worked example: 62 − 27')}
${sub(62, 27, 'The 6 tens become 5 tens, and the 2 ones become 12 ones.')}
<ol>
<li>Look at the ones: 2 − 7. Two is smaller than seven, so regroup.</li>
<li>Cross out the 6 tens and write 5. Cross out the 2 ones and write 12.</li>
<li>Subtract the ones: 12 − 7 = 5.</li>
<li>Subtract the tens: 5 − 2 = 3. The answer is 35.</li>
</ol>
<p>Check by adding: 35 + 27 = 62.</p>

${h2('Worked example: 523 − 168, regrouping twice')}
${sub(523, 168, 'The tens change twice: they give 1 ten to the ones, then get 10 tens from the hundreds.')}
<ol>
<li>Ones: 3 − 8 needs a regroup. The 2 tens become 1 ten and the ones become 13. 13 − 8 = 5.</li>
<li>Tens: now 1 − 6 needs a regroup. The 5 hundreds become 4 hundreds and the 1 ten becomes 11 tens. 11 − 6 = 5.</li>
<li>Hundreds: 4 − 1 = 3. The answer is 355.</li>
</ol>
<p>Work one column at a time. Some students regroup every column before they start; that can work, but it makes it easy to regroup a column that didn't need it.</p>

${h2('Subtracting across zeros: 400 − 127')}
${sub(400, 127, 'With zeros in the tens and ones, the regroup starts in the hundreds: 4 hundreds become 3 hundreds, 9 tens and 10 ones.')}
<p>Problems like 400 − 127 or 3,005 − 1,268 cause more errors than any other kind of subtraction. The ones need a regroup, but the tens place has nothing to give, so the regroup has to start at the first digit that isn't zero.</p>
<ol>
<li>Ones: 0 − 7 needs a regroup, but there are 0 tens. Go to the hundreds.</li>
<li>Take 1 hundred: 4 becomes 3. That hundred is 10 tens.</li>
<li>Take 1 of those tens for the ones: the tens become 9 and the ones become 10.</li>
<li>Subtract: 10 − 7 = 3, 9 − 2 = 7, 3 − 1 = 2. The answer is 273.</li>
</ol>
<p>A shortcut many teachers like: read 400 as 40 tens and 0 ones. Take one ten from 40 to get 39 tens and 10 ones. Students write 39 over the 40 and 10 over the 0, in one step instead of two.</p>
<p>Another way avoids regrouping completely: subtract 1 from both numbers. 400 − 127 has the same answer as 399 − 126, and 399 − 126 = 273 needs no regrouping at all. Moving both numbers by the same amount keeps the difference the same, which is a useful idea in its own right.</p>

${h2('Common mistakes')}
<ul>
<li><b>Subtracting the smaller digit from the larger.</b> For 62 − 27, the student does 7 − 2 = 5 in the ones and gets 45. This is the most common error of all. Have students say "top minus bottom" for each column and circle any column where the top digit is smaller before they begin.</li>
<li><b>Regrouping without reducing the next column.</b> The ones become 12 but the 6 tens stay 6, which also gives 45. Ask, "Where did those 10 extra ones come from?"</li>
<li><b>Changing a zero to 10 and stopping.</b> In 400 − 127, the student makes the ones 10 but leaves the tens and hundreds alone, or turns the tens into 10 without taking from the hundreds.</li>
<li><b>Regrouping when it isn't needed.</b> Some students regroup in every column out of habit. Checking each column first prevents this.</li>
<li><b>Putting the numbers in the wrong order.</b> In word problems, students sometimes write the smaller number on top. The starting amount always goes on top.</li>
</ul>

${h2('Teaching order')}
<ol>
<li>${a('subtraction/2-digit-no-regrouping', 'Two-digit subtraction without regrouping')}.</li>
<li>${a('subtraction/2-digit-with-regrouping', 'Two-digit subtraction with regrouping')}, where every problem needs a regroup.</li>
<li>${a('subtraction/3-digit-no-regrouping', 'Three-digit without regrouping')}, then ${a('subtraction/3-digit-with-regrouping', 'three-digit with regrouping')}.</li>
<li>${a('subtraction/across-zeros', 'Subtracting across zeros')}.</li>
<li>${a('subtraction/4-digit', 'Four-digit subtraction')}.</li>
</ol>
<p>Once students can do both kinds, use mixed sheets so they have to decide for each problem whether a regroup is needed. Deciding is a skill of its own, and a sheet where every problem regroups never practices it.</p>

${h2('Check every answer by adding')}
<p>Subtraction has a built-in check: add the answer to the number you subtracted. If you get the starting number, the answer is right. For 400 − 127 = 273, 273 + 127 = 400. Having students check two or three problems per sheet this way keeps their addition with regrouping sharp too.</p>
`,
};

const multiplicationFacts = {
  slug: 'multiplication-facts-strategies',
  title: 'How to Learn the Multiplication Facts: Strategies for Every Times Table',
  short: 'Multiplication fact strategies',
  description: 'Strategies for learning the multiplication facts from 0 to 12: the best order to learn the tables, tricks for 9s, 6s, 7s and 8s, and a daily practice plan.',
  summary: 'The best order to learn the times tables, a strategy for every table from 0 to 12, and a short daily routine that builds real recall.',
  level: 'Grades 2–4',
  cats: ['multiplication'],
  worksheets: ['multiplication/facts-0-10', 'multiplication/facts-0-12', 'multiplication/2-times-table', 'multiplication/9-times-table', 'multiplication/6-times-table', 'multiplication/7-times-table', 'multiplication/8-times-table', 'multiplication/100-facts-timed-test'],
  body: ({ h2, a }) => `
${h2('Fewer facts than it looks')}
<p>A multiplication chart from 0 to 12 has 169 facts, which looks overwhelming. But every fact has a turnaround: 3 × 8 and 8 × 3 have the same answer. Count each pair once and there are 91 different facts. Take away the facts with 0, 1, 2, 5 and 10, which most children learn quickly, and 36 facts are left. The strategies below turn most of those into facts a child can work out from ones they already know.</p>
<p>Showing students this on a chart, by shading the facts they already know, is one of the best motivators there is. The job always looks smaller than they feared. In the Common Core standards, students should know all products of two one-digit numbers from memory by the end of 3rd grade (3.OA.C.7). In England, pupils learn all tables to 12 × 12 by the end of Year 4.</p>

${h2('The best order to learn the tables')}
<p>Learn the tables in order of difficulty, not from 1 to 12:</p>
<ol>
<li><b>0s, 1s and 10s.</b> Anything times 0 is 0; anything times 1 is itself; times 10 puts a zero on the end of a whole number.</li>
<li><b>2s and 5s.</b> Doubles and counting by fives, which many children already know.</li>
<li><b>9s and 11s.</b> Both have patterns students can see.</li>
<li><b>4s and 8s,</b> built from doubling.</li>
<li><b>3s and 6s,</b> built from facts already learned.</li>
<li><b>7s and 12s</b> last. By then, most of the 7s are already known as turnarounds.</li>
</ol>

${h2('A strategy for every table')}
<ul>
<li><b>× 2:</b> double the number. 2 × 8 = 8 + 8 = 16.</li>
<li><b>× 4:</b> double, then double again. 4 × 7: double 7 is 14, double 14 is 28.</li>
<li><b>× 8:</b> double three times. 8 × 6: 12, 24, 48.</li>
<li><b>× 5:</b> half of × 10. 5 × 8 is half of 80, which is 40. Answers always end in 0 or 5.</li>
<li><b>× 9:</b> × 10, then take away one group. 9 × 7 = 70 − 7 = 63. Check with the pattern: the tens digit is one less than the number you multiplied by (7 → 6), and the two digits add up to 9 (6 + 3). The pattern works from 9 × 1 to 9 × 10.</li>
<li><b>× 3:</b> double, plus one more group. 3 × 7 = 14 + 7 = 21.</li>
<li><b>× 6:</b> × 5, plus one more group. 6 × 7 = 35 + 7 = 42. Or double the 3s: 6 × 8 is double 24, which is 48.</li>
<li><b>× 11:</b> up to 11 × 9, write the digit twice: 11 × 4 = 44. Then learn 11 × 10 = 110, 11 × 11 = 121 and 11 × 12 = 132.</li>
<li><b>× 12:</b> × 10 plus × 2. 12 × 7 = 70 + 14 = 84.</li>
<li><b>× 7:</b> if the other tables come first, the only new 7s fact is 7 × 7 = 49. In practice, 7 × 8 and 6 × 7 are the facts children miss most, so give them extra attention. A memory aid for one of them: 5, 6, 7, 8 → 56 = 7 × 8.</li>
</ul>

${h2('The hardest facts')}
<p>The facts that take longest to learn are usually the ones with bigger factors. Keep these on a short list and practice a few every day until they are automatic.</p>
<table>
<thead><tr><th>Fact</th><th>Answer</th><th>One way to work it out</th></tr></thead>
<tbody>
<tr><td>6 × 7</td><td>42</td><td>5 × 7 = 35, plus one more 7</td></tr>
<tr><td>6 × 8</td><td>48</td><td>Double 3 × 8 = 24</td></tr>
<tr><td>7 × 7</td><td>49</td><td>5 × 7 = 35, plus 2 × 7 = 14</td></tr>
<tr><td>7 × 8</td><td>56</td><td>5, 6, 7, 8: 56 = 7 × 8</td></tr>
<tr><td>8 × 8</td><td>64</td><td>Double 8 three times: 16, 32, 64</td></tr>
<tr><td>6 × 9</td><td>54</td><td>60 − 6</td></tr>
<tr><td>7 × 9</td><td>63</td><td>70 − 7</td></tr>
<tr><td>8 × 9</td><td>72</td><td>80 − 8</td></tr>
</tbody>
</table>

${h2('A 10-minute daily routine')}
<ol>
<li><b>Warm-up, 2 minutes.</b> Skip count the table being learned, forwards and backwards.</li>
<li><b>Focus, 5 minutes.</b> 10 to 20 facts from that one table, mixed up, on paper. Our single-table sheets, like the ${a('multiplication/7-times-table', '7 times table worksheet')}, can be set to mixed order or in order.</li>
<li><b>Review, 3 minutes.</b> A few facts from every table already learned, so old facts don't fade. The ${a('multiplication/facts-0-12', 'multiplication facts worksheet')} lets you tick exactly which tables to include.</li>
</ol>
<p>Short and daily beats long and weekly: five days of ten minutes does far more than one hour on Friday. When a student answers a table's facts correctly without counting on their fingers, add the next table.</p>

${h2('Timed tests: when they help')}
<p>Timed tests measure speed, not understanding, so use them after a student can work facts out accurately with a strategy. Then a timed sheet shows which facts have moved to instant recall. Let students race their own previous score, not each other, and record it each week; a rising score is the goal. The ${a('multiplication/100-facts-timed-test', '100-problem timed test')} prints on one page for this.</p>
<p>For anxious students, untimed sheets with the same facts work almost as well. Fluency grows with regular practice whether or not a clock is running.</p>

${h2('Turnarounds and missing factors')}
<p>Once facts feel solid, mix in missing-factor problems like 7 × ? = 56. They connect multiplication to division (56 ÷ 7 = 8) and show whether a student knows a fact in every direction or only as a chant.</p>
`,
};

const multiDigitMultiplication = {
  slug: 'multi-digit-multiplication',
  title: 'Multi-Digit Multiplication: Area Model, Partial Products and the Standard Algorithm',
  short: 'Multi-digit multiplication',
  description: 'How to teach multi-digit multiplication: the area model, partial products and the standard algorithm, with worked examples and common mistakes.',
  summary: 'From the area model to the standard algorithm, with worked examples for 2-digit by 1-digit and 2-digit by 2-digit problems.',
  level: 'Grades 4–5',
  cats: ['multiplication'],
  worksheets: ['multiplication/multiples-of-10', 'multiplication/2-digit-by-1-digit', 'multiplication/3-digit-by-1-digit', 'multiplication/2-digit-by-2-digit', 'multiplication/3-digit-by-2-digit', 'multiplication/3-digit-by-3-digit'],
  body: ({ h2, mul, a }) => `
${h2('What students need first')}
<p>Multi-digit multiplication rests on two skills: the basic facts and multiplying by multiples of ten. If 6 × 4 = 24, then 6 × 40 = 240 and 60 × 40 = 2,400. Nearly every step in a long multiplication problem is one of these, so time spent here pays off. ${a('multiplication/multiples-of-10', 'Multiplying by multiples of 10')} is a good warm-up sheet.</p>
<p>In the Common Core standards, 4th graders multiply up to four digits by one digit and two digits by two digits using strategies based on place value (4.NBT.B.5). Fluency with the standard algorithm is a 5th grade goal (5.NBT.B.5).</p>

${h2('The area model')}
<p>Split each factor by place value and draw a rectangle. For 23 × 45, split 23 into 20 + 3 and 45 into 40 + 5. The rectangle has four parts:</p>
<table>
<thead><tr><th>×</th><th>40</th><th>5</th></tr></thead>
<tbody>
<tr><th>20</th><td>800</td><td>100</td></tr>
<tr><th>3</th><td>120</td><td>15</td></tr>
</tbody>
</table>
<p>Add the four parts: 800 + 100 + 120 + 15 = 1,035. The area model shows why multiplication works the way it does: every part of one number is multiplied by every part of the other.</p>

${h2('Partial products')}
<p>Partial products is the area model without the drawing. Write each product on its own line, then add: for 23 × 45, that's 3 × 5 = 15, 3 × 40 = 120, 20 × 5 = 100 and 20 × 40 = 800, for a total of 1,035. Students can find the parts in any order, which makes the method forgiving and easy to check.</p>

${h2('Standard algorithm with a one-digit multiplier: 47 × 6')}
${mul(47, 6, 'The small 4 above the tens is the 4 tens from 6 × 7 = 42.')}
<ol>
<li>Multiply the ones: 6 × 7 = 42. Write 2 in the ones place and the 4 tens above the tens column.</li>
<li>Multiply the tens: 6 × 4 = 24 tens. Then add the 4 tens you carried: 24 + 4 = 28 tens.</li>
<li>Write 28. The answer is 282.</li>
</ol>
<p>The order matters in step 2: multiply first, then add the carried digit. Students who add first work out 6 × (4 + 4) = 48 and write 482.</p>

${h2('Two-digit by two-digit: 36 × 24')}
${mul(36, 24, 'The blue zero is the placeholder: the second row is 36 × 20, not 36 × 2.')}
<ol>
<li>Multiply by the ones digit: 36 × 4 = 144. Write it on the first row.</li>
<li>Multiply by the tens digit. The 2 means 2 tens, so write a 0 in the ones place first, then 36 × 2 = 72 to its left. The row reads 720.</li>
<li>Add the two rows: 144 + 720 = 864.</li>
</ol>
<p>Estimate to check: 36 × 24 is close to 40 × 20 = 800, so 864 is reasonable. For three-digit multipliers the pattern continues: the third row starts with two placeholder zeros.</p>

${h2('Estimate before you multiply')}
<p>Round each factor to its first digit and multiply: 386 × 47 is about 400 × 50 = 20,000. The exact answer, 18,142, is close. Estimating first catches missing placeholder zeros and misplaced digits, which give answers ten times too big or too small. It takes seconds and is worth making a habit for every problem.</p>

${h2('What about the lattice method?')}
<p>Some curricula also teach the lattice method, which records the same partial products in a grid of boxes split by diagonals. It gives correct answers and some students like it, but it hides place value, so the digits stop meaning tens and hundreds. It works best as an extra way to check, alongside the area model or the standard algorithm.</p>

${h2('Common mistakes')}
<ul>
<li><b>Forgetting the placeholder zero.</b> The second row becomes 72 and the total 216. An estimate of about 800 catches this at once.</li>
<li><b>Adding the carried digit before multiplying,</b> which gives 482 for 47 × 6.</li>
<li><b>Mixing up carries from different rows.</b> Have students cross out the first row's carried digits before starting the second row, or write each row's carries in a different color.</li>
<li><b>Misaligned rows.</b> Grid paper or a worksheet with room under each problem keeps the columns straight.</li>
<li><b>Basic fact errors.</b> Many "algorithm" mistakes are really a missed fact like 7 × 8. If errors cluster on certain facts, go back to fact practice for a while.</li>
</ul>

${h2('Teaching order')}
<ol>
<li>${a('multiplication/multiples-of-10', 'Multiples of 10')}</li>
<li>${a('multiplication/2-digit-by-1-digit', '2-digit by 1-digit')}, then ${a('multiplication/3-digit-by-1-digit', '3-digit by 1-digit')}</li>
<li>${a('multiplication/2-digit-by-2-digit', '2-digit by 2-digit')}</li>
<li>${a('multiplication/3-digit-by-2-digit', '3-digit by 2-digit')} and ${a('multiplication/3-digit-by-3-digit', '3-digit by 3-digit')}</li>
</ol>
<p>Let students keep using partial products until the standard algorithm is reliable. Both methods give the same answer, and partial products makes a good check for an algorithm answer that looks wrong.</p>
`,
};

const longDivision = {
  slug: 'long-division-steps',
  title: 'How to Do Long Division, Step by Step (With Worked Examples)',
  short: 'Long division',
  description: 'Long division explained step by step: divide, multiply, subtract, bring down. Worked examples with remainders, zeros in the quotient and 2-digit divisors.',
  summary: 'The four repeating steps, worked examples with and without remainders, what to do with a zero in the quotient, and dividing by a two-digit number.',
  level: 'Grades 4–6',
  cats: ['division'],
  worksheets: ['division/facts', 'division/with-remainders', 'division/long-division-2-digit-by-1-digit', 'division/long-division-3-digit-by-1-digit', 'division/long-division-with-remainders', 'division/long-division-4-digit-by-1-digit', 'division/long-division-2-digit-divisors', 'division/long-division-4-digit-by-2-digit'],
  body: ({ h2, div, mx, a }) => `
${h2('The four steps')}
<p>Long division repeats the same four steps until there are no digits left to bring down:</p>
<ol>
<li><b>Divide</b> the part of the number you're working on by the divisor.</li>
<li><b>Multiply</b> the digit you just wrote in the answer by the divisor.</li>
<li><b>Subtract</b> that product.</li>
<li><b>Bring down</b> the next digit.</li>
</ol>
<p>A memory aid many classes use is "Does McDonald's Sell Burgers?" for Divide, Multiply, Subtract, Bring down. After every subtraction, students should check that what's left is smaller than the divisor. If it isn't, the digit they wrote in the answer was too small.</p>
<p>Students need their division facts before they start, because every "divide" step is a fact or close to one. In the Common Core standards, 4th graders divide up to four-digit numbers by one-digit divisors (4.NBT.B.6), 5th graders use two-digit divisors (5.NBT.B.6), and 6th graders become fluent with the standard algorithm (6.NS.B.2).</p>

${h2('Worked example: 952 ÷ 7')}
${div(952, 7, { caption: 'Each subtraction is underlined. The answer, 136, sits above the bracket.' })}
<ol>
<li>Divide: 7 goes into 9 one time. Write 1 above the 9.</li>
<li>Multiply: 1 × 7 = 7. Write 7 under the 9.</li>
<li>Subtract: 9 − 7 = 2.</li>
<li>Bring down the 5 to make 25.</li>
<li>Repeat: 7 goes into 25 three times (3 × 7 = 21). Write 3 above the 5. 25 − 21 = 4. Bring down the 2 to make 42.</li>
<li>Repeat: 7 goes into 42 six times (6 × 7 = 42). Write 6 above the 2. 42 − 42 = 0, and there are no digits left.</li>
</ol>
<p>The answer is 136. Check by multiplying: 136 × 7 = 952.</p>

${h2('When the first digit is too small: 256 ÷ 8')}
${div(256, 8)}
<p>8 doesn't go into 2, so use the first two digits: 8 goes into 25 three times (24), leaving 1. Bring down the 6 to make 16, and 8 goes into 16 twice. The answer is 32. The first digit of the answer goes above the 5, the last digit of the 25 you divided. Writing it above the 2 pushes every later digit out of line, which causes mistakes in longer problems.</p>

${h2('Remainders: 485 ÷ 4')}
${div(485, 4)}
<p>4 goes into 4 once. Bring down the 8: 4 goes into 8 twice. Bring down the 5: 4 goes into 5 once, with 1 left over. Nothing is left to bring down, so 1 is the remainder and the answer is 121 R1. Check: 121 × 4 + 1 = 485.</p>
<p>In word problems, the remainder needs a decision. If 485 pencils are packed in boxes of 4, there are 121 full boxes and 1 pencil left over. If 485 people travel in cars that hold 4, you need 122 cars. From 5th grade on, a remainder can also be written as a fraction (${mx(121, 1, 4)}) or a decimal (121.25).</p>

${h2('Zeros in the quotient: 624 ÷ 6')}
${div(624, 6)}
<p>6 goes into 6 once, leaving 0. Bring down the 2. 6 doesn't go into 2, so write 0 in the answer above the 2, then bring down the 4 to make 24. 6 goes into 24 four times. The answer is 104.</p>
<p>Skipping that 0 gives 14, which a quick estimate catches: 624 ÷ 6 must be about 100. Teach students to write a digit in the answer every time they bring a digit down.</p>

${h2('Two-digit divisors: 1,428 ÷ 34')}
${div(1428, 34)}
<p>With a two-digit divisor, the divide step needs an estimate. 34 doesn't go into 1 or 14, so use 142. Round 34 to 30 and ask, "How many 30s are in 142?" About 4. Check: 4 × 34 = 136, which is not more than 142, and 142 − 136 = 6, which is less than 34, so 4 is right. Bring down the 8 to make 68. 34 goes into 68 exactly twice. The answer is 42.</p>
<p>Rounding the divisor sometimes gives a digit that is one too big or too small. If the product is bigger than the number you're dividing, try one less; if what's left after subtracting is bigger than the divisor, try one more. On longer problems, writing the first few multiples of the divisor beside the problem (34, 68, 102, 136, 170 …) saves a lot of trial and error.</p>

${h2('Common mistakes')}
<ul>
<li><b>Missing a zero in the quotient,</b> like 14 instead of 104.</li>
<li><b>A remainder bigger than the divisor,</b> like "7 goes into 25 twice, remainder 11". The digit in the answer was too small.</li>
<li><b>Subtraction slips.</b> Long division includes several subtractions with regrouping, and one slip spoils every step after it.</li>
<li><b>Bringing down the wrong digit,</b> or two digits at once.</li>
<li><b>Crowded work.</b> Graph paper, or a worksheet with room under each problem, keeps the columns lined up.</li>
</ul>

${h2('Teaching order')}
<ol>
<li>${a('division/facts', 'Division facts')}, then ${a('division/with-remainders', 'division facts with remainders')}</li>
<li>${a('division/long-division-2-digit-by-1-digit', '2-digit by 1-digit long division')}</li>
<li>${a('division/long-division-3-digit-by-1-digit', '3-digit by 1-digit')} with no remainders, then ${a('division/long-division-with-remainders', 'with remainders')}</li>
<li>${a('division/long-division-4-digit-by-1-digit', '4-digit by 1-digit')}</li>
<li>${a('division/long-division-2-digit-divisors', '2-digit divisors')} and ${a('division/long-division-4-digit-by-2-digit', '4-digit by 2-digit')}</li>
</ol>
<p>Problems that divide evenly come first because students can check every answer by multiplying. Add remainders once the four steps are automatic.</p>
`,
};

const unlikeDenominators = {
  slug: 'adding-fractions-unlike-denominators',
  title: 'Adding and Subtracting Fractions With Unlike Denominators',
  short: 'Fractions with unlike denominators',
  description: 'How to add and subtract fractions with unlike denominators: finding a common denominator, worked examples, mixed numbers and the most common mistakes.',
  summary: 'Why fractions need a common denominator, how to find the least common denominator, and worked examples with simplifying, mixed numbers and regrouping.',
  level: 'Grades 4–6',
  cats: ['fractions'],
  worksheets: ['fractions/adding-like-denominators', 'fractions/subtracting-like-denominators', 'fractions/equivalent-fractions', 'fractions/adding-unlike-denominators', 'fractions/subtracting-unlike-denominators', 'fractions/adding-mixed-numbers', 'fractions/simplifying-fractions'],
  body: ({ h2, f, mx, a }) => `
${h2('Why the denominators must match')}
<p>The denominator names the size of the pieces. In ${f(2, 3)} + ${f(1, 4)}, the pieces are thirds and fourths, which are different sizes, so the numerators can't simply be added. It's like adding 2 dimes and 1 quarter: you need a common unit, cents, before you can find the total. With fractions, the common unit is a common denominator.</p>
<p>In the Common Core standards, 4th graders add and subtract fractions with like denominators (4.NF.B.3). Unlike denominators, including mixed numbers, are a 5th grade skill (5.NF.A.1).</p>

${h2('Seeing it with fraction strips')}
<p>Fraction strips make the common denominator visible. For ${f(2, 3)} + ${f(1, 4)}, lay two one-third pieces and one one-fourth piece end to end. Then look for a single piece size that measures the whole length exactly. Sixths don't work and eighths don't work, but twelfths do: eight twelfths match the two thirds, three twelfths match the one fourth, and the whole length is 11 twelfths. The written method below does exactly this, without the strips.</p>

${h2('Worked example: 2/3 + 1/4')}
<p>Find a number that both 3 and 4 divide into. Multiples of 4 are 4, 8, 12 … and 12 is also a multiple of 3, so 12 is the least common denominator.</p>
<ol>
<li>Rewrite ${f(2, 3)} as twelfths. 3 × 4 = 12, so multiply the top and bottom by 4: ${f(2, 3)} = ${f(8, 12)}.</li>
<li>Rewrite ${f(1, 4)} as twelfths. 4 × 3 = 12, so ${f(1, 4)} = ${f(3, 12)}.</li>
<li>Add the numerators and keep the denominator: ${f(8, 12)} + ${f(3, 12)} = ${f(11, 12)}.</li>
</ol>
<p>11 and 12 have no common factor, so ${f(11, 12)} is already in simplest form.</p>

${h2('When the answer is more than 1: 5/6 + 3/4')}
<p>Multiples of 6 are 6, 12 … and 12 is a multiple of 4, so use twelfths. ${f(5, 6)} = ${f(10, 12)} and ${f(3, 4)} = ${f(9, 12)}. Then ${f(10, 12)} + ${f(9, 12)} = ${f(19, 12)}. Twelve twelfths make one whole, with 7 twelfths left over, so the answer is ${mx(1, 7, 12)}.</p>

${h2('Subtracting: 3/4 − 1/6')}
<p>Twelve works again. ${f(3, 4)} = ${f(9, 12)} and ${f(1, 6)} = ${f(2, 12)}, so ${f(9, 12)} − ${f(2, 12)} = ${f(7, 12)}.</p>

${h2('Finding a common denominator quickly')}
<ul>
<li><b>If one denominator is a multiple of the other, use the bigger one.</b> For ${f(1, 3)} + ${f(1, 6)}, use sixths: ${f(2, 6)} + ${f(1, 6)} = ${f(3, 6)} = ${f(1, 2)}.</li>
<li><b>Otherwise, list multiples of the larger denominator</b> until you reach one the smaller denominator divides into. For eighths and sixths: 8, 16, 24. 24 works.</li>
<li><b>Multiplying the denominators always works,</b> though it may not give the least one. For ${f(1, 6)} + ${f(1, 4)}, multiplying gives 24ths: ${f(4, 24)} + ${f(6, 24)} = ${f(10, 24)}, which simplifies to ${f(5, 12)}. Starting with 12 gives ${f(2, 12)} + ${f(3, 12)} = ${f(5, 12)} directly, with less simplifying at the end.</li>
</ul>

${h2('Mixed numbers: 2 1/3 + 1 3/4')}
<p>Add the whole numbers and the fractions separately. 2 + 1 = 3. For the fractions, ${f(1, 3)} + ${f(3, 4)} = ${f(4, 12)} + ${f(9, 12)} = ${f(13, 12)} = ${mx(1, 1, 12)}. Then 3 + ${mx(1, 1, 12)} = ${mx(4, 1, 12)}.</p>
<p>Subtracting mixed numbers sometimes needs regrouping, just like whole numbers. In ${mx(3, 1, 4)} − ${mx(1, 2, 3)}, first rewrite both with twelfths: ${mx(3, 3, 12)} − ${mx(1, 8, 12)}. Since ${f(3, 12)} is less than ${f(8, 12)}, take 1 whole from the 3 and turn it into ${f(12, 12)}: ${mx(3, 3, 12)} = ${mx(2, 15, 12)}. Now ${mx(2, 15, 12)} − ${mx(1, 8, 12)} = ${mx(1, 7, 12)}.</p>

${h2('Fractions in word problems')}
<p>Word problems show students why the skill matters. Two worth solving together:</p>
<ul>
<li>A recipe needs ${f(2, 3)} cup of milk for the batter and ${f(1, 4)} cup for the frosting. How much milk is that in all? ${f(2, 3)} + ${f(1, 4)} = ${f(11, 12)} cup, just under 1 cup.</li>
<li>Maya ran ${mx(2, 1, 2)} miles on Saturday and ${mx(1, 3, 4)} miles on Sunday. How much farther did she run on Saturday? In fourths, that's ${mx(2, 2, 4)} − ${mx(1, 3, 4)}, which needs regrouping: ${mx(1, 6, 4)} − ${mx(1, 3, 4)} = ${f(3, 4)} mile.</li>
</ul>
<p>Ask students to estimate first with benchmarks: ${f(2, 3)} is a bit more than ${f(1, 2)}, and ${f(1, 4)} is a quarter, so the total should be a little less than 1. An estimate like that catches the add-the-denominators answer, ${f(3, 7)}, straight away.</p>

${h2('Common mistakes')}
<ul>
<li><b>Adding the denominators:</b> ${f(1, 2)} + ${f(1, 3)} = ${f(2, 5)}. A reasonableness check catches it: ${f(2, 5)} is less than ${f(1, 2)}, but adding something to ${f(1, 2)} must give more than ${f(1, 2)}. The correct answer is ${f(5, 6)}.</li>
<li><b>Changing the denominator but not the numerator,</b> like writing ${f(2, 3)} as ${f(2, 12)}.</li>
<li><b>Not simplifying:</b> ${f(3, 6)} should become ${f(1, 2)}. Teachers differ on whether this is required, but our answer keys show answers in simplest form.</li>
<li><b>Subtracting fractions "backwards"</b> in mixed numbers. In ${mx(3, 3, 12)} − ${mx(1, 8, 12)}, some students do 8 − 3 instead of regrouping.</li>
</ul>

${h2('Teaching order')}
<ol>
<li>${a('fractions/adding-like-denominators', 'Adding')} and ${a('fractions/subtracting-like-denominators', 'subtracting fractions with like denominators')}</li>
<li>${a('fractions/equivalent-fractions', 'Equivalent fractions')}, the skill every common denominator depends on</li>
<li>${a('fractions/adding-unlike-denominators', 'Adding')} and ${a('fractions/subtracting-unlike-denominators', 'subtracting fractions with unlike denominators')}</li>
<li>${a('fractions/adding-mixed-numbers', 'Adding mixed numbers')}</li>
</ol>
<p>Keep ${a('fractions/simplifying-fractions', 'simplifying')} going alongside, since nearly every answer in this unit needs it.</p>
`,
};

const mixedNumbers = {
  slug: 'mixed-numbers-and-improper-fractions',
  title: 'Mixed Numbers and Improper Fractions: How to Convert Both Ways',
  short: 'Mixed numbers and improper fractions',
  description: 'How to convert mixed numbers to improper fractions and improper fractions to mixed numbers, with worked examples, the reasons behind them and mistakes to avoid.',
  summary: 'What the two forms mean, a quick method for each direction, why the methods work, and the mistakes that trip students up.',
  level: 'Grades 4–6',
  cats: ['fractions'],
  worksheets: ['fractions/mixed-numbers-to-improper-fractions', 'fractions/improper-fractions-to-mixed-numbers', 'fractions/simplifying-fractions', 'fractions/adding-mixed-numbers'],
  body: ({ h2, f, mx, a }) => `
${h2('Two ways to write the same amount')}
<p>An improper fraction has a numerator equal to or bigger than its denominator, like ${f(7, 4)}. A mixed number writes the same amount as a whole number and a fraction: ${mx(1, 3, 4)}. ${f(7, 4)} means seven fourths. Four of those fourths make one whole, and three are left over, so ${f(7, 4)} = ${mx(1, 3, 4)}.</p>
<p>A number line makes this visible. Count fourths from 0: ${f(1, 4)}, ${f(2, 4)}, ${f(3, 4)}, ${f(4, 4)}. That fourth step lands exactly on 1. Keep counting and ${f(7, 4)} lands three fourths past 1. Fourth graders start working with mixed numbers in the Common Core standards (4.NF.B.3), and both forms appear constantly in 5th and 6th grade when students add, multiply and divide fractions.</p>

${h2('Mixed number to improper fraction: 3 2/5')}
<p>Multiply the whole number by the denominator, add the numerator, and keep the denominator.</p>
<ol>
<li>3 × 5 = 15. Three wholes are 15 fifths.</li>
<li>15 + 2 = 17 fifths in all.</li>
<li>So ${mx(3, 2, 5)} = ${f(17, 5)}.</li>
</ol>
<p>Saying "three wholes is fifteen fifths" out loud keeps the method from becoming a magic trick, and it helps students remember which numbers to multiply.</p>

${h2('Drawing it first')}
<p>Before the rule, draw it. Show ${mx(3, 2, 5)} as three circles cut into fifths and a fourth circle with two fifths shaded. Counting every shaded fifth, 5 + 5 + 5 + 2 = 17, gives ${f(17, 5)} with no rule at all. After a few pictures like this, students see that the multiply-and-add method is just a fast way of counting the pieces.</p>

${h2('Improper fraction to mixed number: 23/6')}
<p>Divide the numerator by the denominator. The quotient is the whole number, the remainder is the new numerator, and the denominator stays the same.</p>
<ol>
<li>23 ÷ 6 = 3 remainder 5, because 3 × 6 = 18 and 23 − 18 = 5.</li>
<li>The whole number is 3, and the remainder 5 becomes the numerator.</li>
<li>So ${f(23, 6)} = ${mx(3, 5, 6)}.</li>
</ol>
<p>Check by converting back: 3 × 6 + 5 = 23, so ${mx(3, 5, 6)} = ${f(23, 6)}.</p>

${h2('Simplifying and whole numbers')}
<p>Sometimes the fraction part can be simplified. ${f(14, 4)} = ${mx(3, 2, 4)} = ${mx(3, 1, 2)}. You can also simplify first: ${f(14, 4)} = ${f(7, 2)} = ${mx(3, 1, 2)}. Either order gives the same answer.</p>
<p>If the division has no remainder, the improper fraction is a whole number: ${f(12, 4)} = 3 and ${f(20, 5)} = 4.</p>

${h2('Common mistakes')}
<ul>
<li><b>Adding instead of multiplying:</b> ${mx(3, 2, 5)} becomes ${f('3 + 2', 5)} = ${f(5, 5)}.</li>
<li><b>Multiplying by the wrong number:</b> 3 × 2 + 5 = 11, giving ${f(11, 5)}. The whole number is multiplied by the denominator, not the numerator.</li>
<li><b>Mixing up the quotient and the remainder:</b> ${f(23, 6)} written as ${mx(5, 3, 6)}.</li>
<li><b>Leaving the fraction part improper:</b> ${mx(2, 7, 4)} isn't finished. ${f(7, 4)} = ${mx(1, 3, 4)}, so ${mx(2, 7, 4)} = ${mx(3, 3, 4)}.</li>
</ul>

${h2('Where students need both forms')}
<p>Students rarely convert for its own sake. Improper fractions are easier to multiply and divide: to work out ${mx(2, 1, 2)} × 3, write ${f(5, 2)} × 3 = ${f(15, 2)} = ${mx(7, 1, 2)}. Mixed numbers are easier to picture and compare: ${mx(7, 1, 2)} cups is clearly between 7 and 8 cups, while ${f(15, 2)} cups isn't obvious at a glance. The usual habit is to calculate with improper fractions and give the final answer as a mixed number, which is what our answer keys do.</p>

${h2('Choosing a level')}
<p>The ${a('fractions/mixed-numbers-to-improper-fractions', 'mixed numbers to improper fractions')} and ${a('fractions/improper-fractions-to-mixed-numbers', 'improper fractions to mixed numbers')} worksheets each have a grade setting. Grade 4 sheets use denominators from 2 to 6 and whole numbers up to 5. Grade 5 sheets use denominators up to 12 and whole numbers up to 9. Grade 6 sheets use denominators up to 20 and whole numbers up to 12, which makes the mental multiplication more demanding.</p>
<p>Practice both directions in the same week. Converting back is the natural check for each answer, and students who only ever convert one way often freeze when a problem needs the other.</p>
`,
};

const equivalentFractions = {
  slug: 'equivalent-fractions',
  title: 'Equivalent Fractions, Simplifying and Comparing Fractions',
  short: 'Equivalent fractions',
  description: 'How to teach equivalent fractions: why multiplying top and bottom works, finding a missing number, simplifying with the GCF and comparing fractions.',
  summary: 'Why multiplying the top and bottom by the same number works, how to find a missing number, simplify with the greatest common factor and compare any two fractions.',
  level: 'Grades 3–5',
  cats: ['fractions'],
  worksheets: ['fractions/equivalent-fractions', 'fractions/simplifying-fractions', 'fractions/comparing-fractions'],
  body: ({ h2, f, a }) => `
${h2('What makes fractions equivalent')}
<p>Fold a strip of paper in half and shade one half. Fold it in half again: now 2 of 4 parts are shaded. Fold again: 4 of 8. The shaded amount never changed, so ${f(1, 2)} = ${f(2, 4)} = ${f(4, 8)}. Each fold doubled both the number of parts and the number of shaded parts.</p>
<p>That's the rule: multiplying the numerator and the denominator by the same number gives an equivalent fraction, because it cuts every piece into the same number of smaller, equal pieces. Dividing both by the same number works in reverse. In the Common Core standards, 3rd graders recognize simple equivalent fractions (3.NF.A.3), and 4th graders explain why they are equivalent and compare fractions with different numerators and denominators (4.NF.A.1, 4.NF.A.2).</p>

${h2('Equivalent fractions on a number line')}
<p>Draw a number line from 0 to 1 and mark it in thirds. Underneath, draw another marked in sixths, and under that one in twelfths. ${f(1, 3)}, ${f(2, 6)} and ${f(4, 12)} all land on the same point, and so do ${f(2, 3)}, ${f(4, 6)} and ${f(8, 12)}. Number lines help students see fractions as numbers with a position, not just shaded shapes, which matters later for comparing fractions and for fractions greater than 1.</p>

${h2('Finding a missing number: 3/4 = ?/20')}
<ol>
<li>Compare the denominators: 4 became 20, and 4 × 5 = 20.</li>
<li>Do the same to the numerator: 3 × 5 = 15.</li>
<li>So ${f(3, 4)} = ${f(15, 20)}.</li>
</ol>
<p>It works in reverse too. In ${f(18, 24)} = ${f('?', 4)}, the denominator was divided by 6, so divide the numerator by 6: 18 ÷ 6 = 3, giving ${f(3, 4)}.</p>

${h2('Simplifying fractions')}
<p>A fraction is in simplest form when its numerator and denominator have no common factor except 1. To simplify, divide both by a common factor. The fastest way is to use the greatest common factor (GCF).</p>
<p>Example: ${f(18, 24)}. The factors of 18 are 1, 2, 3, 6, 9 and 18. The factors of 24 are 1, 2, 3, 4, 6, 8, 12 and 24. The greatest factor they share is 6, so ${f(18, 24)} = ${f(3, 4)}.</p>
<p>Students who can't spot the GCF can divide in smaller steps: ${f(18, 24)} → ${f(9, 12)} (divide by 2) → ${f(3, 4)} (divide by 3). It takes longer but reaches the same answer. The fraction is finished when no number except 1 divides both parts.</p>

${h2('Comparing fractions')}
<ul>
<li><b>Same denominator:</b> compare the numerators. ${f(5, 8)} > ${f(3, 8)}.</li>
<li><b>Same numerator:</b> the smaller denominator means bigger pieces. ${f(3, 5)} > ${f(3, 8)}, because fifths are bigger than eighths.</li>
<li><b>Different numerators and denominators:</b> rewrite both with a common denominator. For ${f(5, 8)} and ${f(3, 5)}, use fortieths: ${f(5, 8)} = ${f(25, 40)} and ${f(3, 5)} = ${f(24, 40)}, so ${f(5, 8)} is bigger.</li>
</ul>
<p>Benchmarks are often faster. Compare each fraction with ${f(1, 2)}: ${f(3, 7)} is less than ${f(1, 2)} (half of 7 is 3.5), and ${f(5, 9)} is more than ${f(1, 2)} (half of 9 is 4.5), so ${f(5, 9)} > ${f(3, 7)} with no calculation at all.</p>
<p>Cross-multiplying is a shortcut for the common-denominator method: for ${f(5, 8)} and ${f(3, 5)}, compare 5 × 5 = 25 with 3 × 8 = 24. It's quick, but teach it after students understand that 25 and 24 are the numerators over the common denominator 40.</p>

${h2('Common mistakes')}
<ul>
<li><b>Adding the same number to the top and bottom:</b> ${f(2, 3)} → ${f(3, 4)}. Adding doesn't keep the value; ${f(3, 4)} is bigger than ${f(2, 3)}.</li>
<li><b>Changing only one part:</b> ${f(3, 4)} = ${f(3, 20)}.</li>
<li><b>Thinking a bigger denominator means a bigger fraction:</b> ${f(1, 8)} > ${f(1, 4)}. Ask, "Would you rather have a quarter of a pizza or an eighth?"</li>
<li><b>Stopping before simplest form:</b> ${f(12, 18)} → ${f(6, 9)} is equivalent but not simplest. ${f(2, 3)} is.</li>
</ul>

${h2('Quick classroom activities')}
<ul>
<li><b>Fraction wall hunt.</b> Give students a fraction wall and ask them to find every fraction equal to ${f(1, 2)}: ${f(2, 4)}, ${f(3, 6)}, ${f(4, 8)}, ${f(5, 10)} and ${f(6, 12)}. Then ask what they notice about the numerators and denominators.</li>
<li><b>Same or different?</b> Write pairs like ${f(2, 5)} and ${f(6, 15)}, or ${f(3, 4)} and ${f(4, 5)}, and have students hold up a card for "same" or "different", then explain one pair.</li>
<li><b>Simplest form race.</b> Partners each simplify the same five fractions, one using the GCF and one dividing in small steps, and compare answers and time.</li>
</ul>

${h2('Practice')}
<p>Start with ${a('fractions/equivalent-fractions', 'equivalent fractions')} using fraction strips or a fraction wall, then move to ${a('fractions/simplifying-fractions', 'simplifying fractions')} and ${a('fractions/comparing-fractions', 'comparing fractions')}. All three skills feed straight into adding and subtracting fractions with unlike denominators.</p>
`,
};

const decimals = {
  slug: 'decimals',
  title: 'Teaching Decimals: Place Value, Adding, Subtracting and Multiplying',
  short: 'Decimals',
  description: 'A guide to teaching decimals: place value to thousandths, comparing, adding and subtracting with the points lined up, multiplying, dividing and rounding.',
  summary: 'Decimal place value to thousandths, why lining up the points matters, how to multiply and divide decimals, and the misconceptions to watch for.',
  level: 'Grades 4–6',
  cats: ['decimals'],
  worksheets: ['decimals/decimal-place-value', 'decimals/adding-decimals', 'decimals/subtracting-decimals', 'decimals/adding-and-subtracting-decimals', 'decimals/multiplying-decimals', 'decimals/dividing-decimals-by-whole-numbers', 'decimals/rounding-decimals'],
  body: ({ h2, dec, a }) => `
${h2('Place value to thousandths')}
<p>Decimals extend place value to the right of the ones place. Each place is one tenth of the place to its left: tenths, hundredths, thousandths.</p>
<table>
<thead><tr><th>Tens</th><th>Ones</th><th></th><th>Tenths</th><th>Hundredths</th><th>Thousandths</th></tr></thead>
<tbody><tr><td>4</td><td>5</td><td>.</td><td>3</td><td>7</td><td>2</td></tr></tbody>
</table>
<p>So 45.372 means 4 tens, 5 ones, 3 tenths, 7 hundredths and 2 thousandths. The value of the 7 is 7 hundredths, or 0.07. Our ${a('decimals/decimal-place-value', 'decimal place value worksheet')} asks exactly this question for an underlined digit.</p>
<p>Money is a natural model for tenths and hundredths: $3.45 is 3 dollars, 4 dimes (tenths of a dollar) and 5 pennies (hundredths). In the Common Core standards, 4th graders use decimal notation for tenths and hundredths (4.NF.C.6), 5th graders read, write and compare decimals to thousandths and add, subtract, multiply and divide decimals to hundredths (5.NBT.A.3, 5.NBT.B.7), and 6th graders become fluent with the standard algorithms (6.NS.B.3).</p>

${h2('Comparing decimals')}
<p>The most common decimal misconception is that a longer decimal is bigger. Students say 0.45 is more than 0.5 because 45 is more than 5. Writing both with the same number of places fixes it: 0.50 and 0.45. Now it's clear that 50 hundredths is more than 45 hundredths. The same idea explains why 0.5, 0.50 and 0.500 are all equal.</p>

${h2('Adding and subtracting: line up the points')}
<p>Line up the decimal points so that tenths are added to tenths and hundredths to hundredths. Fill empty places with zeros so every number has the same number of decimal places, then add or subtract as with whole numbers and bring the point straight down.</p>
${dec('12.5', '3.75', '+', 'The blue zero was added so both numbers have two decimal places.')}
${dec('8', '2.35', '-', 'A whole number has a decimal point after the ones. Writing 8 as 8.00 makes the regrouping visible.')}
<p>Subtraction from a whole number, like 8 − 2.35, is where most errors happen. Without the zeros, students often write the answer as 6.35 (bringing down the 35 instead of regrouping). With 8.00 written out, it is an ordinary subtraction with regrouping: 800 − 235 = 565, so the answer is 5.65.</p>

${h2('Multiplying decimals')}
<p>Multiply as if there were no decimal points, then count the decimal places in both factors and give the answer that many places.</p>
<ul>
<li>2.4 × 0.3: 24 × 3 = 72. The factors have 1 + 1 = 2 decimal places, so the answer is 0.72.</li>
<li>1.25 × 4: 125 × 4 = 500. Two decimal places gives 5.00, which is 5.</li>
<li>0.6 × 0.5: 6 × 5 = 30. Two decimal places gives 0.30, which is 0.3.</li>
</ul>
<p>An estimate keeps this honest: 2.4 × 0.3 is a little more than 2 × 0.3 = 0.6, so 0.72 makes sense and 7.2 doesn't. It also helps to say out loud that multiplying by a number less than 1 makes the answer smaller. That surprises students who learned that multiplying always makes numbers bigger.</p>

${h2('Dividing a decimal by a whole number')}
<p>Divide just as with whole numbers and put the decimal point in the answer straight above the point in the number being divided. For 7.5 ÷ 3: 3 goes into 7 twice (6), leaving 1; bring down the 5 to make 15; 3 goes into 15 five times. Put the point above the point: 2.5. Check: 2.5 × 3 = 7.5.</p>
<p>If there is a remainder when the digits run out, write a zero and keep going. 6.3 ÷ 4 = 1.575, because 6.3 is the same as 6.300. Check: 1.575 × 4 = 6.3.</p>

${h2('Rounding decimals')}
<p>Rounding decimals follows the same rule as whole numbers: look at the digit just to the right of the place you're rounding to. To round 3.476 to the nearest hundredth, look at the thousandths digit, 6. It is 5 or more, so round up: 3.48. To the nearest tenth, look at the hundredths digit, 7: the answer is 3.5.</p>
<p>Watch for rounding that regroups: 2.97 to the nearest tenth is 3.0, not 2.10. Keep the zero to show the answer was rounded to tenths.</p>

${h2('Common mistakes')}
<ul>
<li><b>Thinking longer means larger:</b> 0.45 > 0.5.</li>
<li><b>Lining up the last digits instead of the points,</b> which adds hundredths to tenths.</li>
<li><b>Counting decimal places in the wrong place</b> when multiplying, or lining up the points in multiplication (which isn't needed).</li>
<li><b>Dropping the point in division,</b> or putting it where it would go in the divisor instead of the dividend.</li>
</ul>

${h2('Teaching order')}
<ol>
<li>${a('decimals/decimal-place-value', 'Decimal place value')}</li>
<li>${a('decimals/adding-decimals', 'Adding')} and ${a('decimals/subtracting-decimals', 'subtracting decimals')}, then ${a('decimals/adding-and-subtracting-decimals', 'mixed practice')}</li>
<li>${a('decimals/multiplying-decimals', 'Multiplying decimals')}</li>
<li>${a('decimals/dividing-decimals-by-whole-numbers', 'Dividing decimals by whole numbers')}</li>
<li>${a('decimals/rounding-decimals', 'Rounding decimals')}, which can come at any point after place value</li>
</ol>
`,
};

const tellingTime = {
  slug: 'telling-time',
  title: 'How to Teach Telling Time on an Analog Clock',
  short: 'Telling time',
  description: "How to teach telling time on an analog clock: a teaching order from o'clock to the minute, the hour hand trap, quarter past and quarter to, and drawing hands.",
  summary: 'A teaching order from o’clock to the nearest minute, how to read the hour hand correctly, quarter past and quarter to, and drawing the hands.',
  level: 'Grades 1–3',
  cats: ['telling-time'],
  worksheets: ['telling-time/hour', 'telling-time/half-hour', 'telling-time/quarter-hour', 'telling-time/5-minutes', 'telling-time/1-minute', 'telling-time/drawing-clock-hands'],
  body: ({ h2, clocks, a }) => `
${h2('A teaching order')}
<ol>
<li><b>Hours.</b> The minute hand points straight up at 12, and the hour hand points at the hour.</li>
<li><b>Half hours.</b> The minute hand points down at 6, and the hour hand sits halfway between two numbers.</li>
<li><b>Quarter hours:</b> quarter past and quarter to.</li>
<li><b>Five minutes.</b> Count by fives around the clock.</li>
<li><b>The nearest minute.</b></li>
</ol>
${clocks([[4, 0], [7, 30], [9, 15], [2, 45]], 'From left: 4:00, 7:30, 9:15 (quarter past 9) and 2:45 (quarter to 3).')}
<p>In the Common Core standards, 1st graders tell and write time in hours and half hours (1.MD.B.3), 2nd graders tell time to the nearest five minutes and use a.m. and p.m. (2.MD.C.7), and 3rd graders tell time to the nearest minute and solve elapsed time problems (3.MD.A.1).</p>

${h2('Start with the hour hand alone')}
<p>Many teachers begin with a clock that has only an hour hand. Children learn to say "it's about 3" or "a bit after 3" from where the short hand points. This builds the habit that prevents the most errors later: read the hour from the hour hand's position, not from whichever number is closest.</p>

${h2('The hour hand trap')}
${clocks([[2, 50]], '2:50. The hour hand is almost at the 3, but it hasn’t reached it, so the hour is still 2.')}
<p>At 2:50 the hour hand is very close to the 3. Children who read the nearest number say 3:50, an hour too late. The rule: the hour is the number the hour hand has most recently passed. Until the minute hand gets back up to 12, the hour hasn't changed.</p>
<p>The same slip happens at half past. At 7:30 the hour hand is halfway between 7 and 8, and some students read it as 8:30. It has passed 7 but not 8, so the hour is 7.</p>

${h2('Reading the minutes')}
<p>For the minute hand, each number on the clock stands for 5 minutes: 1 is 5 minutes, 2 is 10 minutes, and so on to 12, which is 0 minutes (or 60). Practice counting by fives around the clock before reading times. For times to the minute, count by fives to the last number the minute hand passed, then count the small marks one at a time: three marks past the 4 is 20 + 3 = 23 minutes.</p>

${h2('Quarter past, half past and quarter to')}
<p>These phrases come from dividing the clock into four quarters of 15 minutes. Quarter past 9 is 9:15. Half past 7 is 7:30. Quarter to 3 is 2:45, because there is a quarter of an hour to go until 3.</p>
<p>"Quarter to" is the hardest phrase, because the hour you say (3) is not the hour you write (2). Have students say both: "quarter to three, two forty-five". Our ${a('telling-time/quarter-hour', 'quarter hour worksheets')} mix quarter past, half past and quarter to on the same sheet.</p>

${h2('Drawing the hands')}
<p>Drawing hands on a blank clock checks understanding better than reading does, because the student has to place the hour hand between the numbers. Watch for three errors:</p>
<ul>
<li>Hands drawn the same length, so nobody can tell which is which.</li>
<li>The hour hand pointing exactly at the hour at half past, instead of halfway to the next number.</li>
<li>The minute hand pointing at the number of minutes: at 4:10, pointing at the 10 instead of the 2.</li>
</ul>
<p>The ${a('telling-time/drawing-clock-hands', 'draw the clock hands worksheet')} has blank clocks for this, and its answer key shows every clock filled in.</p>

${h2('Practice tips')}
<ul>
<li>Use a geared clock, where turning the minute hand moves the hour hand. It shows how the two hands move together.</li>
<li>Ask about time during the day: "What time is it now? What time will it be in half an hour?"</li>
<li>Mix reading and drawing sheets in the same week.</li>
<li>Connect analog and digital: have students write the digital time under every clock they read.</li>
</ul>
`,
};

const orderOfOperations = {
  slug: 'order-of-operations',
  title: 'Order of Operations (PEMDAS): Rules, Worked Examples and Common Mistakes',
  short: 'Order of operations',
  description: 'The order of operations explained: what PEMDAS really means, the left-to-right rule for multiplication and division, and worked examples with exponents.',
  summary: 'What PEMDAS really means, why multiplication doesn’t always come before division, and worked examples with parentheses and exponents.',
  level: 'Grades 5–7',
  cats: ['order-of-operations'],
  worksheets: ['order-of-operations/basic', 'order-of-operations/with-exponents', 'order-of-operations/exponents'],
  body: ({ h2, f, a }) => `
${h2('Why there is an order')}
<p>3 + 4 × 2 could mean (3 + 4) × 2 = 14 or 3 + (4 × 2) = 11. Mathematicians agreed on an order so that everyone gets the same answer from the same expression, and under that agreement the answer is 11: multiplication comes before addition.</p>

${h2('The order')}
<ol>
<li><b>Parentheses</b> and other grouping symbols, such as brackets.</li>
<li><b>Exponents.</b></li>
<li><b>Multiplication and division,</b> from left to right.</li>
<li><b>Addition and subtraction,</b> from left to right.</li>
</ol>
<p>PEMDAS ("Please Excuse My Dear Aunt Sally") is the usual US memory aid. In the UK and Australia it's BODMAS or BIDMAS (Brackets, Orders or Indices, Division, Multiplication, Addition, Subtraction), and in Canada it's often BEDMAS. They all describe the same rules. In the Common Core standards, 5th graders evaluate expressions with parentheses and brackets (5.OA.A.1), and 6th graders add whole-number exponents (6.EE.A.1, 6.EE.A.2c).</p>

${h2('The left-to-right rule')}
<p>This is where PEMDAS misleads people. M comes before D in the word, but multiplication and division have the same rank: do whichever comes first, reading from left to right. The same goes for addition and subtraction.</p>
${steps([['24 ÷ 4 × 2', ''], ['= 6 × 2', 'Divide first: it comes first from the left'], ['= 12', 'Not 24 ÷ 8 = 3']])}
${steps([['10 − 4 + 3', ''], ['= 6 + 3', 'Subtract first: it comes first from the left'], ['= 9', 'Not 10 − 7 = 3']])}
<p>Writing the rule as P, E, MD, AS on four lines, with multiplication and division sharing a line, makes the pairs clear.</p>

${h2('Worked examples')}
${steps([['8 + 6 × (5 − 3)', ''], ['= 8 + 6 × 2', 'Parentheses'], ['= 8 + 12', 'Multiply'], ['= 20', 'Add']])}
${steps([['3 + 2² × 5', ''], ['= 3 + 4 × 5', 'Exponent: 2² = 4'], ['= 3 + 20', 'Multiply'], ['= 23', 'Add']])}
${steps([['2 × [12 − (3 + 5)]', ''], ['= 2 × [12 − 8]', 'Innermost grouping first'], ['= 2 × 4', 'Then the brackets'], ['= 8', 'Multiply']])}
${steps([['18 ÷ 3 × 2 + 4 × (6 − 1)', ''], ['= 18 ÷ 3 × 2 + 4 × 5', 'Parentheses'], ['= 6 × 2 + 4 × 5', 'Left to right: divide first'], ['= 12 + 20', 'Both multiplications'], ['= 32', 'Add']])}
<p>Encourage one step per line, rewriting the whole expression each time. Underlining the operation to do next, before calculating it, helps students see the order instead of guessing it.</p>

${h2('Common mistakes')}
<ul>
<li><b>Working strictly left to right:</b> 3 + 4 × 2 = 14.</li>
<li><b>Always multiplying before dividing,</b> or always adding before subtracting.</li>
<li><b>Misreading exponents:</b> 2³ means 2 × 2 × 2 = 8, not 2 × 3 = 6.</li>
<li><b>Applying an exponent to the wrong number:</b> in 3 × 4², only the 4 is squared, so the answer is 3 × 16 = 48, not 12² = 144.</li>
<li><b>Dropping part of the expression</b> when rewriting. Rewriting the whole line each time prevents it.</li>
</ul>

${h2('Fraction bars group too')}
<p>A fraction bar works like parentheses around the top and around the bottom. In ${f('8 + 4', 3)}, add first: 12 ÷ 3 = 4. Written on one line, the same expression needs parentheses: (8 + 4) ÷ 3. Leaving them out gives 8 + 4 ÷ 3, which is a different number.</p>

${h2('Where students meet this again')}
<p>Order of operations comes back in every later math course. In algebra, 2x + 3 when x = 5 means 2 × 5 + 3 = 13, not 2 × 8 = 16. Scientific calculators follow the order of operations, but many basic calculators work strictly left to right, so 3 + 4 × 2 gives 14 on them. Trying the same expression on both kinds of calculator is a memorable way to show why the convention exists.</p>

${h2('Practice')}
<p>Start with ${a('order-of-operations/basic', 'whole-number expressions with parentheses')}, then add ${a('order-of-operations/exponents', 'exponents on their own')} before ${a('order-of-operations/with-exponents', 'expressions that combine exponents with the other operations')}. Every answer on our sheets is a whole number, so a fraction or decimal answer is a sign that a step went wrong.</p>
`,
};

const roundTo = (n, p) => Math.round(n / p) * p;
const comma = (n) => n.toLocaleString('en-US');

const rounding = {
  slug: 'rounding',
  title: 'Rounding Numbers to the Nearest 10, 100 and 1,000',
  short: 'Rounding',
  description: 'How to teach rounding to the nearest 10, 100 and 1,000 using number lines, the halfway rule, worked examples and the mistakes students make most often.',
  summary: 'Rounding with a number line first, then the digit rule, with worked examples to the nearest 10, 100 and 1,000 and the errors to watch for.',
  level: 'Grades 3–4',
  cats: ['rounding'],
  worksheets: ['rounding/nearest-10', 'rounding/nearest-100', 'rounding/nearest-1000', 'rounding/mixed-places', 'decimals/rounding-decimals'],
  body: ({ h2, a }) => `
${h2('Rounding means "which is closer?"')}
<p>Rounding replaces a number with a nearby friendly number. To round 47 to the nearest ten, ask which ten it's closer to: 40 or 50. On a number line from 40 to 50, 47 is 3 away from 50 and 7 away from 40, so 47 rounds to 50.</p>
<p>Start with number lines before teaching any rule. A student who can find the tens on either side of a number and see which is closer understands rounding; the digit rule is only a shortcut. In the Common Core standards, 3rd graders round to the nearest 10 or 100 (3.NBT.A.1), and 4th graders round multi-digit numbers to any place (4.NBT.A.3).</p>

${h2('The halfway rule')}
<p>A number exactly halfway, like 45, is the same distance from 40 and from 50. By convention it rounds up, so 45 rounds to 50. In the same way, 250 rounds to 300 (nearest hundred) and 1,500 rounds to 2,000 (nearest thousand).</p>

${h2('The rounding hill')}
<p>Some teachers draw the numbers from 40 to 50 as a hill, with 45 at the top. Numbers on the 40 side roll back down to 40, and 45 and everything after it roll down to 50. The picture is a reminder that 45 goes up, and that rounding is about which side of the middle a number sits on.</p>

${h2('The digit rule')}
<ol>
<li>Find the digit in the place you're rounding to. To round 365 to the nearest hundred, that's the 3.</li>
<li>Look at the digit just to its right: 6.</li>
<li>If that digit is 5 or more, add 1 to the rounding digit. If it's 4 or less, leave the rounding digit as it is.</li>
<li>Change every digit to the right of the rounding place to 0.</li>
</ol>
<p>So 365 rounds to 400. Rounding 243 to the nearest ten, look at the ones digit, 3, which is 4 or less: 240.</p>

${h2('Worked examples')}
<table>
<thead><tr><th>Number</th><th>Nearest 10</th><th>Nearest 100</th><th>Nearest 1,000</th></tr></thead>
<tbody>${[1482, 2950, 6035, 8749].map((n) => `<tr><td>${comma(n)}</td><td>${comma(roundTo(n, 10))}</td><td>${comma(roundTo(n, 100))}</td><td>${comma(roundTo(n, 1000))}</td></tr>`).join('')}</tbody>
</table>
<p>Rounding 2,950 to the nearest hundred regroups: the tens digit is 5, so the 9 hundreds go up by 1 to make 10 hundreds, which is another thousand. The answer is 3,000. Students who change only the hundreds digit sometimes write 2,1000; talking it through as "29 hundreds plus 1 hundred is 30 hundreds" fixes it.</p>

${h2('Common mistakes')}
<ul>
<li><b>Rounding in a chain.</b> 445 to the nearest hundred is 400, because 445 is closer to 400 than to 500. Rounding to the nearest ten first (450) and then to the nearest hundred gives 500, which is wrong. Only ever look at the one digit just right of the rounding place.</li>
<li><b>Leaving digits instead of zeros:</b> 365 rounded to the nearest hundred written as 465 or 405.</li>
<li><b>Looking at the wrong digit:</b> rounding 1,482 to the nearest ten as 1,490, by looking at the 8 instead of the 2.</li>
<li><b>Rounding down by taking 1 away:</b> 243 to the nearest ten written as 230. Rounding down keeps the rounding digit the same.</li>
</ul>

${h2('Rounding for estimation')}
<p>Rounding is most useful as a check. Before adding 386 + 512, round to 400 + 500 = 900; the exact answer, 898, should be close. Students who estimate first catch most place-value errors on their own, which is the best reason to keep rounding practice going long after the unit ends.</p>

${h2('Rounding in real life')}
<p>Rounding is everywhere outside school: a $38.75 shirt is "about $40", a 1,482-mile road trip is "about 1,500 miles", and a crowd of 23,618 is "about 24,000 people". Asking students to round numbers from real ads, maps or sports results makes practice feel less abstract, and it shows that the place you round to depends on why you're rounding.</p>

${h2('Practice')}
<p>Work through ${a('rounding/nearest-10', 'rounding to the nearest 10')}, ${a('rounding/nearest-100', 'nearest 100')} and ${a('rounding/nearest-1000', 'nearest 1,000')}, then use ${a('rounding/mixed-places', 'mixed places')} so students have to read which place each problem asks for. ${a('decimals/rounding-decimals', 'Rounding decimals')} uses exactly the same rule.</p>
`,
};

const busStop = {
  slug: 'bus-stop-method',
  uk: true,
  title: 'The Bus Stop Method: Short Division Explained',
  short: 'Bus stop method',
  description: 'How to do short division with the bus stop method: the layout, carrying remainders, zeros in the answer and interpreting remainders, with worked examples.',
  summary: 'How the bus stop layout works, carrying remainders to the next digit, zeros in the answer, and what to do with a remainder.',
  level: 'Years 5–6',
  cats: ['maths'],
  worksheets: ['maths/times-tables', 'maths/multiplication-tables-check', 'maths/short-division', 'maths/long-division'],
  body: ({ h2, bus, f, mx, a }) => `
${h2('What the bus stop method is')}
<p>Short division is the formal written method pupils in England use to divide a number with up to four digits by a one-digit number. It's called the bus stop method because the number being divided sits under a bracket that looks like a bus shelter, with the divisor waiting outside.</p>
<p>In the National Curriculum, pupils use short division in Year 5, interpreting remainders appropriately. In Year 6 they also divide by two-digit numbers, using short division or long division depending on the numbers. Short division is the same calculation as long division: the subtraction is done mentally, and what's left over is written as a small digit in front of the next digit.</p>
<p>Pupils need secure times tables first. Every step asks a question like "how many 9s are in 74?", which is a times table fact with something left over.</p>

${h2('Worked example: 7,412 ÷ 9')}
${bus(7412, 9, 'The small digits are the carried remainders. The answer, 823 r5, goes on top of the bus stop.')}
<ol>
<li>9 into 7 doesn't go. Carry the 7 to the next digit to make 74 (write a small 7 before the 4).</li>
<li>9 into 74 goes 8 times, because 8 × 9 = 72, with 2 left over. Write 8 above the 4 and carry the 2 to make 21.</li>
<li>9 into 21 goes 2 times (18), with 3 left over. Write 2 above the 1 and carry the 3 to make 32.</li>
<li>9 into 32 goes 3 times (27), with 5 left over. Write 3 above the 2. There are no digits left, so 5 is the remainder.</li>
</ol>
<p>The answer is 823 r5. Check: 823 × 9 = 7,407, and 7,407 + 5 = 7,412.</p>

${h2('Zeros in the answer: 2,436 ÷ 4')}
${bus(2436, 4)}
<p>4 into 2 doesn't go, so carry the 2 to make 24. 4 into 24 is exactly 6. 4 into 3 doesn't go, so write 0 in the answer and carry the 3 to make 36. 4 into 36 is 9. The answer is 609.</p>
<p>Leaving out the 0 gives 69, which an estimate catches straight away: 2,436 ÷ 4 must be about 600. Every digit under the bus stop, after the first, needs a digit above it.</p>

${h2('What to do with a remainder')}
<p>Year 6 pupils are expected to interpret remainders according to the context. 7,412 ÷ 9 can be written as:</p>
<ul>
<li>a remainder: 823 r5;</li>
<li>a fraction, with the remainder over the divisor: ${mx(823, 5, 9)};</li>
<li>a decimal, by writing 7,412 as 7,412.000 and carrying on: 823.555…, or 823.56 to two decimal places.</li>
</ul>
<p>In a word problem, the context decides. If 7,412 tins are packed in trays of 9, there are 823 full trays. If 7,412 people travel in minibuses that seat 9, you need 824 minibuses, because nobody can be left behind.</p>

${h2('Short division or long division?')}
<p>Short division is quicker for one-digit divisors, and for two-digit divisors whose multiples pupils know well, such as 11, 12, 15 or 25. Long division writes out every subtraction, which is easier to follow and check when dividing by numbers like 34 or 47. Many schools teach short division first and add ${a('maths/long-division', 'long division')} in Year 6.</p>

${h2('Common mistakes')}
<ul>
<li><b>Writing a carried remainder in the answer</b> instead of in front of the next digit.</li>
<li><b>Leaving out zeros</b> in the answer, as in 69 for 2,436 ÷ 4.</li>
<li><b>Times table slips.</b> Most bus stop errors are really times table errors, so keep ${a('maths/times-tables', 'times tables practice')} going alongside.</li>
<li><b>Forgetting the final remainder,</b> or writing a remainder bigger than the divisor.</li>
<li><b>Starting from the right,</b> as in column addition. Division always starts from the left.</li>
</ul>

${h2('Practise')}
<p>The ${a('maths/short-division', 'short division worksheets')} print on A4 with the bus stop layout and remainders written as r. Pupils who need to firm up their tables first can use the ${a('maths/multiplication-tables-check', 'multiplication tables check practice sheets')}.</p>
`,
};

export const GUIDES = [
  additionWithRegrouping,
  subtractionWithRegrouping,
  multiplicationFacts,
  multiDigitMultiplication,
  longDivision,
  equivalentFractions,
  unlikeDenominators,
  mixedNumbers,
  decimals,
  rounding,
  tellingTime,
  orderOfOperations,
  busStop,
].map((g) => ({ published: PUBLISHED, updated: PUBLISHED, ...g }));
