import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

const links = {
  Layanan: ["Screening", "Mobile Intervention", "Konseling", "Tele-Nursing", "Tracking"],
  Tentang: ["Tentang Kami", "Tim Medis", ],
  Dukungan: ["Pusat Bantuan", "FAQ", "Panduan Pengguna", "Kebijakan Privasi", "Syarat & Ketentuan"],
};

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socials = [
  { icon: IconInstagram, href: "#" },
  { icon: IconX, href: "#" },
  { icon: IconYoutube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-7 h-7 text-green-700" />
              <span className="text-xl font-bold text-gray-900">
                SMART<span className="text-red-700">LANSIA</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Platform digital terintegrasi untuk memantau dan meningkatkan kualitas
              hidup lansia Indonesia.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span>+62 857 1740 4054</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span>heri.setiawan49@yahoo.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span>Depok, Indonesia</span>
              </div>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                {category}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} SmartLansia. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-green-700 hover:text-white transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}