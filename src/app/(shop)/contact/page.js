"use client";

import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-[5vw] flex justify-center bg-background">
      <div className="w-full max-w-5xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Informação de Contacto */}
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Have any questions, feedback, or need assistance with an order? We are here to help. Fill out the form or reach out directly via email.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href="mailto:conceptclothing.pt@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    conceptclothing.pt@gmail.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">We aim to respond within 24-48 business hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Studio & Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Rua S. Miguel Roriz, n.º 1508<br />
                    4750-650 Barcelos<br />
                    Portugal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-secondary/10 border border-border/50 p-6 md:p-8 rounded-xl">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mb-2">
                  <Mail size={24} />
                </div>
                <h3 className="font-medium text-xl">Message Sent</h3>
                <p className="text-sm text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="mt-4 text-sm underline hover:text-muted-foreground">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input id="name" required className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input id="email" type="email" required className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-foreground" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="order" className="text-sm font-medium">Order Number <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <input id="order" placeholder="#1004" className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-foreground" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea id="message" required rows={4} className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-foreground resize-none"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-foreground text-background py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity mt-2 disabled:opacity-50">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}