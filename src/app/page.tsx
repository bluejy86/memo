import { Suspense } from "react";
import { MemoHome } from "@/components/memo-home";
import { getMemos } from "@/lib/memo-queries";

async function Memos() {
  return <MemoHome memos={await getMemos()} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Memos />
    </Suspense>
  );
}
