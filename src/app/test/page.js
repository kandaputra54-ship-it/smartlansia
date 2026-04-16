"use client";
import SexualityKnowledgeQuiz from "@/components/SexualityKnowledgeQuiz";
import { useRouter } from "next/navigation";

export default function ScreeningPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <SexualityKnowledgeQuiz onComplete={() => router.push("/")} />
      </div>
    </div>
  );
}