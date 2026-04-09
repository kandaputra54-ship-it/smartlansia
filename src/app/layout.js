import "./globals.css";

export const metadata = {
 
  title: "SMARTLANSIA - Pendamping Kesehatan Digital Lanjut Usia Indonesia",
  description: "Platform pemantauan kesehatan mandiri dan telenursing untuk lansia Indonesia. Deteksi dini risiko fisik, psikologis, dan seksualitas.",
  

  keywords: ["kesehatan lansia", "screening mandiri", "telenursing Indonesia", "perawatan lansia", "cek kesehatan digital"],
  authors: [{ name: "SMARTLANSIA Team" }],
  creator: "SMARTLANSIA",
  
  // 3. Open Graph (Untuk tampilan saat dibagikan di WhatsApp/Media Sosial)
  openGraph: {
    title: "SMARTLANSIA - Cek Kesehatan Lansia Mandiri",
    description: "Pantau kesehatan fisik, mental, dan seksualitas lansia secara rahasia dan tervalidasi.",
    url: "https://smartlansia.web.id", // Ganti dengan URL asli Anda nanti
    siteName: "SMARTLANSIA",
    images: [
      {
        url: "/og-image.jpg", // Gambar khusus ukuran 1200x630px di folder /public
        width: 1200,
        height: 630,
        alt: "Logo SMARTLANSIA dan ilustrasi pendampingan lansia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // 4. Ikon (PENTING untuk favicon)
  icons: {
    icon: "/favicon.ico", // Letakkan favicon.ico asli di folder /public
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Next.js 13+ otomatis menambahkan meta charset, viewport, title, dan description dari metadata object di atas */}
      <body>{children}</body>
    </html>
  );
}