import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/Menu';

// Lazy load components below the fold
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));

export default function App() {
  return (
    <div className="min-h-screen grain-overlay">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Suspense fallback={null}>
        <Pricing />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}
