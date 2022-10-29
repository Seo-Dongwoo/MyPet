import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Cart, Clothes, Food, Toy } from "./pages";
import { Footer } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/clothes" element={<Clothes />}></Route>
          <Route path="/food" element={<Food />}></Route>
          <Route path="/toy" element={<Toy />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
