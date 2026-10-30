import { Icon } from "./icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  action?: boolean;
};

export function CardHeader({ title, pin = false, action = false }: CardHeaderProps) {
  return (
    <div className="flex h-10 items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && <Icon name="pin" className="size-4 text-primary" />}
      <h2 className="flex-1 text-label-md text-text-primary">{title}</h2>
      {action && (
        <button
          type="button"
          className="flex items-center gap-space-4 text-caption-md text-text-muted"
        >
          전체 보기
          <Icon name="chevron-right" className="size-4" />
        </button>
      )}
    </div>
  );
}
