export type MemoLabel = "blue" | "green" | "orange" | "pink";

// 본문 한 덩어리. 문단 안에서 **굵게** 표시할 수 있고, 줄바꿈은 \n으로 쓴다.
export type MemoBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  label: MemoLabel;
  category: string;
  pinned: boolean;
  // ISO 시각 문자열
  createdAt: string;
  // 상세 화면에서 제목이 다르면 지정한다
  detailTitle?: string;
  body?: MemoBlock[];
};

export const CATEGORIES = ["전체", "업무", "개인", "아이디어"];
// 작성 화면에서 고를 수 있는 분류 (전체 제외)
export const WRITE_CATEGORIES = CATEGORIES.filter((name) => name !== "전체");
export const LABELS: MemoLabel[] = ["blue", "green", "orange", "pink"];

// 서버와 브라우저가 같은 결과를 내도록 한국 시간으로 고정한다.
const SEOUL_PARTS = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function seoulParts(iso: string) {
  const parts: Record<string, string> = {};
  for (const { type, value } of SEOUL_PARTS.formatToParts(new Date(iso))) {
    parts[type] = value;
  }
  return parts;
}

// 예) 10월 30일 오전 9:12
export function formatDateTime(iso: string) {
  const p = seoulParts(iso);
  return `${p.month}월 ${p.day}일 ${p.dayPeriod} ${p.hour}:${p.minute}`;
}

// 예) 오늘, 어제, 10월 28일
export function formatRelativeDate(iso: string, now = Date.now()) {
  const p = seoulParts(iso);
  const n = seoulParts(new Date(now).toISOString());
  const day = (q: Record<string, string>) => Date.UTC(+q.year, +q.month - 1, +q.day);
  const diff = Math.round((day(n) - day(p)) / 86_400_000);
  if (diff === 0) return "오늘";
  if (diff === 1) return "어제";
  return `${p.month}월 ${p.day}일`;
}

export function blocksToPreview(blocks: MemoBlock[]) {
  const first = blocks[0];
  if (!first) return "";
  const text = first.type === "list" ? first.items.join(", ") : first.text;
  return text.replaceAll("**", "").split("\n")[0];
}
