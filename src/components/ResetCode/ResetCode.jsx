import { useState, useContext } from "react";
import classes from "./ResetCode.module.css";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ResetCode() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),

    newPassword: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "invalid password Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
        }
      )
      .required("password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleResetPassword,
  });
  async function handleResetPassword(values) {
    setIsLoading(true);
    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      toast.success("password changed successfully");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Reset Password :</h1>
      </div>
      {Error && <p className="text-red-500 text-center">{Error}</p>}
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-4xl mx-auto flex flex-col"
        >
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>email :</h4>
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-600">{formik.errors.email}</span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>newPassword :</h4>
              <input
                type="password"
                name="newPassword"
                id="floating_newPassword"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.newPassword}
              />
              <label
                htmlFor="floating_newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.newPassword && formik.touched.newPassword && (
                <span className="text-red-600">
                  {formik.errors.newPassword}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="justify-end ms-auto text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
