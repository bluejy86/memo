"use client";

import { useState, useSyncExternalStore } from "react";
import { CATEGORIES, formatRelativeDate, type Memo } from "@/lib/memos";
import { ButtonPrimary } from "./button-primary";
import { CardHeader } from "./card-header";
import { Chip } from "./chip";
import { MemoItem } from "./memo-item";

const TODAY = "10월 30일 금요일";

const noopSubscribe = () => () => {};

export function MemoHome({ memos }: { memos: Memo[] }) {
  // 브라우저에서 다시 그린 뒤 true가 된다
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [category, setCategory] = useState("전체");
  const shown = memos.filter((memo) => category === "전체" || memo.category === category);
  const pinned = shown.filter((memo) => memo.pinned);
  const recent = shown
    .filter((memo) => !memo.pinned)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  // 오늘·어제는 브라우저의 현재 시각으로 정하므로 읽은 뒤에 보여 준다
  const dateOf = (iso: string) => (ready ? formatRelativeDate(iso) : "");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-space-16 px-space-16 pt-space-64">
      <main className="flex flex-1 flex-col gap-space-16">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-muted">{TODAY}</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">{memos.length}개</span> 남겼어요
          </h1>
        </header>

        <div className="flex gap-space-8 overflow-x-auto px-space-4">
          {CATEGORIES.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={name === category}
              onClick={() => setCategory(name)}
            />
          ))}
        </div>

        {pinned.length > 0 && (
          <section className="overflow-hidden rounded-xl bg-surface-card py-space-8">
            <CardHeader title="고정한 메모" pin />
            <ul>
              {pinned.map((memo) => (
                <MemoItem key={memo.id} {...memo} date={dateOf(memo.createdAt)} />
              ))}
            </ul>
          </section>
        )}

        {recent.length > 0 && (
          <section className="overflow-hidden rounded-xl bg-surface-card py-space-8">
            <CardHeader title="최근 메모" action />
            <ul>
              {recent.map((memo) => (
                <MemoItem key={memo.id} {...memo} date={dateOf(memo.createdAt)} />
              ))}
            </ul>
          </section>
        )}
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34">
        <ButtonPrimary label="새 메모 쓰기" icon href="/write" />
      </div>
    </div>
  );
}
