// /src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import BackgroundShapes from "./BackgroundShapes";

const Layout = () => {
  return (
    <div>
      <BackgroundShapes />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
