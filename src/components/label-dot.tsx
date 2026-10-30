import type { MemoLabel } from "@/lib/memos";

const DOT_COLOR: Record<MemoLabel, string> = {
  blue: "bg-label-blue",
  green: "bg-label-green",
  orange: "bg-label-orange",
  pink: "bg-label-pink",
};

const LABEL_NAME: Record<MemoLabel, string> = {
  blue: "파랑",
  green: "초록",
  orange: "주황",
  pink: "분홍",
};

type LabelDotProps = {
  color: MemoLabel;
  selected: boolean;
  onClick: () => void;
};

// 색 라벨 고르기. 고른 색은 바깥에 파란 테두리(2px)가 생긴다.
export function LabelDot({ color, selected, onClick }: LabelDotProps) {
  return (
    <button
      type="button"
      aria-label={LABEL_NAME[color]}
      aria-pressed={selected}
      onClick={onClick}
      className={`flex size-8 items-center justify-center rounded-full border-2 ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      <span className={`size-5.5 rounded-full ${DOT_COLOR[color]}`} />
    </button>
  );
}
