import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/Layout";
// import ProtectedRoute from "./route/ProtectedRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import interceptors from "./config/axiosInstance";
import SideBar from "./components/Sidebar";
import { UserDashboard } from "./components/UserDashboard";
import { ProductDashboard } from "./components/ProductDashboard";
import { OffersDashboard } from "./components/OffersDashboard";

const App = () => {
  //test
  interceptors();
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

          <Route path="/dashboard" element={<SideBar />}>
            <Route index element={<Navigate to="/dashboard/products" />} />
            <Route path="/dashboard/products" element={<ProductDashboard />} />
            <Route path="/dashboard/users" element={<UserDashboard />} />
            <Route path="/dashboard/offers" element={<OffersDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
