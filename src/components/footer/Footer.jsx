import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOrderClick = () => {
    if (user) {
      navigate("/order");
    } else {
      alert("Please login to access Orders!");
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      alert("Please login to access Cart!");
    }
  };

  const handleHomeClick = () => {
    // Scroll to hero section on the same page
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/"); // fallback to homepage
    }
  };

  const handleCategoryClick = (category) => {
  const formattedCategory = category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  navigate(`/allproducts#category-${formattedCategory}`);
};
  return (
    <div>
      <footer
        className="body-font"
        style={{
          backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "#644228ff",
          color: "white",
        }}
      >
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-sm mb-3">
                QUICK LINKS
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <button
                    onClick={handleHomeClick}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOrderClick}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleCartClick}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Cart
                  </button>
                </li>
              </nav>
            </div>

            
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-sm mb-3 uppercase">
                Customer Service
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/returnpolicy" style={{ color: "white" }}>
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={{ color: "white" }}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={{ color: "white" }}>
                    Contact Us
                  </Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-sm mb-3">
                FEEDBACK
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/privacypolicy" style={{ color: "white" }}>
                    Give us a feedback
                  </Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>

              <nav className="list-none mb-10">
                <li>
                  <button
                    onClick={() => handleCategoryClick("Fiction")}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Fiction
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleCategoryClick("Self Help")}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Self Help
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleCategoryClick("Upscguides")}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Upsc Guide
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleCategoryClick("Autobiography")}
                    className="hover:underline"
                    style={{ color: "white" }}
                  >
                    Biography
                  </button>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: mode === "dark" ? "rgb(55 57 61)" : "#4f290bff",
            color: "white",
          }}
        >
          <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
            <Link to="/" className="flex">
              <h1
                className="text-2xl font-bold px-2 py-1 rounded"
                style={{ color: "white" }}
              >
                E-Store
              </h1>
            </Link>

            <p className="text-sm sm:ml-6 sm:mt-0 mt-4" style={{ color: "white" }}>
              2026 Bookie-Store
            </p>

            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (platform, index) => (
                  <a key={index} className="ml-3" style={{ color: "white" }}>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                )
              )}
            </span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default Footer;