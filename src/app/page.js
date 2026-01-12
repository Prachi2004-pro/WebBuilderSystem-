import FAQ from "@/components/FAQ";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureSection />
      <Workflow />
      <FAQ />
      <Footer />
    </>
  );
}
