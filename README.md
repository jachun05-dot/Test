# Threads 썰 각색 + 토스 링크 자동 포스팅

인터넷 썰을 Threads 톤으로 각색(Groq API)해서 게시하고, 게시글 댓글로 토스 쇼핑 링크를 자동으로 다는 로컬 실행 스크립트입니다.

## 준비물

1. **Groq API 키** — https://console.groq.com 가입 후 발급 (무료 티어)
2. **Threads API 액세스 토큰**
   - https://developers.facebook.com 에서 Meta 개발자 앱 생성
   - Threads API 제품 추가, `threads_basic` / `threads_content_publish` 권한 요청
   - OAuth 인증으로 단기 토큰 발급 → 60일 장기 토큰으로 교환
   - `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN` 확보

## 설치

```bash
pip install -r requirements.txt
cp .env.example .env
# .env 파일에 GROQ_API_KEY, THREADS_USER_ID, THREADS_ACCESS_TOKEN 채워넣기
```

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

## 동작 흐름

1. 썰 원문을 읽는다 (파일/텍스트/stdin)
2. Groq API로 Threads 톤에 맞게 각색 (원문 그대로 베끼지 않고 소재만 참고해 재구성)
3. 각색 결과 미리보기 → 사용자 확인
4. Threads API로 본문 게시
5. 게시글에 댓글로 토스 링크 등록

## 주의사항

- 토스 파트너스 링크 자체에 광고 표시가 포함되어 있어야 합니다(사용자 확인 사항). 별도 표시가 없는 링크라면 `#광고` 등 표시를 본문/댓글에 직접 추가하세요.
- 썰을 그대로 복사하지 말고 항상 각색을 거치도록 되어 있습니다 (저작권 이슈 완화 목적이며, 완전한 법적 안전을 보장하지는 않습니다).
- Threads API 정책상 과도한 자동/반복 게시는 계정 제재 사유가 될 수 있습니다. 하루 2건 수준을 권장합니다.
- 이 스크립트는 수동 실행 전용입니다(cron 등 무인 스케줄링 없음). 매번 사람이 실행하고 미리보기를 확인하는 구조입니다.
