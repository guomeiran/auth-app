import { createServerClient } from '../../../lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
    status: 302,
  })
}