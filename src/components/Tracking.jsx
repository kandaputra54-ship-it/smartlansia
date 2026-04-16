"use client";
import { LineChart, ClipboardCheck, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Tracking() {
  return (
    <section id="tracking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[480px]"
          style={{
            backgroundImage: "url('/tracking-bg2.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 
            STRATEGI: Bukan full overlay.
            Kiri (zona teks): gradient gelap dari kiri → fade ke tengah.
            Kanan (zona image): nyaris transparan supaya foto lapangan terlihat jelas.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/92 via-neutral-950/55 to-neutral-950/5" />
          {/* Vignette tipis atas/bawah buat framing natural */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/25 via-transparent to-neutral-950/35" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 md:p-20">

            {/* KIRI: Zona teks — aman karena gradient gelap di sini */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/70 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider mb-6">
                <ClipboardCheck className="w-3.5 h-3.5 text-red-400" />
                Evaluasi Mandiri
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                Ukur Kualitas <br />
                Hubungan & Lansia.
              </h2>

              <p className="text-gray-200 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                Gunakan kuesioner singkat untuk memantau indikator kedekatan emosional dan kepuasan hubungan secara praktis.
              </p>

              <Link
                href="/tracking"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl group"
              >
                Mulai Tracking
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
              href="/test"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all group"
            >
              Tes Pengetahuan
              <ClipboardCheck className="w-5 h-5 text-red-400" />
            </Link>

              {/* Feature list compact — tetap di zona gelap kiri */}
              <div className="mt-8 grid gap-3">
                {[
                  { title: "Kuesioner Cepat", desc: "5 indikator utama kesehatan hubungan.", icon: ClipboardCheck },
                  { title: "Visualisasi Skor", desc: "Grafik radial hasil evaluasi.", icon: LineChart },
                  { title: "Laporan WhatsApp", desc: "Kirim hasil ke tenaga kesehatan.", icon: MessageCircle },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm hover:border-red-500/40 hover:bg-black/40 transition-all group"
                  >
                    <div className="p-2 bg-neutral-800/80 rounded-lg border border-white/10 group-hover:border-red-500/40 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      <span className="text-gray-400 text-sm"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 
              KANAN: Zona kosong & transparan — image lapangan tampil bebas di sini
              sebagai konten visual/informasi lapangan bagi user.
            */}
            <div className="flex-1 hidden md:block" />

          </div>
        </div>
      </div>
    </section>
  );
}