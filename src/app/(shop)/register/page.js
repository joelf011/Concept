'use client'

import { useActionState } from 'react' 
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import AuthInput from '@/components/auth/AuthInput'
import AuthButton from '@/components/auth/AuthButton'
import { register } from '@/app/actions/auth'

const initialState = { error: null }

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, initialState)

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Join us for a faster checkout experience"
    >
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
           <AuthInput label="First Name" id="firstName" placeholder="First name" />
           <AuthInput label="Last Name" id="lastName" placeholder="Last name" />
        </div>
        
        <AuthInput label="Email address" id="email" type="email" placeholder="you@email.com" />
        
        <AuthInput 
          label="Password" 
          id="password" 
          type="password" 
          placeholder="Minimum 6 characters" 
          minLength="6" 
        />
        
        {state?.error && (
          <div className="p-3 bg-red-50/50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium">{state.error}</p>
          </div>
        )}

        <div className="pt-2">
          <AuthButton text="Create account" />
        </div>
      </form>
      
      <p className="text-sm text-center text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground font-medium hover:underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}