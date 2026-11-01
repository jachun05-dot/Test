// About, privacy, terms and contact pages. Bodies are trusted HTML written here.
export function staticPages(site, worksheetCount, updated, guideCount = 0) {
  const email = site.contactEmail;
  return [
    {
      path: '/about/',
      title: 'About Endless Math Sheets',
      heading: 'About Endless Math Sheets',
      description: 'Endless Math Sheets makes free printable math worksheets with answer keys and step-by-step teaching guides for kindergarten through 7th grade.',
      body: `<p>Endless Math Sheets is a free collection of ${worksheetCount} math worksheet makers and ${guideCount} teaching guides for kindergarten through 7th grade, plus A4 maths worksheets for schools in the UK and Australia. Each worksheet creates a new set of problems every time you click, so a class never runs out of practice and no two students need the same sheet.</p>
<h2>Why we made it</h2>
<p>Most free worksheets online are fixed PDFs. Once a class has done the sheet, it's used up, and the answers are easy to find. Teachers and parents told us the same thing again and again: they wanted more practice on exactly the skill a child is working on, such as two-digit subtraction where every problem needs regrouping, without hunting through dozens of sites. Endless Math Sheets is built around that idea: one precise skill per worksheet, unlimited versions, and an answer key for every one.</p>
<h2>How the worksheets are made</h2>
<p>Every worksheet follows a precise rule. On the two-digit subtraction with regrouping sheet, every problem needs regrouping; on the subtracting across zeros sheet, every starting number has a zero in the right place; long division sheets that promise no remainders never produce one. Problems are generated in your browser from those rules, and the answer key is calculated from the same numbers.</p>
<p>Each sheet has a short code printed in the corner. Copy the link to a sheet and you can print exactly the same problems again later, which is handy for retakes and for sharing with other teachers.</p>
<h2>How we check them</h2>
<p>Before any change goes live, automated tests generate thousands of worksheets and check every answer independently, including fractions, which are checked as exact values rather than rounded decimals. Every worksheet is also printed to Letter and A4 paper in a test browser to make sure it fits its page. The worked examples in our teaching guides are drawn by the same checked code, so every carried digit and long division step shown is correct.</p>
<h2>Teaching guides</h2>
<p>Our <a href="/guides/">teaching guides</a> explain the methods behind the worksheets: regrouping, multiplication fact strategies, long division, fractions, decimals, telling time, the order of operations and more. Each one has worked examples, the mistakes students make most often and a suggested teaching order. They are written to match the Common Core State Standards and, for the UK guides, the National Curriculum for England.</p>
<h2>Who it is for</h2>
<p>The site is made for teachers, tutors, homeschooling families and parents who want extra practice at home. It is free to use and needs no account. The worksheets are free for home and classroom use; please don't resell them.</p>
<h2>How the site is funded</h2>
<p>Endless Math Sheets is an independent site. It may show advertising to cover the cost of running it, which keeps every worksheet free. Ads never appear on the printed worksheets themselves. See our <a href="/privacy/">privacy policy</a> for details.</p>
<h2>Standards</h2>
<p>Worksheets list the Common Core State Standards they practice so you can match them to your curriculum. UK worksheets list the National Curriculum statement they cover. The codes are given for reference. Endless Math Sheets is not affiliated with the Common Core State Standards Initiative or the Department for Education.</p>
<h2>Corrections and requests</h2>
<p>If you find a mistake, a problem that doesn't follow its worksheet's rule, or a sheet that prints badly, please tell us and we will fix it. Ideas for new worksheets and guides are welcome too. Write to <a href="mailto:${email}">${email}</a>.</p>`,
    },
    {
      path: '/contact/',
      title: 'Contact | Endless Math Sheets',
      heading: 'Contact',
      description: 'Contact Endless Math Sheets with questions, corrections or requests for new printable math worksheets.',
      body: `<p>Questions, corrections and worksheet requests are welcome. Email <a href="mailto:${email}">${email}</a>. We read every message.</p>
<h2>Reporting a mistake</h2>
<p>If a problem or answer looks wrong, please include the link to the worksheet (copy it with the Copy link button) or the sheet code printed in the bottom corner. The code lets us recreate exactly the sheet you printed.</p>
<h2>Requesting a worksheet or guide</h2>
<p>Tell us the skill, the grade or year, and how you would like the problems laid out. Requests from teachers and parents decide what we add next.</p>
<h2>Using the worksheets</h2>
<p>You are welcome to print and copy the worksheets for your own children, students or tutoring clients, and to share links to them. Please don't sell them or publish them on another website.</p>
<p>Please do not send personal information about students.</p>`,
    },
    {
      path: '/privacy/',
      title: 'Privacy Policy | Endless Math Sheets',
      heading: 'Privacy Policy',
      description: 'How Endless Math Sheets handles information, cookies and advertising. No accounts, and worksheets are made in your browser.',
      body: `<p><em>Last updated ${updated}.</em></p>
<p>Endless Math Sheets (“we”) runs the website ${site.domain}. This policy explains what information is collected when you use the site.</p>
<h2>No accounts, no worksheet data</h2>
<p>You do not need an account. Worksheets are generated in your browser. The options you choose are stored only in the page address so you can copy or bookmark a sheet; we do not receive or keep them.</p>
<h2>Server and analytics logs</h2>
<p>Our hosting provider processes standard technical information such as IP address, browser type and the pages requested, in order to deliver the site and protect it from abuse. We may use privacy-focused, cookie-free analytics to count page views. This information is used in aggregate and is not used to identify you.</p>
<h2>Advertising and cookies</h2>
<p>We use Google AdSense to show ads, which keeps the site free. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.</p>
<p>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="nofollow">Google Ads Settings</a>. You can also opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" rel="nofollow">www.aboutads.info</a>. To learn more, see <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
<p>Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent before personalized ads are shown.</p>
<h2>Children</h2>
<p>This site is intended for parents, teachers and tutors who print worksheets for children. We do not knowingly collect personal information from children. If you believe a child has sent us personal information, contact us and we will delete it.</p>
<h2>Changes</h2>
<p>We may update this policy. The date at the top shows the latest version.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:${email}">${email}</a>.</p>`,
    },
    {
      path: '/terms/',
      title: 'Terms of Use | Endless Math Sheets',
      heading: 'Terms of Use',
      description: 'Terms for using Endless Math Sheets: free printable worksheets for home, tutoring and classroom use.',
      body: `<p><em>Last updated ${updated}.</em></p>
<h2>Using the worksheets</h2>
<p>You may print and copy worksheets from this site for free for personal, home-school, tutoring and classroom use, including sharing printed or digital copies with your students.</p>
<p>Please do not sell the worksheets or republish them on another website as your own collection.</p>
<h2>Teaching guides and other content</h2>
<p>The teaching guides, worked examples and other text on this site are written by Endless Math Sheets. You are welcome to link to them and to quote short passages with a link back. Please don't copy whole guides to another website.</p>
<h2>No account needed</h2>
<p>You don't need an account to use the site, and worksheets are generated in your browser. See the <a href="/privacy/">privacy policy</a> for details of the limited information our hosting provider and advertising partners process.</p>
<h2>Advertising</h2>
<p>The site may show advertising to cover its costs and keep the worksheets free. Ads are shown on the web pages only; they are never printed on the worksheets themselves.</p>
<h2>Accuracy</h2>
<p>We check every type of worksheet carefully, but the site is provided “as is” without warranties of any kind. If you find a mistake, please tell us so we can fix it.</p>
<h2>Links</h2>
<p>Links to other websites are provided for convenience. We are not responsible for their content.</p>
<h2>Changes to the site and these terms</h2>
<p>We may add, change or remove worksheets and guides, and we may update these terms. The date at the top shows the latest version. Continuing to use the site after a change means you accept the updated terms.</p>
<h2>Contact</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    },
  ];
}
