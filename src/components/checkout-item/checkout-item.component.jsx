/** @format */

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const { name, quantity, id } = cartItem;
  return (
    <div key={id}>
      <h2>{name}</h2>
      <span>{quantity}</span>
      <br />
      <span onClick={() => removeItemFromCart(cartItem)}>subtract</span>
      <br />
      <span onClick={() => addItemToCart(cartItem)}>add</span>
    </div>
  );
};

export default CheckoutItem;
