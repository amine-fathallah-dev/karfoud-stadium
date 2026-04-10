import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  format,
} from 'date-fns'
import { fr } from 'date-fns/locale'

// Créneaux toutes les 30min de 08:00 à 22:30
export const TIME_SLOTS: string[] = (() => {
  const slots: string[] = []
  for (let min = 10 * 60; min <= 22 * 60 + 30; min += 30) { // dernier créneau 22h30 → 00h00
    const h = Math.floor(min / 60)
    const m = min % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }
  return slots
})()

export const SLOT_DURATION_MIN = 90 // 1h30

export function getWeekDays(weekOffset = 0): Date[] {
  const base = addWeeks(new Date(), weekOffset)
  const start = startOfWeek(base, { weekStartsOn: 1 })
  const end = endOfWeek(base, { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

export function getWeekLabel(weekOffset: number, short = false): string {
  const days = getWeekDays(weekOffset)
  const first = days[0]
  const last = days[6]
  if (short) {
    return `${format(first, 'd MMM', { locale: fr })} – ${format(last, 'd MMM', { locale: fr })}`
  }
  return `Semaine du ${format(first, 'd', { locale: fr })} au ${format(last, 'd MMMM yyyy', { locale: fr })}`
}

export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function getEndTime(startTime: string): string {
  const [h, m] = startTime.split(':').map(Number)
  const totalMin = h * 60 + m + SLOT_DURATION_MIN
  const endH = Math.floor(totalMin / 60) % 24
  const endM = totalMin % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

export function formatSlotLabel(startTime: string): string {
  return `${startTime.replace(':', 'h')} → ${getEndTime(startTime).replace(':', 'h')}`
}

export function formatDayHeader(date: Date, short = false): string {
  if (short) return format(date, 'EEE d', { locale: fr })
  return format(date, 'EEEE d MMMM', { locale: fr })
}

export function formatDayShort(date: Date): string {
  return format(date, 'EEE', { locale: fr }).slice(0, 3)
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return formatDateKey(date) === formatDateKey(today)
}

export type Reservation = {
  id: string
  date: string
  start_time: string
  end_time: string
  client_name: string
  client_phone: string
  note?: string | null
  created_at: string
}

function toMinutes(time: string): number {
  const [h, m] = time.slice(0, 5).split(':').map(Number)
  return h * 60 + m
}

// Marque tous les créneaux qui chevauchent une réservation existante
export function buildReservedSet(reservations: Reservation[]): Set<string> {
  const set = new Set<string>()
  for (const r of reservations) {
    const rStart = toMinutes(r.start_time)
    let rEnd = toMinutes(r.end_time)
    if (rEnd <= rStart) rEnd += 24 * 60 // gestion minuit

    for (const slot of TIME_SLOTS) {
      const sStart = toMinutes(slot)
      const sEnd = sStart + SLOT_DURATION_MIN
      // Chevauchement si le créneau commence avant la fin de la résa ET se termine après le début
      if (sStart < rEnd && sEnd > rStart) {
        set.add(`${r.date}|${slot}`)
      }
    }
  }
  return set
}

export function isReserved(
  reservedSet: Set<string>,
  dateKey: string,
  startTime: string
): boolean {
  return reservedSet.has(`${dateKey}|${startTime}`)
}

// Trouve la réservation qui couvre un créneau donné (pour affichage/suppression admin)
export function getReservation(
  reservations: Reservation[],
  dateKey: string,
  startTime: string
): Reservation | undefined {
  const slotMin = toMinutes(startTime)
  return reservations.find(r => {
    if (r.date !== dateKey) return false
    const rStart = toMinutes(r.start_time)
    let rEnd = toMinutes(r.end_time)
    if (rEnd <= rStart) rEnd += 24 * 60
    return slotMin >= rStart && slotMin < rEnd
  })
}
