// Local cart store.
//
// There is no /api/items or /api/cart endpoint on the backend yet (only
// /api/auth/register and /api/auth/login exist), so the cart is kept in
// localStorage for now. The shape below mirrors the Item entity
// (za.ac.cput.unitrade.dao.Item) so swapping this out for real API calls
// later should be a drop-in change.

const CART_KEY = 'unitrade_cart';

// Sample CPUT listings used only to seed an empty cart so the page isn't
// blank on first visit. Remove once GET /api/items exists.
const MOCK_ITEMS = [
  {
    id: 'seed-1',
    title: 'Engineering Mathematics 1 (7th Ed.)',
    category: 'Textbooks',
    condition: 'Good',
    price: 350,
    seller: 'Lindiwe M.',
    campus: 'Bellville Campus',
    emoji: '📘',
    quantity: 1,
  },
  {
    id: 'seed-2',
    title: 'TI-84 Plus Graphing Calculator',
    category: 'Electronics',
    condition: 'Like New',
    price: 780,
    seller: 'Sipho N.',
    campus: 'District Six Campus',
    emoji: '🖩',
    quantity: 1,
  },
  {
    id: 'seed-3',
    title: 'CPUT Hoodie (Size M)',
    category: 'Clothing',
    condition: 'New',
    price: 250,
    seller: 'Amahle D.',
    campus: 'Granger Bay Campus',
    emoji: '👕',
    quantity: 1,
  },
];

function read() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw === null) {
      // First visit: seed with sample listings for demo purposes.
      write(MOCK_ITEMS);
      return MOCK_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
}

export function getCart() {
  return read();
}

export function updateQuantity(id, quantity) {
  const items = read().map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) } : item
  );
  return write(items);
}

export function removeItem(id) {
  const items = read().filter((item) => item.id !== id);
  return write(items);
}

export function clearCart() {
  return write([]);
}

export function getCartTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = items.length ? Math.round(subtotal * 0.02 * 100) / 100 : 0;
  const total = Math.round((subtotal + serviceFee) * 100) / 100;
  return { subtotal, serviceFee, total };
}
