// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api'; // Import the API module

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       const data = await api.getProducts(token); // Pass token to API call
//       console.log("Product data: ",data);
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false);
//     }
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
//           <h1 className="text-3xl font-bold text-gray-800">Store Products</h1>
//           {window.location.pathname.startsWith('/admin') && (
//             <button 
//               onClick={() => navigate('/admin/add-product')}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               Add Product
//             </button>
//           )}        
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
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// ----------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package2, Search, Plus, Tag } from 'lucide-react';
// import { api } from '../services/api';

// // Custom Select Component
// const CustomSelect = ({ value, onChange, options }) => {
//   const [isOpen, setIsOpen] = useState(false);
  
//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
//       >
//         <span>{value === 'all' ? 'All Categories' : value}</span>
//         <svg
//           className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>
      
//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
//           {options.map((option) => (
//             <button
//               key={option}
//               className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
//               onClick={() => {
//                 onChange(option);
//                 setIsOpen(false);
//               }}
//             >
//               {option === 'all' ? 'All Categories' : option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const data = await api.getProducts(token);
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false);
//     }
//   };

//   const getAllCategories = () => {
//     const categories = new Set();
//     products.forEach(product => {
//       product.categories.forEach(category => categories.add(category));
//     });
//     return ['all', ...Array.from(categories)];
//   };

//   const filteredProducts = Array.isArray(products) ? products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (selectedCategory === 'all' || product.categories.includes(selectedCategory))
//   ) : [];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="space-y-8">
//         {/* Header Section */}
//         <div className="flex justify-between items-center">
//           <div className="space-y-1">
//             <h1 className="text-3xl font-bold text-gray-900">Store Products</h1>
//             <p className="text-gray-500">Browse and manage your product inventory</p>
//           </div>
//           {window.location.pathname.startsWith('/admin') && (
//             <button 
//               onClick={() => navigate('/admin/add-product')}
//               className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
//             >
//               <Plus className="h-5 w-5" />
//               Add Product
//             </button>
//           )}
//         </div>

