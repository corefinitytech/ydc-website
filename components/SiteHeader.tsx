'use client';
import {useCallback, useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import {Menu, X, ArrowUpRight} from 'lucide-react';

const links=[
  {href:'/menu',label:'MENU',route:true},
  {href:'#story',label:'OUR STORY'},
  {href:'#visit',label:'FIND US'},
];
const FOCUSABLE='a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function SiteHeader(){
  const [open,setOpen]=useState(false);
  const [mounted,setMounted]=useState(false);
  const panelId=useId();
  const toggleRef=useRef<HTMLButtonElement>(null);
  const panelRef=useRef<HTMLDivElement>(null);
  const close=useCallback((restoreFocus=true)=>{setOpen(false);if(restoreFocus)toggleRef.current?.focus();},[]);

  useEffect(()=>{setMounted(true);},[]);

  // Scroll lock, focus trap, Escape, and auto-close once the desktop nav takes over.
  useEffect(()=>{
    if(!open)return;
    const root=document.documentElement;
    const scrollbar=window.innerWidth-root.clientWidth;
    const prev={overflow:root.style.overflow,paddingRight:root.style.paddingRight};
    root.style.overflow='hidden';
    if(scrollbar>0)root.style.paddingRight=`${scrollbar}px`;
    const panel=panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();close();return;}
      if(e.key!=='Tab'||!panel)return;
      const items=[...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if(!items.length)return;
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    };
    const desktop=window.matchMedia('(min-width: 1024px)');
    const onDesktop=()=>{if(desktop.matches)close(false);};
    document.addEventListener('keydown',onKey);
    desktop.addEventListener('change',onDesktop);
    return ()=>{
      root.style.overflow=prev.overflow;root.style.paddingRight=prev.paddingRight;
      document.removeEventListener('keydown',onKey);desktop.removeEventListener('change',onDesktop);
    };
  },[open,close]);

  return <header className="site-header container">
    <nav className="site-pill-nav" aria-label="Main navigation">
      {links.map(l=>l.route?<Link key={l.href} href={l.href}>{l.label}</Link>:<a key={l.href} href={l.href}>{l.label}</a>)}
    </nav>
    <Link href="/" className="site-logo" aria-label="YDC home">YDC</Link>
    <button ref={toggleRef} type="button" className="site-menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(true)}><Menu size={22} aria-hidden="true"/></button>
    {mounted&&createPortal(
      <div ref={panelRef} id={panelId} className="site-menu" data-open={open} role="dialog" aria-modal="true" aria-label="Site navigation" inert={!open}>
        <div className="site-menu-top">
          <Link href="/" className="site-menu-logo" onClick={()=>close(false)}>YDC<span>.</span></Link>
          <button type="button" className="site-menu-close" aria-label="Close navigation" onClick={()=>close()}><X size={24} aria-hidden="true"/></button>
        </div>
        <nav className="site-menu-links" aria-label="Mobile navigation">
          {links.map((l,i)=>{const inner=<><span className="site-menu-num">0{i+1}</span>{l.label}</>;
            return l.route?<Link key={l.href} href={l.href} onClick={()=>close(false)} style={{'--i':i} as React.CSSProperties}>{inner}</Link>
              :<a key={l.href} href={l.href} onClick={()=>close(false)} style={{'--i':i} as React.CSSProperties}>{inner}</a>;})}
        </nav>
        <div className="site-menu-foot">
          <span>GOOD COFFEE. GOOD PEOPLE. BETTER DAYS.</span>
          <a href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={16} aria-hidden="true"/></a>
        </div>
        <svg className="site-menu-crown" viewBox="0 0 95 88" fill="none" aria-hidden="true"><path d="M13 61 8 18l25 21L47 7l14 33 26-22-11 46-63-3ZM20 75l49 5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>,document.body)}
  </header>;
}
