import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'YDC Coffee — Big Personality. Serious Coffee.',
 description: 'Good coffee. Good people. Better days. Discover the character, coffee and culture of YDC.',
 openGraph: {title:'YDC Coffee',description:'Big personality. Serious coffee.',images:['/images/ydc-hero-og.jpg']},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
