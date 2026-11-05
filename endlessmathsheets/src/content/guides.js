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


const additionFacts = {
  slug: 'addition-facts-strategies',
  title: 'Addition Facts Strategies: Counting On, Doubles and Making Ten',
  short: 'Addition fact strategies',
  description: 'How children learn the addition facts to 20: counting on, doubles, near doubles, making ten and fact families, with a teaching order and practice ideas.',
  summary: 'Counting on, doubles, near doubles and making ten, the order to teach them, and short practice routines that build real recall.',
  level: 'Kindergarten–Grade 2',
  cats: ['addition'],
  worksheets: ['addition/within-5', 'addition/within-10', 'addition/within-20', 'addition/single-digit', 'addition/missing-addend', 'addition/100-facts-timed-test'],
  body: ({ h2, a }) => `
${h2('What knowing the facts means')}
<p>A child knows an addition fact when they can give the answer quickly, without counting on their fingers, and can explain how they could work it out if they forgot. Both parts matter. Children who only memorize get stuck when a fact slips; children who only count stay slow. Strategies come first, then practice turns the strategies into recall.</p>
<p>In the Common Core standards, kindergartners add and subtract fluently within 5 (K.OA.A.5), 1st graders become fluent within 10 and use strategies within 20 (1.OA.C.6), and by the end of 2nd grade children know all sums of two one-digit numbers from memory (2.OA.B.2).</p>

${h2('Counting on')}
<p>The first strategy is counting on from the larger number. For 2 + 7, start at 7 and count two more: 8, 9. Children who start at 1 and count everything ("1, 2, … 9") need to learn that they can hold the first number in their head. Showing that 2 + 7 and 7 + 2 have the same answer lets them always start with the bigger number. Counting on works well for adding 1, 2 or 3, and becomes slow and error-prone beyond that.</p>

${h2('Doubles and near doubles')}
<p>Doubles are the easiest facts to memorize because children see them everywhere: 5 + 5 fingers, 6 + 6 eggs in a carton, 4 + 4 legs on a spider. Once doubles are known, near doubles follow: 6 + 7 is 6 + 6 and one more, so 13. 8 + 9 is 8 + 8 and one more, so 17. Encourage children to say the double out loud first.</p>

${h2('Making ten')}
<p>Making ten is the most powerful strategy for facts that cross 10. For 8 + 5, 8 needs 2 more to make 10, so split 5 into 2 and 3: 8 + 2 = 10 and 10 + 3 = 13. Ten frames make this visible: fill the frame with 8 counters, move 2 of the 5 across to complete it, and 3 are left outside.</p>
<p>Making ten depends on knowing the number bonds to 10 (1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5) without thinking. If a child hesitates on those, practice them first; every make-ten step uses one.</p>

${h2('A teaching order')}
<ol>
<li>Adding 0, 1 and 2 by counting on, and the turnaround idea (2 + 7 = 7 + 2).</li>
<li>Number bonds to 10.</li>
<li>Doubles to 10 + 10.</li>
<li>Facts with 9 and 8, using making ten (9 + 6 = 10 + 5).</li>
<li>Near doubles (6 + 7, 7 + 8).</li>
<li>The remaining facts, such as 7 + 4 and 6 + 3, using whichever strategy the child finds easiest.</li>
</ol>

${h2('Fact families')}
<p>Every addition fact comes with a family: 3 + 5 = 8, 5 + 3 = 8, 8 − 5 = 3 and 8 − 3 = 5. Teaching addition and subtraction facts together halves the work, and ${a('addition/missing-addend', 'missing addend problems')} like 5 + ? = 8 build the bridge between them.</p>

${h2('Practice that works')}
<ul>
<li><b>Short and daily.</b> Five to ten minutes a day beats a long session once a week.</li>
<li><b>One strategy at a time.</b> A sheet of near doubles teaches more than a random mix while the strategy is new.</li>
<li><b>Then mix.</b> Once strategies are secure, mixed sheets make children choose a strategy for each fact, which is what real fluency needs.</li>
<li><b>Games.</b> Dice games, card games ("make ten" with a deck of cards) and quick oral quizzes in the car all count.</li>
<li><b>Timed tests last.</b> Use them only after a child is accurate, and compare each child with their own previous score.</li>
</ul>
<p>Our worksheets follow the same progression: ${a('addition/within-5', 'within 5')}, ${a('addition/within-10', 'within 10')}, ${a('addition/within-20', 'within 20')}, then ${a('addition/100-facts-timed-test', 'the 100-problem timed test')} for fluency checks.</p>
`,
};

