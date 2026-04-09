"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const interventions = [
  {
    title: "Terapi Reminiscence",
    description: "Meningkatkan kesejahteraan emosional melalui penguatan kenangan positif.",
    href: "/intervention/reminiscence",
    image: "/remini.jpeg", 
  },
  {
    title: "Senam Kegel Lansia",
    description: "Latihan otot panggul untuk kontrol kandung kemih dan vitalitas fisik.",
    href: "/intervention/kegel",
    image: "/kegel.png",
  },
  {
    title: "Komunikasi Pasangan",
    description: "Meningkatkan keintiman melalui dialog terpandu dan pengertian mendalam.",
    href: "/intervention/communication",
    image: "/komunikasi-pasangan.jpeg",
  },
  {
    title: "Healing Touch Therapy",
    description: "Sentuhan terapeutik untuk relaksasi maksimal dan kenyamanan psikologis.",
    href: "/intervention/healing-touch",
    image: "/healing.jpeg",
  },
  {
    title: "Edukasi Seksualitas",
    description: "Kesehatan reproduksi dan adaptasi keintiman di usia lanjut.",
    href: "#telenursing",
    image: "/edukasi-seksualitas.jpeg",
  },
];

export default function Intervention() {
  return (
    <section id="intervensi" className="relative py-24 bg-white overflow-hidden">
      {/* Background Utama - Opacity sangat rendah (Subtle) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/intervention-bg.jpeg" 
          alt="Background" 
          fill 
          className="object-cover opacity-[0.05]" 
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header - Clean & Professional */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase mb-4">
            Program Intervensi
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-neutral-500 font-medium text-sm tracking-wide uppercase">
            Program Pemulihan & Penguatan Kesehatan Digital
          </p>
        </div>

        {/* Grid Kartu - Layout 3+2 yang Rapi */}
        <div className="flex flex-wrap justify-center gap-8">
          {interventions.map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              className="group bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full md:w-[calc(45%-1rem)] lg:w-[calc(31%-1rem)] overflow-hidden"
            >
              {/* Foto Intervensi - Full Color */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Konten Teks */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}