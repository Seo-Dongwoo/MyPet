import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Cart, Clothes, Food, Toy } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/clothes" element={<Clothes />}></Route>
          <Route path="/food" element={<Food />}></Route>
          <Route path="/toy" element={<Toy />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
