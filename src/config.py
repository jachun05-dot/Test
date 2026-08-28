import os
from getpass import getpass
from pathlib import Path

ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


def get_required(key: str, prompt_text: str, secret: bool = False) -> str:
    """환경변수(.env 포함)에서 값을 읽고, 없으면 그 자리에서 입력받는다."""
    value = os.environ.get(key)
    if value:
        return value

    print(f"\n{key} 값이 아직 없어요.")
    value = (getpass(f"{prompt_text}: ") if secret else input(f"{prompt_text}: ")).strip()

    if not value:
        raise SystemExit(f"{key} 값이 필요합니다.")

    os.environ[key] = value

    answer = input("이 값을 .env에 저장해서 다음부터 다시 안 물어보게 할까요? (y/n): ").strip().lower()
    if answer == "y":
        _save_to_env(key, value)

    return value


def _save_to_env(key: str, value: str) -> None:
    lines = ENV_PATH.read_text(encoding="utf-8").splitlines() if ENV_PATH.exists() else []

    for i, line in enumerate(lines):
        if line.startswith(f"{key}="):
            lines[i] = f"{key}={value}"
            break
    else:
        lines.append(f"{key}={value}")

    ENV_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{key}를 .env에 저장했습니다.")
