import { createClient } from '@/lib/supabase/server'
import { getWeekDays, formatDateKey } from '@/lib/utils/planning'
import AdminDashboard from './AdminDashboard'
import type { Reservation } from '@/lib/utils/planning'

export default async function AdminPage() {
  const days = getWeekDays(0)
  const from = formatDateKey(days[0])
  const to = formatDateKey(days[6])

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('reservations')
    .select('id, date, start_time, end_time, client_name, client_phone, note, created_at')
    .gte('date', from)
    .lte('date', to)
    .order('date')
    .order('start_time')

  return (
    <AdminDashboard
      initialReservations={(data as Reservation[]) ?? []}
      userEmail={user?.email ?? ''}
    />
  )
}
