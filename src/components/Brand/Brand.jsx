import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

export default function Brand() {
  const [brand, setBrand] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  async function getSpecificBrand(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );

      console.log(data.data);
      setBrand(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setBrand({});
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSpecificBrand(id);
  }, [id]);

  return (
    <>
      <section className="flex justify-center py-3 bg-gray-50 rounded-md items-center">
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
          <div className="  mt-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="h-auto max-w-md object-contain"
                src={brand?.image}
                alt={brand.name || "brand Image"}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h3 className="text-indigo-600 font-bold text-2xl">
                  {brand?.name}
                </h3>
              </a>
              <h3 className="text-gray-600 font-medium">{brand?.slug}</h3>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
