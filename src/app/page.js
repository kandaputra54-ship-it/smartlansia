import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Screening from "@/components/Screening";
import Intervention from "@/components/Intervention";
import Footer from "@/components/Footer"; 
import TeleNursing from "@/components/TeleNursing";
import Tracking from "@/components/Tracking";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Screening />
      <Intervention />
      <Tracking />
      <TeleNursing />
      <Footer />

    </main>
  );
}