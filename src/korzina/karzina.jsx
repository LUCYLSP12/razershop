import React from "react";
import { useCart } from "react-use-cart";
import  CartList from "../components/cartList/CartList";
import s from "./kirzina.module.css"
const CartPage = () => {
  const { items, isEmpty, removeItem } = useCart();
  return (
    <div className="container">
      {isEmpty ? (
        <div className={s.CartPage}>
          <img
            src="src/img/free-icon-remove-from-cart-button-8899428.png"
            alt="cart"
            className={s.cartImg}
          />
          <h2
            className={s.cartTitle}
          >
            В корзине пока нет товаров
          </h2>
        </div>
      ) : (
        <CartList cartProducts={items} removeItem={removeItem} />
      )}
    </div>
  );
};

export default CartPage;