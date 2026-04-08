import Image from 'next/image'

const photos = [
  { src: '/1.png', alt: 'Karfoud Stadium photo 1' },
  { src: '/2.JPG', alt: 'Karfoud Stadium photo 2' },
  { src: '/3.JPG', alt: 'Karfoud Stadium photo 3' },
  { src: '/4.JPG', alt: 'Karfoud Stadium photo 4' },
  { src: '/5.JPG', alt: 'Karfoud Stadium photo 5' },
  { src: '/6.JPG', alt: 'Karfoud Stadium photo 6' },
]

export default function GallerySection() {
  return (
    <section id="galerie" className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl tracking-widest text-primary mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Galerie des photos
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
