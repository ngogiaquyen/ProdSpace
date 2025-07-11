import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import { routes } from '~/config';

const cx = classNames.bind(styles);

interface Product {
  id: number;
  name: string;
  description: string;
  icon: string;
  screenshot: string;
  version: string;
  rating: number;
  reviews: number;
  securityStatus: string;
  license: string;
  latestUpdate: string;
  platform: string;
  os: string;
  language: string;
  downloads: string;
  size: string;
  developer: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Macro Recorder',
    description:
      'Macro Recorder is a free utility tool that helps automate repetitive tasks by recording keyboard and mouse actions. Whether you\'re looking to streamline workflows, simplify software testing, or handle routine system maintenance, it offers an easy way to get things done. However, there’s more to Macro Recorder than just recording. It lets users tweak, edit, and even turn their macros into standalone executable files. With built-in logic commands, it offers more flexibility than a basic recorder. It works similarly to AutoHotkey and Easy Macro Recorder, offering a straightforward approach to automating tasks efficiently.',
    icon: 'https://storage.googleapis.com/a1aa/image/ce0f3589-2b75-415c-036e-e6cc29dd1007.jpg',
    screenshot: 'https://storage.googleapis.com/a1aa/image/c80e8029-6f7e-47e8-ac2c-39747c01901c.jpg',
    version: '5.9.0',
    rating: 3.5,
    reviews: 50,
    securityStatus: 'Safe',
    license: 'Trial version',
    latestUpdate: 'April 2, 2025',
    platform: 'Windows',
    os: 'Windows 98 SE',
    language: 'English',
    downloads: '117.3K',
    size: '2.72 MB',
    developer: 'Jitbit',
  },
  {
    id: 2,
    name: 'Galactic VR Headset',
    description: 'Immersive VR experience for space exploration games.',
    icon: 'https://via.placeholder.com/64x64?text=VR+Icon',
    screenshot: 'https://via.placeholder.com/280x140?text=VR+Screenshot',
    version: '1.0.0',
    rating: 4.0,
    reviews: 30,
    securityStatus: 'Safe',
    license: 'Free',
    latestUpdate: 'March 15, 2025',
    platform: 'Windows',
    os: 'Windows 10',
    language: 'English',
    downloads: '50K',
    size: '10 MB',
    developer: 'SpaceTech',
  },
  {
    id: 3,
    name: 'Starship Model Kit',
    description: 'Detailed model kit for building your own starship replica.',
    icon: 'https://via.placeholder.com/64x64?text=Starship+Icon',
    screenshot: 'https://via.placeholder.com/280x140?text=Starship+Screenshot',
    version: '2.0.0',
    rating: 4.5,
    reviews: 20,
    securityStatus: 'Safe',
    license: 'Free',
    latestUpdate: 'February 10, 2025',
    platform: 'Physical',
    os: 'N/A',
    language: 'English',
    downloads: 'N/A',
    size: 'N/A',
    developer: 'StarshipCo',
  },
  {
    id: 4,
    name: 'Astro Smart Watch',
    description: 'Smart watch with space-themed UI and fitness tracking.',
    icon: 'https://via.placeholder.com/64x64?text=Watch+Icon',
    screenshot: 'https://via.placeholder.com/280x140?text=Watch+Screenshot',
    version: '3.1.0',
    rating: 4.2,
    reviews: 40,
    securityStatus: 'Safe',
    license: 'Free',
    latestUpdate: 'January 20, 2025',
    platform: 'Wearable',
    os: 'WatchOS',
    language: 'English',
    downloads: '80K',
    size: '5 MB',
    developer: 'AstroTech',
  },
];

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const [id, setId] = useState<string | null>(new URLSearchParams(location.search).get('id'));
  const product = products.find((p) => p.id === parseInt(id || '0'));

  useEffect(() => {
    const newId = new URLSearchParams(location.search).get('id');
    setId(newId);
    console.log('Product ID from query:', newId);
  }, [location.search]);

  if (!product) {
    return (
      <div className={cx('container')}>
        <h2 className={cx('not-found')}>Product not found</h2>
        <Link to={routes.home} className={cx('back-link')}>Back to Products</Link>
      </div>
    );
  }

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <Link to={routes.home} className={cx('back-link')}>
          <i className="fas fa-arrow-left"></i> Back
        </Link>
        <nav className={cx('nav')}>
          <Link to="/" className={cx('nav-link')}>Home</Link>
          <Link to="/products" className={cx('nav-link')}>Products</Link>
          <Link to="/contact" className={cx('nav-link')}>Contact</Link>
        </nav>
      </header>

      <main className={cx('main')}>
        <div className={cx('product-detail')}>
          {/* Left content */}
          <div className={cx('left-content')}>
            <div className={cx('product-header')}>
              <img
                src={product.icon}
                alt={`${product.name} icon`}
                className={cx('product-icon')}
                width="64"
                height="64"
              />
              <div>
                <h1 className={cx('product-title')}>
                  <span>{product.name}</span>
                  <span className={cx('platform')}>for {product.platform}</span>
                </h1>
                <div className={cx('meta')}>
                  <span>{product.license}</span>
                  <span>In {product.language}</span>
                  <span>V {product.version}</span>
                </div>
                <div className={cx('rating-security')}>
                  <i className="fas fa-star"></i>
                  <span>{product.rating}</span>
                  <span className={cx('reviews')}>({product.reviews})</span>
                  <i className="fas fa-shield-alt"></i>
                  <span className={cx('security-status')}>{product.securityStatus}</span>
                </div>
              </div>
            </div>
            <nav className={cx('info-nav')}>
              <Link to="#" className={cx('info-nav-link', 'active')}>Information</Link>
              <Link to="#" className={cx('info-nav-link')}>Alternative apps</Link>
              <Link to="#" className={cx('info-nav-link')}>Author's review</Link>
            </nav>
            <article className={cx('article')}>
              <h2>A practical and versatile tool for automation</h2>
              <p>
                <strong>Macro Recorder</strong> is a free{' '}
                <Link to="#" className={cx('link')}>utility</Link> tool that helps{' '}
                <strong>automate repetitive tasks</strong> by recording{' '}
                <strong>
                  <Link to="#" className={cx('link')}>keyboard</Link> and{' '}
                  <Link to="#" className={cx('link')}>mouse</Link>
                </strong>{' '}
                actions. Whether you're looking to streamline workflows, simplify software testing, or handle routine system maintenance, it offers an easy way to get things done.
              </p>
              <p>
                However, there’s more to Macro Recorder than just recording. It lets users{' '}
                <strong>tweak</strong>, <strong>edit</strong>, and even{' '}
                <strong>turn their macros into standalone executable files.</strong> With built-in logic commands, it offers more flexibility than a basic recorder. It works similarly to{' '}
                <Link to="#" className={cx('link')}>AutoHotkey</Link> and{' '}
                <Link to="#" className={cx('link')}>Easy Macro Recorder</Link>, offering a straightforward approach to automating tasks efficiently.
              </p>
              <h3>Feature-rich automation software</h3>
              <p>
                Macro Recorder isn’t just about <strong>recording keystrokes</strong> and{' '}
                <strong>mouse clicks</strong>—it’s packed with features that make automation easier. With this tool, you can <strong>capture movements</strong>,{' '}
                <strong>edit sequences</strong>, and even <strong>insert loops or if-statements</strong> to make macros more dynamic. Whether you need a simple action replay or a more complex workflow, the{' '}
                <strong>built-in macro editor</strong> gives you plenty of control without requiring programming skills.
              </p>
              <p>
                Another standout feature is the ability to turn macros into EXE files. This means you can create automation scripts that run on any{' '}
                <strong>
                  <Link to="#" className={cx('link')}>Windows</Link>-compatible system
                </strong>{' '}
                without the need to install the software.
              </p>
            </article>
          </div>
          {/* Right sidebar */}
          <aside className={cx('sidebar')}>
            <div className={cx('screenshot-container')}>
              <img
                src={product.screenshot}
                alt={`${product.name} screenshot`}
                className={cx('screenshot')}
                width="280"
                height="140"
              />
              <div className={cx('image-counter')}>
                <span>1/1</span>
                <i className="fas fa-image"></i>
              </div>
            </div>
            <div className={cx('specs')}>
              <h3>App specs</h3>
              <dl>
                <div className={cx('spec-item')}>
                  <dt>License</dt>
                  <dd>{product.license}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Version</dt>
                  <dd>
                    <select aria-label="Select version" defaultValue={product.version}>
                      <option>{product.version}</option>
                    </select>
                  </dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Latest update</dt>
                  <dd>{product.latestUpdate}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Platform</dt>
                  <dd>{product.platform}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>OS</dt>
                  <dd>{product.os}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Language</dt>
                  <dd>{product.language}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Downloads</dt>
                  <dd className={cx('downloads')}>
                    <span>{product.downloads}</span>
                    <i className="fas fa-info-circle"></i>
                  </dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Size</dt>
                  <dd>{product.size}</dd>
                </div>
                <div className={cx('spec-item')}>
                  <dt>Developer</dt>
                  <dd>
                    <Link to="#" className={cx('link')}>{product.developer}</Link> |{' '}
                    <Link to="#" className={cx('link')}>More programs (12)</Link>
                  </dd>
                </div>
              </dl>
            </div>
            <button className={cx('contact-button')}>
              <span>Contact Seller</span>
              <span>for {product.platform}</span>
              <i className="fas fa-envelope"></i>
            </button>
          </aside>
        </div>
      </main>

      <footer className={cx('footer')}>
        <p>© 2025 Space IT Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetail;