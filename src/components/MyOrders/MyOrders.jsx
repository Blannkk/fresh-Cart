import { useState, useEffect, useContext } from "react";
import axios from "axios";
import classes from "./MyOrders.module.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartOwner } = useContext(CartContext);

  // Fetch orders based on cartOwner ID
  async function getMyOrders() {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`
      );

      if (data) {
        setOrders(data.data); // Wrap the single order in an array
        console.log("Order data:", data);
      } else {
        setError(data.error || "Error fetching orders");
      }
    } catch (error) {
      console.log(error);
      setError(error.error || "Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch orders when cartOwner is available
  useEffect(() => {
    console.log("Cart owner:", cartOwner);

    cartOwner && getMyOrders();
  }, [cartOwner]);

  useEffect(() => {
    console.log("Orders state:", orders); // Log the orders state
  }, [orders]);

  return (
    <>
      <section className="py-20">
        <h1 className="text-center p-2 mb-2 text-4xl text-gray-800 font-bold">
          Orders
        </h1>

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
          <>
            {orders.length === 0 ? (
              <div className=" items-center max-w-5xl flex flex-col mx-auto px-4 md:px-8">
                <div
                  className="flex text-center items-center p-4 text-sm text-gray-800 rounded-lg bg-red-200 dark:bg-red-800 dark:text-red-300 mb-3 w-full"
                  role="alert"
                >
                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium text-center"></span> there is
                    no orders found
                  </div>
                </div>
                <Link
                  type="button"
                  to={"/"}
                  className=" text-white bg-blue-700 from-gray-500 via-from-gray-600 to-from-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-from-gray-300 dark:focus:ring-from-gray-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center  me-2 mb-2"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              orders && (
                <>
                  <div className=" mb-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Order Number
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Payment Method
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order._id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {order.id}
                            </th>
                            <td
                              className={`px-6 py-4 ${
                                order.isDelivered
                                  ? "text-green-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {order.isDelivered ? "Delivered" : "Pending"}
                            </td>
                            <td className="px-6 py-4">
                              {order.paymentMethodType}
                            </td>
                            <td className="px-6 py-4 text-gray-900 font-medium">
                              {order.totalOrderPrice} EGP
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )
            )}
          </>
        )}
      </section>
    </>
  );
}
