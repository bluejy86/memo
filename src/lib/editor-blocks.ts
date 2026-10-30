import type { MemoBlock } from "./memos";

// 편집 영역(contenteditable)의 내용을 저장용 블록으로 바꾼다.
// 굵은 글씨는 **로 감싸고, 줄바꿈은 \n으로 둔다.
function inlineText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent ?? "").replaceAll("**", "");
  }
  if (!(node instanceof HTMLElement)) return "";
  if (node.tagName === "BR") return "\n";

  const inner = Array.from(node.childNodes).map(inlineText).join("");
  const bold =
    node.tagName === "B" ||
    node.tagName === "STRONG" ||
    Number.parseInt(node.style.fontWeight, 10) >= 600;
  return bold && inner.trim() ? `**${inner}**` : inner;
}

const BLOCK_TAGS = new Set(["H2", "H3", "UL", "OL", "DIV", "P"]);

const isBlock = (node: Node): node is HTMLElement =>
  node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName);

// 브라우저가 목록 앞뒤를 <div> 안에 겹쳐 넣기도 해서, 안쪽 블록까지 차례로 풀어 읽는다.
function collectBlocks(parent: Node, blocks: MemoBlock[]) {
  let inline = "";
  const flush = () => {
    if (inline.trim()) blocks.push({ type: "paragraph", text: inline.trim() });
    inline = "";
  };

  for (const node of Array.from(parent.childNodes)) {
    if (!isBlock(node)) {
      inline += inlineText(node);
      continue;
    }
    flush();
    const tag = node.tagName;
    if (tag === "H2" || tag === "H3") {
      const text = (node.textContent ?? "").trim();
      if (text) blocks.push({ type: tag === "H2" ? "heading" : "subheading", text });
    } else if (tag === "UL" || tag === "OL") {
      const items = Array.from(node.childNodes)
        .map((li) => (li.textContent ?? "").trim())
        .filter(Boolean);
      if (items.length) blocks.push({ type: "list", items });
    } else if (Array.from(node.childNodes).some(isBlock)) {
      collectBlocks(node, blocks);
    } else {
      const text = inlineText(node).trim();
      if (text) blocks.push({ type: "paragraph", text });
    }
  }
  flush();
}

export function editorToBlocks(root: HTMLElement): MemoBlock[] {
  const blocks: MemoBlock[] = [];
  collectBlocks(root, blocks);
  return blocks;
}

const escapeHtml = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function richHtml(text: string) {
  return text
    .split("**")
    .map((part, i) => (i % 2 === 1 ? `<b>${escapeHtml(part)}</b>` : escapeHtml(part)))
    .join("")
    .replaceAll("\n", "<br>");
}

// 저장해 둔 블록을 편집 영역에 다시 채울 HTML로 바꾼다.
export function blocksToHtml(blocks: MemoBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `<h2>${escapeHtml(block.text)}</h2>`;
        case "subheading":
          return `<h3>${escapeHtml(block.text)}</h3>`;
        case "paragraph":
          return `<div>${richHtml(block.text)}</div>`;
        case "list":
          return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      }
    })
    .join("");
}
