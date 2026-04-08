import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="apropos" className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl tracking-widest text-primary mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Notre histoire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <p className="text-text leading-relaxed text-base md:text-lg">
              Karfoud Stadium a ouvert ses portes en 2018 avec une ambition
              claire : offrir aux amateurs de football tunisien un espace de
              qualité professionnelle, accessible à tous. Situé au cœur de la
              région, notre terrain synthétique homologué est entretenu
              quotidiennement pour garantir des conditions de jeu optimales,
              que ce soit à l'aube ou en pleine nuit.
            </p>
            <div className="mt-6 flex gap-8">
              <div>
                <p
                  className="text-3xl text-primary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  2018
                </p>
                <p className="text-text-muted text-sm">Année d'ouverture</p>
              </div>
              <div>
                <p
                  className="text-3xl text-primary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  24h/24
                </p>
                <p className="text-text-muted text-sm">Disponibilité</p>
              </div>
              <div>
                <p
                  className="text-3xl text-primary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  FIFA
                </p>
                <p className="text-text-muted text-sm">Qualité certifiée</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative h-64 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80"
              alt="Terrain de football Karfoud Stadium"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
