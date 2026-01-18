import Features from "./Features";
import BuildProcess from "./BuildProcess";
import Faq from "./Faq";
import Footer from "@/components/Footer";
import NexaHero from "./NexaHero";
import Pricing from "./Pricing";
import CallToAction from "./CallToAction";

const Hero = () => {
  return (
    <>
      <NexaHero />
      <Features />
      <BuildProcess />
      <Pricing />
      <Faq />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Hero;
