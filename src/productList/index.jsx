import { GetContext } from "..//context/Context";
import { ProductItem } from "../productItem";
import s from "./index.module.css";
export const ProductList = () => {
  const { products } = GetContext();

  return (
    <div className={s.cards}>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
