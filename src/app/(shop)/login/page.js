'use client'

import { useActionState } from 'react' 
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import AuthInput from '@/components/auth/AuthInput'
import AuthButton from '@/components/auth/AuthButton'
import { login } from '@/app/actions/auth'

const initialState = { error: null }

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState)

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <form action={formAction} className="space-y-4">
        <AuthInput label="Email address" id="email" type="email" placeholder="you@email.com" />
        <AuthInput label="Password" id="password" type="password" placeholder="••••••••" />
        
        {state?.error && (
          <div className="p-3 bg-red-50/50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium">{state.error}</p>
          </div>
        )}

        <div className="pt-2">
          <AuthButton text="Sign in" />
        </div>
      </form>
      
      <p className="text-sm text-center text-muted-foreground mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="text-foreground font-medium hover:underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}