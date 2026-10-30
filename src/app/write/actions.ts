"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { MemoBlock, MemoLabel } from "@/lib/memos";

export type NewMemo = {
  title: string;
  preview: string;
  category: string;
  label: MemoLabel;
  body: MemoBlock[];
};

// 저장에 실패하면 false를 돌려준다.
export async function createMemo(memo: NewMemo) {
  const { error } = await supabase.from("memos").insert({
    title: memo.title,
    preview: memo.preview,
    category: memo.category,
    label: memo.label,
    body: memo.body.length ? memo.body : null,
  });
  if (error) return false;
  revalidatePath("/");
  return true;
}
