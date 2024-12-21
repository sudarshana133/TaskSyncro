import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/sections/Footer";
import Header from "@/components/Navbar1";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="mt-10">
          <Hero />
        </div>
        <Features />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
