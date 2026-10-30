"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { blocksToHtml, editorToBlocks } from "@/lib/editor-blocks";
import { createMemo } from "@/app/write/actions";
import {
  LABELS,
  WRITE_CATEGORIES,
  blocksToPreview,
  type MemoBlock,
  type MemoLabel,
} from "@/lib/memos";
import { ButtonPrimary } from "./button-primary";
import { Chip } from "./chip";
import { IconButton } from "./icon-button";
import { LabelDot } from "./label-dot";
import { MemoEditor } from "./memo-editor";

const DRAFT_KEY = "memo-draft";

type Draft = { title: string; category: string; label: MemoLabel; body: MemoBlock[] };

function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function writeDraft(draft: Draft | null) {
  try {
    if (draft) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // 저장 공간을 쓸 수 없으면 자동 저장만 건너뛴다
  }
}

export function MemoWrite() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("개인");
  const [label, setLabel] = useState<MemoLabel>("green");
  const [autoSaved, setAutoSaved] = useState(false);
  const [error, setError] = useState("");

  // 쓰던 내용이 남아 있으면 불러온다
  useEffect(() => {
    const draft = readDraft();
    if (!draft || !editorRef.current) return;
    setTitle(draft.title);
    setCategory(draft.category);
    setLabel(draft.label);
    editorRef.current.innerHTML = blocksToHtml(draft.body);
    editorRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    setAutoSaved(true);
  }, []);

  // 제목이나 본문이 있으면 바뀔 때마다 임시로 저장한다
  function autoSave(next: Partial<Draft> = {}) {
    const root = editorRef.current;
    if (!root) return;
    const draft: Draft = { title, category, label, body: editorToBlocks(root), ...next };
    const hasContent = draft.title.trim() !== "" || draft.body.length > 0;
    writeDraft(hasContent ? draft : null);
    setAutoSaved(hasContent);
  }

  async function handleSave() {
    const root = editorRef.current;
    if (!root) return;
    if (!title.trim()) {
      titleRef.current?.focus();
      setError("제목을 입력해 주세요");
      return;
    }
    const body = editorToBlocks(root);
    const saved = await createMemo({
      title: title.trim(),
      preview: blocksToPreview(body),
      label,
      category,
      body,
    }).catch(() => false);
    if (!saved) {
      setError("저장하지 못했어요. 잠시 뒤에 다시 시도해 주세요");
      return;
    }
    writeDraft(null);
    router.push("/");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-space-16 px-space-16 pt-space-48">
      <nav className="flex items-center justify-between">
        <IconButton icon="chevron-left" label="뒤로가기" href="/" />
        {autoSaved && <p className="text-caption-sm text-text-muted">자동 저장됨</p>}
      </nav>

      <main className="flex flex-1 flex-col gap-space-12">
        <label className="flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 focus-within:ring-2 focus-within:ring-primary">
          <span className="text-caption-sm text-text-muted">제목</span>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
              autoSave({ title: e.target.value });
            }}
            placeholder="제목을 입력하세요"
            className="w-full bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
          />
        </label>

        <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm text-text-muted">분류</span>
            {WRITE_CATEGORIES.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={name === category}
                onClick={() => {
                  setCategory(name);
                  autoSave({ category: name });
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm text-text-muted">색</span>
            {LABELS.map((color) => (
              <LabelDot
                key={color}
                color={color}
                selected={color === label}
                onClick={() => {
                  setLabel(color);
                  autoSave({ label: color });
                }}
              />
            ))}
          </div>
        </div>

        <MemoEditor editorRef={editorRef} onInput={() => autoSave()} />
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34">
        {error && <p className="pb-space-8 text-center text-caption-sm text-label-pink">{error}</p>}
        <ButtonPrimary label="저장하기" onClick={handleSave} />
      </div>
    </div>
  );
}
