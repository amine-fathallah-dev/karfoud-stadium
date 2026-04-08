'use client'

import { useState } from 'react'
import { formatSlotLabel } from '@/lib/utils/planning'

type Props = {
  date: string
  startTime: string
  onConfirm: (data: { clientName: string; clientPhone: string; note: string }) => void
  onCancel: () => void
  loading?: boolean
}

export default function ReservationModal({
  date,
  startTime,
  onConfirm,
  onCancel,
  loading = false,
}: Props) {
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  const validate = () => {
    const e: { name?: string; phone?: string } = {}
    if (!clientName.trim()) e.name = 'Nom obligatoire'
    if (!clientPhone.trim()) e.phone = 'Téléphone obligatoire'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onConfirm({ clientName: clientName.trim(), clientPhone: clientPhone.trim(), note: note.trim() })
  }

  const displayDate = new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Desktop overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-40 hidden md:block"
        onClick={onCancel}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex md:items-center md:justify-center">
        <div className="bg-surface w-full md:max-w-md md:rounded-xl rounded-t-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
          <h2
            className="text-2xl tracking-widest text-primary mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nouvelle réservation
          </h2>
          <p className="text-text-muted text-sm mb-6 capitalize">
            {displayDate} — {formatSlotLabel(startTime)}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">
                Nom du client <span className="text-reserved">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors min-h-[44px]"
                placeholder="Prénom Nom"
              />
              {errors.name && <p className="text-reserved text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-1">
                Numéro de téléphone <span className="text-reserved">*</span>
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors min-h-[44px]"
                placeholder="+216 XX XXX XXX"
              />
              {errors.phone && <p className="text-reserved text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-1">Note (optionnel)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Informations supplémentaires..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 rounded-lg border border-white/10 text-text-muted hover:border-white/30 hover:text-text transition-colors min-h-[48px]"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors min-h-[48px] disabled:opacity-60"
              >
                {loading ? 'En cours...' : 'Confirmer la réservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
