import Catalog from "../Catalog/Catalog";
import CartPopup from "../CartPopup/CartPopup";
import "./style.css";

function App() {
  return (
    <>
      <header>
        <h2 className="siteName" style={{ margin: 0, color: "black" }}>
          <span className="vegetable">Vegetable</span>
          <span className="shop">Shop</span>
        </h2>
        <div className="cart-info">
          <CartPopup />
        </div>
      </header>
      <Catalog />
    </>
  );
}

export default App;
