import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Navbar, Footer } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
