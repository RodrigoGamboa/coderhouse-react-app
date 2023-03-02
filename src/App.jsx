import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./Pages/ItemDetailContainer";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Checkout";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const ContextCart = createContext("");

const App = () => {
  /*
  const [cart, setCart] = useState({
    value: 10 
  });
  */
  const [cart, setCart] = useState([
    /*{
      id: 'LyMaQIAeLdGItQs61zV2',
      artist: 'jungle'
    }*/
  ]);

  return (
    <ContextCart.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextCart.Provider>
  );
};

export default App;
