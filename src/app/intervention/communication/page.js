"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  MessageCircle,
  Heart,
  ArrowLeft,
  Users,
  Smile,
  Mic,
  Ear,
  CheckCircle2,
  ClipboardCheck,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

export default function CommunicationPage() {
  const [step, setStep] = useState("materi"); // materi, questions, results
  const [results, setResults] = useState({});

  const phone = "6285717494954";

  const indicators = [
    "Apakah kedekatan emosional meningkat",
    "Apakah komunikasi pasangan meningkat",
    "Apakah keintiman meningkat",
    "Apakah kebutuhan seksualitas meningkat",
    "Apakah tidak ada perubahan",
  ];

  const handleToggle = (index, opt) => {
    setResults((prev) => ({ ...prev, [index]: opt }));
  };

  const totalYa = Object.values(results).filter((v) => v === "Ya").length;
  const isTrackingComplete = Object.keys(results).length === indicators.length;

  const getStatus = () => {
    if (totalYa === 4) return { label: "Sangat Baik", color: "#ef4444" };
    if (totalYa >= 2) return { label: "Cukup Baik", color: "#ef4444" };
    return { label: "Perlu Ditingkatkan", color: "#ef4444" };
  };

  const sendToWhatsApp = () => {
    let message = `*HASIL EVALUASI KOMUNIKASI PASANGAN*\n`;
    message += `----------------------------\n`;
    message += `Status: ${getStatus().label} (${totalYa}/4)\n\n`;
    message += indicators
      .map((ind, i) => `${i + 1}. ${ind}: ${results[i] || "-"}`)
      .join("\n");

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans text-neutral-900">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-neutral-100 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-black uppercase tracking-tight italic text-neutral-900">
              Communication
            </h1>
          </div>
          <MessageSquare className="w-5 h-5 text-red-600" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        {/* STEP 1 & 2: MATERI (Disederhanakan dalam satu view materi) */}
        {step === "materi" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                Langkah 01 & 02
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-2 mb-4">
                Materi & Prosedur
              </h2>
              <p className="text-neutral-200 text-xs leading-relaxed font-medium">
                Pelajari persiapan dan langkah-langkah terapi sebelum melakukan
                evaluasi.
              </p>
              <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                  <Smile className="w-4 h-4" /> Manfaat
                </h3>
                <div className="space-y-2">
                  {[
                    "Komunikasi terbuka",
                    "Keintiman emosional",
                    "Keharmonisan",
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl text-[11px] font-bold text-neutral-600"
                    >
                      <CheckCircle2 className="w-3 h-3 text-red-500" /> {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                  <Ear className="w-4 h-4" /> Persiapan
                </h3>
                <div className="space-y-2">
                  {[
                    "Kursi berhadapan",
                    "Ruang tenang",
                    "Rileks & Tanpa Gadget",
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl text-[11px] font-bold text-neutral-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />{" "}
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-6 flex items-center gap-2">
                <Mic className="w-4 h-4" /> Prosedur Pelaksanaan
              </h3>
              <div className="space-y-3">
                {[
                  "Duduk berhadapan & saling menatap nyaman",
                  "Sebutkan kelebihan pasangan",
                  "Ungkapkan perasaan dengan jujur",
                  "Diskusikan kebutuhan emosional & fisik",
                  "Saling mendengarkan tanpa memotong",
                  "Simpulkan hasil diskusi bersama",
                ].map((stepText, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center bg-neutral-50 p-4 rounded-2xl"
                  >
                    <span className="text-xs font-black w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                      {stepText}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep("questions")}
              className="w-full py-5 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-amber-100 transition-all active:scale-95"
            >
              Lanjut ke Evaluasi <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: QUESTIONS */}
        {step === "questions" && (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-700 rounded-2xl">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Evaluasi Terapi
                </h2>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mt-1">
                  Langkah 03/03
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {indicators.map((ind, i) => (
                <div
                  key={i}
                  className="pb-6 border-b border-neutral-50 last:border-0"
                >
                  <p className="text-sm font-bold text-neutral-700 mb-4">
                    {i + 1}. {ind}?
                  </p>
                  <div className="flex gap-3">
                    {["Ya", "Tidak"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleToggle(i, opt)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${results[i] === opt ? "bg-red-600 border-red-600 text-white" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => setStep("materi")}
                className="flex-1 py-5 bg-neutral-100 text-neutral-400 rounded-2xl font-bold hover:bg-neutral-200 transition-all"
              >
                Kembali
              </button>
              <button
                disabled={!isTrackingComplete}
                onClick={() => setStep("results")}
                className="flex-[2] py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 transition-all"
              >
                Selesai & Lihat Hasil
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === "results" && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-lg overflow-hidden text-center">
              <div className="bg-amber-700 pt-10 pb-8 px-8 flex flex-col items-center gap-5">
                <div className="w-40 h-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="75%"
                      outerRadius="100%"
                      barSize={12}
                      data={[{ value: (totalYa / 5) * 100 }]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                      />
                      <RadialBar
                        background={{ fill: "#333" }}
                        dataKey="value"
                        cornerRadius={10}
                        fill="#358e05"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
                    {totalYa}/5
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {getStatus().label}
                </h2>
              </div>
              <div className="p-8 space-y-3">
                {indicators.map((ind, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-left"
                  >
                    {results[i] === "Ya" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-neutral-300" />
                    )}
                    <span
                      className={
                        results[i] === "Ya"
                          ? "text-neutral-900 font-medium"
                          : "text-neutral-400"
                      }
                    >
                      {ind}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={sendToWhatsApp}
              className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700 shadow-lg shadow-red-100"
            >
              <MessageCircle className="w-4 h-4" /> Kirim Laporan ke Tenaga
              Kesehatan
            </button>
            <button
              onClick={() => setStep("materi")}
              className="w-full py-4 text-neutral-400 text-[10px] font-black uppercase tracking-widest"
            >
              Ulangi Terapi
            </button>
            <Link
              href="/"
              className="block text-center py-2 text-[10px] font-black text-amber-400 hover:text-amber-950 uppercase tracking-[0.2em] transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
