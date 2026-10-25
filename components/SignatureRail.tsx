'use client';
import {useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {signatureDrinks} from './menu-data';
import {signatureBlur} from './signature-blur';

gsap.registerPlugin(ScrollTrigger,useGSAP);
const total=String(signatureDrinks.length).padStart(2,'0');

// Default (no JS, touch, tablet, reduced motion): a native scroll-snap carousel.
// Desktop with motion allowed: the section pins and vertical scroll drives the track sideways.
export default function SignatureRail(){
  const sectionRef=useRef<HTMLElement>(null);
  const viewportRef=useRef<HTMLDivElement>(null);
  const trackRef=useRef<HTMLDivElement>(null);
  const progressRef=useRef<HTMLSpanElement>(null);
  const currentRef=useRef<HTMLSpanElement>(null);
  useGSAP(()=>{
    const section=sectionRef.current!, viewport=viewportRef.current!, track=trackRef.current!;
    const bar=gsap.quickSetter(progressRef.current,'scaleX');
    const show=(p:number)=>{bar(p);currentRef.current!.textContent=String(Math.min(signatureDrinks.length,Math.floor(p*signatureDrinks.length)+1)).padStart(2,'0');};
    // Native carousel: progress follows the swipe.
    const onScroll=()=>{const max=viewport.scrollWidth-viewport.clientWidth;show(max>0?viewport.scrollLeft/max:0);};
    viewport.addEventListener('scroll',onScroll,{passive:true});
    const mm=gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)',()=>{
      section.classList.add('is-pinned');
      const travel=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
      const tween=gsap.to(track,{x:()=>-travel(),ease:'none',scrollTrigger:{
        trigger:section,start:'top top',end:()=>`+=${travel()}`,
        pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1,onUpdate:self=>show(self.progress),
      }});
      // slides rise in, staggered, as the section arrives
      gsap.from('.signature-slide,.signature-slide-end',{yPercent:18,autoAlpha:0,duration:.9,ease:'power3.out',stagger:.07,scrollTrigger:{trigger:section,start:'top 80%',once:true}});
      return ()=>{section.classList.remove('is-pinned');tween.scrollTrigger?.kill();tween.kill();};
    });
    return ()=>viewport.removeEventListener('scroll',onScroll);
  },{scope:sectionRef});
  return <section className="signatures-pin" ref={sectionRef} aria-label="YDC signature drinks">
    <div className="signatures-stage">
      <div className="signatures-intro container"><span>THE SIGNATURES / {total} PICKS</span><span className="signatures-hint"><span className="hint-pinned">KEEP SCROLLING</span><span className="hint-swipe">SWIPE</span><ArrowRight size={18} aria-hidden="true"/></span></div>
      <div className="signatures-viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="Signature drinks, scroll sideways for more">
        <div className="signatures-track" ref={trackRef}>
          {signatureDrinks.map((drink,i)=>{const file=drink.image.split('/').pop()!.replace('.png','');
            return <article className="signature-slide" key={drink.slug}>
              <div className="signature-slide-photo"><Image src={drink.image} alt={`Concept visualization of ${drink.name} in a YDC branded cup`} fill sizes="(min-width: 1024px) 32vw, (min-width: 768px) 46vw, 80vw" placeholder={signatureBlur[file]?'blur':'empty'} blurDataURL={signatureBlur[file]}/></div>
              <div className="signature-slide-bottom"><div><span className="signature-slide-number">{String(i+1).padStart(2,'0')} / {total}</span><h3>{drink.name}</h3><p>{drink.description}</p></div><div className="signature-slide-price">PKR {drink.priceHot}</div></div>
            </article>;})}
          <div className="signature-slide-end"><span>THE WHOLE LINEUP</span><h3>GOOD THINGS<br/>DON’T END<br/>HERE.</h3><p>More coffee, dessert and breakfast on the full menu.</p><Link href="/menu">EXPLORE FULL MENU <ArrowRight size={22} aria-hidden="true"/></Link></div>
        </div>
      </div>
      <div className="signatures-outro container"><span>YDC / MADE FOR GOOD DAYS</span><span className="signatures-progress" aria-hidden="true"><span ref={progressRef}/></span><span className="signatures-count" aria-hidden="true"><span ref={currentRef}>01</span> — {total}</span></div>
    </div>
  </section>;
}
