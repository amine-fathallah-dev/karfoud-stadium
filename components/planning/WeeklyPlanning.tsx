'use client'

import { useState } from 'react'
import {
  getWeekDays,
  buildReservedSet,
  isReserved,
  formatDateKey,
  formatDayHeader,
  formatDayShort,
  TIME_SLOTS,
  formatSlotLabel,
  isToday,
  type Reservation,
} from '@/lib/utils/planning'
import WeekNavigator from './WeekNavigator'
import SlotCell from './SlotCell'

type Props = {
  initialReservations: Reservation[]
  onSlotClick?: (date: string, startTime: string) => void
  adminMode?: boolean
  onReserve?: (date: string, startTime: string) => void
  onDelete?: (reservation: Reservation) => void
  weekOffset?: number
  onWeekChange?: (offset: number) => void
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
  const [selectedDay, setSelectedDay] = useState(0)
  const reservations = initialReservations
  const reservedSet = buildReservedSet(reservations)
  const days = getWeekDays(weekOffset)

  const handleSlotClick = (dateKey: string, startTime: string) => {
    if (onSlotClick) onSlotClick(dateKey, startTime)
    else if (!adminMode) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <WeekNavigator
        weekOffset={weekOffset}
        onPrev={() => setWeekOffset((w) => w - 1)}
        onNext={() => setWeekOffset((w) => w + 1)}
      />

      {/* Mobile: accordion by day */}
      <div className="md:hidden">
        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {days.map((day, i) => {
            const label = formatDayShort(day)
            const dayNum = day.getDate()
            const today = isToday(day)
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`
                  flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-lg min-w-[52px] min-h-[56px] border transition-colors
                  ${selectedDay === i
                    ? 'bg-primary border-primary text-white'
                    : today
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'bg-surface-2 border-white/10 text-text-muted'
                  }
                `}
              >
                <span className="text-xs capitalize">{label}</span>
                <span className="text-lg font-bold leading-none">{dayNum}</span>
              </button>
            )
          })}
        </div>

        {/* Slots for selected day */}
        <div className="flex flex-col gap-2">
          {TIME_SLOTS.map((slot) => {
            const dateKey = formatDateKey(days[selectedDay])
            const reserved = isReserved(reservedSet, dateKey, slot)
            const reservation = reservations.find(
              (r) => r.date === dateKey && r.start_time.slice(0, 5) === slot
            )
            if (adminMode) {
              return (
                <div key={slot} className="flex items-center gap-2">
                  <div className="flex-1">
                    <SlotCell
                      startTime={slot}
                      reserved={reserved}
                      compact
                    />
                  </div>
                  {reserved && reservation ? (
                    <button
                      onClick={() => onDelete?.(reservation)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-reserved-bg border border-reserved/30 text-reserved hover:bg-reserved/20 transition-colors text-sm"
                      title="Libérer ce créneau"
                    >
                      🗑
                    </button>
                  ) : (
                    <button
                      onClick={() => onReserve?.(dateKey, slot)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors text-sm font-bold"
                      title="Réserver ce créneau"
                    >
                      +
                    </button>
                  )}
                </div>
              )
            }
            return (
              <SlotCell
                key={slot}
                startTime={slot}
                reserved={reserved}
                compact
                onClick={() => handleSlotClick(dateKey, slot)}
              />
            )
          })}
        </div>
      </div>

      {/* Desktop: full week grid */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="w-24 text-text-muted text-sm font-normal py-2 pr-3 text-right">
                Créneau
              </th>
              {days.map((day, i) => {
                const today = isToday(day)
                return (
                  <th
                    key={i}
                    className={`text-center text-sm font-medium py-2 px-1 capitalize ${
                      today ? 'text-primary' : 'text-text-muted'
                    }`}
                  >
                    {formatDayHeader(day, true)}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot) => (
              <tr key={slot} className="border-t border-white/5">
                <td className="text-text-muted text-xs py-1 pr-3 text-right whitespace-nowrap">
                  {formatSlotLabel(slot)}
                </td>
                {days.map((day, i) => {
                  const dateKey = formatDateKey(day)
                  const reserved = isReserved(reservedSet, dateKey, slot)
                  const reservation = reservations.find(
                    (r) => r.date === dateKey && r.start_time.slice(0, 5) === slot
                  )
                  return (
                    <td key={i} className="py-1 px-1">
                      {adminMode ? (
                        <div className="flex items-center gap-1">
                          <div className="flex-1">
                            <SlotCell startTime={slot} reserved={reserved} />
                          </div>
                          {reserved && reservation ? (
                            <button
                              onClick={() => onDelete?.(reservation)}
                              className="text-xs text-reserved hover:text-red-400 transition-colors min-w-[24px] min-h-[24px] flex items-center justify-center"
                              title="Libérer"
                            >
                              🗑
                            </button>
                          ) : (
                            <button
                              onClick={() => onReserve?.(dateKey, slot)}
                              className="text-xs text-primary hover:text-primary-light transition-colors min-w-[24px] min-h-[24px] flex items-center justify-center font-bold"
                              title="Réserver"
                            >
                              +
                            </button>
                          )}
                        </div>
                      ) : (
                        <SlotCell
                          startTime={slot}
                          reserved={reserved}
                          onClick={() => handleSlotClick(dateKey, slot)}
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
