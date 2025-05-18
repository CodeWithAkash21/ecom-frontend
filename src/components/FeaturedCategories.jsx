import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
      description: "Cutting-edge technology",
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      description: "Trendy styles",
    },
    {
      id: 3,
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
      description: "Comfortable living",
    },
    {
      id: 4,
      name: "Wellness",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
      description: "Health essentials",
    },
  ];

  return (
    <section className="section categories">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
          <Link to="/categories" className="btn btn-outline">
            View All <FiArrowRight />
          </Link>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="category-card"
            >
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;