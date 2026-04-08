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
              Situé sur la route entre Beni Khaled et Grombalia, à côté de Dream Park, Karfoud Stadium est un espace de football de qualité professionnelle ouvert à tous. Que vous soyez amateurs souhaitant jouer entre amis ou académies de jeunes à la recherche d&apos;un terrain d&apos;entraînement, nous vous accueillons avec des créneaux flexibles adaptés à tous les emplois du temps — matin, soir ou nuit.
            </p>
            <div className="mt-6 flex gap-8">
              <div>
                <p
                  className="text-3xl text-primary"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  2022
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
              src="/terrain.png"
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
