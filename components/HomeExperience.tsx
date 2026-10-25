'use client';
import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, MapPin, Instagram, ArrowDown} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SignatureRail from './SignatureRail';
import Hero from './Hero';
import RevealLines from './RevealLines';

const marqueeWords=['GOOD COFFEE','GOOD PEOPLE','BETTER DAYS'];

export default function HomeExperience(){
 const [count,setCount]=useState(0);
 const [ready,setReady]=useState(false);
 const [skipVisible,setSkipVisible]=useState(true);
 const intro=useRef<HTMLDivElement>(null);
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
    .fromTo('.hero-blue',{xPercent:75,opacity:0},{xPercent:0,opacity:1,duration:1.12,ease:'power4.out'},.49)
    .fromTo('.ydc-headline-line span',{xPercent:-106},{xPercent:0,duration:.96,ease:'power4.out',stagger:.115},.58)
    .fromTo('.hero-cup',{xPercent:115,rotation:7,opacity:0},{xPercent:0,rotation:0,opacity:1,duration:1.23,ease:'power4.out'},.66)
    .fromTo('.site-header,.ydc-actions',{opacity:0,y:15},{opacity:1,y:0,duration:.55,stagger:.13},1.06)
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
 return <>
  {!ready && <div className="intro mascot-intro" ref={intro} role="status" aria-label="YDC Coffee website introduction">
    <div className="loader-topline"><span>YDC COFFEE</span><span>GOOD THINGS TAKE A MOMENT</span></div>
    <div className="intro-inner">
      <span className="intro-caption">SOMETHING GOOD IS BREWING</span>
      <div className="loader-medallion" aria-hidden="true"><Image src="/images/ydc-mascot-clean.png" alt="" width={348} height={389} priority className="loader-mascot"/><span className="loader-orbit loader-orbit-one">✳</span><span className="loader-orbit loader-orbit-two">✦</span></div>
      <div className="intro-wordmark">YDC<span>.</span></div>
      <span className="intro-sub">GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span>
    </div>
    <div className="loader-progress"><span style={{transform:`scaleX(${count/99})`}}/></div>
    <div className="intro-counter" aria-live="off">{String(count).padStart(2,'0')}<span> / 99</span></div>
    <div className="intro-bottom">A LITTLE CUP OF HAPPY <span>↗</span></div>
    {skipVisible&&<button type="button" className="intro-skip" onClick={()=>{gsap.killTweensOf('.intro');gsap.to(intro.current,{yPercent:-101,duration:.6,ease:'power3.inOut',onComplete:()=>{setReady(true);setSkipVisible(false);}});}} aria-label="Skip introduction">SKIP INTRO <ArrowRight size={15} aria-hidden="true"/></button>}
  </div>}
  <main>
   <Hero interactive={ready}/>
   <div className="ticker" aria-hidden="true"><div className="marquee-track">{[...marqueeWords,...marqueeWords,...marqueeWords].map((word,i)=><span key={i}>{word}<span className="ticker-star">✳</span></span>)}</div></div>
   <section id="coffee" className="coffee-section" aria-labelledby="coffee-title">
     <div className="container">
       <div className="section-heading scroll-reveal"><span className="section-number">02 / SIGNATURES</span><RevealLines id="coffee-title" lines={['THE GOOD',<em key="s">STUFF.</em>]}/><p>Our signature line-up deserves more than a plain list. So we’re giving the headliners the full YDC treatment.</p></div>
       <div className="editorial-grid">
         <figure className="feature-image scroll-reveal"><Image src="/images/coffee-reference.jpg" alt="YDC cappuccino in its signature illustrated takeaway cup" fill sizes="(min-width: 768px) 55vw, 100vw"/><figcaption className="photo-label">01 / A CUP WITH CHARACTER</figcaption></figure>
         <div className="feature-copy scroll-reveal"><span className="asterisk" aria-hidden="true">✳</span><RevealLines as="h3" lines={['SIGNATURES,','MADE','PREMIUM.']}/><p>Featured drinks get the visual spotlight on the homepage, while the full menu stays clean and easy to scan.</p><div className="home-cta-stack"><Link href="/menu" className="outline-button">VIEW FULL MENU <ArrowRight size={20} aria-hidden="true"/></Link><a href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer" className="outline-button">SEE WHAT’S BREWING <ArrowUpRight size={20} aria-hidden="true"/></a></div></div>
       </div>
     </div>
     <SignatureRail/>
     <div className="container"><div className="ritual-strip scroll-reveal"><span>HOT OR ICED.</span><span>THE GOOD PART OF YOUR DAY.</span><span>MADE TO BE ENJOYED.</span><Link href="/menu" aria-label="View the full menu"><ArrowDown size={24} aria-hidden="true"/></Link></div></div>
   </section>
   <section id="story" className="story-section" aria-labelledby="story-title">
     <div className="container story-inner">
       <div className="story-top scroll-reveal"><span className="section-number">03 / THE FEELING</span><span>MORE THAN YOUR DAILY CAFFEINE FIX.</span></div>
       <h2 className="story-title reveal-lines" id="story-title"><span className="reveal-line"><span className="reveal-line-inner">GOOD COFFEE.</span></span><span className="reveal-line"><span className="reveal-line-inner"><span className="story-outline">BETTER<span className="story-fill" aria-hidden="true">BETTER</span></span> DAYS.</span></span></h2>
       <div className="story-bottom scroll-reveal"><p>A little character. A lot of heart. Coffee feels better when it comes with good company.</p><div className="story-stamp">YDC <span>♥</span> PEOPLE</div></div>
     </div>
   </section>
   <section className="character-break" aria-labelledby="character-title">
     <div className="container character-inner scroll-reveal">
       <div className="character-face"><Image src="/images/ydc-mascot-clean.png" width={1284} height={1225} sizes="(min-width: 768px) 38vw, 72vw" alt="Illustrated YDC character wearing the signature cobalt blue cap"/></div>
       <div className="character-words"><span className="section-number">THAT’S OUR GUY.</span><RevealLines id="character-title" lines={['THE FACE','BEHIND THE',<em key="g">GOOD DAYS.</em>]}/><p>A little mischievous. A lot of heart. You’ll know us when you see us.</p></div>
       <span className="character-spark" aria-hidden="true">✳</span>
     </div>
   </section>
   <section id="visit" className="visit-section" aria-labelledby="visit-title">
     <div className="container visit-inner">
       <div className="visit-copy scroll-reveal"><span className="section-number">04 / COME THROUGH</span><RevealLines id="visit-title" lines={['DON’T BE',<em key="a">A STRANGER.</em>]}/><p>We’d rather say hello over coffee.</p><a className="primary-button" href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer">FIND US ON INSTAGRAM <Instagram size={18} aria-hidden="true"/></a><span className="visit-note"><MapPin size={16} aria-hidden="true"/> Check Instagram for current café details and hours.</span></div>
       <div className="visit-art" aria-hidden="true"><div className="visit-circle">YDC<span>.</span></div><div className="visit-bean">✳</div></div>
     </div>
   </section>
  </main>
  <footer className="footer"><div className="container footer-inner"><Link href="/" className="footer-logo">YDC.</Link><span>GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span><a href="https://www.instagram.com/ydccoffee/" rel="noreferrer" target="_blank">INSTAGRAM ↗</a></div></footer>
 </>;
}
