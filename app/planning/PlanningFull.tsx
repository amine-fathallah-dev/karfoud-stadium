'use client'

import { useState, useEffect, useCallback } from 'react'
import WeeklyPlanning from '@/components/planning/WeeklyPlanning'
import { getWeekDays, formatDateKey } from '@/lib/utils/planning'
import type { Reservation } from '@/lib/utils/planning'

export default function PlanningFull() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [showPhone, setShowPhone] = useState(false)

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

  useEffect(() => {
    fetchReservations(weekOffset)
  }, [weekOffset, fetchReservations])

  const handleSlotClick = () => {
    setShowPhone(true)
    setTimeout(() => {
      document.getElementById('phone-reveal')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div>
      <WeeklyPlanning
        initialReservations={reservations}
        onSlotClick={handleSlotClick}
      />

      {showPhone && (
        <div
          id="phone-reveal"
          className="mt-10 text-center py-8 px-4 bg-surface rounded-xl border border-primary/20"
        >
          <p className="text-text-muted mb-3">Créneau disponible ! Appelez-nous pour réserver :</p>
          <a
            href="tel:+216XXXXXXXX"
            className="inline-flex items-center gap-2 text-primary text-3xl md:text-4xl font-display tracking-widest hover:text-primary-light transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            📞 +216 XX XXX XXX
          </a>
          <p className="text-text-muted text-sm mt-2">Disponible tous les jours, 24h/24</p>
        </div>
      )}
    </div>
  )
}
