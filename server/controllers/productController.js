// const Product = require('../models/Product');

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add new product
// exports.addProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get single product
// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update product
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     Object.assign(product, req.body);
//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   }
//   catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete product
// // exports.deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) {
// //       return res.status(404).json({ message: 'Product not found' });
// //     }
// //     await product.remove();
// //     res.json({ message: 'Product removed' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     await product.deleteOne(); // Use deleteOne instead of remove
//     res.json({ message: 'Product removed' });
//   } catch (error) {
//     console.error('Error deleting product:', error); // Log the error
//     res.status(500).json({ message: error.message });
//   }
// };

// --------------------------------------------------------------------------------

// productController.js
const Product = require('../models/Product');
const { uploadImageToCloudinary } = require('./uploadController');

exports.addProduct = async (req, res) => {
  try {
    console.log('Received request body:', req.body); // For debugging
    console.log('Received file:', req.file); // For debugging

    // Extract basic fields
    const { name, category, prices } = req.body;
    
    // Basic validation
    if (!name || !category) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        details: {
          name: !name ? 'Product name is required' : null,
          category: !category ? 'Category is required' : null
        }
      });
    }

    // Validate prices array
    if (!Array.isArray(prices) || prices.length === 0) {
      return res.status(400).json({ 
        message: 'At least one price entry is required',
        details: { prices: 'At least one valid price entry with weight and price is required' }
      });
    }

    // Validate individual price entries
    const invalidPrices = prices.some(price => 
      !price.weight || 
      isNaN(price.price) || 
      Number(price.price) <= 0 || 
      !price.weight.trim()
    );

    if (invalidPrices) {
      return res.status(400).json({ 
        message: 'Invalid price entries',
        details: { prices: 'All prices must have a valid weight and a positive numeric price' }
      });
    }

    // Handle image upload if present
    let imageUrl = '';
    if (req.file) {
      try {
        const imageUploadResult = await uploadImageToCloudinary(req.file.buffer);
        imageUrl = imageUploadResult.secure_url;
      } catch (error) {
        console.error('Image upload error:', error);
        return res.status(400).json({ 
          message: 'Image upload failed',
          details: { image: 'Failed to upload image to cloud storage' }
        });
      }
    }

    // Create new product
    const product = new Product({
      name: name.trim(),
      category: category.trim(),
      imageUrl,
      prices
    });

    // Save product
    const savedProduct = await product.save();
    
    // Send success response
    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    });

  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ 
      message: 'Failed to create product',
      details: error.message
    });
  }
};


// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     await product.remove();
//     res.json({ message: 'Product removed' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne(); // Use deleteOne instead of remove
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};