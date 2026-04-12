"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  BookOpen,
  User,
  Check,
  ChevronRight,
  X,
  FileText,
  Target,
  PlayCircle,
  ClipboardCheck,
  Video,

} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import  Link from "next/link";
import PdfViewer from "@/components/PdfViewer";
import VideoViewer from "@/components/VideoViewer";

export default function TrackingPage() {
  const router = useRouter();
  const [step, setStep] = useState("identity");
  const [identity, setIdentity] = useState({ name: "", age: "", gender: "" });
  const [results, setResults] = useState({});
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const phone = "6285717494954";

  const indicators = [
    "Kedekatan emosional meningkat",
    "Komunikasi pasangan meningkat",
    "Keintiman meningkat",
    "Kebutuhan seksualitas meningkat",
    "Tidak ada perubahan",
  ];

  const handleIdentity = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value.length > 3) return;
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
    if (totalYa <= 1) return { label: "Tahap Adaptasi", color: "text-red-600" };
    if (totalYa <= 3)
      return { label: "Peningkatan Signifikan", color: "text-orange-600" };
    return { label: "Kondisi Optimal", color: "text-green-600" };
  };

  const sendToWhatsApp = () => {
    let message = `*LAPORAN EVALUASI TERAPI & SENAM KEGEL*\n\n`;
    message += `*PROFIL RESPONDEN*\n`;
    message += `Nama: ${identity.name}\n`;
    message += `Usia: ${identity.age} Tahun\n\n`;
    message += `*HASIL EVALUASI TERAPI*\n`;

    indicators.forEach((ind, i) => {
      // Mengganti simbol dengan teks Ya atau Tidak
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
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-lg mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

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
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm"
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
              Buka Materi Edukasi
            </button>
          </div>
        )}

        {/* STEP 2: MATERIAL */}
        {step === "material" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 p-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                  Materi Edukasi
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="h-[2px] w-8 bg-red-600"></span>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
                    Langkah 02/03
                  </p>
                  <span className="h-[2px] w-8 bg-red-600"></span>
                </div>
              </div>

              {/* MEDIA SELECTOR - CLEAN & PRO */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group relative overflow-hidden flex flex-col items-center gap-4 p-8 bg-neutral-50 border border-neutral-100 rounded-3xl hover:border-black transition-all duration-300"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">
                      Tutorial
                    </span>
                    <span className="block text-xs font-bold text-neutral-900">
                      Tonton Video
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setIsPdfOpen(true)}
                  className="group relative overflow-hidden flex flex-col items-center gap-4 p-8 bg-neutral-50 border border-neutral-100 rounded-3xl hover:border-red-600 transition-all duration-300"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-red-600 transition-colors">
                      Panduan
                    </span>
                    <span className="block text-xs font-bold text-neutral-900">
                      Baca Modul
                    </span>
                  </div>
                </button>
              </div>

              {/* PROCEDURE SUMMARY */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">
                    Ringkasan Prosedur
                  </h3>
                </div>

                <div className="grid gap-3">
                  {[
                    "Kencangkan otot seperti menahan BAK",
                    "Tahan kontraksi selama 5 detik",
                    "Lepaskan kontraksi selama 5 detik",
                    "Ulangi 10 kali (Lakukan 3 Set)",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="group flex gap-4 items-center p-4 bg-neutral-50 rounded-2xl border border-transparent hover:border-neutral-200 transition-all"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-xs font-black shadow-lg group-hover:bg-red-600 transition-colors">
                        0{i + 1}
                      </span>
                      <p className="text-sm font-semibold text-neutral-700">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep("questions")}
                className="w-full mt-10 py-6 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-neutral-200"
              >
                Mulai Evaluasi Terapi <ChevronRight className="w-5 h-5" />
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
            <button
              disabled={!isTrackingComplete}
              onClick={() => setStep("results")}
              className="w-full mt-10 py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 transition-all"
            >
              Selesai & Lihat Hasil
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
              className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700"
            >
              <MessageCircle className="w-4 h-4" /> Kirim Laporan ke Tenaga
              Kesehatan
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
          pdfUrl="https://drive.google.com/file/d/1MJzJTB_nst9qvxPnjpXZpuRLSXrSciBQ/preview"
          title="Modul Senam Kegel"
        />

        <VideoViewer
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl="https://drive.google.com/file/d/1HFtxisMOutyP6LQTdX5ok6hikz9AXt4b/preview"
          title="Video Tutorial Kegel"
        />
      </div>
    </div>
  );
}
