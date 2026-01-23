import FAQ from "@/components/landingPage/FAQ";
import FeatureSection from "@/components/landingPage/FeatureSection";
import Footer from "@/components/landingPage/Footer";
import Hero from "@/components/landingPage/Hero";
import Navbar from "@/components/landingPage/Navbar";
import Workflow from "@/components/landingPage/Workflow";

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
