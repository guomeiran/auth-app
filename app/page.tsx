import { createServerClient } from '../lib/supabaseClient'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 如果用户已登录，显示简单的欢迎信息
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">欢迎回来！</h1>
          <p className="text-gray-600 mb-4">您已成功登录。</p>
          <p className="text-sm text-gray-500">邮箱: {user.email}</p>
          <div className="mt-6">
            <a
              href="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700"
            >
              进入仪表板
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