const subtractionFacts = {
  slug: 'subtraction-facts-strategies',
  title: 'Subtraction Facts Strategies: Think Addition, Count Up and Subtract Through Ten',
  short: 'Subtraction fact strategies',
  description: 'How to teach the subtraction facts to 20: thinking addition, counting up, subtracting through ten and fact families, plus the mistakes children make.',
  summary: 'Thinking addition, counting back and up, subtracting through ten, and how to avoid the counting mistakes that cause most errors.',
  level: 'Kindergarten–Grade 2',
  cats: ['subtraction'],
  worksheets: ['subtraction/within-5', 'subtraction/within-10', 'subtraction/within-20', 'subtraction/2-digit-minus-1-digit', 'subtraction/100-facts-timed-test'],
  body: ({ h2, a }) => `
${h2('Why subtraction feels harder')}
<p>Most children find subtraction facts harder than addition facts, mainly because counting backwards is harder than counting forwards. The good news is that children rarely need to count back at all. If they know their addition facts, every subtraction fact is an addition fact in disguise.</p>
<p>The Common Core expectations match addition: fluency within 5 in kindergarten (K.OA.A.5), within 10 in 1st grade (1.OA.C.6), and all facts within 20 from memory by the end of 2nd grade (2.OA.B.2).</p>

${h2('Think addition')}
<p>For 13 − 8, ask "8 plus what makes 13?" A child who knows 8 + 5 = 13 has the answer: 5. This is the most reliable strategy because it reuses facts the child already knows. Practise it by saying the related addition fact out loud before writing each subtraction answer.</p>

${h2('Counting back and counting up')}
<p>Counting back works for taking away 1, 2 or 3: 9 − 2 is "8, 7", so 7. The classic mistake is counting the starting number: for 12 − 3, a child says "12, 11, 10" and writes 10. Teach children to count the jumps, not the numbers: start at 12 and jump back three times, landing on 9.</p>
<p>When the two numbers are close together, counting up is faster. For 12 − 9, start at 9 and count up to 12: 10, 11, 12. That's three jumps, so 12 − 9 = 3. A number line shows why: subtraction finds the distance between two numbers.</p>

${h2('Subtracting through ten')}
<p>For facts that cross 10, break the number you're subtracting into two parts. For 14 − 6, first take away 4 to reach 10 (14 − 4 = 10), then take away the other 2 (10 − 2 = 8). This mirrors the make-ten strategy for addition and depends on the same number bonds.</p>
<p>Another way is to subtract from the ten: for 15 − 9, take 9 from the 10 in 15 to leave 1, then add the 5 ones back: 1 + 5 = 6. Some children find one method much easier than the other; either is fine.</p>

${h2('Fact families and doubles')}
<p>Doubles help with subtraction too: if 8 + 8 = 16, then 16 − 8 = 8. Fact family triangles (with the total at the top and the two parts at the bottom) make the link between addition and subtraction visual: cover one corner and work out the missing number.</p>

${h2('Common mistakes')}
<ul>
<li><b>Counting the starting number</b> when counting back, which gives answers one too big.</li>
<li><b>Turning the problem around:</b> doing 3 − 7 instead of 7 − 3, often written as "4" for 3 − 7. In facts this shows up as confusion about which number to start from.</li>
<li><b>Guessing from the look of the numbers</b> rather than using a strategy, such as writing 15 − 9 = 4 by mixing it up with 15 − 9 = 6 and 13 − 9 = 4.</li>
</ul>

${h2('Practice')}
<p>Work through ${a('subtraction/within-5', 'within 5')}, ${a('subtraction/within-10', 'within 10')} and ${a('subtraction/within-20', 'within 20')}, then use ${a('subtraction/2-digit-minus-1-digit', '2-digit minus 1-digit problems')} to extend the strategies to bigger numbers: 43 − 7 is 43 − 3 = 40, then 40 − 4 = 36. The ${a('subtraction/100-facts-timed-test', 'subtraction timed test')} is useful once children are accurate.</p>
`,
};

const placeValue = {
  slug: 'place-value-and-comparing-numbers',
  title: 'Place Value and Comparing Numbers: Ones, Tens, Hundreds and Beyond',
  short: 'Place value and comparing',
  description: 'How to teach place value and comparing numbers: digits and their values, expanded form, zero as a placeholder, and using < and > correctly.',
  summary: 'What each digit is worth, expanded form, why zero matters, and a reliable method for comparing and ordering numbers.',
  level: 'Grades 1–4',
  cats: ['comparing-numbers', 'rounding'],
  worksheets: ['comparing-numbers/up-to-100', 'comparing-numbers/3-digit', 'comparing-numbers/large-numbers', 'rounding/nearest-10', 'rounding/nearest-100'],
  body: ({ h2, a }) => `
${h2('Digits and their values')}
<p>Our number system uses only ten digits, 0 to 9, and a digit's value depends on its place. In 4,382, the 4 is worth 4,000, the 3 is worth 300, the 8 is worth 80 and the 2 is worth 2. The digit is 3, but its value is 300. Being clear about that difference is the heart of place value.</p>
<table>
<thead><tr><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Ones</th></tr></thead>
<tbody><tr><td>4</td><td>3</td><td>8</td><td>2</td></tr></tbody>
</table>
<p>Each place is worth ten times the place to its right: 10 ones make a ten, 10 tens make a hundred, 10 hundreds make a thousand. Base-ten blocks show this physically, and 4th graders are expected to explain it in words (4.NBT.A.1).</p>

${h2('Expanded form')}
<p>Writing a number in expanded form makes each value visible: 4,382 = 4,000 + 300 + 80 + 2. Going the other way, from expanded form back to a number, is a good check that a child understands. The trickiest cases have missing places: 5,000 + 60 + 7 is 5,067, with a zero holding the hundreds place.</p>

${h2('Zero as a placeholder')}
<p>Zero has no value of its own, but it holds a place open. 405 and 45 have the same nonzero digits, yet 405 is 4 hundreds and 45 is 4 tens. Children who write "four hundred five" as 4005 are writing down what they hear rather than what each place holds; a place value chart fixes this quickly.</p>

${h2('Comparing numbers')}
<ol>
<li>For whole numbers, the one with more digits is larger: 1,204 > 987.</li>
<li>If they have the same number of digits, compare from the left. Look at the biggest place first.</li>
<li>Keep going right until two digits are different. The number with the bigger digit there is larger: 438 &lt; 483 because, with the hundreds equal, 3 tens is less than 8 tens.</li>
</ol>
<p>The symbols are easier to remember as "the open side faces the bigger number" or "the small point faces the smaller number" than as an alligator eating, which some children apply backwards. In the Common Core standards, 1st graders compare two-digit numbers (1.NBT.B.3), 2nd graders three-digit numbers (2.NBT.A.4) and 4th graders multi-digit numbers (4.NBT.A.2).</p>

${h2('Common mistakes')}
<ul>
<li><b>Comparing the last digits:</b> saying 29 > 41 because 9 > 1.</li>
<li><b>Ignoring the number of digits:</b> saying 999 > 1,002 because 9 is the biggest digit.</li>
<li><b>Reversing the symbol,</b> especially when the larger number is on the right.</li>
<li><b>Losing track in big numbers.</b> Commas split numbers into groups of three, which makes 456,736 and 465,736 easier to compare.</li>
</ul>

${h2('Quick place value activities')}
<ul>
<li><b>Biggest and smallest:</b> give four digit cards, such as 3, 8, 1 and 6. What's the biggest number you can make? (8,631) The smallest? (1,368)</li>
<li><b>Say it, build it:</b> say a number aloud and have children build it with base-ten blocks or write it in a place value chart.</li>
<li><b>Ten more, ten less:</b> from 347, what's ten more (357), a hundred less (247)? Only one digit changes, unless the change crosses a ten or hundred.</li>
</ul>

${h2('Practice')}
<p>Start with ${a('comparing-numbers/up-to-100', 'comparing numbers up to 100')}, including pairs like 47 and 74, then ${a('comparing-numbers/3-digit', 'three-digit numbers')} and ${a('comparing-numbers/large-numbers', 'large numbers')}. Rounding, such as ${a('rounding/nearest-10', 'to the nearest 10')}, uses the same place value thinking and is a natural next step.</p>
`,
};

const integers = {
  slug: 'integers',
  title: 'Adding, Subtracting, Multiplying and Dividing Integers',
  short: 'Integers',
  description: 'How to add, subtract, multiply and divide positive and negative numbers, with number line models, the sign rules, why they work and common mistakes.',
  summary: 'Number line models for adding and subtracting, the sign rules for multiplying and dividing, why a negative times a negative is positive, and common mistakes.',
  level: 'Grades 6–7',
  cats: ['integers'],
  worksheets: ['integers/adding-integers', 'integers/subtracting-integers', 'integers/multiplying-integers', 'integers/dividing-integers'],
  body: ({ h2, a }) => `
${h2('Integers on the number line')}
<p>Integers are the whole numbers and their opposites: … −3, −2, −1, 0, 1, 2, 3 … On a number line, negative numbers sit to the left of zero. Every number has an opposite the same distance from zero on the other side: the opposite of 6 is −6. The distance from zero is called the absolute value, so |−6| = 6. Sixth graders meet negative numbers on the number line (6.NS.C.5, 6.NS.C.6), and 7th graders add, subtract, multiply and divide them (7.NS.A.1, 7.NS.A.2).</p>
<p>Real contexts help: temperatures below zero, elevations below sea level, and money owed. "It was −4 °C and the temperature rose 10 degrees" is −4 + 10 = 6.</p>

${h2('Adding integers')}
<p>On the number line, adding a positive number moves right and adding a negative number moves left. Two rules cover every case:</p>
<ul>
<li><b>Same signs:</b> add the absolute values and keep the sign. −7 + (−5) = −12.</li>
<li><b>Different signs:</b> subtract the smaller absolute value from the larger, and use the sign of the number with the larger absolute value. −7 + 5 = −2, and 7 + (−5) = 2.</li>
</ul>
<p>Two-color counters show the second rule well: a positive and a negative counter cancel to make zero, and whatever is left over is the answer.</p>

${h2('Subtracting integers')}
<p>Subtracting a number is the same as adding its opposite. Rewrite every subtraction as an addition, then use the addition rules:</p>
<ul>
<li>3 − 8 = 3 + (−8) = −5</li>
<li>−4 − (−9) = −4 + 9 = 5</li>
<li>−6 − 2 = −6 + (−2) = −8</li>
</ul>
<p>The number line explains why subtracting a negative moves right: 5 − (−3) asks for the distance from −3 up to 5, which is 8.</p>

${h2('Multiplying and dividing integers')}
<p>Multiply or divide the absolute values, then decide the sign. If the two numbers have the same sign, the answer is positive; if they have different signs, the answer is negative.</p>
<ul>
<li>−6 × 4 = −24</li>
<li>−6 × (−4) = 24</li>
<li>−24 ÷ 3 = −8</li>
<li>−24 ÷ (−3) = 8</li>
</ul>

${h2('Why a negative times a negative is positive')}
<p>A pattern makes the rule believable. Look at −3 times numbers that go down by 1:</p>
<p>−3 × 2 = −6, −3 × 1 = −3, −3 × 0 = 0, −3 × (−1) = ?</p>
<p>Each answer goes up by 3, so the next answer is 3. A negative times a negative continues the pattern into positive numbers.</p>

${h2('Integers in real life')}
<ul>
<li><b>Temperature:</b> at 6 a.m. it was −8 °F, and by noon it was 15 °F. The rise was 15 − (−8) = 23 degrees.</li>
<li><b>Elevation:</b> a diver at −30 m rises 12 m, reaching −30 + 12 = −18 m.</li>
<li><b>Money:</b> a balance of −$20 (owing $20) plus a $45 deposit is −20 + 45 = $25.</li>
</ul>
<p>Problems like these give students a way to check whether an answer makes sense before they rely on the rules alone.</p>

${h2('Common mistakes')}
<ul>
<li><b>Using the multiplication rule for addition:</b> saying −3 + (−5) = 8 because "two negatives make a positive". The rule about two negatives is only for multiplying and dividing.</li>
<li><b>−3 − 5 = −2.</b> The correct answer is −8: starting at −3 and moving 5 further left.</li>
<li><b>Dropping a sign</b> when rewriting, especially the negative inside parentheses.</li>
<li><b>Mixing up the sign of the answer</b> when adding numbers with different signs. Ask, "Which number is farther from zero?"</li>
</ul>

${h2('Practice')}
<p>Work through ${a('integers/adding-integers', 'adding integers')} and ${a('integers/subtracting-integers', 'subtracting integers')} until rewriting subtraction as addition is automatic, then ${a('integers/multiplying-integers', 'multiplying')} and ${a('integers/dividing-integers', 'dividing integers')}. Mixed practice afterwards helps students choose the right rule.</p>
`,
};

