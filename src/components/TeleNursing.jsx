"use client";
import { Video, Phone, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";

export default function TeleNursing() {
  return (
    <section id="telenursing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left border-l-[8px] border-red-600 pl-8">
          <span className="inline-block text-red-600 text-[10px] font-black mb-3 tracking-[0.4em] uppercase">
            Professional Remote Healthcare
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase mb-6">
            Tele<span className="text-red-600">Nursing.</span>
          </h2>
          <p className="text-zinc-800 font-bold max-w-xl text-lg leading-relaxed uppercase tracking-tight">
            Pendampingan medis jarak jauh yang responsif dan nyaman dalam satu genggaman.
          </p>
        </div>

        {/* Support Card - Softer Black (Zinc 900) */}
        <div className="relative bg-zinc-900 p-10 md:p-20 overflow-hidden rounded-[2.5rem] shadow-2xl">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/konsultasi.jpeg" 
              alt="Consultation Background" 
              fill 
              className="object-cover opacity-50" 
            />
            {/* Gradient matching Zinc 900 */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600 text-white rounded-full mb-8 shadow-lg shadow-red-600/20">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Daily Health Support</span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                Konsultasi <br /> <span className="text-red-600">Kapan Saja.</span>
              </h3>
              
              <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-10">
                Hubungi perawat profesional kami melalui berbagai saluran komunikasi instan untuk kebutuhan kesehatan harian Anda.
              </p>

              {/* Integrated Channels */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 text-white">
                  <Video className="w-5 h-5 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Video Call</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Voice Call</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <MessageCircle className="w-5 h-5 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Live Chat</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href="https://wa.me/6285717494954"
                className="bg-white text-zinc-900 px-10 py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white rounded-xl transition-all text-center shadow-xl shadow-zinc-950/30"
              >
                Hubungi Kami
              </a>
           
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}