import { useState, useEffect } from "react";
import classes from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Home() {
  return (
    <>
      <div className="py-20 mx-auto">
        <div className="Container mx-auto">
          <h1 className="text-center text-4xl text-gray-800 font-extrabold mx-auto md:text-4xl">
            Discover the Freshest Deals at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1751] to-[#4670e6]">
              Fresh Cart Today <i className="fas fa-shopping-cart"></i>
            </span>
          </h1>
          <MainSlider />
          <CategorySlider />
          <RecentProducts />
        </div>
      </div>
    </>
  );
}
