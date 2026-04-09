"use client";
import { ShieldCheck, Smartphone, Headphones, Wifi, BarChart2 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    letter: "S",
    title: "Screening",
    desc: "Deteksi dini kondisi kesehatan lansia melalui kuesioner terstandar dan penilaian risiko komprehensif.",
  },
  {
    icon: Smartphone,
    letter: "M",
    title: "Mobile Intervention",
    desc: "Intervensi kesehatan berbasis aplikasi mobile yang mudah diakses kapan saja dan di mana saja.",
  },
  {
    icon: Headphones,
    letter: "A",
    title: "Aplikasi Counseling",
    desc: "Layanan konseling psikologis dan kesehatan mental melalui platform digital yang aman dan terpercaya.",
  },
  {
    icon: Wifi,
    letter: "R",
    title: "Remote Tele-Nursing",
    desc: "Pemantauan dan pendampingan perawat secara jarak jauh menggunakan teknologi telekomunikasi terkini.",
  },
  {
    icon: BarChart2,
    letter: "T",
    title: "Tracking",
    desc: "Pemantauan perkembangan kesehatan lansia secara real-time dengan laporan yang mudah dipahami.",
  },
];

function FeatureCard({ f }) {
  const Icon = f.icon;


     const handleClick = () => {
    switch (f.letter) {
      case "S":
        document.getElementById("screening")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "M":
        document.getElementById("intervensi")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "A":
        document.getElementById("beranda")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "R":
        document.getElementById("telenursing")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "T":
        document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" });
        return; // tidak ngapa-ngapain
    }
  };
  return (
    <div onClick={handleClick}  className="group relative bg-white p-7 transition-all duration-300 hover:bg-neutral-50">
      <div className="flex items-start justify-between mb-5">
        <span
          className="font-bold"
          style={{
            fontSize: "3.5rem",
            lineHeight: 1,
            color: "#f1f5f9",
            letterSpacing: "-0.04em",
          }}
        >
          {f.letter}
        </span>
        <div
          className="p-2.5 rounded-xl transition-all duration-300 group-hover:bg-red-50 group-hover:border-red-100 border border-transparent"
          style={{ background: "#f8fafc" }}
        >
          <Icon
            className="w-5 h-5 transition-colors duration-300 group-hover:text-red-600"
            style={{ color: "#94a3b8" }}
          />
        </div>
      </div>
      <h3
        className="font-semibold mb-2"
        style={{ color: "#0f172a", fontSize: "1rem", letterSpacing: "-0.01em" }}
      >
        {f.title}
      </h3>
      <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.65 }}>
        {f.desc}
      </p>
      {/* Garis bawah menggunakan aksen merah saat hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
        style={{ background: "#b91c1c" }}
      />
    </div>
  );
}

const wrapperStyle = {
  background: "#f1f5f9",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
};

export default function Features() {
  return (
    <section className="py-24 bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "#b91c1c" }} // Teks header jadi merah
          >
            {/* Titik indikator merah */}
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b91c1c" }} />
            Fitur Unggulan
          </span>
          <h2
            className="font-bold leading-tight mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", letterSpacing: "-0.02em" }}
          >
            Apa itu <span style={{ color: "#166534" }}>SMART</span>?
          </h2>
          <p className="mt-4 leading-relaxed" style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Lima pilar layanan digital yang saling terintegrasi untuk menjaga
            kesehatan lansia secara menyeluruh.
          </p>
        </div>

        {/* Row 1 — 3 cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-px"
          style={{ ...wrapperStyle, borderRadius: "16px 16px 0 0" }}
        >
          {features.slice(0, 3).map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>

        {/* Row 2 — 2 cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ ...wrapperStyle, borderRadius: "0 0 16px 16px" }}
        >
          {features.slice(3).map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>

      </div>
    </section>
  );
}