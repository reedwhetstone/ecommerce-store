/** @format */

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div>
        {cartItems.map((cartItem) => (
          <CheckoutItem className="" key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </div>
  );
};

export default Checkout;
