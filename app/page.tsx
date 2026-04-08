import { createServerClient } from '../lib/supabaseClient'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 如果用户已登录，重定向到仪表板页面
  redirect('/dashboard')
}
