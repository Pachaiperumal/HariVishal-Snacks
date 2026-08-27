import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Plus, Minus, Trash2, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import './style.css'

const products = [
  { id: 1, name: 'Mixture', emoji: '🥜', description: 'A crunchy, spicy South Indian snack blend.' },
  { id: 2, name: 'Omapodi', emoji: '🍜', description: 'Thin, crispy and delicious traditional sev.' },
  { id: 3, name: 'Murukku', emoji: '🥨', description: 'Classic spiral-shaped crunchy snack.' },
  { id: 4, name: 'Mani Kara Boondhi', emoji: '🟠', description: 'Tiny, crunchy and perfectly spiced boondhi.' },
  { id: 5, name: 'Ola Pakoda', emoji: '🌶️', description: 'Crispy, spicy and full of traditional flavour.' },
]

const prices = { '250g': 90, '500g': 180, '1kg': 360 }

function App() {
  const [cart, setCart] = useState([])
  const [selectedWeight, setSelectedWeight] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product) => {
    const weight = selectedWeight[product.id] || '250g'
    const key = `${product.id}-${weight}`
    setCart(current => {
      const existing = current.find(item => item.key === key)
      if (existing) {
        return current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...product, key, weight, price: prices[weight], quantity: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (key, delta) => {
    setCart(current => current
      .map(item => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0)
    )
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo('home')}>
          <span className="brand-mark">HVS</span>
          <span><b>Hari Vishal</b><small>SNACKS</small></span>
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <button onClick={() => scrollTo('home')}>Home</button>
          <button onClick={() => scrollTo('products')}>Products</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <span className="cart-count">{cartCount}</span>
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="intro">
          <div className="intro-copy">
            <div className="eyebrow"><Sparkles size={16} /> TRADITIONAL SOUTH INDIAN SNACKS</div>
            <h1>Hari Vishal<br/><span>Snacks</span></h1>
            <p>Crunchy, spicy and made with the warmth of traditional taste. Every bite is crafted for true snack lovers.</p>
            <div className="intro-buttons">
              <button className="primary" onClick={() => scrollTo('products')}>Shop Snacks <ArrowRight size={18}/></button>
              <button className="secondary" onClick={() => scrollTo('about')}>Our Story</button>
            </div>
          </div>

          <div className="snack-showcase" aria-label="Snack display">
            <div className="floating snack a">🥨<span>Murukku</span></div>
            <div className="floating snack b">🥜<span>Mixture</span></div>
            <div className="center-bowl">🧺<div><b>Freshly Made</b><small>Premium Quality</small></div></div>
            <div className="floating snack c">🍜<span>Omapodi</span></div>
            <div className="floating snack d">🌶️<span>Pakoda</span></div>
          </div>
        </section>

        <section className="features">
          <div><Sparkles/><span><b>Traditional Taste</b><small>Authentic recipes</small></span></div>
          <div><ShieldCheck/><span><b>Quality Focused</b><small>Clean & hygienic</small></span></div>
          <div><Truck/><span><b>Fresh Packing</b><small>Made for crunch</small></span></div>
        </section>

        <section className="crunch-ritual" aria-label="Hari Vishal snack promise">
          <div className="ritual-label"><span className="pulse-dot" /> CRUNCH RITUAL</div>
          <div className="ritual-track">
            <span>Roast</span><i>✦</i><span>Season</span><i>✦</i><span>Pack</span><i>✦</i>
            <span>Roast</span><i>✦</i><span>Season</span><i>✦</i><span>Pack</span><i>✦</i>
          </div>
          <strong>Every batch starts with a little extra care.</strong>
        </section>

        <section id="products" className="section">
          <div className="section-head">
            <div><span className="eyebrow">OUR COLLECTION</span><h2>Pick Your Favourite Snack</h2></div>
            <p>Choose your preferred quantity. All products use the same simple pricing.</p>
          </div>

          <div className="product-grid">
            {products.map((product, index) => {
              const weight = selectedWeight[product.id] || '250g'
              return (
                <article className="product-card" key={product.id}>
                  <div className={`product-image p${index + 1}`}>
                    <span className="product-emoji">{product.emoji}</span>
                    <span className="fresh-tag">Fresh Snack</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="weight-options">
                      {Object.keys(prices).map(w => (
                        <button
                          key={w}
                          className={weight === w ? 'active' : ''}
                          onClick={() => setSelectedWeight({ ...selectedWeight, [product.id]: w })}
                        >{w}</button>
                      ))}
                    </div>
                    <div className="card-bottom">
                      <div><small>Price</small><strong>₹{prices[weight]}</strong></div>
                      <button onClick={() => addToCart(product)}>Add to Cart <Plus size={17}/></button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="about" className="about">
          <div className="about-visual">
            <div className="big-snack">🌶️</div>
            <div className="taste-card"><b>Made for Snack Lovers</b><span>Fresh • Crunchy • Spicy</span></div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">ABOUT HARI VISHAL SNACKS</span>
            <h2>Traditional Flavour, Made With Love.</h2>
            <p>Hari Vishal Snacks brings together the comfort of traditional South Indian recipes and a clean, modern snacking experience.</p>
            <p>From crunchy mixture and omapodi to murukku and spicy kara boondhi, our focus is simple: delicious snacks with authentic taste and premium quality.</p>
            <div className="stats">
              <div><b>5</b><span>Signature Snacks</span></div>
              <div><b>100%</b><span>Love for Taste</span></div>
              <div><b>3</b><span>Weight Options</span></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="contact-box">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Let's Talk Snacks</h2>
            <p>Have a question or want to know more about Hari Vishal Snacks? Contact us directly.</p>
            <a href="tel:+919080414539"><Phone size={20}/> +91 9080414539</a>
            <a href="mailto:pachaiperumal591813@gmail.com"><Mail size={20}/> pachaiperumal591813@gmail.com</a>
          </div>
          <div className="contact-side">
            <div className="contact-icon"><MapPin size={34}/></div>
            <h3>Fresh South Indian Snacks</h3>
            <p>Simple, tasty and ready to grow into a full online snack store.</p>
            <button className="primary" onClick={() => scrollTo('products')}>Explore Products</button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark">HVS</span><b>Hari Vishal Snacks</b></div>
        <p>Traditional Taste • Freshly Made • Premium Quality</p>
        <small>© 2026 Hari Vishal Snacks. All rights reserved.</small>
      </footer>

      <div className={cartOpen ? 'cart-overlay show' : 'cart-overlay'} onClick={() => setCartOpen(false)} />
      <aside className={cartOpen ? 'cart-drawer open' : 'cart-drawer'}>
        <div className="cart-header">
          <h2>Your Cart <span>{cartCount}</span></h2>
          <button onClick={() => setCartOpen(false)}><X/></button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={48}/><h3>Your cart is empty</h3><p>Add your favourite snacks to get started.</p>
            <button className="primary" onClick={() => { setCartOpen(false); scrollTo('products') }}>Shop Now</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.key}>
                  <div className="cart-emoji">{item.emoji}</div>
                  <div className="cart-meta"><b>{item.name}</b><span>{item.weight} • ₹{item.price}</span></div>
                  <div className="qty">
                    <button onClick={() => changeQty(item.key, -1)}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQty(item.key, 1)}><Plus size={14}/></button>
                  </div>
                  <button className="delete" onClick={() => setCart(current => current.filter(x => x.key !== item.key))}><Trash2 size={17}/></button>
                </div>
              ))}
            </div>
            <div className="checkout">
              <div className="total"><span>Total</span><b>₹{total}</b></div>
              <input placeholder="Enter delivery address" />
              <button className="primary checkout-btn" onClick={() => alert('Basic checkout completed! Online payment can be added later.')}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
