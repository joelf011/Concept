"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dicionário com todas as políticas em Inglês
const POLICIES = {
  refund: {
    title: "Refund policy",
    content: `We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.

To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.

To start a return, you can contact us at conceptclothing.pt@gmail.com. Please note that returns will need to be sent to the following address: [Rua S. Miguel Roriz, n.º 1508, 4750-650 Barcelos, Portugal]

If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.

Damages and issues
Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.

Exceptions / non-returnable items
Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. We also do not accept returns for hazardous materials, flammable liquids, or gases. Unfortunately, we cannot accept returns on sale items or gift cards.

Exchanges
The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.

European Union 14 day cooling off period
Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. Your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.

Refunds
We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.`
  },
  shipping: {
    title: "Shipping policy",
    content: `Shipping Policy - Concept

All orders are processed on the next business day after payment confirmation.

Mainland Portugal
Standard Shipping (CTT) - €3.50 (no tracking)
Registered Shipping (CTT) - €5.50 (tracking number provided)

European Union
International Standard Tracked - €8.50
International Premium Tracked - €18.00

UK and Rest of the World
International Standard - €18.00
International Tracked - €25.00

Delivery times are estimates and may vary due to external factors such as customs or postal service strikes. Concept is not responsible for delays caused by shipping carriers.

For shipping-related questions, please contact us at conceptclothing.pt@gmail.com.`
  },
  privacy: {
    title: "Privacy policy",
    content: `Your privacy is critically important to us. 

At Concept, we have a few fundamental principles:
- We are thoughtful about the personal information we ask you to provide and the personal information that we collect about you through the operation of our services.
- We store personal information for only as long as we have a reason to keep it.
- We aim for full transparency on how we gather, use, and share your personal information.

We use secure third-party services like Stripe for payment processing and Supabase for database management. Your credit card information is never stored directly on our servers; it is securely processed by Stripe.

If you have any questions about accessing or correcting your personal data, please contact us at conceptclothing.pt@gmail.com.` 
  },
  terms: {
    title: "Terms of service",
    content: `OVERVIEW
Welcome to Concept! The terms “we”, “us” and “our” refer to Concept. Concept operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience.

SECTION 1 - ACCESS AND ACCOUNT
By agreeing to these Terms of Service, you represent that you are at least the age of majority in your country of residence. You are solely responsible for maintaining the security of your account credentials and for all of your account activity.

SECTION 2 - OUR PRODUCTS
We have made every effort to provide an accurate representation of our products and services. However, please note that colors or product appearance may differ from how they may appear on your screen.

SECTION 3 - ORDERS
When you place an order, you are making an offer to purchase. Concept reserves the right to accept or decline your order for any reason at its discretion. We must receive and process your payment before your order is accepted.

SECTION 4 - PRICES AND BILLING
Prices, discounts and promotions are subject to change without notice. The price charged for a product or service will be the price in effect at the time the order is placed.

SECTION 5 - CONTACT INFORMATION
Questions about the Terms of Service should be sent to us at conceptclothing.pt@gmail.com.`
  },
  legal: {
    title: "Legal notice",
    content: `Legal Notice - Concept

In compliance with the Portuguese Law (Article 10 of Decree-Law No. 7/2004, of January 7), we hereby inform:

Website Owner: Ricardo André Silva Figueiredo
VAT ID (NIF): 275331059 
Address: Rua S. Miguel Roriz, n.º 1508, 4750-650 Barcelos, Portugal
Email: rikis.figueiredo@gmail.com

Intellectual Property
All content present on this website - including images, texts, logos, and design - is the property of Concept and is protected by Portuguese and European copyright laws. Total or partial reproduction without prior authorization is strictly prohibited.

Liability
Concept is not responsible for damages resulting from the use of the website or the information contained therein. We reserve the right to change the content without prior notice.`
  },
  contact: {
    title: "Contact",
    content: `Have any questions, feedback, or need assistance with an order? 

We are here to help! 

Email: conceptclothing.pt@gmail.com
Address: Rua S. Miguel Roriz, n.º 1508, 4750-650 Barcelos, Portugal

We aim to respond to all inquiries within 24-48 business hours.` 
  },
  cookies: {
    title: "Cookies",
    content: `We use cookies to enhance your browsing experience, save items in your shopping cart, and analyze our website traffic. 

By continuing to use this site, you consent to our use of cookies. You can manage or disable cookies at any time through your browser settings, but please note that some features of our store (like the shopping cart) may not function properly without them.` 
  }
};

export default function MinimalFooter() {
  const [activePolicy, setActivePolicy] = useState(null);

  // Previne o scroll da página quando o modal está aberto
  useEffect(() => {
    if (activePolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activePolicy]);

  return (
    <>
      <footer className="w-full border-t border-border bg-background py-6 px-[5vw] lg:px-[8vw] mt-auto">
        <div className="max-w-7xl mx-auto">
          {/* Links a preto (foreground) com sublinhado no hover */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground mb-4">
            <button onClick={() => setActivePolicy('refund')} className="hover:underline hover:text-muted-foreground transition-colors">Refund policy</button>
            <button onClick={() => setActivePolicy('shipping')} className="hover:underline hover:text-muted-foreground transition-colors">Shipping</button>
            <button onClick={() => setActivePolicy('privacy')} className="hover:underline hover:text-muted-foreground transition-colors">Privacy policy</button>
            <button onClick={() => setActivePolicy('terms')} className="hover:underline hover:text-muted-foreground transition-colors">Terms of service</button>
            <button onClick={() => setActivePolicy('legal')} className="hover:underline hover:text-muted-foreground transition-colors">Legal notice</button>
            <button onClick={() => setActivePolicy('contact')} className="hover:underline hover:text-muted-foreground transition-colors">Contact</button>
            <button onClick={() => setActivePolicy('cookies')} className="hover:underline hover:text-muted-foreground transition-colors">Cookies</button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-4">
            <p>© {new Date().getFullYear()} CONCEPT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MODAL DISCRETO E MINIMALISTA */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            
            {/* Fundo Escurecido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Caixa do Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-background rounded-xl shadow-2xl flex flex-col overflow-hidden z-10 p-6 md:p-10"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Cabeçalho limpo com Título e botão "X" ao lado */}
              <div className="flex items-start justify-between mb-6 shrink-0">
                <h2 className="font-heading text-2xl font-bold tracking-tight pr-4">
                  {POLICIES[activePolicy]?.title}
                </h2>
                <button 
                  onClick={() => setActivePolicy(null)}
                  className="p-1 -mt-1 -mr-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Corpo de Texto Contínuo */}
              <div className="overflow-y-auto text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {POLICIES[activePolicy]?.content}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}