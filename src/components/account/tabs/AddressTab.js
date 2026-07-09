'use client'

import React, { useActionState } from 'react'
import { updateAddress } from '@/app/actions/auth'
import AuthInput from '@/components/auth/AuthInput'
import AuthButton from '@/components/auth/AuthButton'
import { COUNTRIES_LIST } from '@/lib/checkoutUtils'

export default function AddressTab({ shippingAddress }) {
  const [addressState, addressAction] = useActionState(updateAddress, { error: null, success: false })

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
      
      <form action={addressAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInput label="First Name" id="addressFirstName" defaultValue={shippingAddress?.firstName || ''} required />
          <AuthInput label="Last Name" id="addressLastName" defaultValue={shippingAddress?.lastName || ''} required />
        </div>
        
        <div className="flex gap-4">
          <div className="w-1/3">
            <AuthInput label="Prefix" id="addressPrefix" defaultValue={shippingAddress?.prefix || '+351'} placeholder="+351" required />
          </div>
          <div className="w-2/3">
            <AuthInput label="Phone Number" id="addressPhone" type="tel" defaultValue={shippingAddress?.phone || ''} placeholder="912 345 678" required />
          </div>
        </div>

        <AuthInput label="Address" id="addressLine" defaultValue={shippingAddress?.addressLine || ''} placeholder="Street, house number" required />
        <AuthInput label="Additional Information (Optional)" id="additionalInfo" defaultValue={shippingAddress?.additionalInfo || ''} placeholder="Apartment, suite, block, etc." required={false} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AuthInput label="Postal Code" id="postalCode" defaultValue={shippingAddress?.postalCode || ''} placeholder="1000-001" required />
          <AuthInput label="City" id="city" defaultValue={shippingAddress?.city || ''} required />
          <AuthInput label="District / State" id="district" defaultValue={shippingAddress?.district || ''} required />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-foreground">Country</label>
          <select 
            id="country" 
            name="country" 
            defaultValue={shippingAddress?.country || 'PT'} 
            required
            className="cursor-pointer w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          >
            {COUNTRIES_LIST.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>

        {addressState?.error && <p className="text-sm text-red-600 mt-2">{addressState.error}</p>}
        {addressState?.success && <p className="text-sm text-green-600 font-medium mt-2">{addressState.message}</p>}

        <div className="pt-4"><AuthButton text="Save Address" /></div>
      </form>
    </div>
  )
}