const multiplyDivideFractions = {
  slug: 'multiplying-and-dividing-fractions',
  title: 'Multiplying and Dividing Fractions, With the Reasons Behind the Rules',
  short: 'Multiplying and dividing fractions',
  description: 'How to multiply and divide fractions: fractions times whole numbers, the area model, simplifying first, mixed numbers and why "keep, change, flip" works.',
  summary: 'Multiplying by whole numbers and by fractions, simplifying before you multiply, mixed numbers, and why dividing means multiplying by the reciprocal.',
  level: 'Grades 4–6',
  cats: ['fractions'],
  worksheets: ['fractions/multiplying-fractions-by-whole-numbers', 'fractions/multiplying-fractions', 'fractions/dividing-fractions', 'fractions/simplifying-fractions', 'fractions/mixed-numbers-to-improper-fractions'],
  body: ({ h2, f, mx, a }) => `
${h2('A fraction times a whole number')}
<p>3 × ${f(2, 5)} means three groups of ${f(2, 5)}: ${f(2, 5)} + ${f(2, 5)} + ${f(2, 5)} = ${f(6, 5)}, which is ${mx(1, 1, 5)}. So multiply the numerator by the whole number and keep the denominator. Fourth graders multiply a fraction by a whole number this way (4.NF.B.4).</p>

${h2('A fraction times a fraction')}
<p>Multiply the numerators and multiply the denominators: ${f(2, 3)} × ${f(3, 4)} = ${f(6, 12)} = ${f(1, 2)}.</p>
<p>The area model shows why. Draw a rectangle and shade ${f(3, 4)} of it with vertical lines. Then shade ${f(2, 3)} of the whole rectangle with horizontal lines. The rectangle is now cut into 3 × 4 = 12 small pieces, and the double-shaded part is 2 × 3 = 6 of them: ${f(6, 12)}. Fifth graders multiply fractions and explain it with models like this (5.NF.B.4).</p>
<p>Multiplying by a fraction less than 1 gives a smaller answer: half of a third is ${f(1, 6)}. Saying "of" for × helps: ${f(1, 2)} × ${f(1, 3)} is "half of a third".</p>

${h2('Simplify first')}
<p>You can simplify before multiplying by dividing a numerator and a denominator by a common factor. In ${f(4, 9)} × ${f(3, 8)}, divide 4 and 8 by 4, and 3 and 9 by 3: the problem becomes ${f(1, 3)} × ${f(1, 2)} = ${f(1, 6)}. Multiplying first gives ${f(12, 72)}, which simplifies to the same ${f(1, 6)} with more work.</p>

${h2('Mixed numbers')}
<p>Change mixed numbers to improper fractions before multiplying: ${mx(1, 1, 2)} × ${mx(2, 2, 3)} = ${f(3, 2)} × ${f(8, 3)} = ${f(24, 6)} = 4. Multiplying the whole numbers and the fractions separately (1 × 2 and ${f(1, 2)} × ${f(2, 3)}) gives the wrong answer, because it leaves out two of the four parts of the area model.</p>

${h2('Dividing fractions')}
<p>Start with a question children can picture: how many quarters are in 3? Each whole has 4 quarters, so 3 ÷ ${f(1, 4)} = 12. Dividing by ${f(1, 4)} gave the same answer as multiplying by 4.</p>
<p>That is the reason for the rule: to divide by a fraction, multiply by its reciprocal (flip the second fraction). It's often taught as "keep, change, flip".</p>
<ul>
<li>${f(3, 4)} ÷ ${f(1, 8)} = ${f(3, 4)} × ${f(8, 1)} = ${f(24, 4)} = 6. Check: there are 6 eighths in three quarters.</li>
<li>${f(2, 3)} ÷ ${f(4, 5)} = ${f(2, 3)} × ${f(5, 4)} = ${f(10, 12)} = ${f(5, 6)}.</li>
</ul>
<p>Fifth graders divide unit fractions by whole numbers and whole numbers by unit fractions (5.NF.B.7); dividing a fraction by a fraction is a 6th grade standard (6.NS.A.1).</p>

${h2('Fractions in word problems')}
<ul>
<li>A recipe needs ${f(3, 4)} cup of flour, and you're making half the recipe: ${f(1, 2)} × ${f(3, 4)} = ${f(3, 8)} cup.</li>
<li>How many ${f(1, 3)}-cup servings are in 2 cups of juice? 2 ÷ ${f(1, 3)} = 6 servings.</li>
<li>A ribbon ${mx(2, 1, 2)} meters long is cut into pieces ${f(1, 2)} meter long. How many pieces? ${mx(2, 1, 2)} ÷ ${f(1, 2)} = ${f(5, 2)} × 2 = 5 pieces.</li>
</ul>
<p>Word problems like these show why division by a fraction can give a bigger number: you're counting how many small pieces fit.</p>

${h2('Common mistakes')}
<ul>
<li><b>Flipping the wrong fraction.</b> Only the divisor, the second fraction, is flipped.</li>
<li><b>Finding a common denominator to multiply.</b> It isn't needed, and it makes the numbers bigger.</li>
<li><b>Multiplying mixed numbers part by part</b> instead of converting to improper fractions.</li>
<li><b>Cross-multiplying</b> when the problem is multiplication, not a comparison or proportion.</li>
</ul>

${h2('Practice')}
<p>Begin with ${a('fractions/multiplying-fractions-by-whole-numbers', 'fractions times whole numbers')}, then ${a('fractions/multiplying-fractions', 'multiplying fractions')} and ${a('fractions/dividing-fractions', 'dividing fractions')}. Keep ${a('fractions/simplifying-fractions', 'simplifying')} and ${a('fractions/mixed-numbers-to-improper-fractions', 'converting mixed numbers')} going, since nearly every problem uses them.</p>
`,
};

