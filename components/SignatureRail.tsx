'use client';
import {useEffect,useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {signatureDrinks} from './menu-data';

export default function SignatureRail(){
  const sectionRef=useRef<HTMLElement>(null);
  const viewportRef=useRef<HTMLDivElement>(null);
  const trackRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const section=sectionRef.current, viewport=viewportRef.current, track=trackRef.current;
    if(!section||!viewport||!track)return;
    // On touch devices and reduced-motion browsers keep a native accessible horizontal rail.
    const mm=gsap.matchMedia();
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)',()=>{
      const travel=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
      if(travel()<4)return;
      const tween=gsap.to(track,{x:()=>-travel(),ease:'none',scrollTrigger:{
        trigger:section, start:'top top', end:()=>`+=${travel()}`,
        pin:true, pinSpacing:true, scrub:1, invalidateOnRefresh:true,
        anticipatePin:1
      }});
      const refresh=()=>ScrollTrigger.refresh();
      window.addEventListener('load',refresh,{once:true});
      return ()=>{window.removeEventListener('load',refresh);tween.scrollTrigger?.kill();tween.kill();};
    });
    return ()=>mm.revert();
  },[]);
  return <section className="signatures-pin" ref={sectionRef} aria-label="YDC signature drinks">
    <div className="signatures-stage">
      <div className="signatures-intro"><span>THE SIGNATURES / 08 PICKS</span><div className="signatures-progress-text">VERTICAL SCROLL <ArrowRight size={19}/></div></div>
      <div className="signatures-viewport" ref={viewportRef}>
        <div className="signatures-track" ref={trackRef}>
          {signatureDrinks.map((drink,i)=><article className="signature-slide" key={drink.slug}>
            <div className="signature-slide-photo"><Image src={drink.image} alt={`Concept visualization of ${drink.name} in a YDC branded cup`} fill sizes="(max-width: 768px) 82vw, 40vw"/></div>
            <div className="signature-slide-bottom"><div><span className="signature-slide-number">{String(i+1).padStart(2,'0')} / 08</span><h3>{drink.name}</h3><p>{drink.description}</p></div><div className="signature-slide-price">PKR {drink.priceHot}</div></div>
          </article>)}
          <div className="signature-slide-end"><span>THE WHOLE LINEUP</span><h3>GOOD THINGS<br/>DON’T END<br/>HERE.</h3><p>More coffee, dessert and breakfast on the full menu.</p><Link href="/menu">EXPLORE FULL MENU <ArrowRight size={22}/></Link></div>
        </div>
      </div>
      <div className="signatures-outro"><span>YDC / MADE FOR GOOD DAYS</span><span>01 — 08</span></div>
    </div>
  </section>
}
