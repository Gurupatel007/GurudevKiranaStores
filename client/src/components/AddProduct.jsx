// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     prices: [{ weight: '', price: '' }]
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required');
//       return false;
//     }
//     if (!formData.category.trim()) {
//       setError('Category is required');
//       return false;
//     }

//     const validPrices = formData.prices.every(price => 
//       price.weight.trim() !== '' && 
//       price.price !== '' && 
//       !isNaN(price.price) && 
//       Number(price.price) > 0
//     );

//     if (!validPrices) {
//       setError('All price entries must have valid weight and price values');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     // Prevent multiple submissions
//     if (isSubmitting) {
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       // Append basic fields
//       formDataToSend.append('name', formData.name.trim());
//       formDataToSend.append('category', formData.category.trim());

//       // Append image if selected
//       if (selectedImage) {
//         formDataToSend.append('image', selectedImage);
//       }

//       // Append prices as formatted array
//       formData.prices.forEach((price, index) => {
//         if (price.weight.trim() && price.price) {
//           formDataToSend.append(`prices[${index}][weight]`, price.weight.trim());
//           formDataToSend.append(`prices[${index}][price]`, price.price);
//         }
//       });

//       await api.addProduct(token, formDataToSend);
//       navigate('/admin/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError(error.message || 'An error occurred while adding the product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name *
//             </label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.name}
//               onChange={(e) => {
//                 setError('');
//                 setFormData({ ...formData, name: e.target.value });
//               }}
//               placeholder="Enter product name"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
//               disabled={isSubmitting}
//             />
//             {imagePreview && (
//               <div className="mt-2">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="max-w-xs rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category *
//             </label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.category}
//               onChange={(e) => {
//                 setError('');
//                 setFormData({ ...formData, category: e.target.value });
//               }}
//               placeholder="Enter category"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="block text-sm font-medium text-gray-700">
//                 Prices *
//               </label>
//               <button
//                 type="button"
//                 onClick={handleAddPrice}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
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
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'weight', e.target.value);
//                     }}
//                     placeholder="Weight (e.g., 100g)"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     required
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.price}
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'price', e.target.value);
//                     }}
//                     placeholder="Price"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleRemovePrice(index)}
//                     disabled={isSubmitting}
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
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   <span>Save Product</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// -----------------------------------------------------------

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     categories: [],
//     prices: [{ weight: '', price: '' }]
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const productCategories = [
//     "Bakery & Breads (બેકરી અને બ્રેડ)",
//     "Snacks & Confectionery (નાસ્તો અને મીઠાઇ)",
//     "Oil & Ghee (તેલ અને ઘી)",
//     "Personal Care (વ્યક્તિગત સંભાળ)",
//     "Home Care & Cleaning (ઘરનું સંભાળ અને સાફસૂફી)",
//     "Pulses & Grains (દાળ અને અનાજ)",
//     "Plastic & Kitchen Essentials (પ્લાસ્ટિક અને રસોડાની જરૂરી વસ્તુઓ)",
//     "Stationery & General Supplies (સ્ટેશનરી અને સામાન્ય સામાન)"
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     if (!formData.categories.includes(category)) {
//       setFormData({
//         ...formData,
//         categories: [...formData.categories, category]
//       });
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleRemoveCategory = (categoryToRemove) => {
//     setFormData({
//       ...formData,
//       categories: formData.categories.filter(category => category !== categoryToRemove)
//     });
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required');
//       return false;
//     }
//     if (formData.categories.length === 0) {
//       setError('At least one category is required');
//       return false;
//     }

//     const validPrices = formData.prices.every(price =>
//       price.weight.trim() !== '' &&
//       price.price !== '' &&
//       !isNaN(price.price) &&
//       Number(price.price) > 0
//     );

//     if (!validPrices) {
//       setError('All price entries must have valid weight and price values');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     if (isSubmitting) {
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       formDataToSend.append('name', formData.name.trim());
//       formDataToSend.append('categories', JSON.stringify(formData.categories));

//       if (selectedImage) {
//         formDataToSend.append('image', selectedImage);
//       }

//       formData.prices.forEach((price, index) => {
//         if (price.weight.trim() && price.price) {
//           formDataToSend.append(`prices[${index}][weight]`, price.weight.trim());
//           formDataToSend.append(`prices[${index}][price]`, price.price);
//         }
//       });

//       await api.addProduct(token, formDataToSend);
//       navigate('/admin/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError(error.message || 'An error occurred while adding the product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name *
//             </label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.name}
//               onChange={(e) => {
//                 setError('');
//                 setFormData({ ...formData, name: e.target.value });
//               }}
//               placeholder="Enter product name"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
//               disabled={isSubmitting}
//             />
//             {imagePreview && (
//               <div className="mt-2">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="max-w-xs rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="relative" ref={dropdownRef}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Categories *
//             </label>
//             <div className="min-h-[42px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-pointer">
//               <div className="flex flex-wrap gap-2">
//                 {formData.categories.map((category, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//                   >
//                     {category}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveCategory(category)}
//                       className="ml-1 text-blue-600 hover:text-blue-800"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </span>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isDropdownOpen && (
//               <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
//                 {productCategories
//                   .filter(category => !formData.categories.includes(category))
//                   .map((category, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
//                       onClick={() => handleCategorySelect(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="block text-sm font-medium text-gray-700">
//                 Prices *
//               </label>
//               <button
//                 type="button"
//                 onClick={handleAddPrice}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
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
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'weight', e.target.value);
//                     }}
//                     placeholder="Weight (e.g., 100g)"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     required
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.price}
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'price', e.target.value);
//                     }}
//                     placeholder="Price"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleRemovePrice(index)}
//                     disabled={isSubmitting}
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
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   <span>Save Product</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// -----------------------------------------------------------

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     categories: [],
//     prices: [{ weight: '', price: '' }]
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const productCategories = [
//     "Bakery & Breads (બેકરી અને બ્રેડ)",
//     "Snacks & Confectionery (નાસ્તો અને મીઠાઇ)",
//     "Oil & Ghee (તેલ અને ઘી)",
//     "Personal Care (વ્યક્તિગત સંભાળ)",
//     "Home Care & Cleaning (ઘરનું સંભાળ અને સાફસૂફી)",
//     "Pulses & Grains (દાળ અને અનાજ)",
//     "Plastic & Kitchen Essentials (પ્લાસ્ટિક અને રસોડાની જરૂરી વસ્તુઓ)",
//     "Stationery & General Supplies (સ્ટેશનરી અને સામાન્ય સામાન)"
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     if (!formData.categories.includes(category)) {
//       setFormData({
//         ...formData,
//         categories: [...formData.categories, category]
//       });
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleRemoveCategory = (categoryToRemove) => {
//     setFormData({
//       ...formData,
//       categories: formData.categories.filter(category => category !== categoryToRemove)
//     });
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required');
//       return false;
//     }
//     if (formData.categories.length === 0) {
//       setError('At least one category is required');
//       return false;
//     }

//     const validPrices = formData.prices.every(price => 
//       price.weight.trim() !== '' && 
//       price.price !== '' && 
//       !isNaN(price.price) && 
//       Number(price.price) > 0
//     );

//     if (!validPrices) {
//       setError('All price entries must have valid weight and price values');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     if (isSubmitting) {
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       formDataToSend.append('name', formData.name.trim());
//       formDataToSend.append('categories', JSON.stringify(formData.categories));

//       if (selectedImage) {
//         formDataToSend.append('image', selectedImage);
//       }

//       formData.prices.forEach((price, index) => {
//         if (price.weight.trim() && price.price) {
//           formDataToSend.append(`prices[${index}][weight]`, price.weight.trim());
//           formDataToSend.append(`prices[${index}][price]`, price.price);
//         }
//       });

//       await api.addProduct(token, formDataToSend);
//       navigate('/admin/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError(error.message || 'An error occurred while adding the product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name *
//             </label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.name}
//               onChange={(e) => {
//                 setError('');
//                 setFormData({ ...formData, name: e.target.value });
//               }}
//               placeholder="Enter product name"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image
//             </label>
//             <div className="mt-1 flex items-center">
//               <span className="inline-block h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
//                 {imagePreview ? (
//                   <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
//                 ) : (
//                   <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 )}
//               </span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="relative" ref={dropdownRef}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Categories *
//             </label>
//             <div className="min-h-[42px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-pointer">
//               <div className="flex flex-wrap gap-2">
//                 {formData.categories.map((category, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//                   >
//                     {category}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveCategory(category)}
//                       className="ml-1 text-blue-600 hover:text-blue-800"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </span>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isDropdownOpen && (
//               <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
//                 {productCategories
//                   .filter(category => !formData.categories.includes(category))
//                   .map((category, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
//                       onClick={() => handleCategorySelect(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="block text-sm font-medium text-gray-700">
//                 Prices *
//               </label>
//               <button
//                 type="button"
//                 onClick={handleAddPrice}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
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
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'weight', e.target.value);
//                     }}
//                     placeholder="Weight (e.g., 100g)"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     required
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.price}
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'price', e.target.value);
//                     }}
//                     placeholder="Price"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleRemovePrice(index)}
//                     disabled={isSubmitting}
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
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 'Save Product'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// -----------------------------------------------------------

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     categories: [],
//     prices: [{ weight: '', price: '' }]
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const productCategories = [
//     "Bakery & Breads (બેકરી અને બ્રેડ)",
//     "Snacks & Confectionery (નાસ્તો અને મીઠાઇ)",
//     "Oil & Ghee (તેલ અને ઘી)",
//     "Personal Care (વ્યક્તિગત સંભાળ)",
//     "Home Care & Cleaning (ઘરનું સંભાળ અને સાફસૂફી)",
//     "Pulses & Grains (દાળ અને અનાજ)",
//     "Plastic & Kitchen Essentials (પ્લાસ્ટિક અને રસોડાની જરૂરી વસ્તુઓ)",
//     "Stationery & General Supplies (સ્ટેશનરી અને સામાન્ય સામાન)"
//   ];

//   const pricesOptions = [

//   ]

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     if (!formData.categories.includes(category)) {
//       setFormData({
//         ...formData,
//         categories: [...formData.categories, category]
//       });
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleRemoveCategory = (categoryToRemove) => {
//     setFormData({
//       ...formData,
//       categories: formData.categories.filter(category => category !== categoryToRemove)
//     });
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required');
//       return false;
//     }
//     if (formData.categories.length === 0) {
//       setError('At least one category is required');
//       return false;
//     }

//     const validPrices = formData.prices.every(price => 
//       price.weight.trim() !== '' && 
//       price.price !== '' && 
//       !isNaN(price.price) && 
//       Number(price.price) > 0
//     );

//     if (!validPrices) {
//       setError('All price entries must have valid weight and price values');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     if (isSubmitting) {
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       formDataToSend.append('name', formData.name.trim());
//       formDataToSend.append('categories', JSON.stringify(formData.categories));

//       if (selectedImage) {
//         formDataToSend.append('image', selectedImage);
//       }

//       formData.prices.forEach((price, index) => {
//         if (price.weight.trim() && price.price) {
//           formDataToSend.append(`prices[${index}][weight]`, price.weight.trim());
//           formDataToSend.append(`prices[${index}][price]`, price.price);
//         }
//       });

//       await api.addProduct(token, formDataToSend);
//       navigate('/admin/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError(error.message || 'An error occurred while adding the product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name *
//             </label>
//             <input
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={formData.name}
//               onChange={(e) => {
//                 setError('');
//                 setFormData({ ...formData, name: e.target.value });
//               }}
//               placeholder="Enter product name"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
//               disabled={isSubmitting}
//             />
//             {imagePreview && (
//               <div className="mt-2">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="max-w-xs rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="relative" ref={dropdownRef}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Categories *
//             </label>
//             <div className="min-h-[42px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-pointer">
//               <div className="flex flex-wrap gap-2">
//                 {formData.categories.map((category, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//                   >
//                     {category}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveCategory(category)}
//                       className="ml-1 text-blue-600 hover:text-blue-800"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </span>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isDropdownOpen && (
//               <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
//                 {productCategories
//                   .filter(category => !formData.categories.includes(category))
//                   .map((category, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
//                       onClick={() => handleCategorySelect(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="block text-sm font-medium text-gray-700">
//                 Prices *
//               </label>
//               <button
//                 type="button"
//                 onClick={handleAddPrice}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
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
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'weight', e.target.value);
//                     }}
//                     placeholder="Weight (e.g., 100g)"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     required
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={price.price}
//                     onChange={(e) => {
//                       setError('');
//                       handlePriceChange(index, 'price', e.target.value);
//                     }}
//                     placeholder="Price"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleRemovePrice(index)}
//                     disabled={isSubmitting}
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
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 'Save Product'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;

// -----------------------------------------------------------

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    categories: [],
    prices: [{ weight: '', price: '' }]
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openWeightDropdown, setOpenWeightDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const weightDropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (weightDropdownRef.current && !weightDropdownRef.current.contains(event.target)) {
        setOpenWeightDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (category) => {
    if (!formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(category => category !== categoryToRemove)
    });
  };

  const handleWeightSelect = (index, weight) => {
    handlePriceChange(index, 'weight', weight);
    setOpenWeightDropdown(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (formData.categories.length === 0) {
      setError('At least one category is required');
      return false;
    }

    const validPrices = formData.prices.every(price =>
      price.weight.trim() !== '' &&
      price.price !== '' &&
      !isNaN(price.price) &&
      Number(price.price) > 0
    );

    if (!validPrices) {
      setError('All price entries must have valid weight and price values');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('categories', JSON.stringify(formData.categories));

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      formData.prices.forEach((price, index) => {
        if (price.weight.trim() && price.price) {
          formDataToSend.append(`prices[${index}][weight]`, price.weight.trim());
          formDataToSend.append(`prices[${index}][price]`, price.price);
        }
      });

      await api.addProduct(token, formDataToSend);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.message || 'An error occurred while adding the product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, name: e.target.value });
              }}
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              disabled={isSubmitting}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories *
            </label>
            <div className="min-h-[42px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-pointer">
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {productCategories
                  .filter(category => !formData.categories.includes(category))
                  .map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Prices *
              </label>
              <button
                type="button"
                onClick={handleAddPrice}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Price
              </button>
            </div>

            {formData.prices.map((price, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1 relative" ref={weightDropdownRef}>
                  <div
                    onClick={() => setOpenWeightDropdown(index)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white flex justify-between items-center"
                  >
                    <span className={price.weight ? 'text-gray-900' : 'text-gray-400'}>
                      {price.weight || 'Select weight'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {openWeightDropdown === index && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                      {weightOptions.map((weight, weightIndex) => (
                        <button
                          key={weightIndex}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                          onClick={() => handleWeightSelect(index, weight)}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={price.price}
                    onChange={(e) => {
                      setError('');
                      handlePriceChange(index, 'price', e.target.value);
                    }}
                    placeholder="Price"
                    disabled={isSubmitting}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleRemovePrice(index)}
                    disabled={isSubmitting}
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
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;