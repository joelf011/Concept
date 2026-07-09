'use client'

import React from 'react'
import { Package } from 'lucide-react'
import Link from 'next/link'

export default function OrdersTab() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Order History</h2>
      <div className="bg-secondary/10 border border-border/50 rounded-xl p-10 text-center flex flex-col items-center justify-center text-muted-foreground">
        <Package size={32} className="mb-4 opacity-50" />
        <p className="font-medium text-foreground mb-1">No orders placed yet.</p>
        <p className="text-sm mb-6">Once you place an order, it will appear here.</p>
        <Link href="/shop" className="cursor-pointer bg-foreground text-background px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Browse Shop
        </Link>
      </div>
    </div>
  )
}