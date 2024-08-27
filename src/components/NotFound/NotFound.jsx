import { useState, useEffect } from "react";
import classes from "./NotFound.module.css";
import { NavLink } from "react-router-dom";
export default function NotFound() {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-red-600 font-semibold">404 Error</h3>
          <p className="text-red-600 text-4xl font-semibold sm:text-5xl ">
            Page not found
          </p>
          <p className="text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <NavLink
              to="/"
              className="block py-2 px-4 text-white font-medium bg-emerald-600 duration-150 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg"
            >
              Go To Home Page
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
