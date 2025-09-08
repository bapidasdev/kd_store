// import { useContext, useState } from "react";
// import { categories, assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";


// const AddProduct = () => {
//   const { axios } = useContext(AppContext)

//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("category", category);
//       formData.append("price", price);
//       formData.append("offerPrice", offerPrice);

//       for (let i = 0; i < files.length; i++) {
//         formData.append("image", files[i]);
//       }

//       const { data } = await axios.post("/api/product/add-product", formData);
//       if (data.success) {
//         toast.success(data.message);
//         setName("");
//         setDescription("");
//         setCategory("");
//         setPrice("");
//         setOfferPrice("");
//         setFiles([]);
        
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("bapi das",error.message);
//     }
//   };


//   return (
//     <div className="py-10 flex flex-col justify-between bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="md:p-10 p-4 space-y-5 max-w-lg">
//         <div>
//           <p className="text-base font-medium">Product Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">
//             {Array(4).fill('').map((_, index) => (
//               <label key={index} htmlFor={`image${index}`}>
//                 <input
//                   onChange={(e) => {
//                     const updatedFiles = [...files];
//                     updatedFiles[index] = e.target.files[0];
//                     setFiles(updatedFiles);
//                   }}
//                   accept="image/*" type="file" id={`image${index}`} hidden />
//                 <img className="max-w-24 cursor-pointer"
//                   src={
//                     files[index]
//                       ? URL.createObjectURL(files[index])
//                       : assets.upload_area
//                   }
//                   alt="uploadArea" width={100} height={100} />
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
//           <textarea
//             onChange={(e) => setDescription(e.target.value)}
//             id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
//         </div>

//         <div className="w-full flex flex-col gap-1">
//           <label className="text-base font-medium" htmlFor="category">Category</label>
//           <select id="category"
//             onChange={(e) => setCategory(e.target.value)}
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
//             <option value="">Select Category</option>

//             {categories.map((category, index) => (
//               <option key={index} value={category.path} >
//                 {category.path}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
//             <input id="product-price"
//               onChange={(e) => setPrice(e.target.value)}
//               type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//           </div>
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
//             <input id="offer-price"
//               onChange={(e) => setOfferPrice(e.target.value)}
//               type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//           </div>
//         </div>

//         <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">ADD</button>
//       </form>
//     </div>
//   );
// };
// export default AddProduct





import { useContext, useState } from "react";
import { categories, assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]); // change to "image[]" if backend expects array
      }

      const { data } = await axios.post("/api/product/add-product", formData);

      if (data.success) {
        toast.success(data.message);
        // reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div key={files.length} className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.path}>
                {category.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium"
              htmlFor="product-price"
            >
              Product Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
