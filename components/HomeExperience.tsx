'use client';
import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, Menu, X, MapPin, Instagram, ArrowDown} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SignatureRail from './SignatureRail';

const marqueeWords=['GOOD COFFEE','GOOD PEOPLE','BETTER DAYS'];

export default function HomeExperience(){
 const [count,setCount]=useState(0);
 const [ready,setReady]=useState(false);
 const [skipVisible,setSkipVisible]=useState(true);
 const [menuOpen,setMenuOpen]=useState(false);
 const intro=useRef<HTMLDivElement>(null);
 const cup=useRef<HTMLDivElement>(null);
 const pointer=useRef({x:0,y:0});
 useEffect(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){setCount(99);setReady(true);setSkipVisible(false);return;}
  const start=performance.now();let frame=0;
  const tick=(now:number)=>{const t=Math.min((now-start)/1750,1);const eased=1-Math.pow(1-t,3);setCount(Math.floor(99*eased));if(t<1)frame=requestAnimationFrame(tick);};
  frame=requestAnimationFrame(tick);
  const timeline=gsap.timeline({delay:1.78,onComplete:()=>{setReady(true);setSkipVisible(false);}});
  timeline.to('.loader-medallion',{scale:1.16,opacity:0,rotation:7,duration:.5,ease:'power2.in'},0)
    .to('.intro-wordmark,.intro-caption,.intro-sub,.intro-counter,.intro-bottom,.loader-progress',{opacity:0,y:-22,duration:.36},0)
    .to(intro.current,{yPercent:-101,duration:.9,ease:'power4.inOut'},.24)
    .fromTo('.ydc-blue-paint',{xPercent:75,opacity:0},{xPercent:0,opacity:1,duration:1.12,ease:'power4.out'},.49)
    .fromTo('.ydc-headline-line span',{xPercent:-106},{xPercent:0,duration:.96,ease:'power4.out',stagger:.115},.58)
    .fromTo('.ydc-cup-wrap',{xPercent:115,rotation:7,opacity:0},{xPercent:0,rotation:0,opacity:1,duration:1.23,ease:'power4.out'},.66)
    .fromTo('.ydc-hero-header,.ydc-actions',{opacity:0,y:15},{opacity:1,y:0,duration:.55,stagger:.13},1.06)
    .fromTo('.ydc-doodle',{opacity:0,scale:.65},{opacity:1,scale:1,duration:.56,stagger:.12,ease:'back.out(1.5)'},1.27)
    .fromTo('.ydc-side-note span',{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0% 0 0)',duration:.29,stagger:.17,ease:'none'},1.37)
    .fromTo('.ydc-side-note svg',{strokeDasharray:160,strokeDashoffset:160,opacity:0},{strokeDashoffset:0,opacity:1,duration:.55},2.05);
  return ()=>{cancelAnimationFrame(frame);timeline.kill();};
 },[]);
 useEffect(()=>{
   gsap.registerPlugin(ScrollTrigger);
   const ctx=gsap.context(()=>{
     gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach(el=>gsap.fromTo(el,{opacity:0,y:65},{opacity:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}}));
     gsap.to('.marquee-track',{xPercent:-30,ease:'none',scrollTrigger:{trigger:'.ticker',start:'top bottom',end:'bottom top',scrub:true}});
   });return ()=>ctx.revert();
 },[]);
 const onMove=(e:React.MouseEvent<HTMLElement>)=>{
   if(!ready||!cup.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5};
   gsap.to(cup.current,{x:pointer.current.x*18,y:pointer.current.y*14,rotation:pointer.current.x*1.5,duration:.9,ease:'power2.out',overwrite:'auto'});
 };
 return <>
  {!ready && <div className="intro mascot-intro" ref={intro} role="status" aria-label="YDC Coffee website introduction">
    <div className="loader-topline"><span>YDC COFFEE</span><span>GOOD THINGS TAKE A MOMENT</span></div>
    <div className="intro-inner">
      <span className="intro-caption">SOMETHING GOOD IS BREWING</span>
      <div className="loader-medallion" aria-hidden="true"><Image src="/images/ydc-mascot-clean.png" alt="" width={348} height={389} priority className="loader-mascot"/><span className="loader-orbit loader-orbit-one">✳</span><span className="loader-orbit loader-orbit-two">✦</span></div>
      <div className="intro-wordmark">YDC<span>.</span></div>
      <span className="intro-sub">GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span>
    </div>
    <div className="loader-progress"><span style={{width:`${count/99*100}%`}}/></div>
    <div className="intro-counter" aria-live="off">{String(count).padStart(2,'0')}<span> / 99</span></div>
    <div className="intro-bottom">A LITTLE CUP OF HAPPY <span>↗</span></div>
    {skipVisible&&<button type="button" className="intro-skip" onClick={()=>{gsap.killTweensOf('.intro');gsap.to(intro.current,{yPercent:-101,duration:.6,ease:'power3.inOut',onComplete:()=>{setReady(true);setSkipVisible(false);}});}} aria-label="Skip introduction">SKIP INTRO <ArrowRight size={15}/></button>}
  </div>}
  <main>
   <section id="top" className="ydc-hero" onMouseMove={onMove} aria-label="YDC Coffee, big personality, serious coffee">
     <div className="ydc-blue-paint" aria-hidden="true" />
     <div className="ydc-ground" aria-hidden="true" />
     <header className="ydc-hero-header">
       <nav className="ydc-pill-nav" aria-label="Main navigation"><Link href="/menu">MENU</Link><a href="#story">OUR STORY</a><a href="#visit">FIND US</a></nav>
       <Link href="/" className="ydc-hero-logo" aria-label="YDC home">YDC</Link>
       <button className="ydc-mobile-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
     </header>
     {menuOpen&&<nav className="ydc-mobile-links" aria-label="Mobile navigation"><Link onClick={()=>setMenuOpen(false)} href="/menu">MENU</Link><a onClick={()=>setMenuOpen(false)} href="#story">OUR STORY</a><a onClick={()=>setMenuOpen(false)} href="#visit">FIND US</a></nav>}
     <div className="ydc-headline" aria-label="Big personality. Serious coffee.">
       <div className="ydc-headline-line ydc-blue"><span>BIG</span></div>
       <div className="ydc-headline-line ydc-blue"><span>PERSONALITY.</span></div>
       <div className="ydc-headline-line ydc-ink"><span>SERIOUS</span></div>
       <div className="ydc-headline-line ydc-ink"><span>COFFEE.</span></div>
       <div className="ydc-actions"><Link className="ydc-primary" href="/menu">EXPLORE MENU <ArrowRight size={23}/></Link><a className="ydc-secondary" href="#visit">FIND US <ArrowRight size={22}/></a></div>
     </div>
     <div className="ydc-cup-wrap" ref={cup}><Image src="/images/ydc-cup-clean.png" width={587} height={769} alt="YDC signature coffee cup with illustrated blue-capped character and latte art" className="ydc-cup-photo" priority sizes="(max-width: 700px) 94vw, 45vw"/></div>
     <svg className="ydc-crown ydc-doodle" viewBox="0 0 95 88" fill="none" aria-hidden="true"><path d="M13 61 8 18l25 21L47 7l14 33 26-22-11 46-63-3ZM20 75l49 5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
     <svg className="ydc-rays ydc-doodle" viewBox="0 0 72 92" fill="none" aria-hidden="true"><path d="m8 11 24 19M50 7l-3 28M67 49l-28 2M54 80 34 67" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
     <div className="ydc-side-note" aria-label="Good coffee people too"><span>GOOD</span><span>COFFEE</span><span>PEOPLE</span><span>TOO</span><svg viewBox="0 0 130 19" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13 Q65 2 127 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg></div>
   </section>
   <div className="ticker" aria-label="Good coffee, good people, better days"><div className="marquee-track">{[...marqueeWords,...marqueeWords,...marqueeWords].map((word,i)=><span key={i}>{word}<span className="ticker-star">✳</span></span>)}</div></div>
   <section id="coffee" className="coffee-section">
     <div className="section-heading scroll-reveal"><span className="section-number">02 / SIGNATURES</span><h2>THE GOOD<br/><em>STUFF.</em></h2><p>Our signature line-up deserves more than a plain list. So we’re giving the headliners the full YDC treatment.</p></div>
     <div className="editorial-grid">
       <div className="feature-image scroll-reveal"><Image src="/images/coffee-reference.jpg" alt="YDC cappuccino in its signature illustrated takeaway cup" fill sizes="(max-width: 760px) 100vw, 54vw"/><span className="photo-label">01 / A CUP WITH CHARACTER</span></div>
       <div className="feature-copy scroll-reveal"><span className="asterisk">✳</span><h3>SIGNATURES,<br/>MADE PREMIUM.</h3><p>Featured drinks get the visual spotlight on the homepage, while the full menu stays clean and easy to scan.</p><div className="home-cta-stack"><Link href="/menu" className="outline-button">VIEW FULL MENU <ArrowRight size={21}/></Link><a href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer" className="outline-button">SEE WHAT’S BREWING <ArrowUpRight size={21}/></a></div></div>
     </div>
     <SignatureRail/>
     <div className="ritual-strip scroll-reveal"><span>HOT OR ICED.</span><span>THE GOOD PART OF YOUR DAY.</span><span>MADE TO BE ENJOYED.</span><Link href="/menu" aria-label="View the full menu"><ArrowDown size={25}/></Link></div>
   </section>
   <section id="story" className="story-section"><div className="story-top scroll-reveal"><span className="section-number">03 / THE FEELING</span><span>MORE THAN YOUR DAILY CAFFEINE FIX.</span></div><h2 className="story-title scroll-reveal">GOOD COFFEE.<br/><span>BETTER</span> DAYS.</h2><div className="story-bottom scroll-reveal"><p>A little character. A lot of heart. Coffee feels better when it comes with good company.</p><div className="story-stamp">YDC <span>♥</span> PEOPLE</div></div></section>
   <section className="character-break" aria-label="Meet the YDC character"><div className="character-inner scroll-reveal"><div className="character-face"><Image src="/images/ydc-mascot-clean.png" width={348} height={389} alt="Illustrated YDC character wearing the signature cobalt blue cap"/></div><div className="character-words"><span className="section-number">THAT’S OUR GUY.</span><h2>THE FACE<br/>BEHIND THE<br/><em>GOOD DAYS.</em></h2><p>A little mischievous. A lot of heart. You’ll know us when you see us.</p></div><span className="character-spark" aria-hidden="true">✳</span></div></section>
   <section id="visit" className="visit-section"><div className="visit-copy scroll-reveal"><span className="section-number">04 / COME THROUGH</span><h2>DON’T BE<br/><em>A STRANGER.</em></h2><p>We’d rather say hello over coffee.</p><a className="primary-button" href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer">FIND US ON INSTAGRAM <Instagram size={18}/></a><span className="visit-note"><MapPin size={16}/> Check Instagram for current café details and hours.</span></div><div className="visit-art" aria-hidden="true"><div className="visit-circle">YDC<span>.</span></div><div className="visit-bean">✳</div></div></section>
  </main>
  <footer className="footer"><Link href="/" className="footer-logo">YDC.</Link><span>GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span><a href="https://www.instagram.com/ydccoffee/" rel="noreferrer" target="_blank">INSTAGRAM ↗</a></footer>
 </>;
}
