import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
        Browse Categories
      </h2>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((c, i) => (
          <Link
            key={i}
            to={`/products?category=${c.name}`}
            className="flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg">
              <img
                src={c.image}
                alt={c.name}
                className="w-28 h-28 object-cover rounded-lg border-2 border-gray-200 mb-2"
              />
              <span className="text-lg font-semibold text-gray-800 text-center">
                {c.name}
              </span>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
