'use client';
import {useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, MapPin, Instagram, ArrowDown} from 'lucide-react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import SignatureRail from './SignatureRail';
import Hero from './Hero';
import RevealLines from './RevealLines';
import {MOTION_CONDITIONS, type MotionConditions, revealHeadings, liftIn, refreshWhenSettled} from './motion';

const marqueeWords=['GOOD COFFEE','GOOD PEOPLE','BETTER DAYS'];
const TWO_COLUMN_HERO='(min-width: 1024px), (min-width: 640px) and (max-height: 600px) and (orientation: landscape)';

export default function HomeExperience(){
 const [count,setCount]=useState(0);
 const [ready,setReady]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 const intro=useRef<HTMLDivElement>(null);
 const entrance=useRef<gsap.core.Timeline|null>(null);
 const finish=()=>{setCount(99);setReady(true);};

 // Loader -> hero entrance. Start states are applied by JS underneath the loader, never in CSS.
 useGSAP(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
  const start=performance.now();let frame=0;
  const tick=(now:number)=>{const t=Math.min((now-start)/1750,1);setCount(Math.floor(99*(1-Math.pow(1-t,3))));if(t<1)frame=requestAnimationFrame(tick);};
  frame=requestAnimationFrame(tick);
  const twoColumn=window.matchMedia(TWO_COLUMN_HERO).matches;
  const tl=gsap.timeline({delay:1.78,onComplete:finish});
  entrance.current=tl;
  tl.to('.loader-medallion',{scale:1.16,autoAlpha:0,rotation:7,duration:.5,ease:'power2.in'},0)
    .to('.intro-wordmark,.intro-caption,.intro-sub,.intro-counter,.intro-bottom,.loader-progress',{autoAlpha:0,y:-22,duration:.36},0)
    .addLabel('lift',.24)
    .to(intro.current,{yPercent:-101,duration:.9,ease:'power4.inOut'},'lift')
    // the blue paint sweeps in from the right on wide layouts and rises as a band when stacked
    .fromTo('.hero-blue',twoColumn?{x:()=>window.innerWidth*.45,autoAlpha:0}:{scaleY:0,transformOrigin:'50% 100%'},
      twoColumn?{x:0,autoAlpha:1,duration:1.15,ease:'power4.out'}:{scaleY:1,duration:1,ease:'power4.inOut'},'lift+=.2')
    .fromTo('.ydc-headline-line>span',{yPercent:112,rotation:4},{yPercent:0,rotation:0,transformOrigin:'0% 100%',duration:1,ease:'power4.out',stagger:.09},'lift+=.3')
    .fromTo('.site-header',{autoAlpha:0,y:-16},{autoAlpha:1,y:0,duration:.6,ease:'power3.out'},'lift+=.6')
    .fromTo('.ydc-actions>*',{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.6,stagger:.1,ease:'power3.out'},'lift+=.8')
    // the cup drops in, lands with a squash, and the beans scatter on impact
    .fromTo('.hero-cup',{yPercent:-125,rotation:-9,autoAlpha:0},{yPercent:0,rotation:0,autoAlpha:1,duration:.7,ease:'power3.in'},'lift+=.4')
    .addLabel('impact')
    .to('.hero-cup',{keyframes:[{scaleY:.93,scaleX:1.05,duration:.12,ease:'power1.out'},{scaleY:1,scaleX:1,duration:.75,ease:'elastic.out(1.1,.4)'}],transformOrigin:'50% 100%'},'impact')
    .fromTo('.hero-beans',{scale:0,rotation:i=>i?70:-70,autoAlpha:0},{scale:1,rotation:0,autoAlpha:1,duration:.7,ease:'back.out(2.4)',stagger:.08},'impact')
    // the doodles draw themselves on
    .fromTo('.ydc-doodle path',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:.6,ease:'power2.inOut',stagger:.15},'impact+=.15')
    .fromTo('.ydc-side-note>span',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.28,stagger:.14,ease:'none'},'impact+=.3')
    .fromTo('.ydc-side-note path',{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:.5,ease:'power2.out'},'>-.05');
  return ()=>cancelAnimationFrame(frame);
 },{scope:root});

 const skipIntro=()=>{const tl=entrance.current;if(!tl){finish();return;}tl.delay(0);tl.play('lift');setCount(99);};

 // Scroll-driven effects: transforms, opacity and clip-path only, with lighter variants below lg.
 useGSAP(()=>{
  const el=root.current!;
  const mm=gsap.matchMedia();
  mm.add(MOTION_CONDITIONS,ctx=>{
   const {desktop,motion}=ctx.conditions as MotionConditions;
   if(!motion)return;
   const scrub=(trigger:string,start='top bottom',end='bottom top')=>({trigger,start,end,scrub:true});

   // Hero: the layers drift apart as you scroll away
   gsap.timeline({scrollTrigger:scrub('.ydc-hero','top top')})
     .to('.hero-cup-img',{yPercent:desktop?-12:-5,rotation:desktop?4:2,ease:'none'},0)
     .to('.hero-blue',{yPercent:desktop?8:5,ease:'none'},0)
     .to('.hero-beans-left',{yPercent:desktop?-45:-20,xPercent:-10,ease:'none'},0)
     .to('.hero-beans-right',{yPercent:desktop?-70:-30,xPercent:12,ease:'none'},0)
     .to('.ydc-doodle,.ydc-side-note',{yPercent:-40,ease:'none'},0);

   // Ticker: scroll drives the marquee and scroll speed makes it lean
   const track=el.querySelector('.marquee-track');
   const lean=gsap.quickTo(track,'skewX',{duration:.35,ease:'power3'});
   const settle=gsap.delayedCall(.12,()=>lean(0)).pause();
   gsap.fromTo(track,{xPercent:-5},{xPercent:-35,ease:'none',scrollTrigger:{...scrub('.ticker'),
     onUpdate:self=>{lean(gsap.utils.clamp(-12,12,self.getVelocity()/-150));settle.restart(true);}}});

   revealHeadings(el,desktop);
   liftIn('.coffee-section .section-number,.section-heading p,.feature-copy p,.home-cta-stack,.story-top>span,.story-bottom p,.character-words .section-number,.character-words p,.visit-copy .section-number,.visit-copy p,.visit-note');

   // Editorial: the photo opens from an inset frame and drifts; the blue card wipes upward
   gsap.fromTo('.feature-image',{clipPath:'inset(12% 8% 12% 8%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'power2.out',scrollTrigger:scrub('.feature-image','top 95%','top 40%')});
   gsap.fromTo('.feature-image img',{scale:1.22,yPercent:-5},{scale:1.04,yPercent:5,ease:'none',scrollTrigger:scrub('.feature-image')});
   gsap.fromTo('.feature-copy',{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.1,ease:'power4.inOut',scrollTrigger:{trigger:'.feature-copy',start:'top 85%',once:true}});
   gsap.to('.asterisk',{rotation:240,ease:'none',scrollTrigger:scrub('.editorial-grid')});

   // Ritual strip: phrases slide in from alternating sides and the arrow drops in
   gsap.from('.ritual-strip>span',{xPercent:i=>i%2?24:-24,autoAlpha:0,duration:.8,ease:'power3.out',stagger:.08,scrollTrigger:{trigger:'.ritual-strip',start:'top 92%',once:true}});
   gsap.from('.ritual-strip a',{y:-40,autoAlpha:0,duration:.9,ease:'bounce.out',scrollTrigger:{trigger:'.ritual-strip',start:'top 92%',once:true}});

   // Story: the lines slide in from opposite sides and BETTER fills with cream as you read
   const storyLines=el.querySelectorAll('.story-title .reveal-line');
   gsap.fromTo(storyLines[0],{xPercent:desktop?-12:-6},{xPercent:0,ease:'none',scrollTrigger:scrub('.story-section','top bottom','center center')});
   gsap.fromTo(storyLines[1],{xPercent:desktop?12:6},{xPercent:0,ease:'none',scrollTrigger:scrub('.story-section','top bottom','center center')});
   gsap.to('.story-fill',{clipPath:'inset(0 0% 0 0)',ease:'none',scrollTrigger:scrub('.story-title','top 70%','bottom 30%')});
   gsap.fromTo('.story-stamp',{rotation:-60,scale:.5,autoAlpha:0},{rotation:-11,scale:1,autoAlpha:1,duration:.9,ease:'back.out(2.2)',scrollTrigger:{trigger:'.story-stamp',start:'top 95%',once:true}});

   // Character: he springs in, then tilts his head as you scroll past
   gsap.fromTo('.character-face',{scale:.55,rotation:-35,autoAlpha:0},{scale:1,rotation:-7,autoAlpha:1,duration:1.4,ease:'elastic.out(1,.55)',scrollTrigger:{trigger:'.character-inner',start:'top 75%',once:true}});
   gsap.fromTo('.character-face img',{rotation:-6},{rotation:8,yPercent:-4,ease:'none',scrollTrigger:scrub('.character-break')});
   gsap.to('.character-spark',{rotation:300,ease:'none',scrollTrigger:scrub('.character-break')});

   // Visit: the YDC circle rolls in from the right edge
   gsap.fromTo('.visit-art',{xPercent:desktop?40:30,rotation:-120},{xPercent:0,rotation:-14,ease:'none',scrollTrigger:scrub('.visit-section','top bottom',desktop?'center 60%':'top 20%')});
   gsap.from('.visit-copy .primary-button',{scale:.7,autoAlpha:0,duration:.7,ease:'back.out(2.2)',scrollTrigger:{trigger:'.visit-copy .primary-button',start:'top 95%',once:true}});
  });
  return refreshWhenSettled();
 },{scope:root});

 return <div ref={root}>
  {!ready && <div className="intro mascot-intro" ref={intro} role="status" aria-label="YDC Coffee website introduction">
    <div className="loader-topline"><span>YDC COFFEE</span><span>GOOD THINGS TAKE A MOMENT</span></div>
    <div className="intro-inner">
      <span className="intro-caption">SOMETHING GOOD IS BREWING</span>
      <div className="loader-medallion" aria-hidden="true"><Image src="/images/ydc-mascot-clean.png" alt="" width={1284} height={1225} sizes="(min-width: 768px) 336px, 64vw" priority className="loader-mascot"/><span className="loader-orbit loader-orbit-one">✳</span><span className="loader-orbit loader-orbit-two">✦</span></div>
      <div className="intro-wordmark">YDC<span>.</span></div>
      <span className="intro-sub">GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span>
    </div>
    <div className="loader-progress"><span style={{transform:`scaleX(${count/99})`}}/></div>
    <div className="intro-counter" aria-hidden="true">{String(count).padStart(2,'0')}<span> / 99</span></div>
    <div className="intro-bottom">A LITTLE CUP OF HAPPY <span>↗</span></div>
    <button type="button" className="intro-skip" onClick={skipIntro} aria-label="Skip introduction">SKIP INTRO <ArrowRight size={15} aria-hidden="true"/></button>
  </div>}
  <main>
   <Hero interactive={ready}/>
   <div className="ticker" aria-hidden="true"><div className="marquee-track">{[...marqueeWords,...marqueeWords,...marqueeWords].map((word,i)=><span key={i}>{word}<span className="ticker-star">✳</span></span>)}</div></div>
   <section id="coffee" className="coffee-section" aria-labelledby="coffee-title">
     <div className="container">
       <div className="section-heading"><span className="section-number">02 / SIGNATURES</span><RevealLines id="coffee-title" lines={['THE GOOD',<em key="s">STUFF.</em>]}/><p>Our signature line-up deserves more than a plain list. So we’re giving the headliners the full YDC treatment.</p></div>
       <div className="editorial-grid">
         <figure className="feature-image"><Image src="/images/coffee-reference.jpg" alt="YDC cappuccino in its signature illustrated takeaway cup" fill sizes="(min-width: 768px) 55vw, 100vw"/><figcaption className="photo-label">01 / A CUP WITH CHARACTER</figcaption></figure>
         <div className="feature-copy"><span className="asterisk" aria-hidden="true">✳</span><RevealLines as="h3" lines={['SIGNATURES,','MADE','PREMIUM.']}/><p>Featured drinks get the visual spotlight on the homepage, while the full menu stays clean and easy to scan.</p><div className="home-cta-stack"><Link href="/menu" className="outline-button">VIEW FULL MENU <ArrowRight size={20} aria-hidden="true"/></Link><a href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer" className="outline-button">SEE WHAT’S BREWING <ArrowUpRight size={20} aria-hidden="true"/></a></div></div>
       </div>
     </div>
     <SignatureRail/>
     <div className="container"><div className="ritual-strip"><span>HOT OR ICED.</span><span>THE GOOD PART OF YOUR DAY.</span><span>MADE TO BE ENJOYED.</span><Link href="/menu" aria-label="View the full menu"><ArrowDown size={24} aria-hidden="true"/></Link></div></div>
   </section>
   <section id="story" className="story-section" aria-labelledby="story-title">
     <div className="container story-inner">
       <div className="story-top"><span className="section-number">03 / THE FEELING</span><span>MORE THAN YOUR DAILY CAFFEINE FIX.</span></div>
       <h2 className="story-title reveal-lines" id="story-title"><span className="reveal-line"><span className="reveal-line-inner">GOOD COFFEE.</span></span><span className="reveal-line"><span className="reveal-line-inner"><span className="story-outline">BETTER<span className="story-fill" aria-hidden="true">BETTER</span></span> DAYS.</span></span></h2>
       <div className="story-bottom"><p>A little character. A lot of heart. Coffee feels better when it comes with good company.</p><div className="story-stamp">YDC <span>♥</span> PEOPLE</div></div>
     </div>
   </section>
   <section className="character-break" aria-labelledby="character-title">
     <div className="container character-inner">
       <div className="character-face"><Image src="/images/ydc-mascot-clean.png" width={1284} height={1225} sizes="(min-width: 768px) 38vw, 72vw" alt="Illustrated YDC character wearing the signature cobalt blue cap"/></div>
       <div className="character-words"><span className="section-number">THAT’S OUR GUY.</span><RevealLines id="character-title" lines={['THE FACE','BEHIND THE',<em key="g">GOOD DAYS.</em>]}/><p>A little mischievous. A lot of heart. You’ll know us when you see us.</p></div>
       <span className="character-spark" aria-hidden="true">✳</span>
     </div>
   </section>
   <section id="visit" className="visit-section" aria-labelledby="visit-title">
     <div className="container visit-inner">
       <div className="visit-copy"><span className="section-number">04 / COME THROUGH</span><RevealLines id="visit-title" lines={['DON’T BE',<em key="a">A STRANGER.</em>]}/><p>We’d rather say hello over coffee.</p><a className="primary-button" href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer">FIND US ON INSTAGRAM <Instagram size={18} aria-hidden="true"/></a><span className="visit-note"><MapPin size={16} aria-hidden="true"/> Check Instagram for current café details and hours.</span></div>
       <div className="visit-art" aria-hidden="true"><div className="visit-circle">YDC<span>.</span></div><div className="visit-bean">✳</div></div>
     </div>
   </section>
  </main>
  <footer className="footer"><div className="container footer-inner"><Link href="/" className="footer-logo">YDC.</Link><span>GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span><a href="https://www.instagram.com/ydccoffee/" rel="noreferrer" target="_blank">INSTAGRAM ↗</a></div></footer>
 </div>;
}
