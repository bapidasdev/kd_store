// import React, { useContext } from 'react'
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';

// const ProductCard = ({ product }) => {
//     const { addToCart, removeFromCart, cartItems, navigate } = useContext(AppContext);

//     return (
//         product && (
//             <div
//                 onClick={() => {
//                     navigate(
//                         `/product/${product.category.toLowerCase()}/${product?._id}`
//                     );
//                     scrollTo(0, 0);
//                 }}
//                 className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
//                 <div className="group cursor-pointer flex items-center justify-center px-2">
//                     <img
//                         className="group-hover:scale-105 transition max-w-26 md:max-w-36"
//                         src={`https://kd-store.onrender.com/images/${product.image[0]}`}
//                         alt={product.name}
//                     />
//                 </div>

//                 <div className="text-gray-500/60 text-sm">
//                     <p>{product.category}</p>
//                     <p className="text-gray-700 font-medium text-lg truncate w-full">
//                         {product.name}
//                     </p>

//                     <div className="flex items-center gap-0.5">
//                         {Array(5)
//                             .fill("")
//                             .map((_, i) => (
//                                 <img
//                                     key={i}
//                                     src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                                     alt="rating"
//                                     className="w-3 md:w-3.5"
//                                 />
//                             ))}
//                         <p>(4)</p>
//                     </div>

//                     <div className="flex items-end justify-between mt-3">
//                         <p className="md:text-xl text-base font-medium text-indigo-500">
//                             ₹{product.offerPrice}{" "}
//                             <span className="text-gray-500/60 md:text-sm text-xs line-through">
//                                 ₹{product.price}
//                             </span>
//                         </p>

//                         <div className="text-indigo-500" onClick={(e) => e.stopPropagation()}>
//                             {!cartItems?.[product?._id] ? (
//                                 <button
//                                     onClick={() => addToCart(product?._id)}
//                                     className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
//                                 >
//                                     <img src={assets.cart_icon} alt="cart icon" />
//                                     Add
//                                 </button>
//                             ) : (
//                                 <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
//                                     <button
//                                         onClick={() => removeFromCart(product?._id)}
//                                         className="cursor-pointer text-md px-2 h-full"
//                                     >
//                                         -
//                                     </button>
//                                     <span className="w-5 text-center">
//                                         {cartItems[product?._id]}
//                                     </span>
//                                     <button
//                                         onClick={() => addToCart(product?._id)}
//                                         className="cursor-pointer text-md px-2 h-full"
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         )
//     )
// }

// export default ProductCard



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
                   shadow-sm w-full max-w-[180px] group"
      >
        {/* Product Image */}
        <div className="flex items-center justify-center w-24 h-24 mb-3">
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
                         bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
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