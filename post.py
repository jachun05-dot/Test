#!/usr/bin/env python3
import argparse
import sys
from pathlib import Path

from dotenv import load_dotenv

from src.rewrite import rewrite_story
from src.threads_client import ThreadsClient


def read_story(args: argparse.Namespace) -> str:
    if args.file:
        return Path(args.file).read_text(encoding="utf-8").strip()
    if args.text:
        return args.text.strip()

    print("썰 원문을 입력하세요. 입력을 마치면 Ctrl+D:")
    return sys.stdin.read().strip()


def main() -> None:
    load_dotenv()

    parser = argparse.ArgumentParser(
        description="인터넷 썰을 각색해 Threads에 게시하고, 댓글로 토스 링크를 답니다."
    )
    parser.add_argument("--file", "-f", help="썰 원문이 담긴 텍스트 파일 경로")
    parser.add_argument("--text", "-t", help="썰 원문 텍스트 직접 입력")
    parser.add_argument("--link", "-l", required=True, help="댓글로 달 토스 쇼핑 링크")
    parser.add_argument(
        "--yes", "-y", action="store_true", help="미리보기 확인 없이 바로 게시"
    )
    args = parser.parse_args()

    raw_story = read_story(args)
    if not raw_story:
        print("썰 원문이 비어 있습니다.", file=sys.stderr)
        sys.exit(1)

    print("\n원문을 Threads 톤으로 각색하는 중...\n")
    rewritten = rewrite_story(raw_story)

    print("=" * 40)
    print(rewritten)
    print("=" * 40)
    print(f"\n댓글로 달릴 링크: {args.link}\n")

    if not args.yes:
        answer = input("이대로 게시할까요? (y/n): ").strip().lower()
        if answer != "y":
            print("게시를 취소했습니다.")
            return

    client = ThreadsClient()

    print("\nThreads에 게시하는 중...")
    post_id = client.post_text(rewritten)
    print(f"게시 완료 (post_id={post_id})")

    print("댓글(토스 링크) 등록하는 중...")
    reply_id = client.reply_text(post_id, args.link)
    print(f"댓글 등록 완료 (reply_id={reply_id})")


if __name__ == "__main__":
    main()
