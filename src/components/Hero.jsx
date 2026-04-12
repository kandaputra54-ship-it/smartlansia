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
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020617]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* 1. Background Image dengan Opacity Rendah */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('/hero-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. Gradient Overlay untuk Kedalaman Visual */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, #020617 0%, #020617 40%, transparent 100%)"
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-[720px]">
          
          {/* Label Atas - Amber Accent */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-red-600"></div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              Health Tech Platform
            </span>
          </div>

          {/* Heading - Kontras Tinggi */}
          <h1
            className="font-black mb-8 tracking-tighter leading-[0.9] uppercase text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)" }}
          >
            SMART<span className="text-amber-400 block sm:inline">LANSIA</span>
          </h1>

          {/* Deskripsi - Soft Gray */}
          <p className="mb-12 text-slate-300 font-medium leading-relaxed max-w-[520px]"
             style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)" }}>
            Solusi digital profesional untuk memantau kesehatan dan seksualitas lansia secara terintegrasi dan aman.
          </p>

          {/* Pills - High Visibility */}
          <div className="flex flex-wrap gap-3 mb-14">
            {pills.map((p) => {
              const Icon = p.icon;
              return (
                <span
                  key={p.label}
                  className="flex items-center gap-2.5 text-[11px] font-bold px-5 py-2.5 rounded-full bg-white text-slate-950 shadow-xl shadow-black/20 uppercase tracking-wider transition-transform hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-red-600" />
                  {p.label}
                </span>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href="#screening"
              className="group inline-flex items-center justify-center gap-3 font-black text-xs px-10 py-5 rounded-2xl bg-red-600 text-white shadow-2xl shadow-red-900/20 hover:bg-red-700 transition-all uppercase tracking-widest"
            >
              Mulai Screening
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#telenursing"
              className="inline-flex items-center justify-center gap-3 font-bold text-xs px-10 py-5 rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 transition-all uppercase tracking-widest backdrop-blur-md"
            >
              Hubungi Perawat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}