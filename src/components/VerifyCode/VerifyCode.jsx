import { useState, useEffect, useContext } from "react";
import classes from "./VerifyCode.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function VerifyCode() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    resetCode: "",
  };
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleResetCode,
  });

  async function handleResetCode(values) {
    setIsLoading(true);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      toast.success("Code sent successfully");
      setTimeout(() => {
        navigate("/resetPassword");
      }, 500);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Switch to input fields method

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Verify Code :</h1>
      </div>
      {Error && <p className="text-red-500 text-center">{Error}</p>}
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-4xl mx-auto flex flex-col"
        >
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>resetCode :</h4>
              <input
                type="text"
                name="resetCode"
                id="floating_code"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.resetCode}
              />
              <label
                htmlFor="floating_code"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.resetCode && formik.touched.resetCode && (
                <span className="text-red-600">{formik.errors.resetCode}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="justify-end ms-auto text-white bg-blue-600 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
