import { useState, useEffect, useContext } from "react";
import classes from "./Navbar.module.css";
import Logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
export default function Navbar() {
  const [state, setState] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems, cartOwner } = useContext(CartContext);
  const navigate = useNavigate();
  const handelLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 end-0 start-0 z-50 bg-slate-50 pb-3 mb-6 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <NavLink to={"/"}>
            <img src={Logo} alt="Fresh Cart logo" />
          </NavLink>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center justify-between mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          {token && (
            <div className="">
              <ul className="flex flex-wrap items-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-1">
                  <NavLink
                    to={"/"}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2 rounded-t-lg hover:text-blue-800 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    Home
                    <i className="fas fa-home ms-2"></i>
                  </NavLink>
                </li>
                <li className="me-1">
                  <NavLink
                    to={"/products"}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2 hover:text-blue-800 dark:hover:text-gray-300 group  "
                    aria-current="page"
                  >
                    Products
                    <i className="fas fa-cubes ms-2"></i>
                  </NavLink>
                </li>
                <li className="me-1">
                  <NavLink
                    to={"/categories"}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2  rounded-t-lg hover:text-blue-800 dark:hover:text-gray-300 group"
                  >
                    Category
                    <i className="fas fa-layer-group ms-2"></i>
                  </NavLink>
                </li>
                <li className="me-1">
                  <NavLink
                    to={"/brands"}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2  rounded-t-lg hover:text-blue-800 dark:hover:text-gray-300 group"
                  >
                    Brands
                    <i className="fas fa-tags ms-2"></i>
                  </NavLink>
                </li>
                <li className="me-1">
                  <NavLink
                    to={`/orders/user/${cartOwner}`}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2  rounded-t-lg hover:text-blue-800 dark:hover:text-gray-300 group"
                  >
                    Orders
                    <i className="fas fa-receipt ms-1"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/cart"}
                    className="inline-flex items-center justify-center pt-2 pe-2 pb-2  rounded-t-lg hover:text-blue-800 dark:hover:text-gray-300 group"
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center p-1   text-sm font-medium text-center bg- rounded-lg   "
                    >
                      <span className="me-1">Cart</span>
                      <i className="fas fa-shopping-cart me-2 "> </i>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {numOfCartItems}
                      </div>
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:ms-auto md:space-y-0 md:mt-0">
            <ul className="flex items-center mt-2 mb-1 sm:order-last md:order-first">
              <li className=" flex ">
                <a
                  href=""
                  className="fab fa-instagram mx-2 hover:text-pink-700"
                ></a>
                <a
                  href=""
                  className="fab fa-facebook mx-2 hover:text-blue-700"
                ></a>
                <a href="" className="fab fa-tiktok mx-2"></a>
                <a
                  href=""
                  className="fab fa-twitter mx-2 hover:text-blue-400"
                ></a>
                <a
                  href=""
                  className="fab fa-linkedin mx-2 hover:text-blue-700"
                ></a>
                <a
                  href=""
                  className="fab fa-youtube mx-2 hover:text-red-600"
                ></a>
              </li>
            </ul>
            {token && (
              <>
                <button
                  onClick={handelLogout}
                  className="block text-gray-700 hover:text-blue-700"
                >
                  Logout
                </button>
              </>
            )}
            {!token && (
              <>
                <NavLink
                  to={"/login"}
                  className="block text-gray-700 hover:text-blue-700"
                >
                  Log in
                </NavLink>
                <NavLink
                  to={"/register"}
                  className="block text-gray-700 hover:text-blue-700"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
