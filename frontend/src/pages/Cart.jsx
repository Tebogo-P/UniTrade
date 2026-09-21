import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateQuantity, removeItem, getCartTotals } from '../utils/cart';
import './Shop.css';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleQuantityChange = (id, delta) => {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    setItems(updateQuantity(id, current.quantity + delta));
  };

  const handleRemove = (id) => {
    setItems(removeItem(id));
  };

  const { subtotal, serviceFee, total } = getCartTotals(items);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Your Cart</h1>
        <p>Review your items before checking out with a fellow CPUT student.</p>
      </div>

      {items.length === 0 ? (
        <div className="shop-empty">
          <div className="shop-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Browse listings from verified CPUT students to find your next textbook, gadget, or deal.</p>
          <Link to="/" className="link-accent">
            Continue browsing &rarr;
          </Link>
        </div>
      ) : (
        <div className="shop-layout">
          <div className="shop-card">
            <h2>{items.length} item{items.length !== 1 ? 's' : ''}</h2>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-thumb" aria-hidden="true">
                    {item.emoji || '🛍️'}
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <div className="cart-item-meta">
                      <span className="tag">{item.category}</span>
                      <span className="tag tag-accent">{item.condition}</span>
                    </div>
                    <div className="cart-item-seller">
                      Sold by {item.seller} &middot; {item.campus}
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                      </svg>
                    </button>
                    <div className="cart-item-price">R{(item.price * item.quantity).toFixed(2)}</div>
                    <div className="qty-stepper">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= 10}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shop-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>R{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Service fee</span>
              <span>R{serviceFee.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>R{total.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="button" className="btn-primary" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Continue Browsing
              </Link>
            </div>

            <div className="shop-note">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>All sellers are verified CPUT students. Arrange a safe, on-campus meetup to complete your trade.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
