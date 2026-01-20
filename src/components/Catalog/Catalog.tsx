import loader from "../../assets/loader.svg";
import AddToCardButton from "../AddToCartButtons/AddToCartButton";
import Counter from "../Counter/Counter";
import { useEffect, useState } from "react";
import "./style.css";
import { fetchProducts, type ProductProps } from "../../reducers/fetchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

function Catalog() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: cards,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [quantityEveryProduct, setQuantityEveryProduct] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantityEveryProduct((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  if (error) {
    console.log("Ошибка: ", error);
    return (
      <>
        <h2 style={{ color: "red", fontSize: "50px" }}>ERROR</h2>
        {error}
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h1>Catalog</h1>
        <div className="cards">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="card" key={item}>
              <img className="picture" src={loader} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Catalog</h1>
      <div className="cards">
        {cards.map((card: ProductProps) => {
          const quantity = quantityEveryProduct[card.id] || 1;
          return (
            <div className="card" key={card.id}>
              <img className="picture" src={card.image} alt={card.name} />
              <div className="nameWeightCounter">
                {card.name.split("-").map((item, index) => (
                  <span
                    key={index}
                    className={index === 0 ? "productName" : "productWeight"}
                  >
                    {item}
                  </span>
                ))}
                <Counter
                  value={quantityEveryProduct[card.id] || 1}
                  onChange={(newValue) =>
                    handleQuantityChange(card.id, newValue)
                  }
                />
              </div>
              <div className="priceAdd">
                <div className="price">$ {card.price}</div>
                <AddToCardButton product={card} quantity={quantity} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Catalog;
