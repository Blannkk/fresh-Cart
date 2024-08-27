import { useState, useEffect } from "react";
import classes from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center py-20">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <>
      <section className="py-20 mx-auto hidden lg:block">
        <div className="container mx-auto px-4">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id} className="px-1">
                <img
                  className="w-full h-40 object-cover rounded-lg mb-2"
                  src={category.image}
                  alt={category.name}
                />
                <h2 className="text-center text-sm font-medium truncate">
                  {category.name}
                </h2>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
