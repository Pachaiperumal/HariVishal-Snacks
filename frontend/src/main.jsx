import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ShoppingCart, Menu, X, Phone, Mail, MessageCircle, Plus, Minus, Trash2, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import './style.css'

const products = [
  { id: 1, name: 'Mixer', emoji: '🥜', image: 'https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture9.jpg?v=3', alt: 'Mixer', weights: ['250g', '500g', '1kg'], description: 'A crunchy, spicy South Indian snack blend.' },
  { id: 2, name: 'Omapodi', emoji: '🍜', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/10/sev-recipe-omapodi-karapusa.jpg?v=4', description: 'Thin, crispy and delicious traditional sev.' },
  { id: 3, name: 'Murukku', emoji: '🥨', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/butter-murukku-recipe.jpg?v=2', description: 'Classic spiral-shaped crunchy snack.' },
  { id: 4, name: 'Mani Kara Boondhi', emoji: '🟠', image: 'https://www.sharmispassions.com/wp-content/uploads/2012/11/kara-boondi4.jpg?v=2', description: 'Tiny, crunchy and perfectly spiced boondhi.' },
  { id: 5, name: 'Ola Pakoda', emoji: '🌶️', image: 'https://www.sharmispassions.com/wp-content/uploads/2022/10/ribbon-pakoda5.jpg?v=2', description: 'Crispy, spicy and full of traditional flavour.' },
]

const prices = { '250g': 90, '500g': 180, '1kg': 360 }
const paymentUpiId = 'kingvishalpachai@oksbi'
const upiApps = [
  { id: 'gpay', label: 'Google Pay', icon: 'G', packageName: 'com.google.android.apps.nbu.paisa.user' },
  { id: 'phonepe', label: 'PhonePe', icon: 'पे', packageName: 'com.phonepe.app' },
  { id: 'paytm', label: 'Paytm', icon: 'P', packageName: 'net.one97.paytm' },
  { id: 'supermoney', label: 'Super Money', icon: 'S', scheme: 'supermoney' },
  { id: 'other', label: 'Others', icon: '+', chooser: true },
]

function App() {
  const [cart, setCart] = useState([])
  const [selectedWeight, setSelectedWeight] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiApp, setUpiApp] = useState('other')

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const paymentLink = `upi://pay?pa=${paymentUpiId}&pn=Hari%20Vishal%20Snacks&am=${total}&cu=INR`
  const upiChooserLink = `intent://pay?${paymentLink.split('?')[1]}#Intent;scheme=upi;end`
  const selectedUpiApp = upiApps.find(app => app.id === upiApp)
  const selectedPaymentLink = selectedUpiApp.chooser
    ? `intent://pay?${paymentLink.split('?')[1]}#Intent;scheme=upi;end`
    : selectedUpiApp.packageName
      ? `intent://pay?${paymentLink.split('?')[1]}#Intent;scheme=upi;package=${selectedUpiApp.packageName};end`
      : `${selectedUpiApp.scheme}://upi/pay?${paymentLink.split('?')[1]}`
  const paymentQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(selectedPaymentLink)}`

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

          <div className="snack-showcase" aria-label="Traditional South Indian snacks">
            <img className="hero-snack-photo" src="https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture9.jpg?v=5" alt="Traditional South Indian snacks" />
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
                    <img className="product-photo" src={product.image} alt={product.alt || product.name} />
                    <span className="fresh-tag">Fresh Snack</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="weight-options">
                      {(product.weights || Object.keys(prices)).map(w => (
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
            <img className="about-photo" src="https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture9.jpg?v=4" alt="Traditional South Indian snacks" />
            <div className="taste-card"><b>Made for Snack Lovers</b><span>Fresh • Crunchy • Spicy</span></div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">ABOUT HARI VISHAL SNACKS</span>
            <h2>Traditional Flavour, Made With Love.</h2>
            <p>Hari Vishal Snacks brings together the comfort of traditional South Indian recipes and a clean, modern snacking experience.</p>
            <p>From crunchy mixer and omapodi to murukku and spicy kara boondhi, our focus is simple: delicious snacks with authentic taste and premium quality.</p>
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
            <p>Have a question or want to order fresh snacks? Contact us directly.</p>
            <a className="contact-action" href="tel:+919080414539"><Phone size={20}/> Call us</a>
            <a className="contact-action" href="https://wa.me/919080414539" target="_blank" rel="noreferrer"><MessageCircle size={20}/> WhatsApp us</a>
            <a className="contact-action" href="mailto:pachaiperumal591813@gmail.com"><Mail size={20}/> Email us</a>
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
              <label className="payment-label" htmlFor="payment-method">Payment method</label>
              <select id="payment-method" value={paymentMethod} onChange={event => setPaymentMethod(event.target.value)}>
                <option value="upi">UPI / QR scan (any app)</option>
                <option value="cod">Cash on delivery</option>
              </select>
              {paymentMethod === 'upi' && (
                <div className="payment-qr">
                  <img src={paymentQrUrl} alt={`Scan to pay ₹${total} using UPI`} />
                  <b>Scan to pay ₹{total}</b>
                  <span>UPI ID: {paymentUpiId}</span>
                  <small className="payment-app-heading">Pay with</small>
                  <div className="upi-app-tiles">
                    {upiApps.map(app => (
                      <button type="button" className={upiApp === app.id ? 'selected' : ''} key={app.id} onClick={() => setUpiApp(app.id)}>
                        <span className={`upi-tile-icon ${app.id}`}>{app.icon}</span>
                        <span>{app.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button className="primary checkout-btn" onClick={() => {
                if (paymentMethod === 'upi') window.location.href = selectedPaymentLink
                else alert(`Order request received for ₹${total}. We will confirm payment details on WhatsApp.`)
              }}>{paymentMethod === 'upi' ? 'Pay with UPI' : paymentMethod === 'cod' ? 'Place COD Order' : 'Place Order'}</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
