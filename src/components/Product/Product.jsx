import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { WishListContext } from "../../context/WishListContext";

export default function Product({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { addToWishList, removeFromWishList } = useContext(WishListContext);

  async function addToWishListHandler(productId) {
    const res = await addToWishList({ productId });
    if (res.status === "success") {
      toast.success(res.message);
      setIsLiked(true);
    } else {
      toast.error(res.message);
    }
  }
  async function removeFromWishListHandler(productId) {
    const res = await removeFromWishList({ productId });
    if (res.status === "success") {
      toast.warn(res.message);
      setIsLiked(false);
    } else {
      toast.error(res.message);
    }
  }
  useEffect(() => {
    isLiked && setIsLiked(product.isLiked);
  }, [product.isLiked]);

  async function addToCartHandler(productId) {
    const res = await addToCart({ productId });
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 sm:px-3 mb-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link to={`/products/${product.id}/${product.category.name}`}>
          <img
            className="w-full h-48 sm:h-64 object-cover"
            src={product.imageCover}
            alt={product.title}
          />
          <div className="p-4">
            <span className="text-sm sm:text-base text-blue-600 mb-2 block">
              {product.category.name}
            </span>
            <h2 className="font-bold text-base sm:text-lg mb-2 truncate">
              {product.title}
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-base sm:text-lg font-medium">
                {product.price} EGP
              </span>
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 text-sm sm:text-base mr-1"></i>
                <span className="text-sm sm:text-base">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="px-4 pb-4 flex justify-between space-x-2">
          <button
            onClick={() => addToCartHandler(product.id)}
            type="button"
            className="flex-grow text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base px-2 py-2 text-center transition duration-300 ease-in-out"
          >
            <i className="fas fa-cart-plus"></i>
            <span className="ml-2 hidden sm:inline"></span>
          </button>
          <button
            onClick={() => {
              if (isLiked) {
                removeFromWishListHandler(product.id);
              } else {
                addToWishListHandler(product.id);
              }
            }}
            className={`flex-shrink-0 font-medium rounded-lg text-sm sm:text-base px-3 py-2 text-center transition duration-300 ease-in-out ${
              isLiked ? "text-red-600" : "text-slate-400"
            }`}
          >
            <i
              className={`fas fa-heart ${
                isLiked ? "text-red-600" : "text-slate-400"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
