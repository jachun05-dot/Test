# Threads 썰 각색 + 토스 링크 자동 포스팅

인터넷 썰을 Threads 톤으로 각색(Groq API)해서 게시하고, 게시글 댓글로 토스 쇼핑 링크를 자동으로 다는 로컬 실행 스크립트입니다.

## 준비물

1. **Groq API 키** — https://console.groq.com 가입 후 발급 (무료 티어)
2. **Threads API 액세스 토큰**
   - https://developers.facebook.com 에서 Meta 개발자 앱 생성 (본인 Threads/Instagram 계정으로 로그인)
   - 앱 대시보드에서 "Threads API" 제품 추가
   - 앱 설정 > Threads API 에서 Redirect URI 등록 (예: `https://localhost/`)
   - `threads_basic`, `threads_content_publish`, `threads_manage_replies` 권한 요청
   - App 대시보드에서 App ID / App Secret 확인
   - `python scripts/get_threads_token.py` 실행 → 안내에 따라 브라우저 인증 → `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN` 출력됨 → `.env`에 붙여넣기
   - 장기 토큰은 60일마다 만료되므로, 만료 전 스크립트를 다시 실행해 갱신 필요
   - App Secret과 토큰은 이 스크립트 안에서만 쓰이고 어디로도 전송되지 않음 (절대 채팅에 붙여넣지 마세요)

## 설치

```bash
pip install -r requirements.txt
cp .env.example .env
# .env 파일에 GROQ_API_KEY, THREADS_USER_ID, THREADS_ACCESS_TOKEN 채워넣기
```

`.env`를 미리 안 채워도 됩니다. 값이 없으면 실행 중에 필요한 시점에만 입력창이 뜨고, 원하면 `.env`에 저장해서 다음부터 안 물어보게 할 수 있습니다. 예를 들어 Groq 키만 있으면 각색 결과까지는 먼저 확인해볼 수 있고, Threads 토큰은 게시 확인(`y`) 시점에 물어봅니다.

## 사용법

썰 원문을 파일로 준비 (예: `stories/오늘썰.txt`) 후 실행:

```bash
python post.py --file stories/오늘썰.txt --link "https://toss.im/..."
```

또는 텍스트를 직접 입력:

```bash
python post.py --text "오늘 있었던 일인데..." --link "https://toss.im/..."
```

각색된 글을 미리 보여주고 `y/n`으로 확인을 받습니다. 확인 없이 바로 올리려면 `--yes` 옵션을 추가하세요.

### 상품 기반 창작 썰 모드

인터넷 썰 대신, 상품이 자연스럽게 등장하는 창작 에피소드를 새로 만들고 싶으면 `--product`(상품명)를 사용하세요:

```bash
python post.py --product "다이슨 무선청소기" --desc "흡입력 좋고 가벼움" --link "https://toss.im/..."
```

`--product`가 지정되면 `--file`/`--text` 대신 이 모드로 동작합니다. 실제 있었던 일처럼 단정하지 않는 창작 에피소드로 생성되며, 근거 없는 효과·효능(건강 개선 등)은 주장하지 않도록 프롬프트에 제한을 걸어뒀습니다.

## GUI 앱 / exe

CLI 대신 설정 화면에서 키를 입력할 수 있는 GUI 버전도 있습니다 (`gui.py`, tkinter 기반).

```bash
python gui.py
```

"설정" 탭에서 Groq API 키, Threads User ID/Access Token을 입력하고 저장하면 `.env`에 저장됩니다. "글 작성" 탭에서 상품 기반/썰 각색 모드를 고르고 미리보기 생성 → 확인 후 게시할 수 있습니다.

**Windows .exe로 받기**: 리포지토리에 `.github/workflows/build-windows-exe.yml` 워크플로우가 있어서, GitHub 저장소의 Actions 탭에서 "Build Windows exe"를 수동 실행(workflow_dispatch)하거나 `gui.py`/`src/` 변경사항을 푸시하면 자동으로 빌드됩니다. 빌드가 끝나면 해당 실행(run) 페이지의 Artifacts에서 `ThreadsAutoPoster-windows`를 다운로드하면 `ThreadsAutoPoster.exe`가 들어있습니다. Python 설치 없이 그 exe만 실행하면 됩니다.

서명되지 않은 개인 프로그램이라 Windows Defender SmartScreen이 경고를 띄울 수 있습니다 — "추가 정보" → "실행" 으로 진행하면 됩니다.

## 동작 흐름

1. 입력을 읽는다 — 썰 원문(파일/텍스트/stdin) 또는 상품명+특징(`--product`)
2. Groq API로 Threads 톤에 맞게 각색하거나 창작 (원문 각색 모드는 그대로 베끼지 않고 소재만 참고, 상품 모드는 근거 없는 효과 주장 금지)
3. 결과 미리보기 → 사용자 확인
4. Threads API로 본문 게시
5. 게시글에 댓글로 토스 링크 등록

## 주의사항

- 토스 파트너스 링크 자체에 광고 표시가 포함되어 있어야 합니다(사용자 확인 사항). 별도 표시가 없는 링크라면 `#광고` 등 표시를 본문/댓글에 직접 추가하세요.
- 썰을 그대로 복사하지 말고 항상 각색을 거치도록 되어 있습니다 (저작권 이슈 완화 목적이며, 완전한 법적 안전을 보장하지는 않습니다).
- 상품 기반 창작 썰은 실제 체험담처럼 단정하지 말고, 상품 효과·효능에 대한 근거 없는 구체적 주장(특히 건강/의료 효과)을 넣지 마세요 — 표시광고법상 허위·과장 광고로 문제될 수 있습니다.
- Threads API 정책상 과도한 자동/반복 게시는 계정 제재 사유가 될 수 있습니다. 하루 2건 수준을 권장합니다.
- 이 스크립트는 수동 실행 전용입니다(cron 등 무인 스케줄링 없음). 매번 사람이 실행하고 미리보기를 확인하는 구조입니다.
