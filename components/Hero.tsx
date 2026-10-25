'use client';
import {useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import gsap from 'gsap';
import SiteHeader from './SiteHeader';

// Everything inside .hero-art-box is positioned in % of that box, so the cup, beans,
// blue shape and doodles scale together at every viewport size.
export default function Hero({interactive}:{interactive:boolean}){
   const cup=useRef<HTMLDivElement>(null);
   const onMove=(e:React.MouseEvent<HTMLElement>)=>{
    if(!interactive||!cup.current||window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches)return;
    const r=e.currentTarget.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    gsap.to(cup.current,{x:x*18,y:y*14,rotation:x*1.5,duration:.9,ease:'power2.out',overwrite:'auto'});
  };
  return <section id="top" className="ydc-hero" onMouseMove={onMove} aria-labelledby="hero-title">
    <SiteHeader/>
    <div className="hero-body container">
      <div className="hero-copy">
        <h1 id="hero-title" className="ydc-headline">
          <span className="ydc-headline-line ydc-blue"><span>BIG</span></span>
          <span className="ydc-headline-line ydc-blue"><span>PERSONALITY.</span></span>
          <span className="ydc-headline-line ydc-ink"><span>SERIOUS</span></span>
          <span className="ydc-headline-line ydc-ink"><span>COFFEE.</span></span>
        </h1>
        <div className="ydc-actions">
          <Link className="ydc-primary" href="/menu">EXPLORE MENU <ArrowRight size={22} aria-hidden="true"/></Link>
          <a className="ydc-secondary" href="#visit">FIND US <ArrowRight size={20} aria-hidden="true"/></a>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-art-box">
          <div className="hero-blue" aria-hidden="true"><div className="hero-blue-shape"/></div>
          <div className="hero-floor" aria-hidden="true"/>
          <div className="hero-cup" ref={cup}>
            <Image src="/images/ydc-cup-clean.png" fill priority sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, 64vw" alt="YDC signature coffee cup with illustrated blue-capped character and latte art" className="hero-cup-img"/>
          </div>
          <Image src="/images/hero-beans-left.png" width={254} height={211} alt="" className="hero-beans hero-beans-left" sizes="(min-width: 1024px) 13vw, 30vw" priority/>
          <Image src="/images/hero-beans-right.png" width={217} height={269} alt="" className="hero-beans hero-beans-right" sizes="(min-width: 1024px) 11vw, 26vw" priority/>
          <svg className="ydc-crown ydc-doodle" viewBox="0 0 95 88" fill="none" aria-hidden="true"><path pathLength={1} d="M13 61 8 18l25 21L47 7l14 33 26-22-11 46-63-3ZM20 75l49 5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <svg className="ydc-rays ydc-doodle" viewBox="0 0 72 92" fill="none" aria-hidden="true"><path pathLength={1} d="m8 11 24 19M50 7l-3 28M67 49l-28 2M54 80 34 67" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
          <p className="ydc-side-note"><span>GOOD</span><span>COFFEE</span><span>PEOPLE</span><span>TOO</span><svg viewBox="0 0 130 19" preserveAspectRatio="none" aria-hidden="true"><path pathLength={1} d="M3 13 Q65 2 127 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></p>
        </div>
      </div>
    </div>
  </section>;
}
