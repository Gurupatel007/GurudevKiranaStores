// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api'; // Import the API module

// const ProductList = () => {
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2, Search, Plus, Tag } from 'lucide-react';
import { api } from '../services/api';

// Custom Select Component
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span>{value === 'all' ? 'All Categories' : value}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option === 'all' ? 'All Categories' : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const getAllCategories = () => {
    const categories = new Set();
    products.forEach(product => {
      product.categories.forEach(category => categories.add(category));
    });
    return ['all', ...Array.from(categories)];
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || product.categories.includes(selectedCategory))
  ) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Store Products</h1>
            <p className="text-gray-500">Browse and manage your product inventory</p>
          </div>
          {window.location.pathname.startsWith('/admin') && (
            <button 
              onClick={() => navigate('/admin/add-product')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </button>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={getAllCategories()}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6 space-y-4">
                {/* Product Header */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Package2 className="h-5 w-5 text-blue-600" />
                      {product.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map(category => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Pricing Section */}
                <div className="space-y-2">
                  {product.prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-700 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700"></span>
                        {price.weight}
                      </span>
                      <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        ₹{price.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;