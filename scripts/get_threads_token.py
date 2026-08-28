#!/usr/bin/env python3
"""
Threads API 장기 액세스 토큰 발급용 로컬 전용 스크립트.

입력한 App ID / App Secret / 인증 코드는 이 스크립트 실행 중에만 메모리에
머물고, 로컬 콘솔 출력 외에는 어디에도 전송되지 않습니다.
"""
import webbrowser
from urllib.parse import urlencode

import requests

AUTH_BASE = "https://threads.net/oauth/authorize"
TOKEN_URL = "https://graph.threads.net/oauth/access_token"
EXCHANGE_URL = "https://graph.threads.net/access_token"
ME_URL = "https://graph.threads.net/v1.0/me"

SCOPES = "threads_basic,threads_content_publish,threads_manage_replies"


def main() -> None:
    app_id = input("Threads App ID: ").strip()
    app_secret = input("Threads App Secret: ").strip()
    redirect_uri = input("Redirect URI (앱 설정에 등록한 값, 예: https://localhost/): ").strip()

    params = {
        "client_id": app_id,
        "redirect_uri": redirect_uri,
        "scope": SCOPES,
        "response_type": "code",
    }
    auth_url = f"{AUTH_BASE}?{urlencode(params)}"
    print(f"\n브라우저에서 아래 URL을 열어 로그인/승인하세요:\n{auth_url}\n")
    try:
        webbrowser.open(auth_url)
    except Exception:
        pass

    redirected = input("승인 후 리디렉션된 전체 URL을 붙여넣으세요: ").strip()
    if "code=" not in redirected:
        raise SystemExit("URL에서 code= 파라미터를 찾지 못했습니다. 다시 확인해주세요.")
    code = redirected.split("code=")[-1].split("&")[0].split("#")[0]

    resp = requests.post(
        TOKEN_URL,
        data={
            "client_id": app_id,
            "client_secret": app_secret,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
            "code": code,
        },
        timeout=30,
    )
    resp.raise_for_status()
    short_token = resp.json()["access_token"]
    print("단기 토큰 발급 완료")

    resp = requests.get(
        EXCHANGE_URL,
        params={
            "grant_type": "th_exchange_token",
            "client_secret": app_secret,
            "access_token": short_token,
        },
        timeout=30,
    )
    resp.raise_for_status()
    long_token = resp.json()["access_token"]
    print("장기 토큰(60일) 교환 완료")

    resp = requests.get(
        ME_URL,
        params={"fields": "id,username", "access_token": long_token},
        timeout=30,
    )
    resp.raise_for_status()
    me = resp.json()

    print("\n아래 두 줄을 .env 파일에 붙여넣으세요:\n")
    print(f"THREADS_USER_ID={me['id']}")
    print(f"THREADS_ACCESS_TOKEN={long_token}")
    print(f"\n(연결된 계정: {me.get('username')})")
    print("주의: 장기 토큰은 60일 후 만료됩니다. 만료 전에 이 스크립트를 다시 실행해 갱신하세요.")


if __name__ == "__main__":
    main()
