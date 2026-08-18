import { useState } from "react";

export default function CreateListing() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        condition: "",
        location: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Listing created:", formData);
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="fw-bold">Create Listing</h1>
                <p className="text-muted">
                    Add a new item to the UniTrade marketplace.
                </p>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-semibold">
                                Listing Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="e.g. Second-hand laptop"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="description"
                                className="form-label fw-semibold"
                            >
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Describe your item..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="category" className="form-label fw-semibold">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="books">Books</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="stationery">Stationery</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="condition" className="form-label fw-semibold">
                                    Condition
                                </label>

                                <select
                                    className="form-select"
                                    id="condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select condition</option>
                                    <option value="new">New</option>
                                    <option value="like-new">Like New</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="used">Used</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="price" className="form-label fw-semibold">
                                    Price (R)
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    placeholder="e.g. 850"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="location" className="form-label fw-semibold">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="e.g. Cape Town Campus"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="form-label fw-semibold">
                                Image URL
                            </label>

                            <input
                                type="url"
                                className="form-control"
                                id="image"
                                name="image"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary px-4">
                            Create Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}