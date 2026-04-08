import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-text-muted text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative">
            <Image src="/logo.png" alt="Karfoud Stadium" fill className="object-cover" />
          </div>
          <p className="text-center md:text-left">© {new Date().getFullYear()} Karfoud Stadium. Tous droits réservés.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://facebook.com/karfoudstadium" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://instagram.com/karfoudstadium" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://tiktok.com/@karfoudstadium" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
          </a>
          <Link
            href="/admin/login"
            className="text-xs text-white/20 hover:text-white/40 transition-colors ml-2"
          >
            Administration
          </Link>
        </div>
      </div>
    </footer>
  )
}
