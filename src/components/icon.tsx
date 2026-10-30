const ICON_SRC = {
  plus: "/icons/plus.svg",
  note: "/icons/note.svg",
  pin: "/icons/pin.svg",
  "pin-lg": "/icons/pin-24.svg",
  "chevron-left": "/icons/chevron-left.svg",
  "chevron-right": "/icons/chevron-right.svg",
  share: "/icons/share.svg",
  more: "/icons/more.svg",
} as const;

export type IconName = keyof typeof ICON_SRC;

type IconProps = {
  name: IconName;
  className?: string;
};

// 아이콘 색은 글자색(currentColor)을 따른다. 색은 부모의 text-* 클래스로 정한다.
export function Icon({ name, className = "size-5" }: IconProps) {
  const mask = `url(${ICON_SRC[name]}) center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
