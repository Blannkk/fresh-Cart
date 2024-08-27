import { useState, useEffect, useContext } from "react";
import classes from "./ProductDetails.module.css";
import axios, { all } from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/WishListContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishList, removeFromWishList } = useContext(WishListContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function getProductDetails(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProductDetails(data.data);
      setIsLiked(data.data.isLiked);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProductDetails({});
    } finally {
      setIsLoading(false);
    }
  }
  async function addToCartHandler(productId) {
    const res = await addToCart({ productId });
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

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
    isLiked && setIsLiked(productDetails.isLiked);
  }, [productDetails.isLiked]);

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      <section className="py-3 bg-gray-50 rounded-md">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex justify-between p-4 rounded-md bg-red-50 border border-red-300">
              <div className="flex gap-3 sm:items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-red-600 sm:text-sm">
                  Nothing to show here, {error}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div className="w-1/3 sm:hidden lg:block">
                {productDetails?.images?.length > 0 ? (
                  <Slider {...settings}>
                    {productDetails?.images?.map((src, index) => (
                      <img
                        key={index}
                        className="h-auto max-w-md" // Correctly use className for React
                        src={src} // Use the actual image source from productDetails
                        alt={productDetails.title || "Product Image"}
                      />
                    ))}
                  </Slider>
                ) : (
                  <img
                    className="h-auto max-w-md"
                    src={productDetails?.imageCover}
                    alt={productDetails.title || "Product Image"}
                  />
                )}
              </div>

              <div className="w-2/3  px-4 space-y-3 mt-2 sm:px-0 md:mt-0 lg:max-w-2xl">
                <h3 className="text-indigo-600 font-bold text-2xl">
                  {productDetails?.title}
                </h3>
                <div className="flex  justify-between">
                  <h3 className="text-gray-600 font-medium">
                    {productDetails?.category?.name}
                  </h3>
                  <button
                    onClick={() => {
                      if (isLiked) {
                        removeFromWishListHandler(productDetails.id);
                      } else {
                        addToWishListHandler(productDetails.id);
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
                <div className="flex justify-between mb-2">
                  <span>{productDetails.price} EGP</span>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-300"></i>
                    <span>{productDetails.ratingsAverage}</span>
                  </div>
                </div>
                <p className=" text-gray-600">{productDetails.description}</p>
                <button
                  onClick={() => addToCartHandler(productDetails.id)}
                  className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Add To Cart
                  <i className="fas fa-shopping-cart ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <RelatedProducts />
    </>
  );
}
