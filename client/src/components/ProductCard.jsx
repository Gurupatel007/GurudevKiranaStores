import React, { useState } from 'react';
import { Package2, Tag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const isMobile = window.innerWidth < 768;

  const handleImageClick = () => {
    if (isMobile) {
      setShowImagePopup(true);
    }
  };

  const handleEyeClick = () => {
    if (!isMobile) {
      setShowImagePopup(true);
    }
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
          className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full border border-gray-100 overflow-hidden backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Quick Action Button */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleEyeClick}
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Image Section */}
          <div 
            className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white cursor-pointer"
            onClick={handleImageClick}
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
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4 relative">
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.categories.map(category => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50 hover:bg-blue-100/50 transition-colors duration-300"
                >
                  <Tag className="h-3 w-3 mr-1 opacity-70" />
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                <Package2 className="h-5 w-5 text-blue-600 opacity-75" />
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Premium quality product with verified authenticity
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="space-y-2 pt-2">
              {product.prices.map((price, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:via-blue-50/30 hover:to-blue-50 border border-gray-100 transition-all duration-300">
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

          {/* Hover Overlay */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl transition-all duration-300" />
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

export default ProductCard;