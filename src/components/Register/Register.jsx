import { useState, useEffect, useContext } from "react";
import classes from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name must be at least 3 characters")
      .max(15, "name must be at most 15 characters")
      .required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/i, `invalid phone number`)
      .required("phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "invalid password Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
        }
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword must matches with password ")
      .required("rePassword is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelRegister,
  });

  async function handelRegister(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        setToken(data.token);
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Register Now :</h1>
      </div>
      {Error && <p className="text-red-500 text-center">{Error}</p>}
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-4xl mx-auto flex flex-col"
        >
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>name :</h4>
              <input
                type="Name"
                name="name"
                id="floating_Name"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label
                htmlFor="floating_Name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.name && formik.touched.name && (
                <span className="text-red-600">{formik.errors.name}</span>
              )}
            </div>
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
              <h4>password :</h4>
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-600">{formik.errors.password}</span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>rePassword :</h4>
              <input
                type="password"
                name="rePassword"
                id="floating_repeat_password"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.rePassword}
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <span className="text-red-600">{formik.errors.rePassword}</span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <h4>Phone :</h4>
              <input
                type="tel"
                name="phone"
                id="floating_Phone"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <label
                htmlFor="floating_Phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              ></label>
              {formik.errors.phone && formik.touched.phone && (
                <span className="text-red-600">{formik.errors.phone}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="justify-end ms-auto text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
          </span>
          <Link to={"/login"} className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

// {
//   <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
//     <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
//     <form action="#" className="w-full flex flex-col gap-4">
//       <div className="flex items-start flex-col justify-start">
//         <label for="firstName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">First Name:</label>
//         <input type="text" id="firstName" name="firstName" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <div className="flex items-start flex-col justify-start">
//         <label for="lastName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Last Name:</label>
//         <input type="text" id="lastName" name="lastName" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <div className="flex items-start flex-col justify-start">
//         <label for="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
//         <input type="text" id="username" name="username" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <div className="flex items-start flex-col justify-start">
//         <label for="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
//         <input type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <div className="flex items-start flex-col justify-start">
//         <label for="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
//         <input type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <div className="flex items-start flex-col justify-start">
//         <label for="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
//         <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
//       </div>

//       <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Register</button>
//     </form>

//     <div className="mt-4 text-center">
//       <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
//       <a href="#" className="text-blue-500 hover:text-blue-600">Login</a>
//     </div>
//     </form>
//   </div>
// }
