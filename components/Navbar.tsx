'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/#accueil', label: 'Accueil' },
  { href: '/#apropos', label: 'À propos' },
  { href: '/#equipements', label: 'Équipements' },
  { href: '/#planning', label: 'Planning' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
            <Image src="/logo.png" alt="Karfoud Stadium" fill className="object-cover" />
          </div>
          <span
            className="font-display text-2xl tracking-widest text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            KARFOUD STADIUM
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-text transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/5">
          <ul className="flex flex-col py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-6 py-3 text-lg text-text hover:text-primary hover:bg-white/5 transition-colors min-h-[48px] flex items-center"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
