import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-end pb-6 md:justify-center md:pb-0 overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/hero.png"
        alt="Terrain synthétique Karfoud Stadium"
        fill
        priority
        className="object-cover object-top md:hidden"
        sizes="100vw"
      />
      <Image
        src="/hero.png"
        alt="Terrain synthétique Karfoud Stadium"
        fill
        priority
        className="object-cover object-center hidden md:block"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden md:block" />

      {/* Green accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary z-10" />

      {/* Content */}
      <div className="relative z-10 px-5 max-w-2xl w-full md:ml-16 lg:ml-32">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/40 rounded-full px-3 py-1 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Terrain disponible 24h/24
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-6xl lg:text-7xl text-white leading-none tracking-widest mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Votre terrain.
          <br />
          <span className="text-primary">Votre match.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-muted text-sm md:text-lg mb-4 max-w-sm leading-relaxed">
          <span className="text-white font-semibold text-base md:text-2xl">Yemen Chateur</span> vous souhaite la bienvenue! <br/> Terrain synthétique FIFA Quality à louer à Nianou — éclairage LED, vestiaires & parking gratuit.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="border-l-2 border-primary pl-2">
            <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>10</p>
            <p className="text-text-muted text-xs">créneaux / jour</p>
          </div>
          <div className="border-l-2 border-primary pl-2">
            <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>1h30</p>
            <p className="text-text-muted text-xs">par créneau</p>
          </div>
          <div className="border-l-2 border-primary pl-2">
            <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>2022</p>
            <p className="text-text-muted text-xs">depuis</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/#planning"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-3 rounded-lg transition-all duration-200 text-sm min-h-[44px] hover:shadow-lg hover:shadow-primary/30"
          >
            Voir le planning
            <span>→</span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-200 text-sm min-h-[44px] backdrop-blur-sm"
          >
            📞 Nous appeler
          </Link>
        </div>
      </div>

{/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs tracking-widest uppercase">Découvrir</span>
        <div className="w-px h-10 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  )
}
