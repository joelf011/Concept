import '@/app/globals.css';
import StoreLayout from '@/components/store/StoreLayout';
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata = {
  title: 'Concept',
  description: 'Not just a Brand, an Idea, a Concept.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <StoreLayout>
             {children}
          </StoreLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}