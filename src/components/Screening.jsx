"use client";
import {
  ShieldCheck,
  ClipboardCheck,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Screening() {
  return (
    <section id="screening" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Card Utama dengan Background Image */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-900"
          style={{
            backgroundImage: "url('/screening-main.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay Gelap Gelap agar teks terbaca jelas, kurangi aksen hijau */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 md:p-20">
            {/* Sisi Kiri: Konten */}
            <div className="flex-1 text-center md:text-left">
              {/* Tag Kecil dengan Aksen Merah */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-700 text-red-100 text-xs font-bold uppercase tracking-wider mb-6">
                <Activity className="w-3.5 h-3.5 text-red-400" />
                Layanan Deteksi Dini
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                Pantau Kesehatan Seksualitas <br />
                Lansia Anda Disini.
              </h2>

              <p className="text-gray-300 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
                Gunakan instrumen **ASKAS LANSIA** yang tervalidasi untuk
                memantau aspek fisik, psikologis, hingga seksualitas secara
                mandiri dan rahasia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <Link
                  href="/screening"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg group w-full sm:w-auto"
                >
                  Mulai Screening
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sisi Kanan: Fitur Poin dengan Aksen Merah Kecil */}
            <div className="flex-1 w-full max-w-md">
              <div className="grid gap-4">
                {[
                  {
                    title: "Kesehatan Fisik",
                    desc: "Pantau kondisi penyakit kronis, tingkat kelelahan, hingga kualitas tidur.",
                    icon: Activity,
                  },
                  {
                    title: "Aspek Psikologis",
                    desc: "Deteksi tingkat kecemasan, rasa percaya diri, hingga perasaan kesepian.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Seksualitas Lansia",
                    desc: "Pemantauan gairah, kenyamanan, hingga kualitas komunikasi dengan pasangan.",
                    icon: ClipboardCheck,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-red-900/50 transition-colors group"
                  >
                    {/* Icon Container dengan Sedikit Merah */}
                    <div className="p-2.5 bg-neutral-800 rounded-xl border border-neutral-700 group-hover:border-red-900 transition-colors">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base">
                        {item.title}
                      </h4>
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
