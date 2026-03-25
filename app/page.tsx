import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Products from "./components/Products";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Products />
        <WhyUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
