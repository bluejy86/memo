import Link from "next/link";
import { Icon } from "./icon";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  // 있으면 링크로, 없으면 버튼으로 동작한다
  href?: string;
  onClick?: () => void;
};

const CLASS_NAME =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary";

export function ButtonPrimary({ label, icon = false, href, onClick }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Icon name="plus" className="size-5" />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={CLASS_NAME}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={CLASS_NAME}>
      {content}
    </button>
  );
}
