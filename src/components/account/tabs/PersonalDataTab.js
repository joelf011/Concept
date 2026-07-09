'use client'

import React, { useActionState, useState } from 'react'
import { User, ShieldAlert, Smartphone, Check, AlertCircle, Key } from 'lucide-react'
import Link from 'next/link'
import { updateBasicInfo, updateEmailSecure, updatePasswordSecure, updatePhoneSimple } from '@/app/actions/auth'
import AuthInput from '@/components/auth/AuthInput'
import AuthButton from '@/components/auth/AuthButton'
import Accordion from '@/components/ui/accordion'
import DeleteAccountModal from '../modals/DeleteAccountModal'

export default function PersonalDataTab({ user }) {
  const [basicState, basicAction] = useActionState(updateBasicInfo, { error: null, success: false })
  const [emailState, emailAction] = useActionState(updateEmailSecure, { error: null, success: false })
  const [passwordState, passwordAction] = useActionState(updatePasswordSecure, { error: null, success: false })
  const [phoneState, phoneAction] = useActionState(updatePhoneSimple, { error: null, success: false })

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const firstName = user.user_metadata?.first_name || ''
  const lastName = user.user_metadata?.last_name || ''
  const dob = user.user_metadata?.dob || ''
  
  let currentPrefix = user.user_metadata?.phone_prefix || "+351"
  let currentPhoneNum = user.user_metadata?.phone_number || ""
  const hasPhone = !!currentPhoneNum
  
  if (hasPhone) {
    if (user.phone?.startsWith("+351")) {
      currentPhoneNum = user.phone.substring(4)
    } else if (user.phone) {
      currentPhoneNum = user.phone
    }
  }

  const profileContent = (
    <form action={basicAction} className="space-y-4 pr-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AuthInput label="First Name*" id="firstName" defaultValue={firstName} required={!!firstName} />
        <AuthInput label="Last Name*" id="lastName" defaultValue={lastName} required={!!lastName} />
      </div>
      <div className="w-full md:w-1/2">
        <AuthInput label="Date of Birth*" id="dob" type="date" defaultValue={dob} required={!!dob} />
      </div>
      
      {basicState?.error && <p className="text-sm text-red-600">{basicState.error}</p>}
      {basicState?.success && <p className="text-sm text-green-600 font-medium">{basicState.message}</p>}
      
      <div className="pt-2"><AuthButton text="Save Profile" /></div>
      <div className="mt-4 p-4 bg-secondary/20 rounded-md">
        <p className="text-xs text-muted-foreground leading-relaxed">
            Fields marked with an asterisk are required.
        </p>
      </div>
    </form>
  )

  const phoneContent = (
    <div className="pr-1">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-medium text-foreground">Status:</span>
        {hasPhone ? (
          <span className="text-xs bg-secondary/50 text-foreground px-2 py-1 rounded-md font-medium flex items-center gap-1">
            <Check size={14}/> Saved
          </span>
        ) : (
          <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-md font-medium flex items-center gap-1">
            <AlertCircle size={14}/> Not added
          </span>
        )}
      </div>

      <form action={phoneAction} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/3">
            <AuthInput label="Prefix" id="prefix" defaultValue={currentPrefix} placeholder="+351" required />
          </div>
          <div className="w-2/3">
            <AuthInput label="Mobile Number" id="phone" type="tel" defaultValue={currentPhoneNum} placeholder="912 345 678" required />
          </div>
        </div>
        
        {phoneState?.error && <p className="text-sm text-red-600">{phoneState.error}</p>}
        {phoneState?.success && <p className="text-sm text-green-600 font-medium">{phoneState.message}</p>}
        
        <div className="pt-2">
          <AuthButton text={hasPhone ? "Update Number" : "Save Mobile Number"} />
        </div>
        
        <div className="mt-4 p-4 bg-secondary/20 rounded-md">
          <p className="text-sm font-medium text-foreground mb-1">Why add your mobile number?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use your mobile number exclusively for deliveries and to secure your account. 
            Read more in our <Link href="/privacy" className="underline hover:text-foreground cursor-pointer">Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </div>
  )

  const emailContent = (
    <form action={emailAction} className="space-y-4 pr-1">
      <AuthInput label="Current Email" id="currentEmail" type="email" defaultValue={user.email} disabled />
      <AuthInput label="New Email Address" id="newEmail" type="email" required />
      <AuthInput label="Current Password (to confirm changes)" id="currentPassword" type="password" required />
      
      {emailState?.error && <p className="text-sm text-red-600">{emailState.error}</p>}
      {emailState?.success && <p className="text-sm text-green-600 font-medium">{emailState.message}</p>}
      
      <div className="pt-2"><AuthButton text="Update Email" /></div>
    </form>
  )

  const passwordContent = (
    <form action={passwordAction} className="space-y-4 pr-1">
      <AuthInput label="Current Password" id="oldPassword" type="password" required />
      <AuthInput 
        label="New Password" 
        id="newPassword" 
        type="password" 
        placeholder="Min. 8 chars, 1 uppercase, 1 lowercase, 1 number"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        required 
      />
      
      {passwordState?.error && <p className="text-sm text-red-600">{passwordState.error}</p>}
      {passwordState?.success && <p className="text-sm text-green-600 font-medium">{passwordState.message}</p>}
      
      <div className="pt-2"><AuthButton text="Update Password" /></div>
    </form>
  )

  const accordionItems = [
    { value: "profile", title: "Profile Details", icon: <User size={18} />, content: profileContent },
    { value: "phone", title: "Mobile Number", icon: <Smartphone size={18} />, content: phoneContent },
    { value: "email", title: "Change Email", icon: <ShieldAlert size={18} />, content: emailContent },
    { value: "password", title: "Change Password", icon: <Key size={18} />, content: passwordContent },
  ]

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Account Settings</h2>
      
      <Accordion items={accordionItems} defaultOpen="profile" />
      
      <div className="pt-12 pb-6 flex flex-col items-start">
        <p className="text-xs font-medium text-muted-foreground">
          Want to delete your account?{' '}
          <button 
            onClick={() => setDeleteModalOpen(true)}
            className="cursor-pointer hover:text-red-600 underline underline-offset-4 transition-colors focus:outline-none"
          >
            Click here.
          </button>
        </p>
      </div>

      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
    </div>
  )
}