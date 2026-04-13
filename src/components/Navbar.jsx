"use client";
import { useState } from "react";
import { Menu, X, Heart, ShieldCheck, Smartphone, Headphones, Wifi, BarChart2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { letter: "S", word: "Screening",           label: "Screening",      href: "#screening",   icon: ShieldCheck },
  { letter: "M", word: "Mobile Intervention", label: "Mobile",         href: "#intervensi",  icon: Smartphone  },
  { letter: "A", word: "App Counseling",      label: "App Counseling", href: "#konseling",   icon: Headphones  },
  { letter: "R", word: "Remote TeleNursing",  label: "Remote Nursing", href: "#telenursing", icon: Wifi        },
  { letter: "T", word: "Tracking",            label: "Tracking",       href: "#tracking",    icon: BarChart2   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="p-1.5 rounded-lg bg-red-600 shadow-md shadow-red-200">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div className="flex items-center tracking-tighter leading-none">
            {navLinks.map((link) => (
              <span
                key={link.letter}
                className={`font-black text-xl transition-colors duration-150 ${
                  hovered === link.letter ? "text-red-600" : "text-zinc-900"
                }`}
              >
                {link.letter}
              </span>
            ))}
            <span className="font-bold text-xl text-zinc-400 ml-0.5">LANSIA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.letter}>
              <a
                href={link.href}
                onMouseEnter={() => setHovered(link.letter)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-all duration-200"
              >
                <link.icon className="w-3.5 h-3.5 text-zinc-300 group-hover:text-red-400 transition-colors duration-200 flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors duration-200">
                  {/* Huruf pertama merah & bold, sisanya normal */}
                  <span className="text-red-500 font-black">{link.label[0]}</span>
                  {link.label.slice(1)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="#screening"
          className="hidden md:inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md shadow-red-100 flex-shrink-0"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Mulai Screening
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 text-zinc-700 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-6 flex flex-col gap-1">
          <div className="flex items-center gap-1 mb-4 pb-4 border-b border-zinc-100">
            {navLinks.map((link) => (
              <div key={link.letter} className="flex-1 text-center">
                <div className="text-xs font-black text-red-600">{link.letter}</div>
                <div className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider leading-tight mt-0.5">
                  {link.word.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.letter}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-md bg-zinc-100 group-hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0">
                <link.icon className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block leading-none mb-0.5">
                  {link.letter} — {link.word}
                </span>
                <span className="text-sm font-semibold text-zinc-700">{link.label}</span>
              </div>
            </a>
          ))}

          <Link
            href="/screening"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-md shadow-red-100"
          >
            <ShieldCheck className="w-4 h-4" />
            Mulai Screening
          </Link>
        </div>
      )}
    </nav>
  );
}