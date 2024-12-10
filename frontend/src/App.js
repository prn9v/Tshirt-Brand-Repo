import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components/pages
import HomePage from "./components/Home";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import MenProduct from "./components/MenProduct";
import WomenProduct from "./components/WomenProduct";
import ProductCard from "./components/ProductCard";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/men" element={<MenProduct />} />
          <Route path="/products/women" element={<WomenProduct />} />
          <Route path="/products/:productId" element={<ProductCard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
