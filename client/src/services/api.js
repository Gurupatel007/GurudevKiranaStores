// const API_URL = 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
    // Auth API calls
    async register(token,userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}`, },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Registration failed');
        return response.json();
    },

    async login(credentials) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        return response.json();
    },

    async verifyEmail(token) {
        const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
            method: 'GET',
        });
        if (!response.ok) throw new Error('Email verification failed');
        return response.json();
    },

    // User API calls
    async getProfile(token) {
        const response = await fetch(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        return response.json();
    },

    async updateProfile(token, userData) {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    },

    // Admin API calls
    async getAllUsers(token) {
        const response = await fetch(`${API_URL}/users/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    async deleteUser(token, userId) {
        const response = await fetch(`${API_URL}/users/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return response.json();
    },

    async getProducts(token) {
        try {
            const response = await fetch(`${API_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async getProduct(token, id) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch product');
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    // async addProduct(token, productData) {
    //     try {
    //         const response = await fetch(`${API_URL}/products`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(productData),
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to add product');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error adding product:', error);
    //         throw error;
    //     }
    // },

    async addProduct(token, productData) {
        try {
            // Remove the Content-Type header when sending FormData
            // Let the browser set it automatically with the correct boundary
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: productData, // Directly pass the FormData object
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    async updateProduct(token, id, productData) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) throw new Error('Failed to update product');
            return await response.json();
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    async deleteProduct(token, id) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete product');
            return await response.json();
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },
    async verifyOTP(data) {
        const response = await fetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('OTP verification failed');
        return response.json();
    },
};