'use client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger,useGSAP);

// Shared gsap.matchMedia conditions. Every effect lives inside `motion`, so reduced-motion users get static content.
export const MOTION_CONDITIONS={desktop:'(min-width: 1024px)',motion:'(prefers-reduced-motion: no-preference)'};
export type MotionConditions={desktop:boolean;motion:boolean};

// Display headings (RevealLines): each line rises out of its mask, slightly tilted, once.
export function revealHeadings(root:ParentNode,desktop:boolean,start='top 88%'){
  root.querySelectorAll<HTMLElement>('.reveal-lines').forEach(heading=>{
    gsap.from(heading.querySelectorAll('.reveal-line-inner'),{
      yPercent:108,rotation:desktop?3:2,transformOrigin:'0% 100%',duration:1,ease:'power4.out',stagger:.09,
      scrollTrigger:{trigger:heading,start,once:true},
    });
  });
}

// Small supporting copy: a quiet lift, batched so siblings stagger together.
export function liftIn(targets:string){
  const els=gsap.utils.toArray<HTMLElement>(targets);
  if(!els.length)return;
  gsap.set(els,{autoAlpha:0,y:24});
  ScrollTrigger.batch(els,{start:'top 92%',once:true,
    onEnter:batch=>gsap.to(batch,{autoAlpha:1,y:0,duration:.7,ease:'power3.out',stagger:.07,overwrite:true})});
}

// Layout can shift once web fonts and images arrive; re-measure every trigger then.
export function refreshWhenSettled(){
  const refresh=()=>ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  if(document.readyState!=='complete')window.addEventListener('load',refresh,{once:true});
  return ()=>window.removeEventListener('load',refresh);
}
