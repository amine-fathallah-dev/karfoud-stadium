'use client'

import { useState } from 'react'
import {
  getWeekDays,
  formatDateKey,
  formatDayHeader,
  formatDayShort,
  isToday,
  SLOT_DURATION_MIN,
  type Reservation,
} from '@/lib/utils/planning'
import WeekNavigator from './WeekNavigator'

const HOUR_HEIGHT = 40 // px per hour
const START_HOUR = 10
const END_HOUR = 24
const TOTAL_HOURS = END_HOUR - START_HOUR
const PADDING_PX = 16 // espace haut et bas
const HOURS = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i)

function toMin(time: string): number {
  const [h, m] = time.slice(0, 5).split(':').map(Number)
  return h * 60 + m
}

function timeToTop(time: string): number {
  const [h, m] = time.slice(0, 5).split(':').map(Number)
  return PADDING_PX + (h - START_HOUR + m / 60) * HOUR_HEIGHT
}

const MAX_START_MIN = 22 * 60 + 30 // 22h30 → 00h00

function yToTime(y: number): string | null {
  const totalMin = Math.max(0, Math.floor(((y - PADDING_PX) / HOUR_HEIGHT) * 60 / 30) * 30)
  const absMin = START_HOUR * 60 + totalMin
  if (absMin > MAX_START_MIN) return null
  const h = Math.floor(absMin / 60)
  const m = absMin % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function isAvailable(reservations: Reservation[], dateKey: string, startTime: string): boolean {
  const sStart = toMin(startTime)
  const sEnd = sStart + SLOT_DURATION_MIN
  return !reservations.some(r => {
    if (r.date !== dateKey) return false
    const rStart = toMin(r.start_time)
    const rEnd = toMin(r.end_time)
    return sStart < rEnd && sEnd > rStart
  })
}

type Props = {
  initialReservations: Reservation[]
  onSlotClick?: (date: string, startTime: string) => void
  adminMode?: boolean
  onReserve?: (date: string, startTime: string) => void
  onDelete?: (reservation: Reservation) => void
  weekOffset?: number
  onWeekChange?: (offset: number) => void
}

function TimeAxis() {
  return (
    <div className="flex-shrink-0 w-10 relative select-none" style={{ height: TOTAL_HOURS * HOUR_HEIGHT + PADDING_PX * 2 }}>
      {HOURS.map((h, i) => (
        <div
          key={h}
          className="absolute right-1 text-text-muted leading-none"
          style={{ top: PADDING_PX + i * HOUR_HEIGHT - 5, fontSize: 10 }}
        >
          {`${String(h % 24).padStart(2, '0')}h`}
        </div>
      ))}
    </div>
  )
}

function DayColumn({
  day,
  reservations,
  adminMode,
  onReserve,
  onDelete,
  onSlotClick,
}: {
  day: Date
  reservations: Reservation[]
  adminMode: boolean
  onReserve?: (date: string, startTime: string) => void
  onDelete?: (res: Reservation) => void
  onSlotClick?: (date: string, startTime: string) => void
}) {
  const [hoverTime, setHoverTime] = useState<string | null>(null)
  const dateKey = formatDateKey(day)
  const colReservations = reservations.filter(r => r.date === dateKey)
  const totalHeight = TOTAL_HOURS * HOUR_HEIGHT + PADDING_PX * 2

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!adminMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const time = yToTime(y)
    if (time && isAvailable(reservations, dateKey, time)) {
      setHoverTime(time)
    } else {
      setHoverTime(null)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!adminMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const time = yToTime(y)
    if (!time || !isAvailable(reservations, dateKey, time)) return
    onReserve?.(dateKey, time)
  }

  const slotHeight = (SLOT_DURATION_MIN / 60) * HOUR_HEIGHT

  return (
    <div
      className="relative flex-1 cursor-pointer"
      style={{ height: totalHeight }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverTime(null)}
    >
      {/* Grid lines */}
      {HOURS.map((_, i) => (
        <div key={i}>
          <div className="absolute left-0 right-0 border-t border-white/10" style={{ top: PADDING_PX + i * HOUR_HEIGHT }} />
          {i < TOTAL_HOURS && (
            <div className="absolute left-0 right-0 border-t border-white/4" style={{ top: PADDING_PX + i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }} />
          )}
        </div>
      ))}

      {/* Hover preview */}
      {hoverTime && (
        <div
          className="absolute left-0.5 right-0.5 rounded-md bg-primary/20 border border-primary/40 pointer-events-none z-10 flex items-center justify-center"
          style={{ top: timeToTop(hoverTime), height: slotHeight }}
        >
          <span className="text-primary text-xs font-medium">
            {hoverTime.replace(':', 'h')} → {String(Math.floor((toMin(hoverTime) + SLOT_DURATION_MIN) / 60) % 24).padStart(2, '0')}h{String((toMin(hoverTime) + SLOT_DURATION_MIN) % 60).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Reservation blocks */}
      {colReservations.map(res => {
        const top = timeToTop(res.start_time)
        const duration = toMin(res.end_time) - toMin(res.start_time)
        const height = (duration / 60) * HOUR_HEIGHT
        return (
          <div
            key={res.id}
            className="absolute left-0.5 right-0.5 rounded-md bg-reserved-bg border border-reserved/50 px-2 py-1 overflow-hidden z-20"
            style={{ top: top + 1, height: height - 2 }}
            onClick={e => {
              e.stopPropagation()
              if (adminMode) onDelete?.(res)
            }}
            title={adminMode ? 'Cliquer pour libérer' : undefined}
          >
            <p className="text-reserved text-xs font-semibold leading-tight truncate">
              {res.start_time.slice(0, 5)} – {res.end_time.slice(0, 5)}
            </p>
            <p className="text-reserved/70 text-xs leading-tight truncate">{res.client_name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function WeeklyPlanning({
  initialReservations,
  onSlotClick,
  adminMode = false,
  onReserve,
  onDelete,
  weekOffset: controlledOffset,
  onWeekChange,
}: Props) {
  const [internalOffset, setInternalOffset] = useState(0)
  const weekOffset = controlledOffset ?? internalOffset
  const setWeekOffset = (fn: (w: number) => number) => {
    const next = fn(weekOffset)
    if (onWeekChange) onWeekChange(next)
    else setInternalOffset(next)
  }
  const days = getWeekDays(weekOffset)
  const todayIndex = days.findIndex(d => isToday(d))
  const [selectedDay, setSelectedDay] = useState(todayIndex >= 0 ? todayIndex : 0)

  return (
    <div>
      <WeekNavigator
        weekOffset={weekOffset}
        onPrev={() => setWeekOffset((w) => w - 1)}
        onNext={() => setWeekOffset((w) => w + 1)}
      />

      {/* Mobile: one day at a time */}
      <div className="md:hidden">
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
          {days.map((day, i) => {
            const today = isToday(day)
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-lg min-w-[46px] border transition-colors ${
                  selectedDay === i
                    ? 'bg-primary border-primary text-white'
                    : today
                    ? 'bg-primary/20 border-primary/40 text-primary'
                    : 'bg-surface-2 border-white/10 text-text-muted'
                }`}
              >
                <span className="text-xs capitalize">{formatDayShort(day)}</span>
                <span className="text-base font-bold leading-none">{day.getDate()}</span>
              </button>
            )
          })}
        </div>

        <div className="flex rounded-xl border border-white/10">
          <TimeAxis />
          <DayColumn
            day={days[selectedDay]}
            reservations={initialReservations}
            adminMode={adminMode}
            onReserve={onReserve}
            onDelete={onDelete}
            onSlotClick={onSlotClick}
          />
        </div>
      </div>

      {/* Desktop: full week */}
      <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden">
        {/* Day headers */}
        <div className="flex border-b border-white/10 bg-surface">
          <div className="flex-shrink-0 w-10" />
          {days.map((day, i) => {
            const today = isToday(day)
            return (
              <div
                key={i}
                className={`flex-1 text-center text-xs py-2 capitalize border-l border-white/5 ${
                  today ? 'text-primary font-semibold' : 'text-text-muted'
                }`}
              >
                {formatDayHeader(day, true)}
              </div>
            )
          })}
        </div>

        {/* Calendar grid */}
        <div className="flex">
          <TimeAxis />
          {days.map((day, i) => (
            <div key={i} className="flex-1 border-l border-white/5">
              <DayColumn
                day={day}
                reservations={initialReservations}
                adminMode={adminMode}
                onReserve={onReserve}
                onDelete={onDelete}
                onSlotClick={onSlotClick}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
