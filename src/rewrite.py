import os

from groq import Groq

SYSTEM_PROMPT = (
    "너는 한국어 Threads(스레드) 계정을 운영하는 콘텐츠 작가야. "
    "주어진 썰(사연)을 참고해서 Threads에 어울리는 글로 새로 재구성해.\n"
    "규칙:\n"
    "1) 원문 문장을 그대로 베끼지 말고, 사건의 흐름과 소재만 참고해서 새로 서술할 것.\n"
    "2) 첫 문장은 강한 후킹으로 시작.\n"
    "3) 문단은 짧게 끊고, 구어체/반말이 섞인 캐주얼한 톤을 사용.\n"
    "4) 전체 500자 이내로 작성.\n"
    "5) 본문에 광고, 링크, 제품 언급을 넣지 말 것 (링크는 댓글에 별도로 달림).\n"
    "6) 결과로는 게시할 본문 텍스트만 출력하고, 다른 설명은 붙이지 말 것."
)


def rewrite_story(raw_text: str) -> str:
    client = Groq(api_key=os.environ["GROQ_API_KEY"])
    model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": raw_text},
        ],
        temperature=0.9,
    )
    return response.choices[0].message.content.strip()
