import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Space Explorer Drone',
    description: 'A high-tech drone with 4K camera and long-lasting battery.',
    image: 'https://ngogiaquyen.id.vn/assets/uploads/684061636d29a_IMG_8796.jpeg',
  },
  {
    id: 2,
    name: 'Galactic VR Headset',
    description: 'Immersive VR experience for space exploration games.',
    image: 'https://ngogiaquyen.id.vn/assets/uploads/684061636d29a_IMG_8796.jpeg',
  },
  {
    id: 3,
    name: 'Starship Model Kit',
    description: 'Detailed model kit for building your own starship replica.',
    image: 'https://ngogiaquyen.id.vn/assets/uploads/684061636d29a_IMG_8796.jpeg',
  },
  {
    id: 4,
    name: 'Astro Smart Watch',
    description: 'Smart watch with space-themed UI and fitness tracking.',
    image: 'https://ngogiaquyen.id.vn/assets/uploads/684061636d29a_IMG_8796.jpeg',
  },
];

const ProductPage: React.FC = () => {
  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <h1 className={cx('title')}>Space Explorer</h1>
        <nav className={cx('nav')}>
          <Link to="/" className={cx('nav-link')}>Home</Link>
          <Link to="/products" className={cx('nav-link')}>Products</Link>
          <Link to="/contact" className={cx('nav-link')}>Contact</Link>
        </nav>
      </header>

      <main className={cx('main')}>
        <h2 className={cx('section-title')}>Our Products</h2>
        <div className={cx('product-grid')}>
          {products.map((product) => (
            <div key={product.id} className={cx('product-card')}>
              <img src={product.image} alt={product.name} className={cx('product-image')} />
              <div className={cx('product-details')}>
                <h3 className={cx('product-title')}>{product.name}</h3>
                <p className={cx('product-description')}>{product.description}</p>
                <Link to={`/product-detail?id=${product.id}`} className={cx('buy-button')}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={cx('footer')}>
        <p>© 2025 Space IT Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductPage;