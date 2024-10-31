// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import { api } from '../../services/api'; // Import the API module

// const AdminProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       const data = await api.getProducts(token); // Pass token to API call
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       await api.deleteProduct(token, id); // Pass token to API call
//       fetchProducts(); // Refresh the product list
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const confirmDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleDelete(id);
//         Swal.fire(
//           'Deleted!',
//           'Your product has been deleted.',
//           'success'
//         );
//       }
//     });
//   };

//   const filteredProducts = Array.isArray(products) ? products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   ) : [];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold text-gray-800">Admin Product Management</h1>
//           <button 
//             onClick={() => navigate('/admin/add-product')}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add Product
//           </button>
//         </div>
        
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-5 w-5 absolute left-3 top-3 text-gray-400" 
//             viewBox="0 0 20 20" 
//             fill="currentColor"
//           >
//             <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map(product => (
//           <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
//                   <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
//                 </svg>
//                 {product.name}
//               </h2>
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-48 object-contain rounded-md mb-4"
//               />
//               <div className="space-y-2">
//                 {product.prices.map((price, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
//                   >
//                     <span className="font-medium text-gray-700">{price.weight}</span>
//                     <span className="text-green-600 font-bold">
//                       ₹{price.price.toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => navigate(`/admin/edit-product/${product._id}`)}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => confirmDelete(product._id)} // Use confirmDelete instead of handleDelete
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminProductList;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Tag, ArrowUpDown, Package2, Eye, Edit2, Trash2 } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';

// Image Popup Component
const ImagePopup = ({ imageUrl, alt, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        src={imageUrl}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        onClick={e => e.stopPropagation()}
      />
    </motion.div>
  );
};

// Category Select Component
const CategorySelect = ({ value, onChange, options }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full flex items-center justify-between gap-2 pl-3 pr-4 py-2.5 text-left border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <span className="block truncate">
              {value === '' ? 'All Categories' : value}
            </span>
          </div>
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
            {['All Categories', ...options].map((category) => (
              <Listbox.Option
                key={category}
                value={category === 'All Categories' ? '' : category}
                className={({ active }) =>
                  `${active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  cursor-pointer select-none relative py-2 pl-3 pr-9`
                }
              >
                {category}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

// const AdminProductCard = ({ product, onDelete, onEdit }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showImagePopup, setShowImagePopup] = useState(false);
//   const isMobile = window.innerWidth < 768;

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     onDelete(product._id);
//   };

//   const handleEdit = (e) => {
//     e.stopPropagation();
//     onEdit(product._id);
//   };

//   return (
//     <>
//       <motion.div
//         layout
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//         className="h-full group"
//       >
//         <div 
//           className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 overflow-hidden backdrop-blur-sm"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Admin Action Buttons */}
//           <div className="absolute top-4 right-4 z-10 flex gap-2">
//             <motion.button 
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               onClick={handleEdit}
//               className="p-2 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
//             >
//               <Edit2 className="h-4 w-4" />
//             </motion.button>
//             <motion.button 
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               onClick={handleDelete}
//               className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
//             >
//               <Trash2 className="h-4 w-4" />
//             </motion.button>
//           </div>

//           {/* Image Section */}
//           <div 
//             className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white cursor-pointer"
//             onClick={() => setShowImagePopup(true)}
//           >
//             <motion.div
//               className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"
//               animate={{
//                 opacity: isHovered ? 1 : 0.5,
//               }}
//               transition={{ duration: 0.3 }}
//             />
//             <motion.img
//               src={product.imageUrl}
//               alt={product.name}
//               className="h-full w-full object-contain p-6 relative z-10"
//               animate={{
//                 scale: isHovered ? 1.05 : 1,
//                 y: isHovered ? -5 : 0,
//               }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//             />
//           </div>

//           {/* Content Section */}
//           <div className="p-6 space-y-4">
//             {/* Categories */}
//             <div className="flex flex-wrap gap-1.5">
//               {product.categories?.map(category => (
//                 <span
//                   key={category}
//                   className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50"
//                 >
//                   <Tag className="h-3 w-3 mr-1 opacity-70" />
//                   {category}
//                 </span>
//               ))}
//             </div>

//             {/* Title */}
//             <div className="space-y-1">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <Package2 className="h-5 w-5 text-blue-600 opacity-75" />
//                 {product.name}
//               </h2>
//             </div>

//             {/* Pricing Grid */}
//             <div className="space-y-2">
//               {product.prices.map((price, index) => (
//                 <motion.div
//                   key={index}
//                   className="relative overflow-hidden"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:via-blue-50/30 hover:to-blue-50 border border-gray-100">
//                     <div className="flex items-center gap-3">
//                       <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
//                       <span className="font-medium text-gray-900">{price.weight}</span>
//                     </div>
//                     <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
//                       ₹{price.price.toFixed(2)}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Image Popup */}
//       <AnimatePresence>
//         {showImagePopup && (
//           <ImagePopup
//             imageUrl={product.imageUrl}
//             alt={product.name}
//             isOpen={showImagePopup}
//             onClose={() => setShowImagePopup(false)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// const AdminProductCard = ({ product, onDelete, onEdit }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showImagePopup, setShowImagePopup] = useState(false);
//   const isMobile = window.innerWidth < 768;

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     onDelete(product._id);
//   };

//   const handleEdit = (e) => {
//     e.stopPropagation();
//     onEdit(product._id);
//   };

//   return (
//     <>
//       <motion.div
//         layout
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//         className="h-full group"
//       >
//         <div 
//           className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 overflow-hidden backdrop-blur-sm flex flex-col"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Image Section */}
//           <div 
//             className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white cursor-pointer"
//             onClick={() => setShowImagePopup(true)}
//           >
//             <motion.div
//               className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"
//               animate={{
//                 opacity: isHovered ? 1 : 0.5,
//               }}
//               transition={{ duration: 0.3 }}
//             />
//             <motion.img
//               src={product.imageUrl}
//               alt={product.name}
//               className="h-full w-full object-contain p-6 relative z-10"
//               animate={{
//                 scale: isHovered ? 1.05 : 1,
//                 y: isHovered ? -5 : 0,
//               }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//             />
//           </div>

//           {/* Content Section */}
//           <div className="p-6 space-y-4 flex-grow">
//             {/* Categories */}
//             <div className="flex flex-wrap gap-1.5">
//               {product.categories?.map(category => (
//                 <span
//                   key={category}
//                   className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50"
//                 >
//                   <Tag className="h-3 w-3 mr-1 opacity-70" />
//                   {category}
//                 </span>
//               ))}
//             </div>

//             {/* Title */}
//             <div className="space-y-1">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <Package2 className="h-5 w-5 text-blue-600 opacity-75" />
//                 {product.name}
//               </h2>
//             </div>

//             {/* Pricing Grid */}
//             <div className="space-y-2">
//               {product.prices.map((price, index) => (
//                 <motion.div
//                   key={index}
//                   className="relative overflow-hidden"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:via-blue-50/30 hover:to-blue-50 border border-gray-100">
//                     <div className="flex items-center gap-3">
//                       <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
//                       <span className="font-medium text-gray-900">{price.weight}</span>
//                     </div>
//                     <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
//                       ₹{price.price.toFixed(2)}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Admin Action Buttons - Now at the bottom */}
//           <div className="px-6 pb-6 pt-2 flex gap-2 justify-end">
//             <motion.button 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               onClick={handleEdit}
//               className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow-sm hover:bg-yellow-600 transition-colors duration-300 flex items-center gap-2"
//             >
//               <Edit2 className="h-4 w-4" />
//               Edit
//             </motion.button>
//             <motion.button 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-sm hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
//             >
//               <Trash2 className="h-4 w-4" />
//               Delete
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Image Popup */}
//       <AnimatePresence>
//         {showImagePopup && (
//           <ImagePopup
//             imageUrl={product.imageUrl}
//             alt={product.name}
//             isOpen={showImagePopup}
//             onClose={() => setShowImagePopup(false)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

const AdminProductCard = ({ product, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Red-500
      cancelButtonColor: '#6b7280', // Gray-500
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      borderRadius: '1rem',
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-xl font-semibold text-gray-900',
        htmlContainer: 'text-gray-600',
        confirmButton: 'rounded-xl px-4 py-2',
        cancelButton: 'rounded-xl px-4 py-2'
      }
    });

    if (result.isConfirmed) {
      try {
        await onDelete(product._id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3b82f6', // Blue-500
          confirmButtonText: 'OK',
          background: '#ffffff',
          borderRadius: '1rem',
          customClass: {
            popup: 'rounded-2xl',
            title: 'text-xl font-semibold text-gray-900',
            htmlContainer: 'text-gray-600',
            confirmButton: 'rounded-xl px-4 py-2'
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the product.',
          icon: 'error',
          confirmButtonColor: '#3b82f6', // Blue-500
          confirmButtonText: 'OK',
          background: '#ffffff',
          borderRadius: '1rem',
          customClass: {
            popup: 'rounded-2xl',
            title: 'text-xl font-semibold text-gray-900',
            htmlContainer: 'text-gray-600',
            confirmButton: 'rounded-xl px-4 py-2'
          }
        });
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(product._id);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full group"
      >
        <div 
          className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 overflow-hidden backdrop-blur-sm flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div 
            className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white cursor-pointer"
            onClick={() => setShowImagePopup(true)}
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"
              animate={{
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain p-6 relative z-10"
              animate={{
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4 flex-grow">
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5">
              {product.categories?.map(category => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50"
                >
                  <Tag className="h-3 w-3 mr-1 opacity-70" />
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package2 className="h-5 w-5 text-blue-600 opacity-75" />
                {product.name}
              </h2>
            </div>

            {/* Pricing Grid */}
            <div className="space-y-2">
              {product.prices.map((price, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:via-blue-50/30 hover:to-blue-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
                      <span className="font-medium text-gray-900">{price.weight}</span>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      ₹{price.price.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Admin Action Buttons */}
          <div className="px-6 pb-6 pt-2 flex gap-2 justify-end">
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleEdit}
              className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow-sm hover:bg-yellow-600 transition-colors duration-300 flex items-center gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </motion.button>
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-sm hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Image Popup */}
      <AnimatePresence>
        {showImagePopup && (
          <ImagePopup
            imageUrl={product.imageUrl}
            alt={product.name}
            isOpen={showImagePopup}
            onClose={() => setShowImagePopup(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const AdminProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await api.getProducts(token);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.deleteProduct(token, id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // Get unique categories
  const getCategories = () => {
    const categories = new Set();
    products.forEach(product => {
      product.categories?.forEach(category => categories.add(category));
    });
    return Array.from(categories);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categories?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => navigate('/admin/add-product')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </motion.div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={getCategories()}
        />
      </div>

      {/* Products Grid */}
      <AnimatePresence>
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No products found matching your criteria.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map(product => (
              <AdminProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductList;