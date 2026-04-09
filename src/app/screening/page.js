"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle, AlertCircle, XCircle, ArrowRight, Heart, User, Lock, ChevronRight, Brain, PersonStanding, MessageCircleHeart, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

const questions = [
  { id: 1, section: "Aspek Kesehatan Fisik", text: "Memiliki penyakit kronis (DM, hipertensi)" },
  { id: 2, section: "Aspek Kesehatan Fisik", text: "Rutin minum obat" },
  { id: 3, section: "Aspek Kesehatan Fisik", text: "Mengalami kelelahan saat beraktivitas" },
  { id: 4, section: "Aspek Kesehatan Fisik", text: "Mengalami gangguan tidur" },
  { id: 5, section: "Aspek Psikologis", text: "Merasa cemas atau stres" },
  { id: 6, section: "Aspek Psikologis", text: "Merasa kurang percaya diri" },
  { id: 7, section: "Aspek Psikologis", text: "Merasa kesepian" },
  { id: 8, section: "Aspek Seksualitas Lansia", text: "Mengalami penurunan gairah seksual" },
  { id: 9, section: "Aspek Seksualitas Lansia", text: "Kesulitan dalam hubungan seksual" },
  { id: 10, section: "Aspek Seksualitas Lansia", text: "Merasa malu membahas seksualitas" },
  { id: 11, section: "Aspek Seksualitas Lansia", text: "Komunikasi seksual dengan pasangan kurang" },
  { id: 12, section: "Aspek Seksualitas Lansia", text: "Tidak puas dalam hubungan seksual" },
];

const interventions = [
  {
    title: "Terapi Reminiscence",
    description: "Meningkatkan kesejahteraan emosional melalui penguatan kenangan positif.",
    href: "/intervention/reminiscence",
    icon: Brain,
  },
  {
    title: "Senam Kegel Lansia",
    description: "Latihan otot panggul untuk kontrol kandung kemih dan vitalitas fisik.",
    href: "/intervention/kegel",
    icon: PersonStanding,
  },
  {
    title: "Komunikasi Pasangan",
    description: "Meningkatkan keintiman melalui dialog terpandu dan pengertian mendalam.",
    href: "/intervention/communication",
    icon: MessageCircleHeart,
  },
  {
    title: "Healing Touch Therapy",
    description: "Sentuhan terapeutik untuk relaksasi maksimal dan kenyamanan psikologis.",
    href: "/intervention/healing-touch",
    icon: Sparkles,
  },
  {
    title: "Edukasi Seksualitas",
    description: "Kesehatan reproduksi dan adaptasi keintiman di usia lanjut.",
    href: "/#telenursing",
    icon: BookOpen,
  },
];

function getResult(score) {
  if (score <= 3) return {
    label: "Normal",
    color: "text-neutral-900",
    bg: "bg-neutral-100",
    border: "border-neutral-300",
    icon: CheckCircle,
    desc: "Kondisi Anda saat ini berada dalam parameter normal berdasarkan instrumen ASKAS.",
  };
  if (score <= 6) return {
    label: "Risiko Ringan",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-300",
    icon: AlertCircle,
    desc: "Terdeteksi indikasi risiko ringan. Disarankan untuk memantau aktivitas harian Anda secara rutin.",
  };
  if (score <= 10) return {
    label: "Risiko Sedang",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-400",
    icon: AlertCircle,
    desc: "Terdeteksi risiko sedang. Sangat disarankan untuk melakukan konsultasi dengan tenaga medis profesional.",
  };
  return {
    label: "Risiko Tinggi",
    color: "text-red-900",
    bg: "bg-red-100",
    border: "border-red-700",
    icon: XCircle,
    desc: "Peringatan: Risiko tinggi terdeteksi. Segera hubungi layanan kesehatan atau perawat pendamping.",
  };
}

