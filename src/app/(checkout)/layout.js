import "../globals.css";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata = {
  title: 'Concept | Checkout',
  description: 'Finalização de compra segura',
};

export default function CheckoutLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}