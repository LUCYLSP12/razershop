import React from "react";

import { useCart } from "react-use-cart";
import { Button } from "./Button";

import { toast } from "react-toastify";

export const AddRemove = ({ product }) => {
  const { getItem, addItem, removeItem } = useCart();

  const addCart = (product) => {
    toast.success("💵 Продукт добавлен в корзину!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    addItem(product);
  };

  const removeCart = (id) => {
    toast.error("💵 Продукт удален из корзины!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    removeItem(id);
  };

  return !getItem(product.id) ? (
    <Button style={{ margingTop: 10 }} onClick={() => addCart(product)} >
      Добавить в корзину
    </Button>
  ) : (
    <Button
      style={{ margingTop: 10, background: "red" }}
      onClick={() => removeCart(product.id)}
    >
      Удалить из корзины
    </Button>
  );
};
