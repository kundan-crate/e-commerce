import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Cart, Products, Profile, OrderHistory, Checkout, ProductDetail, PageNotFound, Register, Login, OrderConfirmation } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

export const AllRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            

            {/* Customer Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />

            {/* Add a catch-all route for 404 */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
