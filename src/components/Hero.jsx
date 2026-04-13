"use client";
import {
  ShieldCheck,
  Smartphone,
  Headphones,
  Wifi,
  BarChart2,
  ArrowRight,
} from "lucide-react";

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
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900"
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

      {/* 2. Overlay — lebih gelap agar teks putih terbaca jelas */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 18, 35, 0.82) 0%, rgba(10, 18, 35, 0.55) 50%, rgba(10, 18, 35, 0.1) 100%)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-[760px]">

          {/* Label kategori */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[3px] w-10 bg-red-500 rounded-full" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-slate-300">
              Health Tech Platform
            </span>
          </div>

          {/* Judul utama — putih & besar untuk lansia */}
          <h1
            className="font-black mb-6 tracking-tight leading-[0.95] uppercase"
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
          >
            <span className="text-amber-800">SMART</span>
            <span className="text-amber-400 block sm:inline">LANSIA</span>
          </h1>

          {/* Deskripsi — ukuran lebih besar, kontras tinggi */}
          <p
            className="mb-10 text-slate-100 font-medium leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}
          >
            Solusi digital profesional untuk memantau kesehatan dan seksualitas
            lansia secara terintegrasi dan aman.
          </p>

          {/* Pills fitur */}
          <div className="flex flex-wrap gap-3 mb-12">
            {pills.map((p) => {
              const Icon = p.icon;
              return (
                <span
                  key={p.label}
                  className="flex items-center gap-2.5 font-semibold px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/25 hover:bg-white/20 transition-all cursor-default"
                  style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
                >
                  <Icon className="w-4 h-4 text-red-400 flex-shrink-0" />
                  {p.label}
                </span>
              );
            })}
          </div>

          {/* CTA Buttons — lebih besar & kontras untuk lansia */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#screening"
              className="group inline-flex items-center justify-center gap-3 font-bold px-10 py-5 rounded-2xl bg-amber-600 text-white hover:bg-red-500 transition-all shadow-lg shadow-red-900/40 uppercase tracking-widest"
              style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
            >
              Mulai Screening
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#telenursing"
              className="inline-flex items-center justify-center gap-3 font-bold px-10 py-5 rounded-2xl text-white bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all uppercase tracking-widest"
              style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
            >
              Hubungi Perawat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}