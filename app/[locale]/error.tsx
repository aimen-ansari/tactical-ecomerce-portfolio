"use client";
import { ErrorState } from "@/components/pages/status";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} />;
}
