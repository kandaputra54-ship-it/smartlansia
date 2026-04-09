"use client";
import {
  ShieldCheck,
  Smartphone,
  Headphones,
  Wifi,
  BarChart2,
  ArrowRight,
} from "lucide-react";

// Data pills tetap sama
const pills = [
  { icon: ShieldCheck, label: "Screening" },
  { icon: Smartphone, label: "Mobile Intervention" },
  { icon: Headphones, label: "Application Counseling" },
  { icon: Wifi, label: "Remote-TeleNursing" },
  { icon: BarChart2, label: "Tracking" },
];

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. Base Overlay (biar gelap merata dikit) */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* 3. Gradient Fokus ke kiri (lebih smooth, nggak berat di kanan) */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div style={{ maxWidth: 700 }}>
          {" "}
          {/* Sedikit dilebarkan agar teks lebih lega */}
          {/* Label Atas - Warna Netral dengan Aksen Merah kecil */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-red-600"></div>
            <span
              className="block text-xs font-semibold uppercase"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}
            >
              Platform Kesehatan Lansia
            </span>
          </div>
          {/* Heading SMARTLANSIA - Profesional & Bold */}
          <h1
            className="font-black mb-6 tracking-tighter leading-none uppercase text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }} // Responsif dan kuat
          >
            SMART<span style={{ color: "rgba(255,255,255,0.4)" }}>LANSIA</span>
          </h1>
          {/* Deskripsi - Warna Abu Netral (Vibe Hijau Hilang) */}
          <p
            className="mb-10 font-medium"
            style={{
              color: "#A3A3A3", // Neutral gray
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Platform digital terintegrasi untuk memantau, mendampingi, dan
            meningkatkan Seksulalitas serta Kesehatan Lansia dengan pendekatan
            profesional .
          </p>
          {/* Pills - Warna Abu Netral */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {pills.map((p) => {
              const Icon = p.icon;
              return (
                <span
                  key={p.label}
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)", // Border putih tipis
                    color: "rgba(255,255,255,0.6)", // Teks abu terang
                    backgroundColor: "rgba(255,255,255,0.03)", // Background sangat transparan
                  }}
                >
                  <Icon className="w-4 h-4 text-red-600" />{" "}
                  {/* Ikon jadi Merah */}
                  {p.label}
                </span>
              );
            })}
          </div>
          {/* Tombol Aksi - Merah dan Putih/Outline */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#screening"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg uppercase tracking-wider"
              style={{
                background: "#DC2626", // Merah solid profesional
                color: "#ffffff",
              }}
            >
              Mulai Screening
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#telenursing"
              className="inline-flex items-center justify-center gap-2.5 font-semibold text-sm px-8 py-4 rounded-xl transition-all uppercase tracking-wider"
              style={{
                border: "1px solid rgba(255,255,255,0.2)", // Putih transparan outline
                color: "#ffffff",
                backgroundColor: "transparent",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Hubungi Perawat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
