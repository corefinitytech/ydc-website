import type {ElementType, ReactNode} from 'react';

// Display heading split into masked lines. `.reveal-line` clips, `.reveal-line-inner` is what
// the scroll effects slide up. Without JS it renders as a plain multi-line heading.
export default function RevealLines({as:Tag='h2',lines,className,id}:{as?:ElementType;lines:ReactNode[];className?:string;id?:string}){
  return <Tag className={`reveal-lines${className?` ${className}`:''}`} id={id}>
    {lines.map((line,i)=><span className="reveal-line" key={i}><span className="reveal-line-inner">{line}</span></span>)}
  </Tag>;
}
