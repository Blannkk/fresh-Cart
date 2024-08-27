import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function CheckOut() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const { token, userId } = useContext(AuthContext);
  const { getPayment, cartId, clearCart, cartOwner } = useContext(CartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/i, `Invalid phone number`)
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleCheckOut,
  });

  async function handleCheckOut(values) {
    const url = isOnline
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    setIsLoading(true);
    try {
      const res = await getPayment(url, values);
      console.log(res);

      if (res.status === "success") {
        if (isOnline) {
          window.open(res.session.url);
          clearCart();
        } else {
          toast.success("Payment completed successfully");
          setTimeout(() => {
            navigate(`/orders/user/${userId}`);
          }, 2000);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message);
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Confirm Your Order :</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl mx-auto flex flex-col"
      >
        <div className="relative z-0 w-full mb-5 group">
          <h4>Details</h4>
          <input
            type="text"
            name="details"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.details}
          />
          {formik.errors.details && formik.touched.details && (
            <span className="text-red-600">{formik.errors.details}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <h4>City</h4>
          <input
            type="text"
            name="city"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city && (
            <span className="text-red-600">{formik.errors.city}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <h4>Phone:</h4>
          <input
            type="tel"
            name="phone"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone && (
            <span className="text-red-600">{formik.errors.phone}</span>
          )}
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                onChange={() => setIsOnline(!isOnline)}
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pay Online
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="justify-end ms-auto text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : isOnline ? (
            "Pay Online"
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
}