const exponents = {
  slug: 'exponents',
  title: 'Exponents Explained: Squares, Cubes and Powers of 10',
  short: 'Exponents',
  description: 'What exponents mean, squares and cubes, powers of 10, exponents of 1 and 0, and where exponents fit in the order of operations, with common mistakes.',
  summary: 'What the base and exponent mean, squares and cubes, powers of 10, the zero exponent, and exponents in the order of operations.',
  level: 'Grades 5–7',
  cats: ['order-of-operations'],
  worksheets: ['order-of-operations/exponents', 'order-of-operations/with-exponents', 'order-of-operations/basic'],
  body: ({ h2, a }) => `
${h2('Base and exponent')}
<p>An exponent is a short way to write repeated multiplication. In 2⁴, 2 is the base and 4 is the exponent: use 2 as a factor four times. 2⁴ = 2 × 2 × 2 × 2 = 16. It's read "2 to the fourth power" or "2 to the fourth". Sixth graders write and evaluate expressions with whole-number exponents (6.EE.A.1).</p>

${h2('Squares and cubes')}
<p>An exponent of 2 is called squared because a square with side 5 has an area of 5 × 5 = 5² = 25 square units. An exponent of 3 is called cubed because a cube with edge 3 has a volume of 3 × 3 × 3 = 3³ = 27 cubic units. Drawing the square and building the cube from unit cubes makes the names stick.</p>
<p>The squares from 1² to 12² are worth knowing by heart: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121 and 144. They come up constantly, from area problems to square roots.</p>

${h2('Powers of 10')}
<p>Powers of 10 follow a simple pattern: the exponent tells you how many zeros to write. 10² = 100, 10³ = 1,000 and 10⁶ = 1,000,000. Fifth graders use this to multiply by powers of 10: 6 × 10⁴ = 60,000 (5.NBT.A.2). It's also the basis of scientific notation later on.</p>

${h2('Exponents of 1 and 0')}
<p>Any number to the first power is itself: 7¹ = 7. Any nonzero number to the zeroth power is 1, which surprises students. A pattern explains it: 7³ = 343, 7² = 49, 7¹ = 7. Each step divides by 7, so the next step is 7 ÷ 7 = 1, and 7⁰ = 1.</p>

${h2('Exponents in the order of operations')}
<p>Exponents come after parentheses and before multiplication and division. That changes answers:</p>
<ul>
<li>2 × 3² = 2 × 9 = 18</li>
<li>(2 × 3)² = 6² = 36</li>
<li>4 + 2³ = 4 + 8 = 12</li>
</ul>
<p>The exponent applies only to the number (or parentheses) directly before it. In 2 × 3², only the 3 is squared.</p>

${h2('Exponents in real life')}
<p>Exponents appear wherever things grow by repeated multiplication. Computer memory is counted in powers of 2: 2¹⁰ = 1,024, which is why a kilobyte was traditionally 1,024 bytes. Area is measured in square units and volume in cubic units, which is where squared and cubed come from. And anything that doubles, like a folded sheet of paper (1, 2, 4, 8, 16 layers), follows powers of 2.</p>

${h2('A first look at square roots')}
<p>Square roots undo squaring. Because 7² = 49, the square root of 49 is 7, written √49 = 7. Students who know the squares from 1² to 12² can find the square roots of those numbers instantly, which is a good reason to learn the squares well.</p>

${h2('Common mistakes')}
<ul>
<li><b>Multiplying the base by the exponent:</b> 2⁴ = 8 instead of 16, or 5² = 10 instead of 25.</li>
<li><b>Adding instead of multiplying:</b> 3³ = 3 + 3 + 3 = 9 instead of 27.</li>
<li><b>Squaring too much:</b> treating 2 × 3² as (2 × 3)².</li>
<li><b>Writing too many or too few zeros</b> in powers of 10. Count the exponent, not the digits.</li>
</ul>

${h2('Practice')}
<p>Start with ${a('order-of-operations/exponents', 'evaluating exponents')} on their own, then ${a('order-of-operations/with-exponents', 'expressions that combine exponents with other operations')}. Students who are unsure of the order of operations can review ${a('order-of-operations/basic', 'expressions without exponents')} first.</p>
`,
};

const divisionFacts = {
  slug: 'division-facts',
  title: 'Division Facts: Sharing, Grouping and Thinking Multiplication',
  short: 'Division facts',
  description: 'How to teach the division facts: sharing and grouping, fact families, thinking multiplication, rules for 0 and 1, a learning order and first remainders.',
  summary: 'The two meanings of division, using multiplication facts to divide, the rules for 0 and 1, and a simple start on remainders.',
  level: 'Grades 3–4',
  cats: ['division'],
  worksheets: ['division/dividing-by-2', 'division/dividing-by-5', 'division/dividing-by-3', 'division/facts', 'division/with-remainders', 'division/100-facts-timed-test'],
  body: ({ h2, a }) => `
${h2('Two meanings of division')}
<p>Division answers two different questions, and children need both:</p>
<ul>
<li><b>Sharing:</b> 12 cookies shared equally among 3 children. How many does each child get? 4.</li>
<li><b>Grouping:</b> 12 cookies put in bags of 3. How many bags? 4.</li>
</ul>
<p>Both are written 12 ÷ 3 = 4. Acting out each with counters, before any worksheet, prevents a lot of confusion in word problems later. Third graders interpret division both ways (3.OA.A.2).</p>

${h2('Think multiplication')}
<p>Every division fact belongs to a multiplication fact family: 4 × 6 = 24, 6 × 4 = 24, 24 ÷ 6 = 4 and 24 ÷ 4 = 6. So the best strategy for 24 ÷ 6 is to ask, "6 times what is 24?" A child who knows 6 × 4 = 24 has the answer. Third graders are expected to understand division as an unknown-factor problem (3.OA.B.6) and to know all the facts within 100 by the end of the year (3.OA.C.7).</p>
<p>This means division facts are only as strong as multiplication facts. If a child is slow on 56 ÷ 7, check whether they know 7 × 8 first.</p>

${h2('A learning order')}
<ol>
<li>Dividing by ${a('division/dividing-by-2', '2')}, ${a('division/dividing-by-5', '5')} and 10: the easiest multiplication tables.</li>
<li>Dividing by ${a('division/dividing-by-3', '3')} and 4.</li>
<li>Dividing by 6, 7, 8 and 9.</li>
<li>Dividing by 11 and 12, if your curriculum includes them.</li>
<li>${a('division/facts', 'Mixed division facts')}.</li>
</ol>

${h2('Rules for 0 and 1')}
<ul>
<li>Any number divided by 1 is itself: 7 ÷ 1 = 7.</li>
<li>Any number (except 0) divided by itself is 1: 7 ÷ 7 = 1.</li>
<li>0 divided by any number (except 0) is 0: 0 ÷ 7 = 0. Sharing nothing among 7 people gives each person nothing.</li>
<li>You can't divide by 0. Asking "0 times what is 7?" has no answer.</li>
</ul>

${h2('First remainders')}
<p>When a number can't be shared equally, there's a remainder. For 29 ÷ 4, find the biggest multiple of 4 that isn't more than 29: 4 × 7 = 28. That leaves 29 − 28 = 1, so 29 ÷ 4 = 7 R1. The remainder must always be less than the number you divided by; if it isn't, the answer was too small. Our ${a('division/with-remainders', 'division with remainders worksheet')} practises exactly this step, which is also the heart of long division.</p>

${h2('Word problems')}
<p>Division word problems are easier when children decide first whether they are sharing or grouping:</p>
<ul>
<li>"There are 35 apples and 5 baskets. How many apples go in each basket?" This is sharing: 35 ÷ 5 = 7 apples per basket.</li>
<li>"There are 35 apples. Each bag holds 5. How many bags are needed?" This is grouping: 35 ÷ 5 = 7 bags.</li>
</ul>
<p>Asking children to draw a quick picture (baskets with apples, or bags) before writing the number sentence makes the meaning clear and catches problems that need multiplication instead.</p>

${h2('Practice tips')}
<ul>
<li>Practise division facts alongside the matching times table, not weeks later.</li>
<li>Use word problems that switch between sharing and grouping.</li>
<li>Once children are accurate, the ${a('division/100-facts-timed-test', 'division timed test')} shows which facts are automatic.</li>
</ul>
`,
};

