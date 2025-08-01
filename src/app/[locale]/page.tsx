import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Quote from '@/components/Quote';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Booking from '@/components/Booking';
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
        <Quote />
        <Testimonials />
        <Booking />
        <FAQ />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}