//         {/* Search and Filter Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="md:col-span-3 relative">
//             <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name..."
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <CustomSelect
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             options={getAllCategories()}
//           />
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map(product => (
//             <div 
//               key={product._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
//             >
//               <div className="p-6 space-y-4">
//                 {/* Product Header */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-start">
//                     <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                       <Package2 className="h-5 w-5 text-blue-600" />
//                       {product.name}
//                     </h2>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {product.categories.map(category => (
//                       <span
//                         key={category}
//                         className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                       >
//                         <Tag className="h-3 w-3 mr-1" />
//                         {category}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Product Image */}
//                 <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
//                   />
//                 </div>

//                 {/* Pricing Section */}
//                 <div className="space-y-2">
//                   {product.prices.map((price, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                     >
//                       <span className="font-medium text-gray-700 flex items-center gap-2">
//                         <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700"></span>
//                         {price.weight}
//                       </span>
//                       <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//                         ₹{price.price.toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// ----------------------------------------------------------

// import React, { useState, useEffect, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package2, Search, Plus, Tag, ArrowUpDown, Loader2 } from 'lucide-react';
// import { Listbox, Transition } from '@headlessui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { api } from '../services/api';

// const ProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="h-full"
//     >
//       <div 
//         className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 overflow-hidden"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="p-6 space-y-4">
//           <div className="space-y-3">
//             <div className="flex justify-between items-start">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <Package2 className="h-5 w-5 text-blue-600" />
//                 {product.name}
//               </h2>
//             </div>
//             <div className="flex flex-wrap gap-1.5">
//               {product.categories.map(category => (
//                 <span
//                   key={category}
//                   className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
//                 >
//                   <Tag className="h-3 w-3 mr-1" />
//                   {category}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
//             <motion.img
//               src={product.imageUrl}
//               alt={product.name}
//               className="h-full w-full object-contain"
//               animate={{
//                 scale: isHovered ? 1.05 : 1,
//               }}
//               transition={{ duration: 0.3 }}
//             />
//             <div 
//               className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" 
//             />
//           </div>

//           <div className="space-y-2">
//             {product.prices.map((price, index) => (
//               <motion.div
//                 key={index}
//                 className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <span className="font-medium text-gray-700 flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
//                   {price.weight}
//                 </span>
//                 <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//                   ₹{price.price.toFixed(2)}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const SortMenu = ({ value, onChange }) => {
//   const options = [
//     { id: 'name-asc', name: 'Name (A-Z)' },
//     { id: 'name-desc', name: 'Name (Z-A)' }
//   ];

//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         <Listbox.Button className="relative w-full py-2.5 pl-4 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm">
//           <span className="flex items-center">
//             <ArrowUpDown className="h-4 w-4 mr-2 text-gray-400" />
//             <span>{options.find(opt => opt.id === value)?.name}</span>
//           </span>
//           <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
//               <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </span>
//         </Listbox.Button>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
//             {options.map((option) => (
//               <Listbox.Option
//                 key={option.id}
//                 className={({ active }) =>
//                   `relative cursor-default select-none py-2 pl-4 pr-4 ${
//                     active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
//                   }`
//                 }
//                 value={option.id}
//               >
//                 {option.name}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// };

// const CategorySelect = ({ value, onChange, options }) => {
//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         <Listbox.Button className="relative w-full py-2.5 pl-4 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm">
//           <span>{value === 'all' ? 'All Categories' : value}</span>
//           <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
//               <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </span>
//         </Listbox.Button>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
//             {options.map((option) => (
//               <Listbox.Option
//                 key={option}
//                 className={({ active }) =>
//                   `relative cursor-default select-none py-2 pl-4 pr-4 ${
//                     active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
//                   }`
//                 }
//                 value={option}
//               >
//                 {option === 'all' ? 'All Categories' : option}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// };

// const ProductList = () => {
  // const [products, setProducts] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('all');
  // const [sortOrder, setSortOrder] = useState('name-asc');
  // const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const data = await api.getProducts(token);
  //     setProducts(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //     setLoading(false);
  //   }
  // };

  // const getAllCategories = () => {
  //   const categories = new Set();
  //   products.forEach(product => {
  //     product.categories.forEach(category => categories.add(category));
  //   });
  //   return ['all', ...Array.from(categories)];
  // };

  // const sortProducts = (products) => {
  //   const [field, direction] = sortOrder.split('-');
  //   return [...products].sort((a, b) => {
  //     if (field === 'name') {
  //       return direction === 'asc' 
  //         ? a.name.localeCompare(b.name)
  //         : b.name.localeCompare(a.name);
  //     }
  //     return 0;
  //   });
  // };

  // const filteredProducts = Array.isArray(products) 
  //   ? sortProducts(products.filter(product =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //       (selectedCategory === 'all' || product.categories.includes(selectedCategory))
  //     ))
  //   : [];

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
  //     </div>
  //   );
  // }

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex justify-between items-center"
//       >
//         <div className="space-y-1">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//             Store Products
//           </h1>
//           <p className="text-gray-500">Browse and manage your product inventory</p>
//         </div>
//         {window.location.pathname.startsWith('/admin') && (
//           <button 
//             onClick={() => navigate('/admin/add-product')}
//             className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
//           >
//             <Plus className="h-5 w-5" />
//             Add Product
//           </button>
//         )}
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//         <div className="md:col-span-7 relative">
//           <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search products by name..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="md:col-span-3">
//           <CategorySelect
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             options={getAllCategories()}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <SortMenu value={sortOrder} onChange={setSortOrder} />
//         </div>
//       </div>

//       <AnimatePresence>
//         <motion.div 
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {filteredProducts.map(product => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductList;

// ----------------------------------------------------------------------

// import React, { useState, useEffect, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package2, Search, Plus, Tag, ArrowUpDown, Loader2, Star, Clock, Eye } from 'lucide-react';
// import { Listbox, Transition } from '@headlessui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { api } from '../services/api';

// const ProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="h-full group"
//     >
//       <div 
//         className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 overflow-hidden backdrop-blur-sm"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Quick Action Buttons */}
//         <div className="absolute top-4 right-4 z-10 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
//             <Eye className="h-4 w-4" />
//           </button>
//           <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
//             <Star className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Image Section */}
//         <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white">
//           <motion.div
//             className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"
//             animate={{
//               opacity: isHovered ? 1 : 0.5,
//             }}
//             transition={{ duration: 0.3 }}
//           />
//           <motion.img
//             src={product.imageUrl}
//             alt={product.name}
//             className="h-full w-full object-contain p-6 relative z-10"
//             animate={{
//               scale: isHovered ? 1.05 : 1,
//               y: isHovered ? -5 : 0,
//             }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
//         </div>

//         {/* Content Section */}
//         <div className="p-6 space-y-4 relative">
//           {/* Categories */}
//           <div className="flex flex-wrap gap-1.5 mb-2">
//             {product.categories.map(category => (
//               <span
//                 key={category}
//                 className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50 hover:bg-blue-100/50 transition-colors duration-300"
//               >
//                 <Tag className="h-3 w-3 mr-1 opacity-70" />
//                 {category}
//               </span>
//             ))}
//           </div>

//           {/* Title */}
//           <div className="space-y-1">
//             <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
//               <Package2 className="h-5 w-5 text-blue-600 opacity-75" />
//               {product.name}
//             </h2>
//             <p className="text-sm text-gray-500 line-clamp-2">
//               Premium quality product with verified authenticity
//             </p>
//           </div>

//           {/* Pricing Grid */}
//           <div className="space-y-2 pt-2">
//             {product.prices.map((price, index) => (
//               <motion.div
//                 key={index}
//                 className="relative overflow-hidden"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:via-blue-50/30 hover:to-blue-50 border border-gray-100 transition-all duration-300">
//                   <div className="flex items-center gap-3">
//                     <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
//                     <div className="flex flex-col">
//                       <span className="font-medium text-gray-900">{price.weight}</span>
//                       <span className="text-xs text-gray-500">
//                         <Clock className="h-3 w-3 inline mr-1" />
//                         Fast Delivery
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end">
//                     <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
//                       ₹{price.price.toFixed(2)}
//                     </span>
//                     <span className="text-xs text-gray-500">Inc. all taxes</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Action Button */}
//           <motion.button
//             className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:from-blue-700 hover:to-blue-800"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Add to Cart
//           </motion.button>
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl transition-all duration-300" />
//       </div>
//     </motion.div>
//   );
// };

// const SortMenu = ({ value, onChange }) => {
//   const options = [
//     { id: 'name-asc', name: 'Name (A-Z)' },
//     { id: 'name-desc', name: 'Name (Z-A)' }
//   ];

//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         <Listbox.Button className="relative w-full py-2.5 pl-4 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm">
//           <span className="flex items-center">
//             <ArrowUpDown className="h-4 w-4 mr-2 text-gray-400" />
//             <span>{options.find(opt => opt.id === value)?.name}</span>
//           </span>
//           <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
//               <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </span>
//         </Listbox.Button>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
//             {options.map((option) => (
//               <Listbox.Option
//                 key={option.id}
//                 className={({ active }) =>
//                   `relative cursor-default select-none py-2 pl-4 pr-4 ${
//                     active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
//                   }`
//                 }
//                 value={option.id}
//               >
//                 {option.name}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// };

// const CategorySelect = ({ value, onChange, options }) => {
//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         <Listbox.Button className="relative w-full py-2.5 pl-4 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm">
//           <span>{value === 'all' ? 'All Categories' : value}</span>
//           <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
//               <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </span>
//         </Listbox.Button>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
//             {options.map((option) => (
//               <Listbox.Option
//                 key={option}
//                 className={({ active }) =>
//                   `relative cursor-default select-none py-2 pl-4 pr-4 ${
//                     active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
//                   }`
//                 }
//                 value={option}
//               >
//                 {option === 'all' ? 'All Categories' : option}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// };



// // ... Rest of the components (SortMenu, CategorySelect) remain the same ...

// const ProductList = () => {
//   // ... Previous ProductList component code remains the same ...
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortOrder, setSortOrder] = useState('name-asc');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const data = await api.getProducts(token);
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false);
//     }
//   };

//   const getAllCategories = () => {
//     const categories = new Set();
//     products.forEach(product => {
//       product.categories.forEach(category => categories.add(category));
//     });
//     return ['all', ...Array.from(categories)];
//   };

//   const sortProducts = (products) => {
//     const [field, direction] = sortOrder.split('-');
//     return [...products].sort((a, b) => {
//       if (field === 'name') {
//         return direction === 'asc' 
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name);
//       }
//       return 0;
//     });
//   };

//   const filteredProducts = Array.isArray(products) 
//     ? sortProducts(products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         (selectedCategory === 'all' || product.categories.includes(selectedCategory))
//       ))
//     : [];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">
//       {/* Header Section with enhanced styling */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex justify-between items-center bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm"
//       >
//         <div className="space-y-1">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//             Store Products
//           </h1>
//           <p className="text-gray-500">Browse and manage your premium product inventory</p>
//         </div>
//         {window.location.pathname.startsWith('/admin') && (
//           <button 
//             onClick={() => navigate('/admin/add-product')}
//             className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
//           >
//             <Plus className="h-5 w-5" />
//             Add Product
//           </button>
//         )}
//       </motion.div>

//       {/* Enhanced Search and Filter Section */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
//         <div className="md:col-span-7 relative">
//           <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search products by name..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/50"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="md:col-span-3">
//           <CategorySelect
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             options={getAllCategories()}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <SortMenu value={sortOrder} onChange={setSortOrder} />
//         </div>
//       </div>

//       {/* Products Grid with enhanced spacing */}
//       <AnimatePresence>
//         <motion.div 
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {filteredProducts.map(product => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Tag, ArrowUpDown } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { api } from '../services/api';

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
            <Listbox.Option
              key="all"
              value=""
              className={({ active }) =>
                `${active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                cursor-pointer select-none relative py-2 pl-3 pr-9`
              }
            >
              All Categories
            </Listbox.Option>
            {options.map((category) => (
              <Listbox.Option
                key={category}
                value={category}
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

// Sort Menu Component
const SortMenu = ({ value, onChange }) => {
  const sortOptions = [
    { id: 'name-asc', name: 'Name (A-Z)' },
    { id: 'name-desc', name: 'Name (Z-A)' },
    { id: 'price-asc', name: 'Price (Low to High)' },
    { id: 'price-desc', name: 'Price (High to Low)' }
  ];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full flex items-center justify-between gap-2 pl-3 pr-4 py-2.5 text-left border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/50">
          <span className="block truncate">
            {sortOptions.find(option => option.id === value)?.name}
          </span>
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
            {sortOptions.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.id}
                className={({ active }) =>
                  `${active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  cursor-pointer select-none relative py-2 pl-3 pr-9`
                }
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

// Main ProductList Component
const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Replace this with your actual API call
      // const response = await fetch('/api/products');
      const token = localStorage.getItem('token');
      const data = await api.getProducts(token);
      console.log("data: ",data);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Get all unique categories from products
  const getAllCategories = () => {
    const categories = new Set();
    products.forEach(product => {
      product.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories);
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    console.log(products);
    let filtered = [...products];
   

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories.includes(selectedCategory)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.prices[0].price - b.prices[0].price;
        case 'price-desc':
          return b.prices[0].price - a.prices[0].price;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
          />
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
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
            Store Products
          </h1>
          <p className="text-gray-500">Browse and manage your premium product inventory</p>
        </div>
        {window.location.pathname.startsWith('/admin') && (
          <button 
            onClick={() => navigate('/admin/add-product')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        )}
      </motion.div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="md:col-span-7 relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:col-span-3">
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={getAllCategories()}
          />
        </div>
        <div className="md:col-span-2">
          <SortMenu value={sortOrder} onChange={setSortOrder} />
        </div>
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
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;