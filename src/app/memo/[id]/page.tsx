import { Suspense } from "react";
import { MemoDetail } from "@/components/memo-detail";
import { getMemo } from "@/lib/memo-queries";

async function Detail({ params }: Pick<PageProps<"/memo/[id]">, "params">) {
  const { id } = await params;
  return <MemoDetail memo={await getMemo(id)} />;
}

export default function MemoDetailPage({ params }: PageProps<"/memo/[id]">) {
  return (
    <Suspense fallback={null}>
      <Detail params={params} />
    </Suspense>
  );
}
