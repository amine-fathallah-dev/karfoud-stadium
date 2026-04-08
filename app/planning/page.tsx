import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PlanningFull from './PlanningFull'

export default function PlanningPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-bg">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1
            className="text-4xl md:text-5xl tracking-widest text-primary mb-2 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Planning hebdomadaire
          </h1>
          <p className="text-text-muted text-center mb-10 text-sm">
            Cliquez sur un créneau disponible pour afficher notre numéro
          </p>
          <PlanningFull />
        </div>
      </main>
      <Footer />
    </>
  )
}
