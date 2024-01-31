import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContext } from "./store/shopping-cart-context";

function App() {
  //const [shoppingCart, setShoppingCart] = useState<IShopppingCart>();
  return (
    <CartContext.Provider value={shoppingCart}>
      <Header />
      <main>
        <Meals />
      </main>
    </CartContext.Provider>
  );
}

export default App;
