'use client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {MOTION_CONDITIONS, type MotionConditions, revealHeadings, refreshWhenSettled} from './motion';

// Scroll effects for the server-rendered menu page. Renders nothing; everything reverts on unmount.
export default function MenuMotion(){
  useGSAP(()=>{
    const page=document.querySelector<HTMLElement>('.menu-page');
    if(!page)return;
    const mm=gsap.matchMedia();
    mm.add(MOTION_CONDITIONS,ctx=>{
      const {desktop,motion}=ctx.conditions as MotionConditions;
      if(!motion)return;
      revealHeadings(page,desktop,'top 95%');
      // hero shots fan in like cards being dealt
      gsap.from('.menu-hero-shot',{y:60,rotation:i=>[-9,4,10][i]??0,autoAlpha:0,duration:.9,ease:'back.out(1.5)',stagger:.1,delay:.2});
      gsap.from('.menu-hero-pills span',{scale:.8,autoAlpha:0,duration:.5,ease:'back.out(2)',stagger:.06,delay:.45});
      // cards, then the rows inside each table, stagger in as they arrive
      const stagger=(selector:string,from:gsap.TweenVars,each:number)=>{
        const els=gsap.utils.toArray<HTMLElement>(selector);
        gsap.set(els,from);
        ScrollTrigger.batch(els,{start:'top 94%',once:true,onEnter:batch=>gsap.to(batch,{autoAlpha:1,x:0,y:0,duration:.6,ease:'power3.out',stagger:each,overwrite:true})});
      };
      stagger('.signature-mini-card,.menu-category-card',{autoAlpha:0,y:40},.08);
      stagger('.menu-table tbody tr',{autoAlpha:0,x:desktop?-18:0,y:desktop?0:12},.035);
      gsap.from('.addons-list span',{scale:.6,autoAlpha:0,duration:.5,ease:'back.out(2.4)',stagger:.06,scrollTrigger:{trigger:'.menu-addons',start:'top 85%',once:true}});
    });
    return refreshWhenSettled();
  });
  return null;
}
