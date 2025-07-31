import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="main-content">
        <About />
        <Gallery />
        <Packages />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}