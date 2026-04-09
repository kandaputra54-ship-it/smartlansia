"use client";
import { useState } from "react";
import { Headphones, MessageCircle, Calendar, Star, ChevronDown, ChevronUp } from "lucide-react";

const counselors = [
  {
    name: "dr. Siti Rahayu, M.Psi",
    role: "Psikolog Klinis Lansia",
    exp: "12 tahun pengalaman",
    rating: 4.9,
    available: true,
    avatar: "SR",
    color: "bg-green-800",
  },
  {
    name: "Ns. Budi Santoso, S.Kep",
    role: "Perawat Gerontologi",
    exp: "8 tahun pengalaman",
    rating: 4.8,
    available: true,
    avatar: "BS",
    color: "bg-green-700",
  },
  {
    name: "dr. Anita Lestari",
    role: "Dokter Geriatri",
    exp: "15 tahun pengalaman",
    rating: 5.0,
    available: false,
    avatar: "AL",
    color: "bg-red-700",
  },
];

const faqs = [
  {
    q: "Apakah konseling ini gratis?",
    a: "Ya, layanan konseling dasar melalui SMARTLANSIA tersedia gratis untuk semua pengguna terdaftar.",
  },
  {
    q: "Berapa lama sesi konseling berlangsung?",
    a: "Setiap sesi konseling berlangsung 30-60 menit tergantung kebutuhan dan kesepakatan dengan konselor.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Seluruh data dan percakapan konseling dijaga kerahasiaannya sesuai kode etik profesional kesehatan.",
  },
  {
    q: "Bagaimana cara membuat janji konseling?",
    a: "Pilih konselor yang tersedia, klik tombol 'Buat Janji', dan pilih waktu yang sesuai.",
  },
];

export default function Counseling() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="konseling" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            Aplikasi Counseling Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
            Layanan <span className="text-red-700">Konseling</span> Profesional
          </h2>
          <p className="text-green-700 text-sm md:text-base max-w-2xl mx-auto">
            Terhubung dengan tenaga profesional kesehatan jiwa dan geriatri berpengalaman.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-bold text-green-900 text-lg mb-5 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-green-800" />
              Tim Konselor Kami
            </h3>
            <div className="space-y-4">
              {counselors.map((c) => (
                <div
                  key={c.name}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`${c.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-green-900 text-sm">{c.name}</p>
                    <p className="text-green-600 text-xs">{c.role}</p>
                    <p className="text-gray-400 text-xs">{c.exp}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-600">{c.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {c.available ? "Tersedia" : "Sibuk"}
                    </span>
                    {c.available && (
                      <button className="flex items-center gap-1 bg-green-800 text-white text-xs px-3 py-1.5 rounded-full hover:bg-green-900 transition-colors">
                        <Calendar className="w-3 h-3" />
                        Buat Janji
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-red-700 text-white rounded-2xl p-5 flex items-center gap-4">
              <MessageCircle className="w-10 h-10 flex-shrink-0 opacity-80" />
              <div>
                <p className="font-bold text-sm">Butuh konseling darurat?</p>
                <p className="text-xs opacity-80 mt-0.5">Hubungi hotline kami 24 jam, 7 hari seminggu</p>
                <p className="font-bold text-lg mt-1">0800-1234-5678</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-green-900 text-lg mb-5">Pertanyaan Umum</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-green-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-green-900 text-sm pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-4 h-4 text-green-700 flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-green-700 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-green-700 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border-2 border-green-700 rounded-2xl p-5">
              <h4 className="font-bold text-green-900 mb-3 text-sm">Jadwalkan Sesi Konseling</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama lansia"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700"
                />
                <input
                  type="tel"
                  placeholder="Nomor telepon"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700"
                />
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700 text-gray-500">
                  <option value="">Pilih topik konseling</option>
                  <option>Kesehatan Mental</option>
                  <option>Manajemen Penyakit</option>
                  <option>Gizi dan Nutrisi</option>
                  <option>Aktivitas Fisik</option>
                </select>
                <button className="w-full bg-green-800 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-900 transition-colors">
                  Kirim Permintaan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}