import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext();
export default function WishListContextProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [wishList, setWishList] = useState(null);

  const endPoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = {
    token: token,
  };

  useEffect(() => {
    token && getUserWishList();
  }, [token]);

  async function addToWishList({ productId }) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      console.log(data);
      setWishList(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
  async function removeFromWishList({ productId }) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      console.log(data);
      setWishList(null);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async function getUserWishList() {
    try {
      const { data } = await axios.get(endPoint, { headers });

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        getUserWishList,

        removeFromWishList,
        wishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
