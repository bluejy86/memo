"use client";

import { formatDateTime, type Memo } from "@/lib/memos";
import { Badge } from "./badge";
import { ButtonPrimary } from "./button-primary";
import { IconButton } from "./icon-button";
import { MemoBody } from "./memo-body";

export function MemoDetail({ memo }: { memo: Memo | null }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-space-16 px-space-16 pt-space-48">
      <nav className="flex items-center justify-between">
        <IconButton icon="chevron-left" label="뒤로가기" href="/" />
        <div className="flex">
          <IconButton icon="pin-lg" label="고정" />
          <IconButton icon="share" label="공유" />
          <IconButton icon="more" label="더보기" />
        </div>
      </nav>

      <main className="flex flex-1 flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
        {memo ? (
          <>
            <div className="flex items-center gap-space-8">
              <Badge label={memo.category} color={memo.label} />
              <p className="text-caption-sm text-text-muted">{formatDateTime(memo.createdAt)}</p>
            </div>
            <h1 className="text-heading-lg text-text-primary">
              {memo.detailTitle ?? memo.title}
            </h1>
            <hr className="border-border-default" />
            {memo.body ? (
              <MemoBody blocks={memo.body} />
            ) : (
              <p className="text-body-md text-text-secondary">{memo.preview}</p>
            )}
          </>
        ) : (
          <p className="text-body-md text-text-secondary">메모를 찾을 수 없어요</p>
        )}
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34">
        <ButtonPrimary label="수정하기" />
      </div>
    </div>
  );
}
