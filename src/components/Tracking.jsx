"use client";
import { LineChart, History, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Tracking() {
  return (
    <section id="tracking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-900"
          style={{ 
            backgroundImage: "url('/tracking-bg.jpeg')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        >
          {/* Overlay Gelap (Arah dibalik ke kiri agar teks di kanan terbaca) */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/80 to-black/60 z-0"></div>

          {/* flex-row-reverse untuk memindahkan konten ke kanan */}
          <div className="relative z-10 flex flex-col md:flex-row-reverse items-center gap-12 p-10 md:p-20">
            
            {/* Sisi Kanan: Konten & Tombol */}
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-700 text-red-100 text-xs font-bold uppercase tracking-wider mb-6">
                <LineChart className="w-3.5 h-3.5 text-red-400" />
                Monitoring Berkala
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                Pantau Perkembangan <br /> 
                Kesehatan Lansia.
              </h2>
              
              <p className="text-gray-300 text-base md:text-lg mb-10 max-w-lg md:ml-auto leading-relaxed">
                Lihat riwayat pemeriksaan dan grafik perkembangan kesehatan secara berkala untuk memastikan kualitas hidup tetap optimal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end items-center">
                <Link
                  href="/tracking"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg group w-full sm:w-auto"
                >
                  Buka Tracking 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sisi Kiri: Fitur Poin */}
            <div className="flex-1 w-full max-w-md">
              <div className="grid gap-4">
                {[
                  { title: "Riwayat Screening", desc: "Akses semua hasil pemeriksaan sebelumnya.", icon: History },
                  { title: "Grafik Kemajuan", desc: "Visualisasi tren kesehatan fisik & mental.", icon: LineChart },
                  { title: "Laporan PDF", desc: "Unduh hasil evaluasi untuk konsultasi.", icon: FileText },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-red-900/50 transition-colors group">
                    <div className="p-2.5 bg-neutral-800 rounded-xl border border-neutral-700 group-hover:border-red-900 transition-colors">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-bold text-base">{item.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}