const factFluency = {
  slug: 'math-fact-fluency',
  title: 'Math Fact Fluency: How to Use Timed Tests Without the Stress',
  short: 'Fact fluency and timed tests',
  description: 'How to build math fact fluency: what fluency means, when timed tests help, how to run them fairly, tracking progress and alternatives for anxious children.',
  summary: 'What fluency really means, when timed tests help and when they hurt, a fair way to run them, and how to track progress.',
  level: 'Grades 1–4',
  cats: ['addition', 'subtraction', 'multiplication', 'division'],
  worksheets: ['addition/100-facts-timed-test', 'subtraction/100-facts-timed-test', 'multiplication/100-facts-timed-test', 'division/100-facts-timed-test'],
  body: ({ h2, a }) => `
${h2('What fluency means')}
<p>Fact fluency is more than speed. A fluent child answers accurately, quickly and flexibly: they know 7 + 8 = 15 at once, and if they ever forget, they can rebuild it from 7 + 7 = 14. Many teachers treat a fact as automatic when a child answers it in about three seconds without counting.</p>
<p>Fluency matters because it frees up attention. A child working on long division who has to count out 7 × 8 on their fingers loses track of the steps. Children who know their facts can think about the new idea instead.</p>

${h2('When timed tests help')}
<p>Timed tests are a measuring tool, not a teaching tool. They work well when:</p>
<ul>
<li>the child can already work out every fact on the sheet accurately with a strategy;</li>
<li>the goal is to see which facts have become automatic;</li>
<li>each child compares their score with their own last score, not with classmates.</li>
</ul>
<p>They work badly when they come before understanding, when results are posted publicly, or when a child freezes under time pressure. For those children, the same sheet without a clock still builds fluency.</p>

${h2('A fair way to run them')}
<ol>
<li>Choose sheets that only include facts the class has learned. Our multiplication timed test lets you tick which tables to include.</li>
<li>Explain the goal: "Beat your own score from last week."</li>
<li>Use the same time limit each time, such as 5 minutes for 100 problems, and let children stop when time is up rather than rushing the last row.</li>
<li>Mark with the answer key, or have children mark their own.</li>
<li>Record the number correct on a simple chart that only the child (and you) see.</li>
</ol>
<p>Because every click on our site makes a new sheet, children can't memorize the order of answers, and the sheet code in the corner lets you reprint an identical sheet if you want an exact retest.</p>

${h2('Tracking progress')}
<p>A rising line on a personal chart is motivating in a way a single score never is. Look at errors as well as speed: if a child misses the same three facts every week, those facts go on a short practice list for the next few days.</p>

${h2('Building fluency between tests')}
<ul>
<li>Teach strategies first: counting on, doubles and making ten for addition; doubling and "times 10 minus one group" for multiplication.</li>
<li>Practise a little every day. Ten minutes daily is better than an hour once a week.</li>
<li>Mix in games, flash cards and quick oral quizzes.</li>
<li>Keep reviewing old facts while learning new ones.</li>
</ul>

${h2('Timed tests on this site')}
<p>There are 100-problem timed tests for ${a('addition/100-facts-timed-test', 'addition')}, ${a('subtraction/100-facts-timed-test', 'subtraction')}, ${a('multiplication/100-facts-timed-test', 'multiplication')} and ${a('division/100-facts-timed-test', 'division')}. Each fits on one page, with an answer key on the next, and you can set fewer problems for a shorter warm-up.</p>
`,
};

