import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: '久新数智 - 开启你的数字员工，释放人类创造力',
  description: '面向制造业、教育、医疗行业的AI助手SaaS平台，让每位员工都拥有一位7x24小时在线的业务助理。',
  keywords: ['数字员工', 'AI助手', 'SaaS平台', '制造业', '教育', '医疗', '人工智能'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        
      </body>
    </html>
  );
}
