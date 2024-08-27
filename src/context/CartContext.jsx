import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartOwner, setCartOwner] = useState(null);
  const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = {
    token: token,
  };

  useEffect(() => {
    token && getCart();
  }, [token]);

  async function addToCart({ productId }) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(endPoint, { headers });
      setNumOfCartItems(data.numOfCartItems);
      console.log(numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setCartOwner(data.data.cartOwner);
      console.log(cartOwner);

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      setNumOfCartItems(data.numOfCartItems); // Make sure to use the correct key
      setCartDetails(data.data);
      setCartId(data.data._id);

      // Refresh the cart details after removal
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
  async function updateQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        `${endPoint}/${productId}`,
        { count },
        {
          headers,
        }
      );
      setNumOfCartItems(data.numOfCartItems); // Make sure to use the correct key
      setCartDetails(data.data);
      setCartId(data.data._id);

      // Refresh the cart details after removal
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async function getPayment(url, shippingAddress) {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      setCartId(data._id);
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
  async function clearCart() {
    try {
      const { data } = await axios.delete(endPoint, { headers });

      // Check if the message key contains "success"
      if (data.message === "success") {
        // Clear local cart state
        setNumOfCartItems(0);
        setCartDetails(null);
        setCartId(null);
      } else {
        console.error("Failed to clear cart, response message:", data.message);
      }

      return data; // Return the response data
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error; // Rethrow the error so it can be handled in the calling function
    }
  }

  return (
    <CartContext.Provider
      value={{
        removeFromCart,
        updateQuantity,
        numOfCartItems,
        cartDetails,
        addToCart,
        getCart,
        getPayment,
        cartId,
        clearCart,
        cartOwner,
        setCartOwner,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
