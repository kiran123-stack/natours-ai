import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './SmoothScrollProvider'; // Import the new wrapper

const inter = Inter({ subsets: ['latin'] }); {/*we are going to use normal english letter */}

export const metadata: Metadata = {
  title: 'Natours AI',
  description: 'AI-Powered Travel Guide',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Use the wrapper here. It handles the client-side logic safely. */}
        <SmoothScrollProvider>
          {children}     {/*applying smooth scrolling to whole website}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
