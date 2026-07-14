"use client";

import React, { useEffect, useState } from "react";
import { Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/lib/supabase/client";

export default function OrdersTab() {
  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_email", user.email)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email, supabase]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase() || "pending";
    
    const styles = {
      pending: "bg-secondary text-muted-foreground border-border",
      processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      shipped: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      delivered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${styles[normalizedStatus] || styles.pending}`}>
        {normalizedStatus}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-medium mb-6">Order History</h2>
        {[1, 2].map((i) => (
          <div key={i} className="border border-border rounded-xl p-6 animate-pulse bg-secondary/20">
            <div className="h-6 bg-secondary rounded w-1/3 mb-4"></div>
            <div className="h-24 bg-secondary rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="bg-secondary/10 border border-border/50 rounded-xl p-10 text-center flex flex-col items-center justify-center text-muted-foreground">
          <Package size={32} className="mb-4 opacity-50" />
          <p className="font-medium text-foreground mb-1">No orders placed yet.</p>
          <p className="text-sm mb-6">Once you place an order, it will appear here.</p>
          <Link href="/shop" className="cursor-pointer bg-foreground text-background px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            // Mapeado com os nomes exatos da tabela
            const orderItems = order.cart_items || [];
            const orderTotal = (order.amount_total || 0) / 100;

            return (
              <div key={order.id} className="border border-border rounded-xl overflow-hidden bg-background">
                
                <div className="bg-secondary/30 p-4 sm:px-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Order Placed</p>
                      <p className="font-medium">{formatDate(order.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Total</p>
                      <p className="font-mono font-medium">€{Number(orderTotal).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Order ID</p>
                      <p className="font-mono text-xs mt-0.5">#{order.order_number || order.id.split('-')[0]}</p>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 max-h-72 overflow-y-auto">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={64} 
                          height={80} 
                          className="w-16 h-20 object-cover rounded-md bg-secondary shrink-0 border border-border/50"
                        />
                      ) : (
                        <div className="w-16 h-20 rounded-md bg-secondary shrink-0 flex items-center justify-center border border-border/50 text-muted-foreground">
                          <Package size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-2">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>• Color: {item.color}</span>}
                          {item.option && <span>• {item.option}</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="font-mono">€{Number(item.price).toFixed(2)}</span>
                          <span className="text-muted-foreground">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}