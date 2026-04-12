"use client";
import React, { useState } from "react";
import { ArrowLeft,  MessageCircle, LineChart,  User, Check, ChevronRight, X} from "lucide-react";
import { useRouter } from "next/navigation";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, } from "recharts";

export default function TrackingPage() {
  const router = useRouter();
  const [step, setStep] = useState("identity"); // identity -> questions -> results
  const [identity, setIdentity] = useState({ name: "", age: "", gender: "" });
  const [results, setResults] = useState({});
  const phone = "6285717494954";

  const indicators = [
    "Komunikasi pasangan meningkat",
    "Kedekatan emosional meningkat",
    "Keintiman pasangan meningkat",
    "Kepuasan hubungan meningkat",
    "Kepercayaan diri lansia meningkat",
  ];

  const handleIdentity = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value.length > 3) return;
    setIdentity((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (step === "questions") setStep("identity");
    else if (step === "results") setStep("questions");
    else router.push("/");
  };

  const handleToggle = (index, value) => {
    setResults((prev) => ({ ...prev, [index]: value }));
  };

  const totalYa = Object.values(results).filter((v) => v === "Ya").length;
  const isTrackingComplete = Object.keys(results).length === indicators.length;

  const getStatus = () => {
    if (totalYa <= 1)
      return {
        label: "Belum Meningkat",
        color: "text-red-600",
        bg: "bg-red-50",
      };
    if (totalYa <= 3)
      return {
        label: "Cukup Meningkat",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return {
      label: "Meningkat Baik",
      color: "text-green-600",
      bg: "bg-green-50",
    };
  };

  const sendToWhatsApp = () => {
    let message = `*LAPORAN TRACKING & MONITORING*\n\n`;
    message += `*PROFIL*\n`;
    message += `Nama: ${identity.name}\n`;
    message += `Umur: ${identity.age} Tahun\n`;
    message += `Gender: ${identity.gender}\n\n`;
    message += `*HASIL EVALUASI*\n`;
    message += `----------------------------\n`;
    indicators.forEach((ind, i) => {
      message += `${i + 1}. ${ind}: ${results[i] === "Ya" ? "Ya" : "Tidak"}\n`;
    });
    message += `----------------------------\n`;
    message += `*Total Skor:* ${totalYa}/5\n`;
    message += `*Kesimpulan:* ${getStatus().label.toUpperCase()}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Navigasi Back */}
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        {/* STEP: IDENTITY */}
        {step === "identity" && (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-700 rounded-2xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Profil Responden
                </h2>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1">
                  Langkah 01/02
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={identity.name}
                  onChange={handleIdentity}
                  placeholder="Gunakan inisial jika ragu"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                    Usia Anda
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={identity.age}
                    onChange={handleIdentity}
                    placeholder="Thn"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={identity.gender}
                    onChange={handleIdentity}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-neutral-900 outline-none transition-all font-medium text-sm appearance-none"
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              disabled={!identity.name || !identity.age || !identity.gender}
              onClick={() => setStep("questions")}
              className="w-full mt-12 py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 disabled:text-neutral-300 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
            >
              Mulai Kuesioner <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP: QUESTIONS */}
        {step === "questions" && (
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-700 rounded-2xl">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Tracking Indikator
                </h2>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1">
                  Langkah 02/02
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {indicators.map((ind, i) => (
                <div
                  key={i}
                  className="pb-6 border-b border-neutral-50 last:border-0"
                >
                  <p className="text-sm font-bold text-neutral-700 mb-4 leading-relaxed">
                    {i + 1}. {ind}
                  </p>
                  <div className="flex gap-3">
                    {["Ya", "Tidak"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleToggle(i, opt)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                        ${
                          results[i] === opt
                            ? "bg-amber-600 border-amber-600 text-white"
                            : "bg-neutral-50 border-neutral-100 text-neutral-400 hover:bg-neutral-100"
                        }`}
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
              className="w-full mt-10 py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:bg-neutral-100 disabled:text-neutral-300 transition-all shadow-xl shadow-black/10"
            >
              Lihat Hasil Akhir
            </button>
          </div>
        )}

        {/* STEP: RESULTS */}
        {step === "results" && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-4">
            {/* Card Utama */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-lg overflow-hidden">
              {/* Header Skor */}
              <div className="bg-black pt-10 pb-8 px-8 text-center flex flex-col items-center gap-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                  Kesimpulan Akhir
                </p>

                {/* Recharts RadialBar */}
                <div className="w-44 h-44 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="72%"
                      outerRadius="90%"
                      barSize={14}
                      data={[
                        {
                          name: "Score",
                          value: (totalYa / indicators.length) * 100,
                        },
                      ]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                      />
                      <RadialBar
                        background={{ fill: "#2a2a2a" }}
                        dataKey="value"
                        cornerRadius={8}
                        fill="#DC2626"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold tracking-tight text-white">
                      {totalYa}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
                      Dari {indicators.length}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {getStatus().label}
                  </h2>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1 font-semibold">
                    {totalYa} dari {indicators.length} indikator tercapai
                  </p>
                </div>

                {/* Badge Ya / Tidak */}
                <div className="flex gap-3 w-full">
                  <div className="flex-1 bg-red-600 rounded-2xl px-5 py-3 text-center">
                    <p className="text-2xl font-bold text-white">{totalYa}</p>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-red-200">
                      Ya
                    </p>
                  </div>
                  <div className="flex-1 bg-neutral-800 rounded-2xl px-5 py-3 text-center">
                    <p className="text-2xl font-bold text-white">
                      {indicators.length - totalYa}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
                      Tidak
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail Capaian */}
              <div className="px-8 py-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-5">
                  Detail Capaian
                </p>
                <div className="divide-y divide-neutral-100">
                  {indicators.map((ind, i) => {
                    const isYa = results[i] === "Ya";
                    return (
                      <div key={i} className="flex items-center gap-3 py-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isYa ? "bg-black" : "bg-neutral-100"}`}
                        >
                          {isYa ? (
                            <Check className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-neutral-400" />
                          )}
                        </div>
                        <span
                          className={`text-sm flex-1 leading-snug ${isYa ? "text-neutral-900 font-medium" : "text-neutral-400"}`}
                        >
                          {ind}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest shrink-0 ${isYa ? "text-red-600" : "text-neutral-300"}`}
                        >
                          {results[i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={sendToWhatsApp}
                className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 hover:bg-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-200"
              >
                <MessageCircle className="w-4 h-4" />
                Kirim ke Tenaga Kesehatan
              </button>
              <button
                onClick={() => setStep("identity")}
                className="w-full py-4 text-neutral-400 font-bold text-[10px] uppercase tracking-widest hover:text-neutral-900 transition-colors border border-neutral-200 rounded-2xl"
              >
                Lakukan Pengisian Ulang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
