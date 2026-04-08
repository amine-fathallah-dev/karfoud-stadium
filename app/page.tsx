import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import EquipmentsSection from '@/components/home/EquipmentsSection'
import GallerySection from '@/components/home/GallerySection'
import ContactSection from '@/components/home/ContactSection'
import PlanningPreview from './PlanningPreview'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <EquipmentsSection />
        <section id="planning" className="py-20 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-4xl md:text-5xl tracking-widest text-primary mb-4 text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Planning de la semaine
            </h2>
            <p className="text-text-muted text-center mb-10">
              Cliquez sur un créneau disponible pour nous contacter
            </p>
            <PlanningPreview />
            <div className="text-center mt-8">
              <a
                href="/planning"
                className="inline-block bg-surface-2 hover:bg-primary/20 border border-white/10 hover:border-primary/30 text-text hover:text-primary px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Voir le planning complet →
              </a>
            </div>
          </div>
        </section>
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
