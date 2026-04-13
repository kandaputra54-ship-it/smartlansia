"use client";
import { Video, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";

export default function TeleNursing() {
  const message = "Halo, saya ingin melakukan konsultasi privat mengenai kesehatan seksualitas melalui layanan TeleNursing. Apakah ada tenaga medis yang tersedia?";
  const phone = "6285717494954";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <section id="telenursing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-12 text-center md:text-left border-l-[8px] border-red-600 pl-8">
          <span className="inline-block text-red-600 text-[10px] font-black mb-3 tracking-[0.4em] uppercase">
            Professional Remote Healthcare
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase mb-6">
            Tele<span className="text-amber-600">Nursing.</span>
          </h2>
          <p className="text-zinc-800 font-bold max-w-xl text-lg leading-relaxed uppercase tracking-tight">
            Pendampingan medis jarak jauh yang responsif dan nyaman dalam satu genggaman.
          </p>
        </div>

        {/* Support Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl min-h-[420px]">

          {/* 
            Image: opacity tinggi supaya foto konsultasi terlihat jelas sebagai informasi visual.
            Dulu opacity-50, sekarang opacity-100 — biarkan image tampil penuh.
          */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/konsultasi.jpeg"
              alt="Consultation Background"
              fill
              className="object-cover"
            />
          </div>

          {/* 
            ZONA STRATEGY sama seperti Tracking.jsx:
            Kiri (zona teks): gelap 90%+ → teks readable
            Kanan (zona image): transparan → foto konsultasi tampil jelas
            + vignette atas/bawah tipis untuk framing
          */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-950/92 via-zinc-950/60 to-zinc-950/5" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/40" />

          <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 p-10 md:p-20">

            {/* KIRI: Konten — zona gelap, semua teks aman */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600 text-white rounded-full mb-8 shadow-lg shadow-red-600/20">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Private & Secure Support</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                Konsultasi <br /> <span className="text-amber-600">Secara Privat.</span>
              </h3>

              <p className="text-white/80 text-sm md:text-base max-w-md mx-auto lg:mx-0 font-medium leading-relaxed mb-10">
                Layanan pendampingan kesehatan khusus bagi Anda yang membutuhkan privasi tinggi. Terhubung langsung dengan tenaga medis profesional.
              </p>

              {/* Channel tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10 border-t border-white/10 pt-8">
                <div className="flex items-center gap-2 text-white/60">
                  <MessageCircle className="w-4 h-4 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Chat Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Video className="w-4 h-4 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Video Call (via WA)</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-zinc-900 px-10 py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-xl shadow-zinc-950/30"
              >
                Mulai Konsultasi Privat
              </a>
            </div>

            {/* KANAN: Zona transparan — foto konsultasi tampil bebas sebagai informasi visual */}
            <div className="flex-1 hidden lg:block" />

          </div>
        </div>

      </div>
    </section>
  );
}