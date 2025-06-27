import React, { useState } from 'react';
import styles from './ComponentShowcasePage.module.scss';
import { FaShoppingCart, FaTrash, FaPlus } from 'react-icons/fa';

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  price: number;
  preview: React.ReactNode;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ComponentShowcasePage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const components: ComponentItem[] = [
    {
      id: '1',
      name: 'Button',
      description: 'A customizable button with various styles and sizes.',
      price: 0,
      preview: <button className={styles.previewButton}>Click Me</button>,
    },
    {
      id: '2',
      name: 'Card',
      description: 'A responsive card component for content display.',
      price: 0,
      preview: (
        <div className={styles.previewCard}>
          <h3>Card Title</h3>
          <p>Card content goes here.</p>
        </div>
      ),
    },
    {
      id: '3',
      name: 'Input',
      description: 'A styled input field with validation support.',
      price: 0,
      preview: <input className={styles.previewInput} placeholder="Enter text..." />,
    },
  ];

  const addToCart = (component: ComponentItem): void => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((item) => item.id === component.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === component.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: component.id, name: component.name, price: component.price, quantity: 1 }];
    });
    alert(`${component.name} added to cart!`);
  };

  const removeFromCart = (id: string): void => {
    setCart((prevCart: CartItem[]) => prevCart.filter((item) => item.id !== id));
  };

  const toggleCart = (): void => {
    setIsCartOpen((prev: boolean) => !prev);
  };

  const totalPrice: number = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      {/* Sidebar for Cart */}
      <div className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
          <button onClick={toggleCart} className={styles.closeButton}>
            Close
          </button>
        </div>
        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className={styles.cartItem}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Component Showcase</h1>
          <button onClick={toggleCart} className={styles.cartButton}>
            <FaShoppingCart /> Cart ({cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)})
          </button>
        </div>
        <div className={styles.componentList}>
          {components.map((component: ComponentItem) => (
            <div key={component.id} className={styles.componentCard}>
              <div className={styles.preview}>{component.preview}</div>
              <h3>{component.name}</h3>
              <p>{component.description}</p>
              <p className={styles.price}>${component.price.toFixed(2)}</p>
              <button onClick={() => addToCart(component)} className={styles.addButton}>
                <FaPlus /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcasePage;