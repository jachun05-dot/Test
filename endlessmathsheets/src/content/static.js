// About, privacy, terms and contact pages. Bodies are trusted HTML written here.
export function staticPages(site, worksheetCount, updated) {
  const email = site.contactEmail;
  return [
    {
      path: '/about/',
      title: 'About Endless Math Sheets',
      heading: 'About Endless Math Sheets',
      description: 'Endless Math Sheets makes free printable math worksheets with answer keys for kindergarten through 7th grade.',
      body: `<p>Endless Math Sheets is a free collection of ${worksheetCount} math worksheet makers for kindergarten through 7th grade. Each one creates a new set of problems every time you click, so a class never runs out of practice and no two students need the same sheet.</p>
<h2>How it works</h2>
<p>Every worksheet follows a precise rule. On the two-digit subtraction with regrouping sheet, for example, every problem needs regrouping; on the subtracting across zeros sheet, every starting number has a zero in the tens place. Problems are generated in your browser, checked against those rules, and printed with an answer key on a separate page.</p>
<p>Each sheet has a short code printed in the corner. Copy the link to a sheet and you can print exactly the same problems again later.</p>
<h2>Who it is for</h2>
<p>The site is made for teachers, tutors, homeschooling families and parents who want extra practice at home. It is free to use and needs no account.</p>
<h2>Standards</h2>
<p>Worksheets list the Common Core State Standards they practice so you can match them to your curriculum. The codes are given for reference. Endless Math Sheets is not affiliated with the Common Core State Standards Initiative.</p>
<h2>Contact</h2>
<p>Found a problem or have an idea for a worksheet? Write to <a href="mailto:${email}">${email}</a>.</p>`,
    },
    {
      path: '/contact/',
      title: 'Contact | Endless Math Sheets',
      heading: 'Contact',
      description: 'Contact Endless Math Sheets with questions, corrections or requests for new printable math worksheets.',
      body: `<p>Questions, corrections and worksheet requests are welcome. Email <a href="mailto:${email}">${email}</a> and include the link to the worksheet if your message is about a specific sheet.</p>
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
<h2>Accuracy</h2>
<p>We check every type of worksheet carefully, but the site is provided “as is” without warranties of any kind. If you find a mistake, please tell us so we can fix it.</p>
<h2>Links</h2>
<p>Links to other websites are provided for convenience. We are not responsible for their content.</p>
<h2>Contact</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    },
  ];
}
