import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } =
    useContext(AppContext);

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/product/${product.category.toLowerCase()}/${product?._id}`
          );
          scrollTo(0, 0);
        }}
        className="flex flex-col items-center justify-between text-center cursor-pointer 
                   bg-indigo-50 hover:bg-indigo-100 transition rounded-xl p-4 
                   shadow-sm w-full max-w-[280px] group"
      >
        {/* Product Image */}
        <div className="flex items-center justify-center w-50 h-40 mb-2">
          <img
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={`https://kd-store.onrender.com/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        {/* Category */}
        <p className="text-gray-500 text-sm">{product.category}</p>

        {/* Product Name */}
        <p className="text-gray-800 font-semibold text-base truncate w-full">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating"
                className="w-3"
              />
            ))}
          <p className="text-xs text-gray-500">(4)</p>
        </div>

        {/* Price */}
        <p className="text-indigo-600 font-medium mt-2">
          ₹{product.offerPrice}{" "}
          <span className="text-gray-400 line-through text-sm">
            ₹{product.price}
          </span>
        </p>

        {/* Cart Actions */}
        <div
          className="mt-3 w-full"
          onClick={(e) => e.stopPropagation()} // prevent card navigation when clicking cart
        >
          {!cartItems?.[product?._id] ? (
            <button
              onClick={() => addToCart(product?._id)}
              className="flex items-center justify-center gap-1 w-full py-1.5 
                         bg-primary text-white rounded-md hover:bg-indigo-600 transition"
            >
              <img src={assets.cart_icon} alt="cart icon" className="w-4 h-4" />
              Add
            </button>
          ) : (
            <div className="flex items-center justify-between w-full py-1.5 
                            bg-indigo-500/20 text-indigo-600 rounded-md">
              <button
                onClick={() => removeFromCart(product?._id)}
                className="px-2"
              >
                -
              </button>
              <span>{cartItems[product?._id]}</span>
              <button
                onClick={() => addToCart(product?._id)}
                className="px-2"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProductCard;