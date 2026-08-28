import time

import requests

from src.config import get_required

GRAPH_BASE = "https://graph.threads.net/v1.0"


class ThreadsClient:
    def __init__(self):
        self.user_id = get_required("THREADS_USER_ID", "Threads User ID")
        self.access_token = get_required("THREADS_ACCESS_TOKEN", "Threads Access Token", secret=True)

    def _create_container(self, text: str, reply_to_id: str | None = None) -> str:
        url = f"{GRAPH_BASE}/{self.user_id}/threads"
        params = {
            "media_type": "TEXT",
            "text": text,
            "access_token": self.access_token,
        }
        if reply_to_id:
            params["reply_to_id"] = reply_to_id

        resp = requests.post(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()["id"]

    def _wait_until_ready(self, container_id: str, timeout: int = 60, interval: int = 3) -> None:
        url = f"{GRAPH_BASE}/{container_id}"
        params = {"fields": "status", "access_token": self.access_token}

        waited = 0
        while waited < timeout:
            resp = requests.get(url, params=params, timeout=30)
            resp.raise_for_status()
            status = resp.json().get("status")

            if status == "FINISHED":
                return
            if status == "ERROR":
                raise RuntimeError("Threads 컨테이너 생성 실패 (status=ERROR)")

            time.sleep(interval)
            waited += interval

        raise TimeoutError("Threads 컨테이너 준비 대기 시간 초과")

    def _publish(self, container_id: str) -> str:
        url = f"{GRAPH_BASE}/{self.user_id}/threads_publish"
        params = {"creation_id": container_id, "access_token": self.access_token}

        resp = requests.post(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()["id"]

    def post_text(self, text: str) -> str:
        container_id = self._create_container(text)
        self._wait_until_ready(container_id)
        return self._publish(container_id)

    def reply_text(self, reply_to_id: str, text: str) -> str:
        container_id = self._create_container(text, reply_to_id=reply_to_id)
        self._wait_until_ready(container_id)
        return self._publish(container_id)
