import { useState, useEffect, useContext } from "react";
import classes from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";

export default function Cart() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getCart,
    clearCart,
    cartDetails,
    numOfCartItems,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  async function getCartHandler() {
    setIsLoading(true);
    try {
      const res = await getCart();
      if (res.status === "success") {
        console.log(res);

        return res;
      } else {
        setError(error.response);
      }
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeProduct(productId) {
    const res = await removeFromCart(productId);
    if (res.status === "success") {
      toast.success("Product removed from cart");

      getCartHandler();
    } else {
      toast.error("Something went wrong");
    }
  }
  async function clearCartHandler() {
    try {
      const res = await clearCart();

      if (res && res.message === "success") {
        toast.success("Cart cleared successfully");
        getCartHandler();
      } else {
        toast.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("An error occurred while clearing the cart");

      if (error.response) {
        return error.response;
      }
    }
  }

  async function updateProductQuantity(productId, count) {
    const res = await updateQuantity(productId, count);
    if (res.status === "success") {
      toast.success("Quantity updated successfully");
      getCartHandler();
    } else {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    token && getCartHandler();
  }, [token]);

  return (
    <>
      <section className="py-20">
        <h1 className="text-center p-2 mb-2 text-4xl text-gray-800 font-bold">
          Cart
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
            {!cartDetails || cartDetails?.products?.length === 0 ? (
              <div className=" items-center max-w-5xl flex flex-col mx-auto px-4 md:px-8">
                <div
                  className="flex text-center items-center p-4 text-sm text-gray-800 rounded-lg bg-red-200 dark:bg-red-800 dark:text-red-300 mb-3 w-full"
                  role="alert"
                >
                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium text-center"></span> Your cart
                    is empty, continue shopping to get products you want.
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
              cartDetails && (
                <>
                  <div className=" mb-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-16 py13">
                            <span className="sr-only">Image</span>
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-14 py-3">
                            Qty
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Items Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartDetails?.products?.map((product) => (
                          <tr
                            key={product.product.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="p-2">
                              <img
                                src={product.product.imageCover}
                                className="w-16 md:w-32 max-w-full max-h-full"
                                alt={product.product.title}
                              />
                            </td>
                            <td className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                              {product.product.title}
                            </td>
                            <td className="px-6 py-2">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    product.count > 1 &&
                                    updateProductQuantity(
                                      product.product.id,
                                      product.count - 1
                                    )
                                  }
                                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <div>{product.count}</div>
                                <button
                                  onClick={() =>
                                    updateProductQuantity(
                                      product.product.id,
                                      product.count + 1
                                    )
                                  }
                                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                              {product.price * product.count}EGP
                            </td>
                            <td className="px-6 py-2">
                              <button
                                onClick={() =>
                                  removeProduct(product.product.id)
                                }
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                        Total Amount
                      </h5>
                      <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-3xl font-semibold"></span>
                        <span className="text-5xl font-extrabold tracking-tight">
                          {cartDetails?.totalCartPrice}
                        </span>
                        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                          EGP
                        </span>
                      </div>
                      <ul role="list" className="space-y-5 my-7">
                        <li className="flex items-center">
                          <i className="fas fa-receipt me-3 "></i>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                            Total Items in Cart: {numOfCartItems}
                          </span>
                        </li>
                      </ul>
                      <div className="flex justify-between">
                        <Link
                          type="button"
                          to={"/checkout"}
                          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center  me-2 mb-2"
                        >
                          Proceed to checkout
                        </Link>
                        <button
                          onClick={() => clearCartHandler()}
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
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

// {
//   cartDetails?.products?.map((product) => (
//     <div
//       key={product.product.id}
//       className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
//     >
//       <div className="rounded-lg md:w-2/3">
//         <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
//           <img
//             src={product.product.imageCover}
//             className="w-16 md:w-32 max-w-full max-h-full"
//             alt={product.product.title}
//           />
//           <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//             <div className="mt-5 sm:mt-0">
//               <h2 className="text-lg font-bold text-gray-900">
//                 {product.product.title}
//               </h2>
//               {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
//             </div>
//             <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
//               <div className="flex items-center border-gray-100">
//                 <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
//                   {" "}
//                   -{" "}
//                 </span>
//                 <input
//                   className="h-8 w-8 border bg-white text-center text-xs outline-none"
//                   type="number"
//                   value="2"
//                   min="1"
//                 />
//                 <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
//                   {" "}
//                   +{" "}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <p className="text-sm"> {product?.price} EGP</p>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <span>Sub total</span>
//       <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
//         <div className="mb-2 flex justify-between">
//           <p className="text-gray-700">Subtotal</p>
//           <p className="text-gray-700">{cartDetails?.totalCartPrice} EGP</p>
//         </div>
//         <div className="flex justify-between">
//           <p className="text-gray-700">Shipping</p>
//           <p className="text-gray-700 line-through">50 EGP</p>
//         </div>
//         <hr className="my-4" />
//         <div className="flex justify-between">
//           <p className="text-lg font-bold">Total</p>
//           <div className="">
//             <p className="mb-1 text-lg font-bold">
//               {cartDetails?.totalCartPrice} EGP
//             </p>
//             <p className="text-sm text-gray-700">including VAT</p>
//           </div>
//         </div>
//         <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
//           Proceed to checkout
//         </button>
//       </div>
//     </div>
//   ));
// }
