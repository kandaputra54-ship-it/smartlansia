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
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[480px]"
          style={{
            backgroundImage: "url('/screening-main.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Zone strategy: kiri gelap untuk teks, kanan transparan untuk image */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/92 via-neutral-950/60 to-neutral-950/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/40" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 md:p-20">

            {/* KIRI: Konten + Feature Cards — semua di zona gelap */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/70 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider mb-6">
                <Activity className="w-3.5 h-3.5 text-red-400" />
                Layanan Deteksi Dini
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                Pantau Kesehatan Seksualitas <br />
                Lansia Anda Disini.
              </h2>

              {/* Deskripsi: text-white/80 jauh lebih terbaca vs text-gray-300 */}
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                Gunakan instrumen <strong className="text-white">ASKAS LANSIA</strong> yang tervalidasi untuk
                memantau aspek fisik, psikologis, hingga seksualitas secara
                mandiri dan rahasia.
              </p>

              <Link
                href="/screening"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg group mb-10"
              >
                Mulai Screening
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Feature cards compact — tetap di zona gelap kiri */}
              <div className="grid gap-3">
                {[
                  {
                    title: "Kesehatan Fisik",
                    desc: "Pantau kondisi penyakit kronis, kelelahan, hingga kualitas tidur.",
                    icon: Activity,
                  },
                  {
                    title: "Aspek Psikologis",
                    desc: "Deteksi kecemasan, rasa percaya diri, hingga perasaan kesepian.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Seksualitas Lansia",
                    desc: "Pemantauan gairah, kenyamanan, dan komunikasi dengan pasangan.",
                    icon: ClipboardCheck,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm hover:border-red-500/40 hover:bg-black/40 transition-all group"
                  >
                    <div className="p-2 bg-neutral-800/80 rounded-lg border border-white/10 group-hover:border-red-500/40 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      {/* text-white untuk title, text-white/70 untuk desc — kontras jelas */}
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      <span className="text-white/65 text-sm"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KANAN: Zona transparan — image screening tampil sebagai informasi visual */}
            <div className="flex-1 hidden md:block" />

          </div>
        </div>
      </div>
    </section>
  );
}