'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
        } else {
          // 如果用户未登录，重定向到登录页面
          router.push('/login')
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // 登出成功后重定向到登录页面
      router.push('/login')
      router.refresh()
    } catch (error: any) {
      console.error('登出失败:', error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // 在重定向之前显示空白页面
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* 头部 */}
          <div className="bg-indigo-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">用户仪表板</h1>
                <p className="mt-2 text-indigo-100">欢迎回来！</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                退出登录
              </button>
            </div>
          </div>

          {/* 用户信息 */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">用户信息</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">用户ID</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{user.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">邮箱地址</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">邮箱确认状态</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.email_confirmed_at ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          已确认
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          未确认
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">账户详情</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">创建时间</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '未知'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">最后登录时间</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('zh-CN') : '未知'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">账户状态</label>
                    <p className="mt-1 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        活跃
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 操作区域 */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  退出登录
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  返回登录页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}