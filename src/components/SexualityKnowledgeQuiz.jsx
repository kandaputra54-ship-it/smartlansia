"use client";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, RefreshCcw, Award, ChevronRight, ClipboardCheck, Activity } from "lucide-react";

const questions = [
  { q: "Seksualitas pada lansia adalah...", options: ["Tidak penting", "Bagian dari kualitas hidup", "Hanya untuk usia muda", "Dilarang"], a: 1 },
  { q: "Perubahan seksualitas pada lansia dipengaruhi oleh...", options: ["Usia saja", "Faktor fisik, psikologis, dan sosial", "Makanan saja", "Lingkungan saja"], a: 1 },
  { q: "Salah satu perubahan fisik pada lansia yang memengaruhi seksualitas adalah...", options: ["Rambut panjang", "Perubahan hormon", "Tinggi badan", "Warna kulit"], a: 1 },
  { q: "Komunikasi dalam hubungan pasangan lansia bertujuan untuk...", options: ["Menghindari pasangan", "Meningkatkan kenyamanan dan keintiman", "Menyalahkan pasangan", "Mengurangi interaksi"], a: 1 },
  { q: "Sikap yang baik dalam menjaga hubungan seksual lansia adalah...", options: ["Diam", "Terbuka dan saling menghargai", "Menghindar", "Marah"], a: 1 },
  { q: "Salah satu cara meningkatkan keintiman pasangan adalah...", options: ["Tidak berkomunikasi", "Sentuhan dan perhatian", "Menghindari kontak", "Menyalahkan pasangan"], a: 1 },
  { q: "Edukasi seksualitas pada lansia bertujuan untuk...", options: ["Menambah masalah", "Meningkatkan pengetahuan dan kualitas hidup", "Membatasi hubungan", "Mengurangi komunikasi"], a: 1 },
  { q: "Salah satu dampak kurangnya pengetahuan seksualitas adalah...", options: ["Hubungan harmonis", "Kesalahpahaman", "Kedekatan meningkat", "Kepercayaan meningkat"], a: 1 },
  { q: "Peran pasangan dalam menjaga kesehatan seksual adalah...", options: ["Mengabaikan", "Saling mendukung dan memahami", "Menyalahkan", "Menghindar"], a: 1 },
  { q: "Edukasi seksualitas dapat membantu lansia dalam...", options: ["Meningkatkan kualitas hubungan", "Menurunkan komunikasi", "Menambah konflik", "Menghindari pasangan"], a: 0 },
];

export default function SexualityKnowledgeQuiz({ onComplete }) {
  const [quizStep, setQuizStep] = useState("selection");
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
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-xl text-center">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100">
          <ShieldCheck className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tighter">Pengetahuan Seksualitas</h2>
        <p className="text-neutral-500 mb-10 text-sm leading-relaxed">Pilih jenis evaluasi untuk mengukur pemahaman tentang seksualitas pada lansia.</p>
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => startQuiz("Pre-test")} className="w-full py-5 border-2 border-neutral-100 hover:border-red-600 hover:bg-red-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3">
            Mulai Pre-test <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={() => startQuiz("Post-test")} className="w-full py-5 border-2 border-neutral-100 hover:border-red-600 hover:bg-red-50 rounded-2xl text-lg font-black text-neutral-800 transition-all flex items-center justify-center gap-3">
            Mulai Post-test <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (quizStep === "result") {
    const cat = getCategory();
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-xl text-center">
        <div className={`w-20 h-20 ${cat.bg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
          <Award className={`w-10 h-10 ${cat.color}`} />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-1">Hasil {testType}</h2>
        <p className="text-neutral-500 mb-6 text-sm">Skor: <span className="font-bold text-neutral-900">{score} / 10</span></p>
        <div className={`inline-block px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-8 ${cat.bg} ${cat.color}`}>Kategori: {cat.label}</div>
        <button onClick={onComplete} className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg text-xs uppercase tracking-widest">Selesai</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-xl overflow-hidden">
      <div className="h-2 bg-neutral-100">
        <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-100 rounded-lg"><Activity className="w-5 h-5 text-red-600" /></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{testType}</span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Soal {currentQuestion + 1} / 10</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-8 leading-tight">{questions[currentQuestion].q}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((opt, i) => {
            const isCorrect = i === questions[currentQuestion].a;
            const isSelected = selectedAnswer === i;
            let style = "border-neutral-100 hover:border-red-600 hover:bg-red-50";
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
          <button onClick={nextQuestion} className="w-full mt-8 py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
            {currentQuestion + 1 === questions.length ? "Lihat Hasil" : "Lanjutkan"} <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}