import { AddRemove } from '../UI/button/AddRemove'
  import s from "./index.module.css";
export const ProductItem = ({ product }) => {
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <img src={product.image} alt={product.title} className={s.card_img} />
      </div>
      <div className={s.card_body}>
        <h4>{product.name}</h4>
        <p>{product.price} USD</p>

     <AddRemove product={product}/>
      </div>
    </div>
  );
};
