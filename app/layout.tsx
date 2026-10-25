import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import './globals.css';

const barlow = Barlow_Condensed({subsets:['latin'], weight:['600','700','800','900'], style:['normal','italic'], variable:'--font-barlow', display:'swap'});
const dmSans = DM_Sans({subsets:['latin'], weight:['400','500','600','700','800'], variable:'--font-dm', display:'swap'});

export const metadata: Metadata = {
 title: 'YDC Coffee — Big Personality. Serious Coffee.',
 description: 'Good coffee. Good people. Better days. Discover the character, coffee and culture of YDC.',
 openGraph: {title:'YDC Coffee',description:'Big personality. Serious coffee.',images:['/images/ydc-hero-og.jpg']},
};
export const viewport: Viewport = {width:'device-width', initialScale:1, themeColor:'#fbf1df'};

export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" className={`${barlow.variable} ${dmSans.variable}`}><body suppressHydrationWarning>{children}</body></html>}
