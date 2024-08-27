import { useState, useEffect } from "react";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
