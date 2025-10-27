import React from "react";
import b1 from "../assets/b1.png";
import b2 from "../assets/b2.png";
import b3 from "../assets/b3.png";
import b4 from "../assets/b4.png";
import b5 from "../assets/b5.png";
import b6 from "../assets/b6.png";


const Products = () => {
  const images = [b1, b2, b3, b4, b5, b6];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-12 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-10">
    Applicators We Use
      </h2>

      <div className="relative overflow-hidden w-full">
        {/* Left & Right Fade Overlays */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 bg-gradient-to-r from-gray-100 via-gray-100/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 bg-gradient-to-l from-gray-100 via-gray-100/80 to-transparent pointer-events-none z-10"></div>

        {/* Scrolling strip */}
        <div className="flex animate-scroll">
          {[...images, ...images].map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-44 md:w-56 mx-4 bg-white shadow-md rounded-2xl p-4 flex justify-center items-center transform transition-transform duration-500 hover:scale-105"
            >
              <img
                src={img}
                alt={`Applicator ${index + 1}`}
                className="w-full h-36 md:h-40 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          width: calc(240px * 14);
          display: flex;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Products;
