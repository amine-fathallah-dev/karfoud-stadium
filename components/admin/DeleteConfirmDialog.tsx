'use client'

import { formatSlotLabel } from '@/lib/utils/planning'
import type { Reservation } from '@/lib/utils/planning'

type Props = {
  reservation: Reservation
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function DeleteConfirmDialog({
  reservation,
  onConfirm,
  onCancel,
  loading = false,
}: Props) {
  const displayDate = new Date(reservation.date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-40 hidden md:block"
        onClick={onCancel}
      />

      <div className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex md:items-center md:justify-center">
        <div className="bg-surface w-full md:max-w-sm md:rounded-xl rounded-t-2xl border border-white/10 p-6 shadow-2xl">
          <h2
            className="text-2xl tracking-widest text-reserved mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Libérer le créneau
          </h2>
          <p className="text-text-muted text-sm mb-4 capitalize">
            {displayDate} — {formatSlotLabel(reservation.start_time.slice(0, 5))}
          </p>
          <div className="bg-surface-2 rounded-lg p-3 mb-6 text-sm">
            <p className="text-text"><strong>Client :</strong> {reservation.client_name}</p>
            <p className="text-text-muted"><strong>Tél :</strong> {reservation.client_phone}</p>
            {reservation.note && (
              <p className="text-text-muted"><strong>Note :</strong> {reservation.note}</p>
            )}
          </div>

          <p className="text-text-muted text-sm mb-6">
            Êtes-vous sûr de vouloir libérer ce créneau ? Cette action est irréversible.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-lg border border-white/10 text-text-muted hover:border-white/30 hover:text-text transition-colors min-h-[48px]"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-reserved hover:bg-red-700 text-white font-semibold transition-colors min-h-[48px] disabled:opacity-60"
            >
              {loading ? 'Suppression...' : 'Libérer le créneau'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
