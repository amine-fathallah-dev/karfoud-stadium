const equipments = [
  { icon: '🏟️', title: 'Terrain synthétique FIFA Quality', desc: 'Surface homologuée, entretenue quotidiennement' },
  { icon: '💡', title: 'Éclairage LED haute puissance', desc: 'Disponible 24h/24, visibilité optimale' },
  { icon: '🚿', title: 'Vestiaires & douches séparés', desc: 'Espaces propres et sécurisés' },
  { icon: '🅿️', title: 'Parking sécurisé gratuit', desc: 'Accès facile, surveillance permanente' },
  { icon: '🎽', title: 'Dossards disponibles', desc: 'Disponibles sur place à la demande' },
  { icon: '📹', title: 'Vidéosurveillance du site', desc: 'Sécurité assurée en permanence' },
]

export default function EquipmentsSection() {
  return (
    <section id="equipements" className="py-20 px-4 bg-bg">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl tracking-widest text-primary mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Nos équipements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipments.map((item) => (
            <div
              key={item.title}
              className="bg-surface-2 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-colors duration-200"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-text font-semibold text-base mb-1">{item.title}</h3>
              <p className="text-text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
