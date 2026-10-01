import { Navbar } from "@/components/river/Navbar";
import { Hero } from "@/components/river/Hero";
import { Features } from "@/components/river/Features";
import { About } from "@/components/river/About";
import { Tradeoffs } from "@/components/river/Tradeoffs";
import { Architecture } from "@/components/river/Architecture";
import { Roadmap } from "@/components/river/Roadmap";
import { LiveDemo } from "@/components/river/LiveDemo";
import { Commands } from "@/components/river/Commands";
import { DownloadRelease } from "@/components/river/Download";
import { TechStack } from "@/components/river/TechStack";
import { Footer } from "@/components/river/Footer";

export default function App() {
  return (
    <main style={{ minHeight: "100vh", overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <DownloadRelease />
      <Features />
      <Architecture />
      <LiveDemo />
      <Commands />
      <About />
      <Roadmap />
      <Tradeoffs />
      <TechStack />
      <Footer />
    </main>
  );
}
