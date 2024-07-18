// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';
// import ProtectedRoute from "./route/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import interceptors from './config/axiosInstance'


const App = () => {
  interceptors()
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/login" />} />
                        <Route path="login" element={<SignIn />} />
                        <Route path="register" element={<SignUp />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
};

export default App;
