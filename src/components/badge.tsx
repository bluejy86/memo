import type { MemoLabel } from "@/lib/memos";
import { LABEL_STYLE } from "./memo-item";

type BadgeProps = {
  label: string;
  color: MemoLabel;
};

// 메모의 분류 배지. 색은 메모의 색 라벨을 따른다.
export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`flex h-6.5 items-center rounded-full px-space-8 text-caption-sm whitespace-nowrap ${LABEL_STYLE[color]}`}
    >
      {label}
    </span>
  );
}
