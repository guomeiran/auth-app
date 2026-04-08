import { createServerClient } from '../lib/supabaseClient'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            欢迎回来！
          </h1>
          <p className="mt-2 text-gray-600">
            您已成功登录
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">用户信息</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>邮箱:</strong> {user.email}</p>
                <p><strong>用户ID:</strong> {user.id}</p>
              </div>
            </div>

            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                登出
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
