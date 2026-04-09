"use client";
import { useState } from "react";
import { Heart, User, ArrowRight, Activity, MessageCircle, Star, Save, Smile, AlertCircle, } from "lucide-react";
import Link from "next/link";

export default function InterventionPage() {
  const [step, setStep] = useState("consent");
  const [identity, setIdentity] = useState({
    nama: "",
    umur: "",
    gender: "",
    pasangan: "",
    tanggal: new Date().toISOString().split("T")[0],
  });
  const [formA, setFormA] = useState({});
  const [formB, setFormB] = useState({});
  const [evaluasi, setEvaluasi] = useState([]);
  const [showValidation, setShowValidation] = useState(false);

  const sendToWhatsApp = () => {
    const phone = "6285717494954";

    const questionsA = [
      "Pertama kali bertemu",
      "Kenangan paling bahagia",
      "Aktivitas romantis",
      "Hal yang membuat harmonis",
      "Perasaan saat ini",
    ];

    const questionsB = [
      "Senang saat mengingat pasangan",
      "Tersenyum saat bercerita",
      "Kedekatan emosional",
      "Komunikasi meningkat",
      "Nyaman dengan pasangan",
    ];

    let message = `*HASIL TERAPI REMINISCENCE*\n`;
    message += `----------------------------\n`;
    message += `*Identitas:*\n`;
    message += `- Nama: ${identity.nama}\n`;
    message += `- Umur: ${identity.umur}\n`;
    message += `- Gender: ${identity.gender}\n`;
    message += `- Pasangan: ${identity.pasangan}\n\n`;

    message += `*A. JAWABAN KENANGAN*\n`;
    questionsA.forEach((q, i) => {
      message += `${i + 1}. ${q}: ${formA[i] || "-"}\n`;
    });

    message += `\n*B. RESPON EMOSIONAL*\n`;
    questionsB.forEach((q, i) => {
      message += `- ${q}: ${formB[i] || "-"}\n`;
    });

    message += `\n*C. EVALUASI*\n`;
    message +=
      evaluasi.length > 0 ? evaluasi.map((e) => `- ${e}`).join("\n") : "-";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  const handleFormA = (idx, val) =>
    setFormA((prev) => ({ ...prev, [idx]: val }));
  const handleFormB = (idx, val) =>
    setFormB((prev) => ({ ...prev, [idx]: val }));
  const toggleEvaluasi = (item) => {
    setEvaluasi((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  // Validation checks
  const formAQuestions = 5;
  const formBQuestions = 5;

  const isFormAComplete = Array.from(
    { length: formAQuestions },
    (_, i) => i,
  ).every((i) => formA[i] && formA[i].trim() !== "");
  const isFormBComplete = Array.from(
    { length: formBQuestions },
    (_, i) => i,
  ).every((i) => formB[i] !== undefined && formB[i] !== "");
  const isEvaluasiComplete = evaluasi.length > 0;

  const incompleteFormA = Array.from(
    { length: formAQuestions },
    (_, i) => i,
  ).filter((i) => !formA[i] || formA[i].trim() === "");
  const incompleteFormB = Array.from(
    { length: formBQuestions },
    (_, i) => i,
  ).filter((i) => formB[i] === undefined || formB[i] === "");

  const isAllComplete =
    isFormAComplete && isFormBComplete && isEvaluasiComplete;

  const handleSelesai = () => {
    if (!isAllComplete) {
      setShowValidation(true);
      // Scroll to top of form to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep("result");
  };

  // --- RENDERS ---

  if (step === "consent") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-neutral-200 p-10 md:p-14 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-100">
            <Heart className="w-10 h-10 text-red-600 fill-red-600" />
          </div>
          <h1 className="text-3xl font-black text-neutral-900 mb-6 tracking-tighter uppercase">
            Terapi Reminiscence
          </h1>
          <p className="text-neutral-500 mb-10 leading-relaxed text-sm">
            Instrumen ini dirancang untuk menggali kenangan positif bersama
            pasangan guna meningkatkan keintiman dan kebutuhan seksualitas
            lansia secara sehat dan bermartabat.
            <strong> Seluruh data bersifat rahasia dan tidak dibagikan.</strong>
          </p>
          <button
            onClick={() => setStep("identity")}
            className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            Mulai Sesi Terapi <ArrowRight className="w-5 h-5 text-red-500" />
          </button>
          <Link
            href="/"
            className="block mt-6 text-xs font-bold text-neutral-400 uppercase tracking-widest hover:text-neutral-900"
          >
            Batal
          </Link>
        </div>
      </div>
    );
  }

  if (step === "identity") {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-[2.5rem] shadow-sm border border-neutral-200 p-10 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="p-4 bg-neutral-900 rounded-2xl mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              Data Profil Lansia
            </h2>
            <p className="text-xs text-neutral-400 mt-2 uppercase tracking-widest font-semibold">
              Lengkapi informasi untuk personalisasi sesi
            </p>
          </div>

          <div className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 ml-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium text-neutral-800 placeholder:text-neutral-300"
                onChange={(e) =>
                  setIdentity({ ...identity, nama: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Umur */}
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 ml-1">
                  Usia Anda
                </label>
                <input
                  type="number"
                  placeholder="Thn"
                  maxLength="3"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 3))}
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium text-neutral-800 placeholder:text-neutral-300"
                  onChange={(e) =>
                    setIdentity({ ...identity, umur: e.target.value })
                  }
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 ml-1">
                  Jenis Kelamin
                </label>
                <select
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium text-neutral-800 appearance-none cursor-pointer"
                  onChange={(e) =>
                    setIdentity({ ...identity, gender: e.target.value })
                  }
                >
                  <option value="">Pilih...</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Nama Pasangan */}
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 ml-1">
                Nama Pasangan
              </label>
              <input
                type="text"
                placeholder="Nama istri / suami"
                className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium text-neutral-800 placeholder:text-neutral-300"
                onChange={(e) =>
                  setIdentity({ ...identity, pasangan: e.target.value })
                }
              />
            </div>
          </div>

          <button
            disabled={
              !identity.nama ||
              !identity.umur ||
              !identity.gender ||
              !identity.pasangan
            }
            onClick={() => setStep("form")}
            className="w-full mt-10 py-5 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-300 transition-all shadow-lg active:scale-[0.98]"
          >
            Lanjutkan Terapi
          </button>
        </div>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Validation Banner */}
          {showValidation && !isAllComplete && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-4 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-black mb-2">
                  Mohon lengkapi semua bagian sebelum menyelesaikan sesi:
                </p>
                <ul className="space-y-1 font-medium list-disc list-inside">
                  {!isFormAComplete && (
                    <li>
                      Bagian A: {incompleteFormA.length} pertanyaan kenangan
                      belum dijawab (No.{" "}
                      {incompleteFormA.map((i) => i + 1).join(", ")})
                    </li>
                  )}
                  {!isFormBComplete && (
                    <li>
                      Bagian B: {incompleteFormB.length} respon emosional belum
                      dipilih (No.{" "}
                      {incompleteFormB.map((i) => i + 1).join(", ")})
                    </li>
                  )}
                  {!isEvaluasiComplete && (
                    <li>Bagian C: Pilih minimal 1 capaian evaluasi terapi</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Section A: Kenangan */}
          <div
            className={`bg-white rounded-3xl border overflow-hidden shadow-sm ${showValidation && !isFormAComplete ? "border-red-300" : "border-neutral-200"}`}
          >
            <div className="bg-black px-8 py-5 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">
                A. Kenangan Hubungan Pasangan
              </h2>
              <div className="flex items-center gap-2">
                {showValidation && !isFormAComplete && (
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                    Belum lengkap
                  </span>
                )}
                {isFormAComplete && (
                  <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                    ✓ Lengkap
                  </span>
                )}
                <MessageCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="p-8 space-y-8">
              {[
                "Bagaimana pertama kali bertemu dengan pasangan?",
                "Kenangan paling bahagia bersama pasangan?",
                "Aktivitas romantis yang sering dilakukan?",
                "Hal yang membuat hubungan tetap harmonis?",
                "Perasaan terhadap pasangan saat ini?",
              ].map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-bold text-neutral-900 mb-3">
                    {i + 1}. {q}
                    {showValidation &&
                      (!formA[i] || formA[i].trim() === "") && (
                        <span className="ml-2 text-[10px] font-black text-red-500 uppercase tracking-widest">
                          * Wajib diisi
                        </span>
                      )}
                  </label>
                  <textarea
                    className={`w-full bg-neutral-50 border rounded-2xl px-5 py-4 focus:border-red-600 outline-none transition-all text-sm font-medium min-h-[100px]
                      ${showValidation && (!formA[i] || formA[i].trim() === "") ? "border-red-300 bg-red-50" : "border-neutral-100"}`}
                    placeholder="Ceritakan kenangan Anda..."
                    value={formA[i] || ""}
                    onChange={(e) => {
                      handleFormA(i, e.target.value);
                      if (showValidation) setShowValidation(true); // re-trigger to re-evaluate
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Respon Emosional */}
          <div
            className={`bg-white rounded-3xl border overflow-hidden shadow-sm ${showValidation && !isFormBComplete ? "border-red-300" : "border-neutral-200"}`}
          >
            <div className="bg-neutral-900 px-8 py-5 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">
                B. Respon Emosional
              </h2>
              <div className="flex items-center gap-2">
                {showValidation && !isFormBComplete && (
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                    Belum lengkap
                  </span>
                )}
                {isFormBComplete && (
                  <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                    ✓ Lengkap
                  </span>
                )}
                <Activity className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Tampak senang saat mengingat pasangan",
                "Tersenyum saat bercerita",
                "Menunjukkan kedekatan emosional",
                "Komunikasi pasangan meningkat",
                "Tampak nyaman dengan pasangan",
              ].map((q, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all
                  ${showValidation && (formB[i] === undefined || formB[i] === "") ? "bg-red-50 border-red-200" : "bg-neutral-50 border-neutral-100"}`}
                >
                  <p className="text-xs font-bold text-neutral-800">
                    {q}
                    {showValidation &&
                      (formB[i] === undefined || formB[i] === "") && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                  </p>
                  <div className="flex gap-2">
                    {["Ya", "Tidak"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleFormB(i, opt)}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all
                          ${formB[i] === opt ? "bg-red-600 border-red-600 text-white" : "bg-white border-neutral-200 text-neutral-400"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Evaluasi */}
          <div
            className={`bg-white rounded-3xl border overflow-hidden shadow-sm ${showValidation && !isEvaluasiComplete ? "border-red-300" : "border-neutral-200"}`}
          >
            <div className="bg-neutral-100 px-8 py-5 flex items-center justify-between border-b border-neutral-200">
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900">
                C. Evaluasi Terapi
              </h2>
              <div className="flex items-center gap-2">
                {showValidation && !isEvaluasiComplete && (
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    Pilih minimal 1
                  </span>
                )}
                {isEvaluasiComplete && (
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                    ✓ Lengkap
                  </span>
                )}
                <Star className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Kedekatan emosional meningkat",
                "Komunikasi pasangan meningkat",
                "Keintiman meningkat",
                "Kebutuhan seksualitas meningkat",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleEvaluasi(item)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left
                    ${evaluasi.includes(item) ? "border-red-600 bg-red-50 shadow-sm" : "border-neutral-100 bg-neutral-50 hover:border-neutral-300"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all 
                    ${evaluasi.includes(item) ? "bg-red-600" : "bg-neutral-200"}`}
                  >
                    <Save
                      className={`w-3 h-3 text-white ${evaluasi.includes(item) ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${evaluasi.includes(item) ? "text-red-900" : "text-neutral-500"}`}
                  >
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4 px-2">
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${isFormAComplete ? "bg-red-600" : "bg-neutral-200"}`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${isFormBComplete ? "bg-red-600" : "bg-neutral-200"}`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${isEvaluasiComplete ? "bg-red-600" : "bg-neutral-200"}`}
            />
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest whitespace-nowrap">
              {
                [isFormAComplete, isFormBComplete, isEvaluasiComplete].filter(
                  Boolean,
                ).length
              }
              /3 Selesai
            </span>
          </div>

          <button
            onClick={handleSelesai}
            className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all
              ${
                isAllComplete
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
          >
            {isAllComplete
              ? "Selesaikan Sesi Terapi"
              : "Lengkapi Semua Bagian Terlebih Dahulu"}
          </button>
        </div>
      </div>
    );
  }

  // Result Summary
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-12 border border-neutral-100 relative overflow-hidden text-center">
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-orange-500" />

        <div className="relative z-10">
          {/* Icon Header - Scaled for mobile */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-100">
            <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 tracking-tighter uppercase italic">
            Sesi Selesai
          </h2>

          <p className="text-neutral-500 text-xs sm:text-sm font-medium leading-relaxed mb-8 px-2">
            Terima kasih telah berbagi kenangan. Laporan Anda siap dikirim ke
            WhatsApp.
          </p>

          {/* Summary Card - List format mobile friendly */}
          <div className="bg-neutral-50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 border border-neutral-100 mb-8 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-3.5 h-3.5 text-red-600" />
              <p className="text-[9px] sm:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                Hasil Evaluasi
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {evaluasi.length > 0 ? (
                evaluasi.map((ev) => (
                  <div
                    key={ev}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold text-neutral-700 leading-none">
                      {ev}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400 italic text-center py-2">
                  Tidak ada data evaluasi
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons - Full width for thumb reach */}
          <div className="space-y-3">
            <button
              onClick={sendToWhatsApp}
              className="flex items-center justify-center gap-3 w-full py-4 sm:py-5 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 active:scale-[0.97] transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-sm sm:text-base">Kirim ke WhatsApp</span>
            </button>

            <Link
              href="/"
              className="block w-full py-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-neutral-800 transition-colors"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
