import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "react-use-cart";
import s from './cartList.module.css'
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineRight,
} from "react-icons/ai";

const CartItem = ({ product, productPrice }) => {
  const { updateItemQuantity } = useCart();

  return (
    <div
      className={s.cartItem}
    >
      <div className={s.cartItemLeft}>
        <div className={s.cartItemImg}>
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className={s.cartItemInfo}>
          <p className={s.cartItemInfo_name}>
            {product.name}
          </p>
          <NavLink
            to={`/products/${product.id}`}
            className={s.cartItemInfo_link}
            onClick={() => scrollTo({ top: 0 })}
          >
            Посмотреть товар
            <AiOutlineRight size={16} />
          </NavLink>
        </div>
      </div>
      <div className={s.cartItemRight}>
        <div className={s.productItemQuantity}>
          <button
            onClick={() =>
              updateItemQuantity(product.id, product.quantity - 1)
            }
          >
            <AiFillMinusCircle size={22} color={'#fff'} />
          </button>
          <span  
          >
            {product.quantity}
          </span>
          <button
            onClick={() =>
              updateItemQuantity(product.id, product.quantity + 1)
            }
          >
            <AiFillPlusCircle size={22} color={'#fff'} />
          </button>
        </div>
        <p className={s.productItemPrice}>
          ${productPrice} USD Сумма
        </p>
      </div>
    </div>
  );
};

export default CartItem;