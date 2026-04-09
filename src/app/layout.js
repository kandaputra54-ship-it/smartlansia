import "./globals.css";

export const metadata = {
  title: "SMARTLANSIA - Screening Mobile Aplikasi Remote Tracking",
  description: "Platform kesehatan digital untuk lansia Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}