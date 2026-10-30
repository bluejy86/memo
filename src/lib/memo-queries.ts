import { supabase } from "./supabase";
import type { Memo, MemoBlock, MemoLabel } from "./memos";

type MemoRow = {
  id: string;
  title: string;
  detail_title: string | null;
  preview: string;
  body: MemoBlock[] | null;
  category: string;
  label: MemoLabel;
  pinned: boolean;
  created_at: string;
};

function toMemo(row: MemoRow): Memo {
  return {
    id: row.id,
    title: row.title,
    preview: row.preview,
    label: row.label,
    category: row.category,
    pinned: row.pinned,
    createdAt: row.created_at,
    detailTitle: row.detail_title ?? undefined,
    body: row.body ?? undefined,
  };
}

export async function getMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as MemoRow[]).map(toMemo);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getMemo(id: string): Promise<Memo | null> {
  if (!UUID.test(id)) return null;
  const { data, error } = await supabase.from("memos").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toMemo(data as MemoRow) : null;
}
