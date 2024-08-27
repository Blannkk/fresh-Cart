import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Brand from "./components/Brand/Brand";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import NotFound from "./components/NotFound/NotFound";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Category from "./components/Category/Category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./components/checkOut/CheckOut";
import MyOrders from "./components/MyOrders/MyOrders";
import WishListContextProvider from "./context/WishListContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetCode from "./components/ResetCode/ResetCode";

function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders/user/:id",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgotPasswords",
          element: <ForgetPassword />,
        },
        {
          path: "verifyCode",
          element: <VerifyCode />,
        },
        {
          path: "resetPassword",
          element: <ResetCode />,
        },
        {
          path: "notFound",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={router} />
          </WishListContextProvider>
          <ToastContainer />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
