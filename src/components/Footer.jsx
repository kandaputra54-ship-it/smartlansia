import { Heart, Phone, Mail } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const layananLinks = [
  { name: "Screening", href: "#screening" },
  { name: "Reminiscence", href: "#intervensi" },
  { name: "Latihan Kegel", href: "#intervensi" },
  { name: "Healing Touch", href: "#intervensi" },
  { name: "Komunikasi", href: "#intervensi" },
  { name: "Tracking", href: "#tracking" },
];

export default function Footer() {
  return (
    <footer className="bg-orange-50/30 border-t border-amber-100 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Brand Column - SINKRON DENGAN NAVBAR */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600 shadow-lg shadow-red-200">
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <div className="flex items-center tracking-tighter">
                <span className="font-black text-xl text-amber-950">SMART</span>
                <span className="font-bold text-xl text-amber-400">LANSIA</span>
              </div>
            </div>
            
            <p className="text-sm text-amber-800/80 leading-relaxed max-w-sm font-medium">
              Solusi digital komprehensif untuk mendukung kemandirian, kesehatan seksual, 
              dan kualitas hidup lansia melalui intervensi berbasis data.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-amber-100 group-hover:bg-red-50 group-hover:border-red-100 transition-colors shadow-sm">
                  <Phone className="w-4 h-4 text-amber-600 group-hover:text-red-600" />
                </div>
                <span className="text-sm font-bold text-amber-900">+62 857 1740 4054</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-amber-100 group-hover:bg-red-50 group-hover:border-red-100 transition-colors shadow-sm">
                  <Mail className="w-4 h-4 text-amber-600 group-hover:text-red-600" />
                </div>
                <span className="text-sm font-bold text-amber-900">heri.setiawan49@yahoo.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-amber-100 shadow-sm shadow-amber-100/50">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-8">
                Layanan Akses Cepat
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                {layananLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 text-sm font-bold text-amber-700 hover:text-amber-950 transition-all"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-200 group-hover:bg-red-500 transition-all" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
              © {new Date().getFullYear()} SmartLansia Indonesia
            </p>
            <p className="text-[9px] font-bold text-amber-300 uppercase tracking-tight">
              Empowering Elderly Through Digital Health Innovation
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: FaInstagram, href: "#" },
              { icon: FaXTwitter, href: "#" },
              { icon: FaYoutube, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-11 h-11 rounded-2xl border border-amber-100 flex items-center justify-center text-amber-500 hover:bg-amber-950 hover:text-white hover:border-amber-950 transition-all active:scale-90"
              >
                <social.icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}