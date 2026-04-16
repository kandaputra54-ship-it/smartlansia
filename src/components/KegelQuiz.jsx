"use client";
import { useState } from "react";
import { Activity, CheckCircle2, XCircle, RefreshCcw, Award, ChevronRight, ClipboardCheck } from "lucide-react";

const questions = [
  { q: "Senam Kegel bertujuan untuk...", options: ["Menguatkan otot panggul", "Menurunkan berat badan", "Melatih otot tangan", "Meningkatkan nafsu makan"], a: 0 },
  { q: "Otot yang dilatih dalam senam Kegel adalah...", options: ["Otot lengan", "Otot dasar panggul", "Otot kaki", "Otot dada"], a: 1 },
  { q: "Cara mengetahui letak otot Kegel yang benar adalah dengan seolah-olah...", options: ["Menahan buang air kecil", "Mengangkat beban berat", "Berlari kencang", "Menarik napas dalam"], a: 0 },
  { q: "Senam Kegel sebaiknya dilakukan secara...", options: ["Sesekali saja", "Rutin setiap hari", "Hanya saat merasa sakit", "Saat tidur saja"], a: 1 },
  { q: "Berapa lama waktu kontraksi otot yang dianjurkan saat menahan posisi Kegel?", options: ["1 detik", "5–10 detik", "30 detik", "1 menit"], a: 1 },
  { q: "Salah satu manfaat utama senam Kegel bagi lansia adalah...", options: ["Mencegah pikun", "Mengatasi masalah sulit menahan buang air kecil", "Meningkatkan tinggi badan", "Mengobati batuk"], a: 1 },
  { q: "Saat melakukan senam Kegel, pernapasan sebaiknya...", options: ["Ditahan selama kontraksi", "Tetap bernapas normal dan rileks", "Napas secepat mungkin", "Hanya menarik napas tanpa membuangnya"], a: 1 },
  { q: "Posisi awal yang paling disarankan bagi pemula untuk melakukan Kegel adalah...", options: ["Berdiri satu kaki", "Berbaring telentang dengan lutut ditekuk", "Sambil berlari", "Sambil melompat"], a: 1 },
  { q: "Berapa jumlah pengulangan (set) yang biasanya dianjurkan dalam sehari?", options: ["1 kali seminggu", "3 set per hari", "10 set setiap jam", "Tidak perlu diulang"], a: 1 },
  { q: "Apakah senam Kegel dapat dilakukan sambil duduk atau berdiri setelah sudah terbiasa?", options: ["Ya, bisa dilakukan kapan saja", "Tidak bisa, harus berbaring", "Hanya boleh saat mandi", "Hanya boleh dilakukan di gym"], a: 0 },
];

export default function KegelQuiz({ onComplete }) {
  const [quizStep, setQuizStep] = useState("selection"); // selection, quiz, result
  const [testType, setTestType] = useState(""); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = (type) => {
    setTestType(type);
    setQuizStep("quiz");
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].a) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizStep("result");
    }
  };

  const resetQuiz = () => {
    setQuizStep("selection");
    setTestType("");
    setCurrentQuestion(0);
    setScore(0);
    setIsAnswered(false);
  };

  const getCategory = () => {
    if (score >= 8) return { label: "Baik", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 6) return { label: "Cukup", color: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Kurang", color: "text-red-600", bg: "bg-red-50" };
  };

  if (quizStep === "selection") {
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
          <ClipboardCheck className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tighter">Evaluasi Pengetahuan</h2>
        <p className="text-neutral-500 mb-10 text-sm leading-relaxed">
          Pilih jenis tes untuk mengevaluasi pemahaman tentang <strong>Senam Kegel</strong>.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => startQuiz("Pre-test")} className="w-full py-5 border-2 border-neutral-100 hover:border-amber-600 hover:bg-amber-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3 group">
            Mulai Pre-test <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => startQuiz("Post-test")} className="w-full py-5 border-2 border-neutral-100 hover:border-amber-600 hover:bg-amber-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3 group">
            Mulai Post-test <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (quizStep === "result") {
    const category = getCategory();
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-xl text-center">
        <div className={`w-20 h-20 ${category.bg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
          <Award className={`w-10 h-10 ${category.color}`} />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-1">Hasil {testType}</h2>
        <p className="text-neutral-500 mb-6 text-sm">Skor Pengetahuan: <span className="font-bold text-neutral-900">{score} / 10</span></p>
        <div className={`inline-block px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-8 ${category.bg} ${category.color}`}>
          Kategori: {category.label}
        </div>
        <div className="flex flex-col gap-3">
          {onComplete && (
            <button onClick={onComplete} className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg text-sm uppercase tracking-widest">
              Lanjut ke Materi & Pelacakan
            </button>
          )}
          <button onClick={resetQuiz} className="w-full py-4 text-neutral-400 font-bold text-xs uppercase tracking-widest hover:text-neutral-900 transition-all">
            Ulangi Tes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-xl overflow-hidden">
      <div className="h-2 bg-neutral-100">
        <div className="h-full bg-amber-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Activity className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{testType} Kegel</span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Pertanyaan {currentQuestion + 1} / 10</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-8 leading-tight">{questions[currentQuestion].q}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((opt, i) => {
            const isCorrect = i === questions[currentQuestion].a;
            const isSelected = selectedAnswer === i;
            let style = "border-neutral-100 hover:border-amber-600 hover:bg-amber-50";
            if (isAnswered) {
              if (isCorrect) style = "border-green-500 bg-green-50 text-green-700";
              else if (isSelected) style = "border-red-500 bg-red-50 text-red-700";
              else style = "border-neutral-50 text-neutral-300 opacity-50";
            }
            return (
              <button key={i} disabled={isAnswered} onClick={() => handleAnswer(i)} className={`w-full p-5 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between ${style}`}>
                {opt}
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <button onClick={nextQuestion} className="w-full mt-8 py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 animate-in fade-in slide-in-from-bottom-2 uppercase tracking-widest text-xs">
            {currentQuestion + 1 === questions.length ? "Lihat Hasil Akhir" : "Selanjutnya"}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}