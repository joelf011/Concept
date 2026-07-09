'use client'

import React, { useEffect, useActionState } from 'react'
import { deleteAccount } from '@/app/actions/auth'
import AuthButton from '@/components/auth/AuthButton'

export default function DeleteAccountModal({ isOpen, onClose }) {
  const [deleteState, deleteAction] = useActionState(deleteAccount, { error: null, success: false })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
      <div className="bg-background border border-border rounded-xl p-6 max-w-md w-full shadow-lg">
        <h3 className="text-lg font-bold mb-2">Delete Account</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
        </p>
        
        <form action={deleteAction} className="flex flex-col gap-3">
          <AuthButton text="Yes, Delete My Account" />
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer w-full px-4 py-3 text-sm font-medium border border-border rounded-md hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
        </form>
        
        {deleteState?.error && (
          <p className="text-sm text-red-600 mt-4 text-center">{deleteState.error}</p>
        )}
      </div>
    </div>
  )
}