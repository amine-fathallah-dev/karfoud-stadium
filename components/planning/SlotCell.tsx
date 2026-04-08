import { formatSlotLabel } from '@/lib/utils/planning'

type Props = {
  startTime: string
  reserved: boolean
  onClick?: () => void
  compact?: boolean
}

export default function SlotCell({ startTime, reserved, onClick, compact = false }: Props) {
  const label = formatSlotLabel(startTime)

  if (compact) {
    return (
      <button
        onClick={!reserved ? onClick : undefined}
        disabled={reserved}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-lg border min-h-[56px] transition-colors duration-150
          ${reserved
            ? 'bg-reserved-bg border-reserved/30 cursor-not-allowed'
            : 'bg-primary/10 border-primary/30 hover:bg-primary/20 cursor-pointer active:bg-primary/30'
          }
        `}
      >
        <span className="text-sm font-medium text-text">{label}</span>
        <span
          className={`text-xs font-bold tracking-widest px-2 py-1 rounded ${
            reserved ? 'text-reserved' : 'text-primary'
          }`}
        >
          {reserved ? 'RÉSERVÉ' : 'DISPONIBLE'}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={!reserved ? onClick : undefined}
      disabled={reserved}
      title={label}
      className={`
        w-full h-full min-h-[44px] text-xs rounded transition-colors duration-150 px-1 py-2
        ${reserved
          ? 'bg-reserved-bg text-reserved border border-reserved/20 cursor-not-allowed'
          : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/25 cursor-pointer'
        }
      `}
    >
      <span className="block leading-tight">{startTime.replace(':', 'h')}</span>
    </button>
  )
}
