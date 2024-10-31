// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../services/api'; // Import the API module

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     imageUrl: '',
//     category: '',
//     prices: [{ weight: '', price: '' }]
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       const product = await api.getProduct(token, id); // Pass token to API call
//       console.log('Product:', product);
//       setFormData(product);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       setLoading(false);
//     }
//   };

//   const handleAddPrice = () => {
//     setFormData({
//       ...formData,
//       prices: [...formData.prices, { weight: '', price: '' }]
//     });
//   };

//   const handleRemovePrice = (index) => {
//     const newPrices = formData.prices.filter((_, i) => i !== index);
//     setFormData({ ...formData, prices: newPrices });
//   };

//   const handlePriceChange = (index, field, value) => {
//     const newPrices = [...formData.prices];
//     newPrices[index][field] = value;
//     setFormData({ ...formData, prices: newPrices });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       await api.updateProduct(token, id, formData); // Pass token to API call
//       navigate('/admin/products');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               placeholder="Enter product name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.imageUrl}
//               onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//               placeholder="Enter image URL"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               placeholder="Enter category"
//             />
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="block text-sm font-medium text-gray-700">Prices</label>
//               <button
//                 type="button"
//                 onClick={handleAddPrice}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//                 </svg>
//                 Add Price
//               </button>
//             </div>

//             {formData.prices.map((price, index) => (
//               <div key={index} className="flex gap-4 items-start">
//                 <div className="flex-1">
//                   <input
//                     required
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.weight}
//                     onChange={(e) => handlePriceChange(index, 'weight', e.target.value)}
//                     placeholder="Weight (e.g., 100g)"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     required
//                     type="number"
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.price}
//                     onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
//                     placeholder="Price"
//                   />
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
//                     onClick={() => handleRemovePrice(index)}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={() => navigate('/admin/products')}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

// ------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const productCategories = [
  "Bakery & Breads (બેકરી અને બ્રેડ)",
  "Snacks & Confectionery (નાસ્તો અને મીઠાઇ)",
  "Oil & Ghee (તેલ અને ઘી)",
  "Personal Care (વ્યક્તિગત સંભાળ)",
  "Home Care & Cleaning (ઘરનું સંભાળ અને સાફસૂફી)",
  "Pulses & Grains (દાળ અને અનાજ)",
  "Plastic & Kitchen Essentials (પ્લાસ્ટિક અને રસોડાની જરૂરી વસ્તુઓ)",
  "Stationery & General Supplies (સ્ટેશનરી અને સામાન્ય સામાન)"
];

const weightOptions = [
  "250gm (250 ગ્રામ)",
  "500gm (500 ગ્રામ)",
  "1kg (1 કિલો)",
  "2kg (2 કિલો)",
  "5kg (5 કિલો)",
  "100ml (100 મિલી)",
  "250ml (250 મિલી)",
  "500ml (500 મિલી)",
  "1ltr (1 લિટર)",
  "2ltr (2 લિટર)",
  "5ltr (5 લિટર)",
  "1pc (1 ટુકડો)",
  "1dz (1 ડઝન)"
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    categories: [],
    prices: [{ weight: '', price: '' }]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const product = await api.getProduct(token, id);
      setFormData({
        ...product,
        categories: Array.isArray(product.categories) ? product.categories : [product.categories]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddCategory = (category) => {
    if (!formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(category => category !== categoryToRemove)
    });
  };

  const handleAddPrice = () => {
    setFormData({
      ...formData,
      prices: [...formData.prices, { weight: '', price: '' }]
    });
  };

  const handleRemovePrice = (index) => {
    const newPrices = formData.prices.filter((_, i) => i !== index);
    setFormData({ ...formData, prices: newPrices });
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...formData.prices];
    newPrices[index][field] = value;
    setFormData({ ...formData, prices: newPrices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.updateProduct(token, id, formData);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="flex gap-4 items-center">
              <input
                disabled
                className="flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
                value={formData.imageUrl}
                placeholder="Image URL is not editable"
              />
              {formData.imageUrl && (
                <img 
                  src={formData.imageUrl} 
                  alt={formData.name} 
                  className="h-16 w-16 object-contain rounded-lg border"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
            <div className="space-y-2">
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleAddCategory(e.target.value)}
                value=""
              >
                <option value="">Select a category</option>
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <div 
                    key={category}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{category}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Prices</label>
              <button
                type="button"
                onClick={handleAddPrice}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Price
              </button>
            </div>

            {formData.prices.map((price, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <select
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={price.weight}
                    onChange={(e) => handlePriceChange(index, 'weight', e.target.value)}
                  >
                    <option value="">Select weight/quantity</option>
                    {weightOptions.map((weight) => (
                      <option key={weight} value={weight}>
                        {weight}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    required
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={price.price}
                    onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                    placeholder="Price"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleRemovePrice(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;