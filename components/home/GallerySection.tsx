import Image from 'next/image'

const photos = [
  { src: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80', alt: 'Terrain de football synthétique' },
  { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', alt: 'Stade illuminé la nuit' },
  { src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80', alt: 'Surface synthétique de qualité' },
  { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80', alt: 'Éclairage du stade' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Vestiaires modernes' },
  { src: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80', alt: 'Parking sécurisé' },
]

export default function GallerySection() {
  return (
    <section id="galerie" className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl tracking-widest text-primary mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Le stade en images
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