const practiceAtHome = {
  slug: 'math-practice-at-home',
  title: 'How to Practice Math at Home: A 15-Minute Routine for Parents',
  short: 'Practice at home',
  description: 'A simple routine for math practice at home: choosing the right worksheet, keeping sessions short, marking together, praising strategies and avoiding tears.',
  summary: 'How to pick the right level, a short routine that works, how to mark together, and what to do when practice turns into a battle.',
  level: 'Kindergarten–Grade 6',
  cats: [],
  worksheets: ['addition/within-10', 'subtraction/within-20', 'multiplication/facts-0-10', 'division/facts', 'fractions/equivalent-fractions', 'telling-time/5-minutes'],
  body: ({ h2, a }) => `
${h2('Start with the right level')}
<p>The most common reason home practice goes badly is a worksheet that's too hard. Practice should feel like something a child can mostly do on their own: aim for a sheet where they get about 8 or 9 out of 10 right. If they get fewer than 7, step back to an easier sheet; if every answer is instant, move on.</p>
<p>Our grade pages, from ${a('kindergarten-math-worksheets', 'kindergarten')} to ${a('5th-grade-math-worksheets', '5th grade')}, list the skills for each year. If you're unsure, ask your child's teacher what the class is working on this month and pick the matching sheet.</p>

${h2('A 15-minute routine')}
<ol>
<li><b>Warm up (2 minutes).</b> A few quick questions out loud, like doubles or counting by fives.</li>
<li><b>One worksheet (8 to 10 minutes).</b> Choose fewer problems for younger children. On our sheets, you can set the number of problems before printing.</li>
<li><b>Mark it together (3 minutes).</b> Use the answer key. Celebrate the right answers first, then look at one or two mistakes together.</li>
</ol>
<p>Short and regular works better than long and occasional. Fifteen minutes four times a week does more than an hour on Sunday.</p>

${h2('How to mark together')}
<p>When an answer is wrong, ask your child to explain how they got it. Often they find the mistake themselves while explaining, which is worth far more than being told. If the same mistake shows up several times, that's the thing to practise next. Our ${a('guides', 'teaching guides')} describe the usual methods and the most common mistakes for each topic.</p>

${h2('Praise the thinking')}
<p>Praise strategies and effort rather than speed or "being smart": "You made a ten first, that was clever" helps more than "You're so good at math". Children who believe they can improve by practising are more willing to try hard problems.</p>

${h2('When practice becomes a battle')}
<ul>
<li>Make the sheet shorter. Ten problems finished happily beat thirty finished in tears.</li>
<li>Take turns: you solve one, they solve one.</li>
<li>Switch format: a clock or fractions sheet can feel like a break from facts.</li>
<li>Stop on a success, not a struggle, and try again tomorrow.</li>
</ul>

${h2('Homework and school methods')}
<p>Schools often teach methods that look different from what parents learned, such as making ten, partial products or the area model. They lead to the same answers, and they're designed to build understanding first. If a method is unfamiliar, the matching guide explains it, or ask the teacher how they'd like you to help.</p>

${h2('Holidays and summer')}
<p>A few short sessions a week during long breaks helps children keep skills fresh. Our seasonal sheets for Thanksgiving and Christmas practise the usual skills with pictures to color afterwards, which makes them an easy sell in December.</p>
`,
};

const numberBondsUK = {
  slug: 'number-bonds',
  uk: true,
  title: 'Number Bonds to 10, 20 and 100: How to Teach Them',
  short: 'Number bonds',
  description: 'How to teach number bonds to 10, 20 and 100: the part-whole model, ten frames, using bonds to 10 for bigger bonds, and quick ways to practise them.',
  summary: 'What number bonds are, the part-whole model and ten frames, how bonds to 10 unlock bonds to 20 and 100, and quick practice ideas.',
  level: 'Reception–Year 2',
  cats: ['maths'],
  worksheets: ['maths/number-bonds-to-10', 'maths/number-bonds-to-20', 'maths/number-bonds-to-100', 'maths/column-addition-2-digit'],
  body: ({ h2, a }) => `
${h2('What number bonds are')}
<p>A number bond is a pair of numbers that make a given total. The bonds to 10 are 0 and 10, 1 and 9, 2 and 8, 3 and 7, 4 and 6, and 5 and 5 (and the same pairs the other way round). Knowing them instantly is one of the most useful things a child can learn in maths, because so many later calculations rely on making a 10.</p>
<p>In the National Curriculum, Year 1 pupils represent and use number bonds and related subtraction facts within 20, and Year 2 pupils recall facts to 20 fluently and use them to work out related facts up to 100.</p>

${h2('The part-whole model and ten frames')}
<p>The part-whole model shows a whole (10) split into two parts (7 and 3). Children can see that 7 + 3 = 10, 3 + 7 = 10, 10 − 7 = 3 and 10 − 3 = 7 all come from the same picture. A ten frame makes it physical: put 7 counters in the frame and the empty spaces show the bond, 3.</p>
<p>Fingers work too. Hold up 7 fingers: the 3 fingers that are down are the number bond to 10.</p>

${h2('Bonds to 20')}
<p>Bonds to 20 come straight from bonds to 10. If 7 and 3 make 10, then 17 and 3 make 20, and 7 and 13 make 20. Children who see this pattern don't need to learn a separate set of facts.</p>

${h2('Bonds to 100')}
<p>For multiples of 10, use bonds to 10 with tens: 7 tens and 3 tens make 10 tens, so 70 and 30 make 100. For other numbers, count on to the next ten and then to 100. For 64: 64 + 6 = 70, then 70 + 30 = 100, so 64 and 36 make 100. A quick check: the ones digits make 10 (4 and 6) and the tens digits make 9 (6 and 3).</p>

${h2('Using bonds for mental calculation')}
<p>Number bonds are the engine of mental addition and subtraction. For 8 + 7, use the bond 8 + 2 = 10, then add the remaining 5: 15. For 36 + 7, bridge through the next ten: 36 + 4 = 40, then 40 + 3 = 43. For 52 − 6, go back to 50 first (52 − 2), then take the other 4: 46. Pupils who know their bonds can do all of these without counting.</p>

${h2('Missing number questions')}
<p>Number bond sheets usually mix several forms: 7 + ? = 10, ? + 7 = 10, 10 − 7 = ? and 10 = 7 + ?. Mixing them is important, because children who only see one form can learn to spot a pattern rather than understand the bond. Our ${a('maths/number-bonds-to-10', 'number bonds to 10 worksheets')} move the missing number around for this reason.</p>

${h2('Quick ways to practise')}
<ul>
<li><b>Rainbow bonds:</b> write 0 to 10 in a line and draw arcs joining the pairs that make 10.</li>
<li><b>Ten frame flash:</b> show a ten frame for a second; children call out how many more make 10.</li>
<li><b>Bond snap:</b> with cards from 0 to 10, players snap any pair that makes 10.</li>
<li><b>Short daily sheets:</b> ten questions a day, marked together with the answer key.</li>
</ul>
<p>Once bonds to 10 are secure, move on to ${a('maths/number-bonds-to-20', 'bonds to 20')} and ${a('maths/number-bonds-to-100', 'bonds to 100')}. They pay off again in Year 3, when column addition and subtraction need quick mental facts.</p>
`,
};

