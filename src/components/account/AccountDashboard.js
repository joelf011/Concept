'use client'

import React from 'react'
import { Package, User, LogOut, MapPin } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importação das Abas (Tabs)
import PersonalDataTab from './tabs/PersonalDataTab'
import AddressTab from './tabs/AddressTab'
import OrdersTab from './tabs/OrdersTab'

export default function AccountDashboard({ user }) {
  const firstName = user.user_metadata?.first_name || ''
  const shippingAddress = user.user_metadata?.shipping_address || {}

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Welcome back, {firstName || 'Customer'}. Manage your details and orders here.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* SIDEBAR MENU */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <TabsList className="flex flex-col h-auto bg-transparent space-y-2 p-0">
            <TabsTrigger value="details" className="cursor-pointer w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-secondary/30 data-[state=active]:shadow-none rounded-md">
              <User size={18} /> Personal Data
            </TabsTrigger>
            <TabsTrigger value="address" className="cursor-pointer w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-secondary/30 data-[state=active]:shadow-none rounded-md">
              <MapPin size={18} /> Address
            </TabsTrigger>
            <TabsTrigger value="orders" className="cursor-pointer w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-secondary/30 data-[state=active]:shadow-none rounded-md">
              <Package size={18} /> Order History
            </TabsTrigger>
          </TabsList>

          <form action={logout}>
            <button type="submit" className="cursor-pointer w-full flex items-center justify-start gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-md font-medium text-sm">
              <LogOut size={18} /> Log Out
            </button>
          </form>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 max-w-2xl">
          <TabsContent value="details" className="mt-0">
            <PersonalDataTab user={user} />
          </TabsContent>

          <TabsContent value="address" className="mt-0">
            <AddressTab shippingAddress={shippingAddress} />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <OrdersTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}