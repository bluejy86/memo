import type { MemoBlock } from "@/lib/memos";

// **굵게** 표시한 부분만 굵은 글씨로 바꾼다.
function RichText({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-text-primary">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function MemoBody({ blocks }: { blocks: MemoBlock[] }) {
  return (
    <div className="flex flex-col gap-space-12">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="text-title-lg text-text-primary">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={i} className="text-title-md text-text-primary">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-body-md whitespace-pre-line text-text-secondary">
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-space-4">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-space-8 text-body-md text-text-secondary"
                  >
                    <span aria-hidden="true">•</span>
                    <span className="min-w-0 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
