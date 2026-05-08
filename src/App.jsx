import { Navbar } from "@/components/river/Navbar";
import { Hero } from "@/components/river/Hero";
import { Features } from "@/components/river/Features";
import { About } from "@/components/river/About";
import { Architecture } from "@/components/river/Architecture";
import { Roadmap } from "@/components/river/Roadmap";
import { Footer } from "@/components/river/Footer";

export default function App() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Architecture />
      <Roadmap />
      <Footer />
    </main>
  );
}

