'use client'; // This tells Next.js: "Run this in the browser only"

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We cast to 'any' to fix the React 19 type error you saw earlier
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children as any}
    </ReactLenis>
  );
}