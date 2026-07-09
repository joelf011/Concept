import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Obtém o utilizador atual
  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Se tentar aceder à conta sem estar logado, expulsa para o login
  if (pathname.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se já estiver logado, não faz sentido ver o Login ou Registo
  if ((pathname === '/login' || pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}