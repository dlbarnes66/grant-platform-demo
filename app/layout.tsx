import "./globals.css";
import ToastProvider from "@/components/notifications/ToastProvider";
import SystemMessageProvider from "@/components/notifications/SystemMessageProvider";

export const metadata = {
  title: "GrantScout Pro",
  description: "AI-powered grant automation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SystemMessageProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SystemMessageProvider>
      </body>
    </html>
  );
}
