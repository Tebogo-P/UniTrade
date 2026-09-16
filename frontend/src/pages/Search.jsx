
const navigationItems = [
  {
    label: 'Home',
    icon: '⌂',
    path: '/',
  },
  {
    label: 'Search',
    icon: '⌕',
    path: '/search',
  },
  {
    label: 'Profile',
    icon: '♙',
    path: '/profile',
  },
  {
    label: 'Cart',
    icon: '🛒',
    path: '/cart',
  },
  {
    label: 'Checkout',
    icon: '▣',
    path: '/checkout',
  },
  {
    label: 'Order Details',
    icon: '▤',
    path: '/order-details',
  },
  {
    label: 'Help & FAQ',
    icon: '?',
    path: '/help',
  },
  {
    label: 'Report Listing',
    icon: '⚑',
    path: '/report-listing',
  },
  {
    label: 'Terms & Privacy',
    icon: '▱',
    path: '/terms',
  },
  {
    label: 'Create Listing',
    icon: '+',
    path: '/create-listing',
  },
  {
    label: 'Messages',
    icon: '✉',
    path: '/messages',
  },
];


function Search() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);


  /* =========================
     FAVORITES
  ========================= */

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };


  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });


  return (
    <div className="search-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="search-sidebar">

        <Link to="/" className="search-brand">
          <div className="search-brand-card">
            <img
              src="/src/assets/logo.png"
              alt="UniTrade"
              className="search-brand-logo"
            />
          </div>
        </Link>


        <nav className="search-navigation">

          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`search-nav-item ${
                item.label === 'Search' ? 'active' : ''
              }`}
              onClick={() => navigate(item.path)}
            >

              <span className="search-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </button>
          ))}

        </nav>


        {/* PROFILE */}

        <button
          className="search-profile"
          onClick={() => navigate('/profile')}
        >

          <div className="search-profile-avatar">
            RS
          </div>

          <div className="search-profile-info">
            <strong>Reo Stock</strong>
            <span>View profile</span>
          </div>

          <span className="search-profile-arrow">
            →
          </span>

        </button>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="search-main">


        {/* TOP BAR */}

        <div className="search-topbar">

          <div className="search-main-input">

            <span className="search-main-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search for textbooks, electronics, clothes..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>


          <button
            className="search-sell-button"
            onClick={() => navigate('/create-listing')}
          >
            <span>+</span>
            Sell
          </button>


          <button
            className="search-notification"
            onClick={() => navigate('/messages')}
            aria-label="Messages"
          >
            ✉
          </button>


          <button
            className="search-user-button"
            onClick={() => navigate('/profile')}
          >

            <div className="search-small-avatar">
              RS
            </div>

            <span>⌄</span>

          </button>

        </div>


        {/* PAGE HEADING */}

        <div className="search-heading">

          <span className="search-eyebrow">
            UNITRADE MARKETPLACE
          </span>

          <h1>
            Find something you need.
          </h1>

          <p>
            Browse products listed by students around you.
          </p>

        </div>


        {/* CATEGORY FILTERS */}

        <div className="category-filters">

          {categories.map((category) => (

            <button
              key={category}
              className={`category-chip ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>


        {/* RESULTS TOOLBAR */}

        <div className="search-toolbar">

          <div className="filter-group">

            <button className="filter-button">

              <span className="filter-icon">
                ☷
              </span>

              Filters

            </button>


            <button className="filter-button">
              Price
              <span>⌄</span>
            </button>


            <button className="filter-button">
              Condition
              <span>⌄</span>
            </button>

          </div>


          <select className="sort-select">

            <option>
              Sort: Recommended
            </option>

            <option>
              Price: Low to High
            </option>

            <option>
              Price: High to Low
            </option>

            <option>
              Newest
            </option>

          </select>

        </div>


        {/* RESULTS */}

        <div className="results-info">

          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> listings
          </span>

        </div>


        {/* PRODUCTS */}

        {filteredProducts.length > 0 ? (

          <div className="search-products">

            {filteredProducts.map((product) => (

              <article
                className="search-product-card"
                key={product.id}
              >

                <div className="search-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />


                  <span className="condition-badge">
                    {product.condition}
                  </span>


                  <button
                    className={`search-favorite ${
                      favorites.includes(product.id)
                        ? 'liked'
                        : ''
                    }`}
                    onClick={() =>
                      toggleFavorite(product.id)
                    }
                    aria-label={
                      favorites.includes(product.id)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >

                    {favorites.includes(product.id)
                      ? '♥'
                      : '♡'}

                  </button>

                </div>


                <div className="search-product-details">

                  <span className="search-seller">
                    {product.seller}
                  </span>

                  <h3>
                    {product.name}
                  </h3>


                  <div className="search-product-bottom">

                    <span className="search-price">
                      {product.price}
                    </span>

                    <span className="search-location">
                      {product.location}
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="search-empty">

            <div className="search-empty-icon">
              ⌕
            </div>

            <h3>
              No listings found
            </h3>

            <p>
              Try searching for something else or choose
              another category.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default Search;
import { useState } from "react";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        console.log("Searching for:", {
            searchTerm,
            category,
        });
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="fw-bold">Search Marketplace</h1>
                <p className="text-muted">
                    Find products and items available on UniTrade.
                </p>
            </div>

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSearch}>
                        <div className="row align-items-end">
                            <div className="col-md-7 mb-3">
                                <label htmlFor="searchTerm" className="form-label fw-semibold">
                                    Search
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchTerm"
                                    placeholder="Search for books, laptops, clothes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label htmlFor="category" className="form-label fw-semibold">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="books">Books</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="stationery">Stationery</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="col-md-2 mb-3">
                                <button type="submit" className="btn btn-primary w-100">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="text-center py-5">
                <h5>No listings found</h5>
                <p className="text-muted">
                    Search for an item to see available listings.
                </p>
            </div>
        </div>
    );
}
