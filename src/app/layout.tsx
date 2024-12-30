import type {Metadata} from 'next';

import './globals.css';
import {ConfigProvider} from 'antd';
import {Poppins} from 'next/font/google';
import es_ES from 'antd/es/locale/es_ES';
import Image from 'next/image';

import {Header} from '@/components/layout/Header';
import {StoreProvider} from '@/provider';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LatinAd Challenge',
  description: 'A challenge for LatinAd',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-primary antialiased`}>
        <StoreProvider>
          <ConfigProvider locale={es_ES}>
            <Header />
            {children}
          </ConfigProvider>
        </StoreProvider>
        <Image
          alt="bg"
          className="absolute bottom-0 left-0 right-0"
          height={400}
          src="/bk-latinad.png"
          width={1724}
        />
      </body>
    </html>
  );
}
