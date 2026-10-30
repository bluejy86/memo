"use client";

import { useEffect, useState, type RefObject } from "react";

type FormatState = { bold: boolean; heading: boolean; subheading: boolean; list: boolean };

const NO_FORMAT: FormatState = { bold: false, heading: false, subheading: false, list: false };

type FormatButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

// 눌러도 글 위의 커서와 선택이 풀리지 않도록 mousedown을 막는다.
function FormatButton({ label, active, onPress }: FormatButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onPress}
      className={`flex h-9 items-center justify-center rounded-sm px-space-12 text-label-md whitespace-nowrap ${
        active ? "bg-label-blue-soft text-primary" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}

type MemoEditorProps = {
  editorRef: RefObject<HTMLDivElement | null>;
  onInput: () => void;
};

export function MemoEditor({ editorRef, onInput }: MemoEditorProps) {
  const [empty, setEmpty] = useState(true);
  const [format, setFormat] = useState<FormatState>(NO_FORMAT);

  // 커서가 있는 글자의 서식을 서식 막대에 표시한다.
  useEffect(() => {
    function update() {
      const root = editorRef.current;
      const selection = document.getSelection();
      if (!root || !selection?.anchorNode || !root.contains(selection.anchorNode)) {
        setFormat(NO_FORMAT);
        return;
      }
      const block = document.queryCommandValue("formatBlock").toLowerCase();
      setFormat({
        bold: document.queryCommandState("bold"),
        heading: block === "h2",
        subheading: block === "h3",
        list: document.queryCommandState("insertUnorderedList"),
      });
    }
    document.execCommand("defaultParagraphSeparator", false, "div");
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, [editorRef]);

  function handleInput() {
    const root = editorRef.current;
    setEmpty(!root || (!root.textContent?.trim() && !root.querySelector("li")));
    onInput();
  }

  function run(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleInput();
  }

  function toggleBlock(tag: "h2" | "h3", active: boolean) {
    run("formatBlock", active ? "<div>" : `<${tag}>`);
  }

  return (
    <div className="overflow-hidden rounded-lg bg-surface-card focus-within:ring-2 focus-within:ring-primary">
      <div className="flex h-13 items-center gap-space-4 px-space-12">
        <FormatButton label="B" active={format.bold} onPress={() => run("bold")} />
        <FormatButton
          label="제목"
          active={format.heading}
          onPress={() => toggleBlock("h2", format.heading)}
        />
        <FormatButton
          label="소제목"
          active={format.subheading}
          onPress={() => toggleBlock("h3", format.subheading)}
        />
        <FormatButton
          label="목록"
          active={format.list}
          onPress={() => run("insertUnorderedList")}
        />
      </div>
      <hr className="border-border-default" />
      <div className="relative">
        {empty && (
          <p className="pointer-events-none absolute left-space-20 top-space-16 text-body-md text-text-muted">
            내용을 입력하세요
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="본문"
          onInput={handleInput}
          className="min-h-32 px-space-20 py-space-16 text-body-md text-text-secondary outline-none [&>*+*]:mt-space-8 [&_b]:font-bold [&_b]:text-text-primary [&_h2]:text-title-lg [&_h2]:text-text-primary [&_h3]:text-title-md [&_h3]:text-text-primary [&_li]:pl-space-4 [&_ul]:list-disc [&_ul]:pl-space-20"
        />
      </div>
    </div>
  );
}
