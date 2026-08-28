#!/usr/bin/env python3
import os
import threading
import tkinter as tk
from tkinter import messagebox, scrolledtext, ttk

from dotenv import load_dotenv

from src.config import save_to_env
from src.rewrite import generate_product_story, rewrite_story
from src.threads_client import ThreadsClient

load_dotenv()


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Threads 자동 포스팅")
        self.geometry("620x700")

        self.rewritten_text = ""

        notebook = ttk.Notebook(self)
        notebook.pack(fill="both", expand=True, padx=8, pady=8)

        self.post_frame = ttk.Frame(notebook)
        self.settings_frame = ttk.Frame(notebook)
        notebook.add(self.post_frame, text="글 작성")
        notebook.add(self.settings_frame, text="설정")

        self._build_settings_tab()
        self._build_post_tab()

    # ---------- 설정 탭 ----------
    def _build_settings_tab(self):
        frame = self.settings_frame
        self.groq_key_var = tk.StringVar(value=os.environ.get("GROQ_API_KEY", ""))
        self.threads_id_var = tk.StringVar(value=os.environ.get("THREADS_USER_ID", ""))
        self.threads_token_var = tk.StringVar(value=os.environ.get("THREADS_ACCESS_TOKEN", ""))

        rows = [
            ("Groq API 키", self.groq_key_var, True),
            ("Threads User ID", self.threads_id_var, False),
            ("Threads Access Token", self.threads_token_var, True),
        ]
        for i, (label, var, secret) in enumerate(rows):
            ttk.Label(frame, text=label).grid(row=i, column=0, sticky="w", padx=8, pady=8)
            ttk.Entry(frame, textvariable=var, width=48, show="*" if secret else "").grid(
                row=i, column=1, padx=8, pady=8
            )

        ttk.Button(frame, text="저장", command=self._save_settings).grid(
            row=len(rows), column=0, columnspan=2, pady=16
        )
        self.settings_status = ttk.Label(frame, text="")
        self.settings_status.grid(row=len(rows) + 1, column=0, columnspan=2)

    def _save_settings(self):
        values = {
            "GROQ_API_KEY": self.groq_key_var.get().strip(),
            "THREADS_USER_ID": self.threads_id_var.get().strip(),
            "THREADS_ACCESS_TOKEN": self.threads_token_var.get().strip(),
        }
        for key, value in values.items():
            if value:
                os.environ[key] = value
                save_to_env(key, value)
        self.settings_status.config(text="저장했습니다.")

    # ---------- 글 작성 탭 ----------
    def _build_post_tab(self):
        frame = self.post_frame

        self.mode_var = tk.StringVar(value="product")
        mode_frame = ttk.Frame(frame)
        mode_frame.pack(fill="x", padx=8, pady=4)
        ttk.Radiobutton(
            mode_frame, text="상품 기반 창작", variable=self.mode_var,
            value="product", command=self._toggle_mode,
        ).pack(side="left")
        ttk.Radiobutton(
            mode_frame, text="썰 각색", variable=self.mode_var,
            value="story", command=self._toggle_mode,
        ).pack(side="left")

        self.product_frame = ttk.Frame(frame)
        ttk.Label(self.product_frame, text="상품명").grid(row=0, column=0, sticky="w")
        self.product_var = tk.StringVar()
        ttk.Entry(self.product_frame, textvariable=self.product_var, width=50).grid(row=0, column=1)
        ttk.Label(self.product_frame, text="특징").grid(row=1, column=0, sticky="w")
        self.desc_var = tk.StringVar()
        ttk.Entry(self.product_frame, textvariable=self.desc_var, width=50).grid(row=1, column=1)

        self.story_frame = ttk.Frame(frame)
        ttk.Label(self.story_frame, text="썰 원문").pack(anchor="w")
        self.story_text = scrolledtext.ScrolledText(self.story_frame, height=8)
        self.story_text.pack(fill="both", expand=True)

        self.product_frame.pack(fill="x", padx=8, pady=4)

        link_frame = ttk.Frame(frame)
        link_frame.pack(fill="x", padx=8, pady=4)
        ttk.Label(link_frame, text="토스 링크").pack(side="left")
        self.link_var = tk.StringVar()
        ttk.Entry(link_frame, textvariable=self.link_var, width=48).pack(side="left", padx=4)

        btn_frame = ttk.Frame(frame)
        btn_frame.pack(fill="x", padx=8, pady=8)
        ttk.Button(btn_frame, text="미리보기 생성", command=self._on_generate).pack(side="left", padx=4)
        self.post_button = ttk.Button(
            btn_frame, text="Threads에 게시", command=self._on_post, state="disabled"
        )
        self.post_button.pack(side="left", padx=4)

        ttk.Label(frame, text="미리보기 / 로그").pack(anchor="w", padx=8)
        self.output_text = scrolledtext.ScrolledText(frame, height=16)
        self.output_text.pack(fill="both", expand=True, padx=8, pady=4)

    def _toggle_mode(self):
        if self.mode_var.get() == "product":
            self.story_frame.pack_forget()
            self.product_frame.pack(fill="x", padx=8, pady=4)
        else:
            self.product_frame.pack_forget()
            self.story_frame.pack(fill="both", expand=True, padx=8, pady=4)

    def _log(self, text: str):
        self.output_text.insert("end", text + "\n")
        self.output_text.see("end")

    def _on_generate(self):
        if not self.link_var.get().strip():
            messagebox.showerror("오류", "토스 링크를 입력하세요.")
            return

        self.output_text.delete("1.0", "end")
        self.post_button.config(state="disabled")
        threading.Thread(target=self._generate_worker, daemon=True).start()

    def _generate_worker(self):
        try:
            if not os.environ.get("GROQ_API_KEY"):
                self._log("Groq API 키가 없습니다. 설정 탭에서 입력 후 저장해주세요.")
                return

            if self.mode_var.get() == "product":
                product = self.product_var.get().strip()
                if not product:
                    self._log("상품명을 입력하세요.")
                    return
                self._log("상품 기반 창작 썰 생성 중...")
                self.rewritten_text = generate_product_story(product, self.desc_var.get().strip())
            else:
                story = self.story_text.get("1.0", "end").strip()
                if not story:
                    self._log("썰 원문을 입력하세요.")
                    return
                self._log("썰 각색 중...")
                self.rewritten_text = rewrite_story(story)

            self._log("\n" + "=" * 40)
            self._log(self.rewritten_text)
            self._log("=" * 40)
            self.post_button.config(state="normal")
        except Exception as exc:
            self._log(f"오류 발생: {exc}")

    def _on_post(self):
        self.post_button.config(state="disabled")
        threading.Thread(target=self._post_worker, daemon=True).start()

    def _post_worker(self):
        try:
            missing = [
                key for key in ("THREADS_USER_ID", "THREADS_ACCESS_TOKEN")
                if not os.environ.get(key)
            ]
            if missing:
                self._log(f"설정 탭에서 {', '.join(missing)} 입력 후 저장해주세요.")
                return

            self._log("\nThreads에 게시하는 중...")
            client = ThreadsClient()
            post_id = client.post_text(self.rewritten_text)
            self._log(f"게시 완료 (post_id={post_id})")

            self._log("댓글(토스 링크) 등록하는 중...")
            reply_id = client.reply_text(post_id, self.link_var.get().strip())
            self._log(f"댓글 등록 완료 (reply_id={reply_id})")
        except Exception as exc:
            self._log(f"오류 발생: {exc}")
        finally:
            self.post_button.config(state="normal")


if __name__ == "__main__":
    App().mainloop()
