"use client";
import { useState } from "react";
import { Heart, CheckCircle2, XCircle, RefreshCcw, Award, ChevronRight, ClipboardCheck } from "lucide-react";

const questions = [
  { 
    q: "Healing Touch pada lansia bertujuan untuk...", 
    options: ["Pengobatan dengan obat", "Meningkatkan kenyamanan dan kedekatan emosional", "Operasi", "Diet"], 
    a: 1 
  },
  { 
    q: "Manfaat Healing Touch dalam seksualitas lansia adalah...", 
    options: ["Meningkatkan kecemasan", "Mengurangi keintiman", "Meningkatkan relaksasi dan keintiman", "Menyebabkan nyeri"], 
    a: 2 
  },
  { 
    q: "Healing Touch dilakukan dengan cara...", 
    options: ["Suntikan", "Sentuhan lembut atau tanpa sentuhan", "Operasi", "Minum obat"], 
    a: 1 
  },
  { 
    q: "Healing Touch dapat membantu hubungan pasangan lansia dengan...", 
    options: ["Mengurangi komunikasi", "Meningkatkan kedekatan dan komunikasi", "Menghindari pasangan", "Membatasi interaksi"], 
    a: 1 
  },
  { 
    q: "Salah satu efek positif Healing Touch adalah...", 
    options: ["Stres meningkat", "Kecemasan bertambah", "Rasa nyaman dan rileks meningkat", "Hubungan memburuk"], 
    a: 2 
  },
];

export default function HealingTouchQuiz({ onComplete }) {
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
    setSelectedAnswer(null);
  };

  const getCategory = () => {
    if (score >= 4) return { label: "Baik", color: "text-green-600", bg: "bg-green-50" };
    if (score === 3) return { label: "Cukup", color: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Kurang", color: "text-red-600", bg: "bg-red-50" };
  };

  if (quizStep === "selection") {
    return (
      <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100">
          <ClipboardCheck className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tighter">Evaluasi Healing Touch</h2>
        <p className="text-neutral-500 mb-10 text-sm leading-relaxed">
          Silakan pilih jenis evaluasi pengetahuan untuk materi <strong>Healing Touch</strong>.
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
        <p className="text-neutral-500 mb-6 text-sm">Skor Pengetahuan: <span className="font-bold text-neutral-900">{score} / 5</span></p>
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

  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-xl overflow-hidden">
      <div className="h-2 bg-neutral-100">
        <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-100 rounded-lg">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{testType}</span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Pertanyaan {currentQuestion + 1} / 5</span>
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
          <button onClick={nextQuestion} className="w-full mt-8 py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 animate-in fade-in slide-in-from-bottom-2 uppercase tracking-widest text-xs">
            {currentQuestion + 1 === questions.length ? "Lihat Hasil" : "Pertanyaan Selanjutnya"}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}