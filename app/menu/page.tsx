import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft, ArrowUpRight} from 'lucide-react';
import {addOns, menuCategories, signatureDrinks} from '@/components/menu-data';


export default function MenuPage(){
  return (
    <main className="menu-page">
      <section className="menu-hero">
        <div className="menu-hero-top">
          <Link href="/" className="menu-back"><ArrowLeft size={18}/> BACK HOME</Link>
          <div className="menu-hero-mark">YDC</div>
          <a href="https://www.instagram.com/ydccoffee/" target="_blank" rel="noreferrer" className="menu-instagram">INSTAGRAM <ArrowUpRight size={16}/></a>
        </div>
        <div className="menu-hero-grid">
          <div className="menu-hero-copy">
            <span className="section-number">FULL MENU / ALL DAY GOODNESS</span>
            <h1>THE MENU.</h1>
            <p>Everything people come back for, organised clearly and presented with the same cream-and-cobalt YDC identity.</p>
            <div className="menu-hero-pills">
              <span>HOT &amp; COLD COFFEE</span>
              <span>SIGNATURE DRINKS</span>
              <span>DESSERTS &amp; BREAKFAST</span>
            </div>
          </div>
          <div className="menu-hero-signatures">
            {signatureDrinks.slice(0,3).map((drink)=> (
              <div key={drink.slug} className="menu-hero-shot">
                <Image src={drink.image} alt={drink.name} fill sizes="(max-width: 900px) 100vw, 22vw"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="menu-signatures-strip">
        <div className="section-heading compact">
          <span className="section-number">YDC SIGNATURES</span>
          <h2>THE ONES<br/><em>YOU REMEMBER.</em></h2>
        </div>
        <div className="signature-mini-grid">
          {signatureDrinks.map((drink)=> (
            <article className="signature-mini-card" key={drink.slug}>
              <div className="signature-mini-meta">
                <h3>{drink.name}</h3>
                <p>{drink.description}</p>
              </div>
              <div className="signature-mini-prices"><span>HOT {drink.priceHot}</span><span>COLD {drink.priceCold}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-categories">
        {menuCategories.map((category)=> (
          <article className="menu-category-card" key={category.slug} id={category.slug}>
            <div className="menu-category-head">
              <div>
                <span className="section-number">{category.slug.replace(/-/g,' ').toUpperCase()}</span>
                <h2>{category.title}</h2>
              </div>
              {category.size && <span className="menu-size">{category.size}</span>}
            </div>
            <div className="menu-table-wrap">
              <table className="menu-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Hot</th>
                    <th>Cold</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item)=> (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td>
                        <div className="menu-item-name">{item.name}</div>
                        {item.note && <div className="menu-item-note">{item.note}</div>}
                      </td>
                      <td>{item.hot ? `PKR ${item.hot}` : '—'}</td>
                      <td>{item.cold ? `PKR ${item.cold}` : '—'}</td>
                      <td>{item.price ? `PKR ${item.price}` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>

      <section className="menu-addons">
        <div className="menu-addons-inner">
          <div>
            <span className="section-number">ADD ONS</span>
            <h2>A LITTLE<br/><em>EXTRA.</em></h2>
          </div>
          <div className="addons-list">
            {addOns.map((item)=> <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>
    </main>
  );
}
