'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import WeeklyPlanning from '@/components/planning/WeeklyPlanning'
import ReservationModal from '@/components/admin/ReservationModal'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'
import { createClient } from '@/lib/supabase/client'
import { getWeekDays, formatDateKey, getEndTime } from '@/lib/utils/planning'
import type { Reservation } from '@/lib/utils/planning'

type Props = {
  initialReservations: Reservation[]
  userEmail: string
}

export default function AdminDashboard({ initialReservations, userEmail }: Props) {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [modalSlot, setModalSlot] = useState<{ date: string; startTime: string } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Reservation | null>(null)
  const [loading, setLoading] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)

  const fetchReservations = useCallback(async (offset: number) => {
    const days = getWeekDays(offset)
    const from = formatDateKey(days[0])
    const to = formatDateKey(days[6])
    const res = await fetch(`/api/reservations?from=${from}&to=${to}`)
    if (res.ok) {
      const data = await res.json()
      setReservations(data)
    }
  }, [])

  const handleWeekChange = async (newOffset: number) => {
    setWeekOffset(newOffset)
    await fetchReservations(newOffset)
  }

  const handleReserve = (date: string, startTime: string) => {
    setModalSlot({ date, startTime })
  }

  const handleConfirmReservation = async (formData: {
    clientName: string
    clientPhone: string
    note: string
  }) => {
    if (!modalSlot) return
    setLoading(true)

    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: modalSlot.date,
        start_time: modalSlot.startTime,
        end_time: getEndTime(modalSlot.startTime),
        client_name: formData.clientName,
        client_phone: formData.clientPhone,
        note: formData.note || null,
      }),
    })

    if (res.ok) {
      setModalSlot(null)
      await fetchReservations(weekOffset)
    }

    setLoading(false)
  }

  const handleDelete = (reservation: Reservation) => {
    setDeleteTarget(reservation)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setLoading(true)

    const res = await fetch(`/api/reservations?id=${deleteTarget.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setDeleteTarget(null)
      await fetchReservations(weekOffset)
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-black border-b border-white/5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1
              className="text-xl tracking-widest text-primary leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              KARFOUD STADIUM
            </h1>
            <p className="text-text-muted text-xs mt-0.5">Administration</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-xs hidden md:block">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-text-muted hover:text-reserved transition-colors px-3 py-2 rounded-lg hover:bg-reserved/10 min-h-[44px]"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2
          className="text-3xl md:text-4xl tracking-widest text-white mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Gestion du planning
        </h2>

        <WeeklyPlanning
          initialReservations={reservations}
          adminMode
          weekOffset={weekOffset}
          onWeekChange={handleWeekChange}
          onReserve={handleReserve}
          onDelete={handleDelete}
        />
      </main>

      {/* Modals */}
      {modalSlot && (
        <ReservationModal
          date={modalSlot.date}
          startTime={modalSlot.startTime}
          onConfirm={handleConfirmReservation}
          onCancel={() => setModalSlot(null)}
          loading={loading}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmDialog
          reservation={deleteTarget}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={loading}
        />
      )}
    </div>
  )
}