function buildWhatsAppMessage(identity, answers, score, result) {
  const sections = [...new Set(questions.map(q => q.section))];
  const genderLabel = identity.gender === "L" ? "Laki-laki" : identity.gender === "P" ? "Perempuan" : "-";

  let msg = `*LAPORAN SKRINING ASKAS LANSIA*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `*DATA RESPONDEN*\n`;
  msg += ` Nama     : ${identity.nama || "-"}\n`;
  msg += ` Usia     : ${identity.umur || "-"} tahun\n`;
  msg += ` Gender   : ${genderLabel}\n`;
  msg += ` Tinggal  : ${identity.tinggal || "-"}\n\n`;

  sections.forEach((section) => {
    msg += `*${section.toUpperCase()}*\n`;
    questions
      .filter((q) => q.section === section)
      .forEach((q) => {
        const jawaban = answers[q.id];
        // Baris di bawah ini telah diubah (icon dihapus)
        msg += `- ${q.text}: *${jawaban ? jawaban.toUpperCase() : "-"}*\n`;
      });
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += ` *HASIL SKRINING*\n`;
  msg += `Skor Total : *${score} / 12*\n`;
  msg += `Status     : *${result.label}*\n\n`;
  msg += `_"${result.desc}"_\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Dikirim via Instrumen ASKAS Lansia_`;

  return encodeURIComponent(msg);
}

export default function ScreeningPage() {
  const [step, setStep] = useState("consent");
  const [identity, setIdentity] = useState({ nama: "", umur: "", gender: "", tinggal: "" });
  const [answers, setAnswers] = useState({});

  const handleAnswer = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));
  const score = Object.values(answers).filter((v) => v === "ya").length;
  const result = getResult(score);
  const ResultIcon = result.icon;
  const sections = [...new Set(questions.map((q) => q.section))];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // ─── CONSENT ────────────────────────────────────────────────────────────────
  if (step === "consent") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-neutral-200 p-10 md:p-14">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center rotate-3">
                <Lock className="w-10 h-10 text-white -rotate-3" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center border-4 border-white">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-black text-neutral-900 mb-6 text-center tracking-tighter uppercase">
            Informed Consent
          </h1>

          <div className="space-y-4 text-neutral-600 text-sm leading-relaxed mb-10 text-justify">
            <p>
              Instrumen <strong>ASKAS LANSIA</strong> (Asesmen Kesehatan Kasus Lansia) dirancang untuk memberikan
              deteksi dini terhadap risiko kesehatan fisik, psikologis, dan fungsional.
            </p>
            <p className="p-4 bg-neutral-50 rounded-xl border-l-4 border-red-600 font-medium italic">
              "Kami menjamin kerahasiaan penuh atas data pribadi dan jawaban Anda. Seluruh informasi yang dikumpulkan
              hanya akan digunakan untuk kepentingan analisis kesehatan dan edukasi medis secara internal."
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Data tidak akan pernah dibagikan kepada pihak ketiga atau platform iklan mana pun.</li>
              <li>Partisipasi Anda bersifat sukarela dan Anda dapat menghentikan pengisian kapan saja.</li>
              <li>
                Hasil skrining bersifat informatif dan bukan merupakan pengganti diagnosis medis final dari dokter.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setStep("identity")}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Setuju & Lanjutkan <ArrowRight className="w-5 h-5 text-red-500" />
            </button>
            <Link
              href="/"
              className="text-center py-2 text-xs font-bold text-neutral-400 hover:text-neutral-900 uppercase tracking-widest transition-colors"
            >
              Batalkan & Kembali
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── IDENTITY ───────────────────────────────────────────────────────────────
  if (step === "identity") {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-neutral-100 p-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-neutral-900 rounded-2xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Profil Responden</h2>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1">Langkah 01/02</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                Identitas Nama
              </label>
              <input
                type="text"
                placeholder="Gunakan inisial jika ragu"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-red-600 outline-none transition-all font-medium text-sm"
                onChange={(e) => setIdentity({ ...identity, nama: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                  Usia Anda
                </label>
                <input
                  type="number"
                  placeholder="Thn"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-red-600 outline-none transition-all font-medium text-sm"
                  onChange={(e) => setIdentity({ ...identity, umur: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                  Gender
                </label>
                <select
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-red-600 outline-none transition-all font-medium text-sm appearance-none"
                  onChange={(e) => setIdentity({ ...identity, gender: e.target.value })}
                >
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 block">
                Tinggal dengan 
              </label>
              <input
                type="text"
                placeholder="Contoh: Bersama Anak / Sendiri"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 focus:border-red-600 outline-none transition-all font-medium text-sm"
                onChange={(e) => setIdentity({ ...identity, tinggal: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={!identity.nama || !identity.umur}
            onClick={() => setStep("questions")}
            className="w-full mt-12 py-5 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-300 transition-all shadow-xl shadow-black/10"
          >
            Mulai Kuesioner
          </button>
        </div>
      </div>
    );
  }

  // ─── QUESTIONS ──────────────────────────────────────────────────────────────
  if (step === "questions") {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tighter uppercase">Instrumen ASKAS</h1>
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest mt-1">Validasi Data Kesehatan</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-neutral-400 uppercase block mb-1">Kemajuan</span>
              <span className="text-lg font-black text-neutral-900">
                {Math.round((Object.keys(answers).length / questions.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-12">
            {sections.map((sectionTitle) => (
              <div key={sectionTitle} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 bg-white px-4 py-2 border border-neutral-200 rounded-lg shadow-sm whitespace-nowrap">
                    {sectionTitle}
                  </h2>
                  <div className="h-px w-full bg-neutral-200"></div>
                </div>

                <div className="space-y-6">
                  {questions
                    .filter((q) => q.section === sectionTitle)
                    .map((q) => (
                      <div
                        key={q.id}
                        className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm transition-all hover:border-red-200"
                      >
                        <p className="text-neutral-800 font-bold mb-6 leading-relaxed tracking-tight text-lg">
                          {q.text}
                        </p>
                        <div className="flex gap-4">
                          {["ya", "tidak"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(q.id, opt)}
                              className={`flex-1 py-4 rounded-xl text-[10px] font-black border transition-all uppercase tracking-[0.2em]
                                ${
                                  answers[q.id] === opt
                                    ? "bg-black border-black text-white shadow-lg"
                                    : "bg-white border-neutral-200 text-neutral-400 hover:border-red-300 hover:text-red-600"
                                }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={Object.keys(answers).length < questions.length}
            onClick={() => setStep("result")}
            className={`w-full mt-16 py-6 rounded-2xl font-black text-white transition-all shadow-2xl uppercase tracking-widest text-sm
              ${
                Object.keys(answers).length === questions.length
                  ? "bg-red-700 hover:bg-red-800 shadow-red-900/40"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
              }`}
          >
            Analisis Hasil Sekarang
          </button>
        </div>
      </div>
    );
  }

  // ─── RESULT ─────────────────────────────────────────────────────────────────
  const waMessage = buildWhatsAppMessage(identity, answers, score, result);
  const waLink = `https://wa.me/6285717494954?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-6">
      <div className="max-w-lg mx-auto space-y-6">

        {/* ── Result Card ── */}
        <div className={`bg-white rounded-[2.5rem] shadow-2xl p-12 border border-neutral-100 text-center relative`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="p-5 rounded-3xl bg-white shadow-xl border border-neutral-100">
              <ResultIcon className={`w-12 h-12 ${result.color}`} />
            </div>
          </div>

          <div className="mt-6 mb-6">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] block mb-2">
              Laporan Analisis
            </span>
            <h2 className={`text-5xl font-black mb-4 tracking-tighter ${result.color}`}>{result.label}</h2>
            <div
              className={`inline-block px-5 py-1.5 rounded-full text-[10px] font-black ${result.bg} ${result.color} border ${result.border}`}
            >
              SKOR TOTAL: {score} / 12
            </div>
          </div>

          <p className="text-neutral-500 mb-10 leading-relaxed font-medium italic text-sm">"{result.desc}"</p>

          <div className="flex flex-col gap-4">
            {/* WhatsApp — kirim semua data ke ners */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <Heart className="w-4 h-4 fill-red-600 text-red-600" /> Hubungi Profesional
            </a>
            <button
              onClick={() => {
                setStep("consent");
                setAnswers({});
                setIdentity({ nama: "", umur: "", gender: "", tinggal: "" });
              }}
              className="py-2 text-[10px] text-neutral-400 font-black hover:text-neutral-900 transition-colors uppercase tracking-[0.2em]"
            >
              Lakukan Skrining Ulang
            </button>
          </div>
        </div>

        {/* ── Intervention Recommendations ── */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8">
          <div className="mb-6">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] block mb-1">
              Langkah Selanjutnya
            </span>
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Program Intervensi</h3>
            <p className="text-xs text-neutral-400 mt-1 font-medium">
              Pilih intervensi yang sesuai dengan kondisi Anda
            </p>
          </div>

          <div className="space-y-3">
            {interventions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-red-200 hover:bg-red-50/40 transition-all group"
              >
                <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-red-200 group-hover:bg-red-50 transition-all">
                  <item.icon className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-neutral-900 tracking-tight">{item.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{item.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-red-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}