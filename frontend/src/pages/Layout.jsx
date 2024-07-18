// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
