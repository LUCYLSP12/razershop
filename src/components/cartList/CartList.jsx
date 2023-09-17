import React from "react";

import CartItem from "./CartItem";
import s from "./cartList.module.css";
import { GetContext } from "../../context/Context";
import axios from "axios";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";

const CartList = ({ cartProducts, removeItem }) => {
  const { emptyCart } = useCart();
  const { user } = GetContext();

  const telegramApi = `https://api.telegram.org/bot6671370687:AAGT8lRWHHipw2s_dySspGrLvuMjxUnMJFs/sendMessage?chat_id=-4004252145&text=${encodeURIComponent(
    `<b>Заказ:</b> ${Math.floor(Math.random() * 500) }

<b>Имя: ${user.name}</b>

<b>Email: ${user.email}</b>

    ${cartProducts
      .map((product) => {
        return `

<b>Имя продутка: ${product.name}</b>



<b>Описание продутка: ${product.desc}</b>



<b>Фотка продутка: ${product.image}</b>


<b>Цена $ ${product.price}</b>

      `;
      })
      .join("")}
    `
  )}&parse_mode=html`;

  const sendTelegram = async (cartProducts) => {

    try {
      const { data } = await axios.post(telegramApi);
      toast.success('Ваш заказ был успешно оформлен!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        emptyCart()
    } catch (err) {
      toast.error('Произошла ошибка', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
   
  };

  let totalPrice = 0;
  return (
    <div style={{ width: "100%" }} id="cartProduct">
      {cartProducts.map((product) => {
        let productPrice = product.quantity * product.price;
        totalPrice += productPrice;

        return product.quantity >= 1 ? (
          <CartItem
            product={product}
            productPrice={productPrice}
            key={product.id}
          />
        ) : (
          removeItem(product.id)
        );
      })}
      <div className={s.cartTotalPrice}>
        <h2 className={s.cartTotalTitle}>Итого: ${totalPrice} USD</h2>
        <button
          className={s.btnOrder}
          onClick={() => sendTelegram(cartProducts, totalPrice)}
        >
          Оформить Заказ
        </button>
      </div>
    </div>
  );
};

export default CartList;