const columnMethodsUK = {
  slug: 'column-addition-and-subtraction',
  uk: true,
  title: 'Column Addition and Subtraction: The Formal Written Methods Explained',
  short: 'Column methods',
  description: 'How to do column addition and column subtraction with exchanging, including exchanging across zero, with worked examples and the mistakes to watch for.',
  summary: 'Setting out column calculations, exchanging in addition and subtraction, exchanging across zero, and checking with the inverse.',
  level: 'Years 3–4',
  cats: ['maths'],
  worksheets: ['maths/column-addition-2-digit', 'maths/column-addition-3-digit', 'maths/column-addition-4-digit', 'maths/column-subtraction-2-digit', 'maths/column-subtraction-3-digit', 'maths/column-subtraction-4-digit'],
  body: ({ h2, add, sub, a }) => `
${h2('The formal written methods')}
<p>In the National Curriculum, Year 3 pupils add and subtract numbers with up to three digits using formal written methods of columnar addition and subtraction, and Year 4 pupils use them with up to four digits. The methods line up the digits by place value and work from the ones column to the left.</p>
<p>Schools in England say exchanging rather than carrying or borrowing: 10 ones are exchanged for 1 ten, or 1 ten for 10 ones. The word describes what really happens, since the value of the number never changes.</p>

${h2('Setting out the calculation')}
<p>Line the ones up first, then the tens, hundreds and thousands. In 352 + 47, the 7 goes under the 2 and the 4 goes under the 5. Squared paper, one digit per square, keeps columns straight. Draw the answer line with a ruler and leave room above the top number for exchanged digits in subtraction.</p>

${h2('Column addition: 476 + 358')}
${add(476, 358, 'Both the ones and the tens make more than 10, so there are two exchanges.')}
<ol>
<li>Ones: 6 + 8 = 14. Write 4 and exchange 10 ones for 1 ten, written small under the tens column (or above it, depending on your school).</li>
<li>Tens: 7 + 5 + 1 = 13 tens. Write 3 and exchange 10 tens for 1 hundred.</li>
<li>Hundreds: 4 + 3 + 1 = 8. The answer is 834.</li>
</ol>

${h2('Column subtraction: 724 − 386')}
${sub(724, 386, 'The tens exchange twice: once to give the ones 10 more, then to receive 10 from the hundreds.')}
<ol>
<li>Ones: 4 − 6 needs an exchange. Exchange 1 ten for 10 ones: the 2 tens become 1, and the ones become 14. 14 − 6 = 8.</li>
<li>Tens: 1 − 8 needs an exchange. Exchange 1 hundred for 10 tens: the 7 hundreds become 6, and the tens become 11. 11 − 8 = 3.</li>
<li>Hundreds: 6 − 3 = 3. The answer is 338.</li>
</ol>

${h2('Exchanging across zero: 503 − 168')}
${sub(503, 168, 'The tens have nothing to exchange, so start at the hundreds: 5 hundreds become 4, the tens become 9 and the ones become 13.')}
<p>When the next column is 0, go to the first column that isn't zero. Exchange 1 hundred for 10 tens, then 1 of those tens for 10 ones. The tens end up as 9. Then 13 − 8 = 5, 9 − 6 = 3 and 4 − 1 = 3: the answer is 335.</p>

${h2('When a mental method is better')}
<p>Formal methods work for any numbers, but some calculations are quicker in your head. 299 + 150 is easier as 300 + 150 − 1 = 449, and 1,000 − 1 = 999 needs no columns at all. The National Curriculum expects pupils to choose a mental or written method depending on the numbers, so ask "Do I need a written method for this?" before reaching for the columns.</p>

${h2('Check with the inverse')}
<p>Addition and subtraction undo each other, so every answer can be checked. For 724 − 386 = 338, add 338 + 386: if you get 724, the subtraction is right. Estimating first is quick too: 724 − 386 is about 700 − 400 = 300.</p>

${h2('Common mistakes')}
<ul>
<li><b>Taking the smaller digit from the larger</b> in every column: 724 − 386 worked as 4 hundreds, 6 tens and 2 ones (462).</li>
<li><b>Forgetting to reduce the column you exchanged from.</b></li>
<li><b>Writing 14 in the ones column</b> instead of exchanging in addition.</li>
<li><b>Misaligned digits</b> when the numbers have different lengths.</li>
</ul>

${h2('Practise')}
<p>Our column worksheets build up in the same order: ${a('maths/column-addition-2-digit', '2-digit')}, ${a('maths/column-addition-3-digit', '3-digit')} and ${a('maths/column-addition-4-digit', '4-digit')} addition, then ${a('maths/column-subtraction-2-digit', '2-digit')}, ${a('maths/column-subtraction-3-digit', '3-digit')} and ${a('maths/column-subtraction-4-digit', '4-digit')} subtraction. They print on A4 with an answer key.</p>
`,
};

export const GUIDES = [
  additionFacts,
  subtractionFacts,
  additionWithRegrouping,
  subtractionWithRegrouping,
  placeValue,
  multiplicationFacts,
  divisionFacts,
  multiDigitMultiplication,
  longDivision,
  equivalentFractions,
  unlikeDenominators,
  mixedNumbers,
  multiplyDivideFractions,
  decimals,
  rounding,
  tellingTime,
  orderOfOperations,
  exponents,
  integers,
  factFluency,
  practiceAtHome,
  numberBondsUK,
  columnMethodsUK,
  busStop,
].map((g) => ({ published: PUBLISHED, updated: PUBLISHED, ...g }));
