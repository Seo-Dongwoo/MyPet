import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "./App.css";
import { setUser } from "./redux/modules/actions/userActions";
import Loading from "./components/common/Loading";
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Clothes = lazy(() => import("./pages/products/Clothes"));
const Food = lazy(() => import("./pages/products/Food"));
const Toy = lazy(() => import("./pages/products/Toy"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Order = lazy(() => import("./pages/order/Order"));
const ProductPage = lazy(() => import("./pages/product_page/ProductPage"));
const PrivateRoute = lazy(() => import("./pages/privateRoute/PrivateRoute"));
const OrderCompleted = lazy(() =>
  import("./pages/orderCompleted/OrderCompleted")
);
const ScrollToTop = lazy(() => import("./components/common/ScrollTop"));
const Layout = lazy(() => import("./components/common/Layout"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  });

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/order/:orderParams"
                element={
                  <PrivateRoute>
                    <Order />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orderCompleted/:completedParams"
                element={
                  <PrivateRoute>
                    <OrderCompleted />
                  </PrivateRoute>
                }
              />
              <Route path="/clothes" element={<Clothes />} />
              <Route path="/clothes/:productId" element={<ProductPage />} />
              <Route path="/food" element={<Food />} />
              <Route path="/food/:productId" element={<ProductPage />} />
              <Route path="/toy" element={<Toy />} />
              <Route path="/toy/:productId" element={<ProductPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
