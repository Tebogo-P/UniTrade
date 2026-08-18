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