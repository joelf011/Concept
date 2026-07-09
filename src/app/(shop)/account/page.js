import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AccountDashboard from '@/components/account/AccountDashboard'

export const metadata = {
  title: 'Concept | My Account',
  description: 'Manage your personal data and view your orders.',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-[70vh] px-[5vw] lg:px-[8vw] py-16 max-w-7xl mx-auto">
      <AccountDashboard user={user} />
    </div>
  )
}