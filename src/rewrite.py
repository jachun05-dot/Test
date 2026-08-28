import os

from groq import Groq

from src.config import get_required

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
    api_key = get_required("GROQ_API_KEY", "Groq API 키", secret=True)
    client = Groq(api_key=api_key)
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


PRODUCT_SYSTEM_PROMPT = (
    "너는 한국어 Threads(스레드) 계정을 운영하는 콘텐츠 작가야. "
    "주어진 상품이 자연스럽게 등장하는 흥미로운 창작 에피소드를 새로 써.\n"
    "규칙:\n"
    "1) 실제 있었던 일처럼 단정하지 말고, 흥미로운 상황극/에피소드로 재미있게 구성할 것.\n"
    "2) 상품의 효과·효능에 대해 근거 없는 구체적 효과(건강 개선, 질병 치료 등)를 "
    "단정적으로 주장하지 말 것. 주어진 특징 정도만 자연스럽게 녹일 것.\n"
    "3) 첫 문장은 강한 후킹으로 시작하고, '썰 하나 풀게' 같은 예고 멘트는 쓰지 말 것.\n"
    "4) 문장은 짧게 끊고 문장마다 줄바꿈, 반말이 섞인 구어체를 사용할 것.\n"
    "5) 상품은 이야기 흐름 속의 반전/해결책으로 자연스럽게 등장시키되, "
    "노골적인 판매 멘트('구매하세요' 등)는 쓰지 말 것.\n"
    "6) 마지막 문장은 질문형이나 댓글을 유도하는 문장으로 끝낼 것.\n"
    "7) 전체 400자 이내로 작성.\n"
    "8) 결과로는 게시할 본문 텍스트만 출력하고, 다른 설명은 붙이지 말 것."
)


def generate_product_story(product_name: str, product_desc: str = "") -> str:
    api_key = get_required("GROQ_API_KEY", "Groq API 키", secret=True)
    client = Groq(api_key=api_key)
    model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

    user_content = f"상품명: {product_name}"
    if product_desc:
        user_content += f"\n특징: {product_desc}"

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": PRODUCT_SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ],
        temperature=1.0,
    )
    return response.choices[0].message.content.strip()
