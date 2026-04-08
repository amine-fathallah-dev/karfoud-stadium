'use client'

import { getWeekLabel } from '@/lib/utils/planning'

type Props = {
  weekOffset: number
  onPrev: () => void
  onNext: () => void
}

export default function WeekNavigator({ weekOffset, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <button
        onClick={onPrev}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-surface-2 hover:bg-primary/20 border border-white/10 text-text hover:text-primary transition-colors text-xl"
        aria-label="Semaine précédente"
      >
        ←
      </button>

      <div className="text-center flex-1">
        <p className="text-text text-sm md:text-base font-medium">
          <span className="hidden md:inline">{getWeekLabel(weekOffset, false)}</span>
          <span className="md:hidden">{getWeekLabel(weekOffset, true)}</span>
        </p>
      </div>

      <button
        onClick={onNext}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-surface-2 hover:bg-primary/20 border border-white/10 text-text hover:text-primary transition-colors text-xl"
        aria-label="Semaine suivante"
      >
        →
      </button>
    </div>
  )
}
