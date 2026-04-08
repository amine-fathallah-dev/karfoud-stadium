import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  format,
  parseISO,
} from 'date-fns'
import { fr } from 'date-fns/locale'

export const TIME_SLOTS = [
  '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
  '12:00', '14:00', '16:00', '18:00', '20:00', '22:00',
]

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
  const [h] = startTime.split(':').map(Number)
  const end = (h + 2) % 24
  return `${String(end).padStart(2, '0')}:00`
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

export function buildReservedSet(reservations: Reservation[]): Set<string> {
  const set = new Set<string>()
  for (const r of reservations) {
    set.add(`${r.date}|${r.start_time.slice(0, 5)}`)
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

export function getReservation(
  reservations: Reservation[],
  dateKey: string,
  startTime: string
): Reservation | undefined {
  return reservations.find(
    (r) => r.date === dateKey && r.start_time.slice(0, 5) === startTime
  )
}
