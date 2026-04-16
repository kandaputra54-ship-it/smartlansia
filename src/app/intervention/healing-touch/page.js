"use client";
import React, { useState } from "react";
import { ArrowLeft, MessageCircle, BookOpen, User, Check, ChevronRight, X, FileText, Target, ClipboardCheck, } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, } from "recharts";
import PdfViewer from "@/components/PdfViewer";
import HealingTouchQuiz from "@/components/HealingTouchQuiz";

export default function HealingTouchPage() {
  const router = useRouter();
  const [step, setStep] = useState("quiz");
  const [identity, setIdentity] = useState({ name: "", age: "", gender: "" });
  const [results, setResults] = useState({});
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const phone = "6285717494954";

  const indicators = [
    "Kedekatan emosional meningkat",
    "Komunikasi pasangan meningkat",
    "Keintiman meningkat",
    "Kebutuhan seksualitas terpenuhi",
    "Tidak ada perubahan ",
  ];

  const handleIdentity = (e) => {
    const { name, value } = e.target;
    setIdentity((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (step === "material") setStep("identity");
    else if (step === "questions") setStep("material");
    else if (step === "results") setStep("questions");
    else router.push("/");
  };

  const handleToggle = (index, value) => {
    setResults((prev) => ({ ...prev, [index]: value }));
  };

  const totalYa = Object.values(results).filter((v) => v === "Ya").length;
  const isTrackingComplete = Object.keys(results).length === indicators.length;

  const getStatus = () => {
    if (totalYa <= 2) return { label: "Tahap Awal", color: "text-red-600" };
    if (totalYa <= 4)
      return { label: "Peningkatan Baik", color: "text-orange-600" };
    return { label: "Sangat Harmonis", color: "text-green-600" };
  };

  const sendToWhatsApp = () => {
    let message = `*LAPORAN EVALUASI HEALING TOUCH*\n\n`;
    message += `*PROFIL RESPONDEN*\n`;
    message += `Nama: ${identity.name}\n`;
    message += `Usia: ${identity.age} Tahun\n`;
    message += `Gender: ${identity.gender}\n\n`;
    message += `*HASIL EVALUASI*\n`;

    indicators.forEach((ind, i) => {
      // Mengganti emoji dengan teks Ya atau Tidak
      const status = results[i] === "Ya" ? "Ya" : "Tidak";
      message += `• ${ind}: ${status}\n`;
    });

    message += `\n*KESIMPULAN:* ${getStatus().label.toUpperCase()}`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6 font-sans">
      <div className="max-w-lg mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        {/* --- STEP 0: QUIZ (PRE/POST) --- */}
        {step === "quiz" && (
          <div className="animate-in fade-in duration-700">
             <HealingTouchQuiz onComplete={() => setStep("identity")} />
          </div>
        )}

        {/* STEP 1: IDENTITY */}
        {step === "identity" && (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-700 rounded-2xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Profil Responden
                </h2>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mt-1">
                  Langkah 01/03
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={identity.name}
                onChange={handleIdentity}
                placeholder="Nama Lengkap"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="age"
                  value={identity.age}
                  onChange={handleIdentity}
                  placeholder="Usia"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm"
                />
                <select
                  name="gender"
                  value={identity.gender}
                  onChange={handleIdentity}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm appearance-none"
                >
                  <option value="">Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
            <button
              disabled={!identity.name || !identity.age || !identity.gender}
              onClick={() => setStep("material")}
              className="w-full mt-10 py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 transition-all flex items-center justify-center gap-2"
            >
              Lanjut ke Materi <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: MATERIAL */}
        {step === "material" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 p-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight uppercase">
                  Materi Terapi
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="h-[2px] w-8 bg-red-600"></span>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
                    Langkah 02/03
                  </p>
                  <span className="h-[2px] w-8 bg-red-600"></span>
                </div>
              </div>

              {/* SINGLE PDF SELECTOR - FULL WIDTH */}
              <button
                onClick={() => setIsPdfOpen(true)}
                className="w-full group relative overflow-hidden flex flex-col items-center gap-4 p-10 bg-neutral-50 border border-neutral-100 rounded-[2rem] hover:border-red-600 transition-all duration-300 mb-10"
              >
                <div className="p-5 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-10 h-10 text-red-600" />
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-red-600 transition-colors">
                    Modul Edukasi
                  </span>
                  <span className="block text-sm font-black text-neutral-900 mt-1">
                    Buka Panduan Healing Touch
                  </span>
                </div>
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">
                    Prosedur Utama
                  </h3>
                </div>
                <div className="grid gap-3">
                  {[
                    "Duduk berdekatan & saling memegang tangan",
                    "Sentuhan lembut pada tangan & bahu",
                    "Saling menatap mata dengan napas teratur",
                    "Ungkapkan perasaan positif (5-10 menit)",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center p-4 bg-neutral-50 rounded-2xl border border-transparent hover:border-neutral-200 transition-all"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                        0{i + 1}
                      </span>
                      <p className="text-xs font-bold text-neutral-700">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep("questions")}
                className="w-full mt-10 py-6 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
              >
                Mulai Evaluasi <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
                <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">
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
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${results[i] === opt ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-100" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled={!isTrackingComplete}
              onClick={() => setStep("results")}
              className="w-full mt-10 py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 transition-all shadow-lg"
            >
              Lihat Hasil Akhir
            </button>
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
                      data={[{ value: (totalYa / indicators.length) * 100 }]}
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
                    {totalYa}/{indicators.length}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
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
              className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-700 shadow-xl"
            >
              <MessageCircle className="w-4 h-4" /> Kirim Laporan ke Ners
            </button>
            <Link
              href="/"
              className="block text-center py-2 text-[10px] font-black text-amber-400 hover:text-amber-950 uppercase tracking-[0.2em] transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}

        <PdfViewer
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfUrl="https://drive.google.com/file/d/17trVPm3EP4FS4rH67VHsmqK6L4VRwP_t/preview"
          title="Modul Healing Touch"
        />
      </div>
    </div>
  );
}
