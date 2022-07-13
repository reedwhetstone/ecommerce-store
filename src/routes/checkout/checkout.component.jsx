/** @format */

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, CheckoutTotal, HeaderBlockEnd } from './checkout.styles';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlockEnd>
          <span>Remove</span>
        </HeaderBlockEnd>
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem className="" key={cartItem.id} cartItem={cartItem} />
      ))}

      <CheckoutTotal>Total: ${cartTotal}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export default Checkout;
