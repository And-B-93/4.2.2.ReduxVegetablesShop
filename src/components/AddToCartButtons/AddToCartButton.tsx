import { Button } from "@mantine/core";
import greenCart from "../../assets/cartGreen.svg";
import "./style.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartSlice";
import type { ProductProps } from "../../reducers/fetchSlice";

interface AddToCartButtonProps {
  product: ProductProps;
  quantity: number;
}

const AddToCartButton = ({ product, quantity }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addToCart({
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 0,
        },
        quantity: quantity,
      }),
    );
  };
  return (
    <Button
      variant="filled"
      color="rgba(155, 222, 155, 1)"
      radius="md"
      onClick={handleClick}
      size="xm"
      fullWidth
    >
      <div className="addToCard">
        <p style={{ color: "green" }}>Add to cart</p>
        <img className="cartGreen" src={greenCart} alt="Cart" />
      </div>
    </Button>
  );
};

export default AddToCartButton;
