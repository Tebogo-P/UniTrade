import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, getCartTotals, clearCart } from '../utils/cart';
import './Shop.css';

const CAMPUSES = [
  'Cape Town Campus',
  'Bellville Campus',
  'District Six Campus',
  'Mowbray Campus',
  'Wellington Campus',
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card (Simulated)', hint: 'Visa, Mastercard' },
  { id: 'eft', label: 'EFT (Simulated)', hint: 'Instant bank transfer' },
  { id: 'cash', label: 'Cash on Collection', hint: 'Pay when you meet' },
];

export default function Checkout() {
  const [items, setItems] = useState(null);
  const [campus, setCampus] = useState(CAMPUSES[0]);
  const [meetupTime, setMeetupTime] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (items === null) {
    return null;
  }

  if (order) {
    return (
      <div className="shop-page">
        <div className="order-success">
          <div className="order-success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
          <h1>Order placed!</h1>
          <p>Your order has been confirmed. This is a simulated payment &mdash; no real funds were moved.</p>
          <div className="order-number">{order.number}</div>
          <div className="order-success-actions">
            <Link to="/order-details" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
              View Order
            </Link>
            <Link to="/" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shop-page">
        <div className="shop-empty">
          <div className="shop-empty-icon">🧾</div>
          <h2>There's nothing to check out</h2>
          <p>Add a listing to your cart before starting checkout.</p>
          <Link to="/" className="link-accent">
            Continue browsing &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const { subtotal, serviceFee, total } = getCartTotals(items);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!meetupTime) {
      setError('Please choose a preferred meetup time.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      setError('Please fill in your card details, or choose another payment method.');
      return;
    }

    setPlacing(true);
    // NOTE: there is no order-placement endpoint on the backend yet, so this
    // is simulated locally, matching the project's "simulated payment
    // workflow" scope. Swap this for a POST /api/orders call once available.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const orderNumber = `UT-${Date.now().toString().slice(-8)}`;
    setOrder({ number: orderNumber, campus, meetupTime, paymentMethod, total });
    clearCart();
    setPlacing(false);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Checkout</h1>
        <p>Confirm your order details and arrange a safe on-campus handover.</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form className="shop-layout" onSubmit={handlePlaceOrder}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="shop-card">
            <h2>Meetup Details</h2>
            <div className="form-group">
              <label>Campus</label>
              <select value={campus} onChange={(e) => setCampus(e.target.value)}>
                {CAMPUSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Preferred meetup time <span className="hint">(date &amp; time)</span>
              </label>
              <input
                type="datetime-local"
                value={meetupTime}
                onChange={(e) => setMeetupTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Note to seller <span className="hint">(optional)</span>
              </label>
              <textarea
                placeholder="e.g. I'll meet you outside the library at 2pm"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="shop-card">
            <h2>Payment Method</h2>
            <div className="payment-options">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`payment-option${paymentMethod === method.id ? ' selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span className="payment-option-label">
                    <strong>{method.label}</strong>
                    <span>{method.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="shop-card">
          <h2>Order Summary</h2>
          <div className="checkout-summary-items">
            {items.map((item) => (
              <div className="checkout-summary-item" key={item.id}>
                <span>{item.title}</span>
                <span className="qty">&times;{item.quantity}</span>
              </div>
            ))}
          </div>
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
            <button type="submit" className="btn-primary" disabled={placing}>
              {placing ? 'Placing Order...' : `Place Order — R${total.toFixed(2)}`}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/cart')}>
              Back to Cart
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
