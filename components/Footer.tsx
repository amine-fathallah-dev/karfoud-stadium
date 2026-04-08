import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-text-muted text-sm">
        <p className="text-center md:text-left">
          © 2025 Karfoud Stadium. Tous droits réservés.
        </p>
        <Link
          href="/admin/login"
          className="text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          Administration
        </Link>
      </div>
    </footer>
  )
}
