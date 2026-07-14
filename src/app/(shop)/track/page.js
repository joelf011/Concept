"use client";

import { useState } from "react";
import { Search, ArrowLeft, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/tracking";
import OrderTimeline from "@/components/tracking/OrderTimeline";
import TrackingCard from "@/components/tracking/TrackingCard";
import OrderItems from "@/components/tracking/OrderItems";

export default function TrackPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const { data, error: queryError } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", email.trim());

      if (queryError) {
        throw queryError;
      }

      if (!data || data.length === 0) {
        setError("No orders found for this email address.");
        return;
      }

      const searchValue = orderId.trim();

      const found = data.find((item) => {
        const itemId = String(item.id || "");
        const itemOrderNumber = String(item.order_number || "");

        return (
          itemOrderNumber === searchValue ||
          itemId === searchValue ||
          itemId.startsWith(searchValue)
        );
      });

      if (!found) {
        setError(
          "Order ID does not match any order associated with this email."
        );
        return;
      }

      setOrder(found);
    } catch (err) {
      console.error(err);

      setError(
        "An unexpected error occurred while searching for your order."
      );
    } finally {
      setLoading(false);
    }


  }

  function handleReset() {
    setOrder(null);
    setError("");
  }

  return (<div className="min-h-screen bg-background pt-32 pb-20 px-[5vw] flex justify-center"> <div className="w-full max-w-2xl"> <div className="text-center mb-10"> <h1 className="font-heading text-3xl font-bold mb-3">
    Track Your Order </h1>


    <p className="text-muted-foreground text-sm">
      Enter your order details below to check the status of your shipment.
    </p>
  </div>

    {!order ? (
      <form
        onSubmit={handleSubmit}
        className="bg-secondary/10 border border-border/50 rounded-xl p-6 md:p-8 space-y-5 max-w-xl mx-auto"
      >
        <div>
          <label
            htmlFor="orderId"
            className="block text-sm font-medium mb-2"
          >
            Order ID
          </label>

          <input
            id="orderId"
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. #1004"
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="The email used during checkout"
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-500/10 p-3 rounded-md text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-background py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Search size={18} />
              Track Order
            </>
          )}
        </button>
      </form>
    ) : (
      <div className="space-y-6">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Track another order
        </button>

        <div className="bg-background border border-border rounded-xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-8 mb-8">
            <div>
              <h2 className="text-xl font-medium">
                Order #
                {order.order_number ||
                  String(order.id).split("-")[0]}
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>

            {order.status === "cancelled" ? (
              <span className="px-4 py-2 bg-red-500/10 text-red-600 border border-red-500/20 rounded-full text-sm font-medium">
                Order Cancelled
              </span>
            ) : (
              <span className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium">
                {(order.status || "processing").toUpperCase()}
              </span>
            )}
          </div>

          <OrderTimeline status={order.status} />

          <TrackingCard order={order} />
        </div>

        <OrderItems items={order.cart_items || []} />
      </div>
    )}
  </div>
  </div>

  );
}
