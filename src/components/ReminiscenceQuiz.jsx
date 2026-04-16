"use client";
import { useState } from "react";
import { Brain, CheckCircle2, XCircle, RefreshCcw, Award, ChevronRight, ClipboardCheck } from "lucide-react";

const questions = [
  { q: "Terapi reminiscence adalah...", options: ["Terapi obat-obatan", "Mengingat kembali pengalaman masa lalu", "Latihan fisik lansia", "Terapi tidur"], a: 1 },
  { q: "Tujuan utama terapi reminiscence adalah...", options: ["Menurunkan tekanan darah", "Meningkatkan fungsi memori dan kesejahteraan emosional", "Mengobati infeksi", "Menambah nafsu makan"], a: 1 },
  { q: "Sasaran utama terapi reminiscence adalah...", options: ["Anak-anak", "Remaja", "Lansia", "Ibu hamil"], a: 2 },
  { q: "Contoh kegiatan terapi reminiscence adalah...", options: ["Senam pagi", "Mengingat pengalaman masa kecil", "Minum obat", "Tidur siang"], a: 1 },
  { q: "Media yang dapat digunakan dalam terapi reminiscence adalah...", options: ["Foto lama", "Buku pelajaran", "Obat", "Alat suntik"], a: 0 },
  { q: "Terapi reminiscence dapat membantu...", options: ["Menurunkan kecemasan", "Menambah berat badan", "Menyembuhkan luka", "Menghilangkan penyakit infeksi"], a: 0 },
  { q: "Pelaksanaan terapi reminiscence sebaiknya dilakukan...", options: ["Sendiri tanpa arahan", "Dengan pendamping atau tenaga kesehatan", "Saat tidur", "Saat makan"], a: 1 },
  { q: "Lama waktu terapi reminiscence biasanya...", options: ["1–2 menit", "10–30 menit", "2–3 jam", "Tidak terbatas"], a: 1 },
  { q: "Manfaat terapi reminiscence bagi lansia adalah...", options: ["Meningkatkan interaksi sosial", "Menurunkan daya ingat", "Menambah penyakit", "Mengurangi komunikasi"], a: 0 },
  { q: "Terapi reminiscence dapat dilakukan secara...", options: ["Individu", "Kelompok", "Keduanya benar", "Tidak bisa dilakukan"], a: 2 },
];

export default function ReminiscenceQuiz({ onComplete }) {
  const [quizStep, setQuizStep] = useState("selection"); // selection, quiz, result
  const [testType, setTestType] = useState(""); // Pre-test atau Post-test
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
    setSelectedAnswer(null);
  };

  const getCategory = () => {
    if (score >= 8) return { label: "Baik", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 6) return { label: "Cukup", color: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Kurang", color: "text-red-600", bg: "bg-red-50" };
  };

  // --- 1. Tampilan Pilih Pre-test / Post-test ---
  if (quizStep === "selection") {
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
          <ClipboardCheck className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tighter">Evaluasi Terapi</h2>
        <p className="text-neutral-500 mb-10 text-sm leading-relaxed">
          Silakan pilih jenis evaluasi yang akan dilakukan saat ini.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => startQuiz("Pre-test")}
            className="w-full py-5 border-2 border-neutral-100 hover:border-amber-600 hover:bg-amber-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3 group"
          >
            Mulai Pre-test
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => startQuiz("Post-test")}
            className="w-full py-5 border-2 border-neutral-100 hover:border-amber-600 hover:bg-amber-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3 group"
          >
            Mulai Post-test
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. Tampilan Hasil ---
  if (quizStep === "result") {
    const category = getCategory();
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-sm text-center">
        <div className={`w-20 h-20 ${category.bg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
          <Award className={`w-10 h-10 ${category.color}`} />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-1">Hasil {testType}</h2>
        <p className="text-neutral-500 mb-6 text-sm">Skor Anda: <span className="font-bold text-neutral-900">{score} / 10</span></p>
        
        <div className={`inline-block px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-8 ${category.bg} ${category.color}`}>
          Kategori: {category.label}
        </div>

        <div className="flex flex-col gap-3">
          {onComplete && (
            <button onClick={onComplete} className="w-full py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg text-sm uppercase tracking-widest">
              Lanjut ke Langkah Berikutnya
            </button>
          )}
          <button onClick={resetQuiz} className="w-full py-4 text-neutral-400 font-bold text-xs uppercase tracking-widest hover:text-neutral-900 transition-all">
            Ulangi Tes
          </button>
        </div>
      </div>
    );
  }

  // --- 3. Tampilan Quiz ---
  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
      <div className="h-1.5 bg-neutral-100">
        <div 
          className="h-full bg-amber-600 transition-all duration-500" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Brain className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                {testType}
              </span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Pertanyaan {currentQuestion + 1} dari 10
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-8 leading-tight">
          {questions[currentQuestion].q}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((opt, i) => {
            const isCorrect = i === questions[currentQuestion].a;
            const isSelected = selectedAnswer === i;
            
            let btnStyle = "border-neutral-100 hover:border-amber-600 hover:bg-amber-50";
            if (isAnswered) {
              if (isCorrect) btnStyle = "border-green-500 bg-green-50 text-green-700";
              else if (isSelected) btnStyle = "border-red-500 bg-red-50 text-red-700";
              else btnStyle = "border-neutral-50 text-neutral-300 opacity-50";
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
                className={`w-full p-5 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between ${btnStyle}`}
              >
                {opt}
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <button
            onClick={nextQuestion}
            className="w-full mt-8 py-5 bg-black text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 animate-in fade-in slide-in-from-bottom-2"
          >
            {currentQuestion + 1 === questions.length ? "Lihat Hasil" : "Lanjutkan"}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}