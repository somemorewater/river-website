import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/river/Navbar";
import { Hero } from "@/components/river/Hero";
import { Features } from "@/components/river/Features";
import { About } from "@/components/river/About";
import { Architecture } from "@/components/river/Architecture";
import { Roadmap } from "@/components/river/Roadmap";
import { Footer } from "@/components/river/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "River — An in-memory data store built in Rust" },
      { name: "description", content: "River is an experimental Redis-inspired in-memory data store written from scratch in Rust. Fast, lightweight, and built to learn systems programming." },
      { property: "og:title", content: "River — In-memory data store in Rust" },
      { property: "og:description", content: "Fast. Lightweight. Experimental. Built to explore systems programming from the ground up." },
    ],
  }),
});

function Index() {
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
