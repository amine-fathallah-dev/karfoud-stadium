'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="text-3xl tracking-widest text-primary mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            KARFOUD STADIUM
          </h1>
          <p className="text-text-muted text-sm">Espace administration</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-xl border border-white/10 p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm text-text-muted mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors min-h-[44px]"
              placeholder="admin@karfoud.tn"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors min-h-[44px]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-reserved text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors min-h-[48px] disabled:opacity-60 mt-2"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
