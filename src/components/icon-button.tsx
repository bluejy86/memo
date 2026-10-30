import Link from "next/link";
import { Icon, type IconName } from "./icon";

type IconButtonProps = {
  icon: IconName;
  label: string;
  href?: string;
};

// 40×40 누르는 영역 가운데에 24px 아이콘을 둔다. href가 있으면 링크로 동작한다.
export function IconButton({ icon, label, href }: IconButtonProps) {
  const className =
    "flex size-10 items-center justify-center rounded-sm text-text-primary";
  const content = <Icon name={icon} className="size-6" />;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={className}>
      {content}
    </button>
  );
}
