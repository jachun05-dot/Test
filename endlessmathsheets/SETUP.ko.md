# Endless Math Sheets 오픈 가이드

미국 교사·학부모 대상의 무료 수학 학습지 사이트예요. 방문자가 학습지를 인쇄할 때 보는
광고(Google AdSense)로 수익을 내는 구조이고, 사이트 자체는 이미 완성돼 있어요.

아래 1~6단계는 **본인 명의 가입과 결제가 필요해서 직접 하셔야 하는 일**이에요.
처음에 한 번만 하면 되고, 전부 합쳐 2~3시간 정도 걸려요.

---

## 비용

| 항목 | 비용 |
|---|---|
| 도메인 `endlessmathsheets.com` | 1년에 약 1만 5천 원 (Cloudflare 원가 판매) |
| 호스팅 (Cloudflare Pages) | 무료 |
| 이메일 전달, 방문자 통계 | 무료 |

서버가 없는 사이트라 방문자가 많아져도 호스팅비는 0원이에요.

---

## 1. 도메인 사기 (10분)

1. [dash.cloudflare.com](https://dash.cloudflare.com)에 가입해요.
2. 왼쪽 메뉴 **Domain Registration → Register Domains**에서 `endlessmathsheets.com`을 검색해 구매해요.
   - 2026년 10월 22일 기준으로 비어 있었어요. 그 사이 누가 사갔다면
     `infinitemathsheets.com`이나 `printmathsheets.com`도 비어 있었어요.
   - 도메인을 바꾸면 `site.config.js`의 `domain`, `url`, `contactEmail` 세 줄만 고치면 돼요.

## 2. 사이트 올리기 (15분)

1. Cloudflare 왼쪽 메뉴 **Workers & Pages → Create → Pages → Connect to Git**으로 가요.
2. GitHub 계정을 연결하고 `jachun05-dot/test` 저장소를 골라요.
3. 설정값:
   - **Production branch**: `claude/gazua-4079rc` (또는 이 브랜치를 합친 `main`)
   - **Root directory**: `endlessmathsheets`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Save and Deploy**를 누르면 1~2분 뒤 `xxxx.pages.dev` 주소로 사이트가 열려요.
5. 프로젝트의 **Custom domains**에서 `endlessmathsheets.com`을 연결해요. 1단계에서 Cloudflare로 샀다면 자동으로 설정돼요.

이후에는 GitHub에 변경이 올라갈 때마다 자동으로 다시 배포돼요.

## 3. 문의용 이메일 (5분)

사이트에 적힌 `hello@endlessmathsheets.com`으로 온 메일을 내 Gmail로 받는 설정이에요.
AdSense 심사에서 연락처가 있는지도 봐요.

- Cloudflare에서 도메인 → **Email → Email Routing** → `hello@`를 내 Gmail로 전달하게 설정해요.

## 4. 구글 검색에 등록 (10분)

방문자는 거의 다 구글 검색으로 들어와요. 등록해야 구글이 사이트를 빨리 찾아요.

1. [Google Search Console](https://search.google.com/search-console)에서 **도메인** 속성으로 `endlessmathsheets.com`을 추가해요. Cloudflare를 고르면 인증이 자동으로 돼요.
2. 왼쪽 **Sitemaps**에 `https://endlessmathsheets.com/sitemap.xml`을 제출해요.
3. (선택) [Bing Webmaster Tools](https://www.bing.com/webmasters)에서 "Search Console에서 가져오기"를 한 번 눌러 두세요. Bing은 ChatGPT 검색과 DuckDuckGo에도 쓰여요.

## 5. 방문자 통계 (2분, 선택)

- Cloudflare Pages 프로젝트 → **Metrics → Web Analytics** 켜기. 쿠키를 쓰지 않는 무료 통계예요.

## 6. 애드센스 신청 (20분 + 심사 대기)

1. [adsense.google.com](https://adsense.google.com)에서 사이트 `endlessmathsheets.com`으로 가입해요.
2. 발급된 게시자 ID(`ca-pub-`로 시작하는 번호)를 `site.config.js`의 `client: ''` 따옴표 안에 넣어요.
   - GitHub 웹에서 파일을 열어 연필 아이콘으로 한 줄만 고치면 돼요. 아니면 저(Claude)에게 번호만 알려주셔도 돼요.
   - 이렇게 하면 모든 페이지에 광고 코드가, 사이트에 `ads.txt`가 자동으로 들어가요.
3. AdSense에서 **사이트 → 검토 요청**을 눌러요. 심사는 며칠에서 몇 주 걸려요.
4. 승인되면 **광고 → 자동 광고**를 켜요.
5. **개인 정보 보호 및 메시지**에서 유럽(GDPR)용 동의 메시지를 만들어요. 유럽 방문자에게 광고를 보여주려면 필요해요.
6. 수익이 100달러를 넘으면 매달 은행 계좌로 들어와요. 결제 정보에서 세금 정보(미국 W-8BEN)를 입력해 두세요.

처음 심사에서 "콘텐츠 부족"으로 거절되는 경우가 많아요. 사이트가 검색에 잡히고 방문자가 생긴 뒤(보통 1~3개월) 다시 신청하면 돼요. 사이트는 그대로 두면 돼요.

---

## 현실적인 기대치

- **처음 3개월**: 새 도메인은 구글이 믿기까지 시간이 걸려서 방문자가 거의 없어요.
- **6~12개월**: 학습지 페이지 110개가 "7 times table worksheet" 같은 구체적인 검색어에 잡히기 시작하면 방문자가 늘어요.
- **월 100만 원(약 700달러) 기준**: 미국 교육 분야 광고는 페이지뷰 1,000회당 대략 5~15달러예요. 그래서 한 달에 대략 5만~14만 페이지뷰가 필요해요. 가능한 범위지만 **보장되지는 않아요.**
- 여름방학(6~8월)에는 방문이 줄고, 새 학기(8~10월)와 1~3월에 늘어요.

## 손 안 대도 되는 것

- 수학 내용은 바뀌지 않아서 매년 업데이트할 게 없어요.
- 서버, 데이터베이스, 회원 관리가 없어서 고장 날 곳이 거의 없어요.
- 문제와 정답은 테스트로 전부 검증돼 있어요.

## 하면 더 빨라지는 것 (선택)

- **Pinterest**: 미국 교사들이 학습지를 찾을 때 많이 써요. 학습지 이미지 몇 장을 핀으로 올려 두면 검색보다 빨리 방문자가 생길 수 있어요.
- **Bing 등록**(4단계 3번): 1분이면 돼요.

## 알아 두실 것

- **세금**: 애드센스 수익도 한국에서 소득 신고 대상이에요. 수익이 생기면 5월 종합소득세 신고 전에 세무사나 국세청 상담(126)을 한 번 받아 보세요.
- **아동 대상 규정**: 사이트는 교사와 부모가 인쇄해서 쓰도록 만들어져 있어요. 아이들이 직접 하는 게임 같은 기능을 나중에 추가하면, 미국 아동 개인정보 보호법(COPPA) 때문에 광고 설정을 바꿔야 할 수 있어요.
