"use client";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Screening", href: "#screening" },
  { label: "Intervensi", href: "#intervensi" },
  { label: "Tele-Nursing", href: "#telenursing" },
  { label: "Tracking", href: "#tracking" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-orange-50/80 backdrop-blur-md border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-600 shadow-lg shadow-red-200">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div className="flex items-center tracking-tighter">
            <span className="font-black text-xl text-amber-900">SMART</span>
            <span className="font-bold text-xl text-amber-400">LANSIA</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-red-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link 
              href="#screening" 
              className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.15em] px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg shadow-amber-200"
            >
              Mulai Screening
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-amber-900" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-orange-50 border-t border-amber-100 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setOpen(false)} 
              className="text-sm font-bold uppercase tracking-widest text-amber-800"
            >
              {link.label}
            </a>
          ))}
          <Link 
            href="/screening" 
            onClick={() => setOpen(false)} 
            className="bg-red-600 text-white text-center text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl shadow-lg shadow-red-100"
          >
            Mulai Screening
          </Link>
        </div>
      )}
    </nav>
  );
}