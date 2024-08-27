import { useState, useEffect, useContext } from "react";
import classes from "./Products.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(data.data);
      setProducts(data.data);
      isLiked && setIsLiked(data.data.isLiked);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [isLiked]);

  return (
    <>
      <section className="py-20">
        <div className="Container mx-auto">
          <h1 className="text-center text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl mb-6">
            products
          </h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            <div className="row ">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
