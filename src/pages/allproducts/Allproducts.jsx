import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";


function Allproducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(myContext);
  const { mode, product } = context;

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // 🔥 CATEGORY FORMATTER (ADDED)
  const formatCategory = (cat) =>
    cat?.trim().toLowerCase().replace(/\s+/g, "");

  // Navigate to product page
  const navigateToProduct = (id) => {
    navigate(`/productinfo/${id}`);
  };

  // Add to cart
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll to top when page loads
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Scroll to category section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location, product]);

  // FIXED: Normalize categories properly
  const categories = [
    ...new Set(
      product?.map((item) =>
        formatCategory(item.category)
      )
    ),
  ];

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">

          {/* ALL PRODUCTS (no slice now) */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              All Books
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {product?.map((item, index) => {
              const { title, price, imageUrl, _id } = item;

              return (
                <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                  <div
                    className="h-full border-2 hover:shadow-2xl transition duration-300 border-gray-200 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor:
                        mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div
                      onClick={() => navigateToProduct(_id)}
                      className="flex justify-center cursor-pointer"
                    >
                      <img
                        className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition duration-300"
                        src={imageUrl}
                        alt={title}
                      />
                    </div>

                    <div className="p-5 border-t-2">
                      <h2 className="text-xs text-gray-400">
                        Bookie Store
                      </h2>

                      <h1 className="text-lg font-medium mb-2">
                        {title}
                      </h1>

                      <p className="mb-3">₹{price}</p>

                      <div className="flex justify-center">
                        {user ? (
                          <button
                            onClick={() => addCart(item)}
                            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              toast.error("Please login to place order")
                            }
                            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CATEGORY SECTIONS */}
          {categories?.map((cat) => (
            <div
              key={cat}
              id={`category-${formatCategory(cat)}`}  // 🔥 FIXED
              className="mt-16 scroll-mt-32"
            >
              <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1
                  className="sm:text-3xl text-2xl font-medium title-font mb-2"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} Books
                </h1>
                <div className="h-1 w-20 bg-blue-600 rounded"></div>
              </div>

              <div className="flex flex-wrap -m-4">
                {product
                  ?.filter(
                    (item) =>
                      formatCategory(item.category) === cat  // 🔥 FIXED
                  )
                  .map((item, index) => {
                    const { title, price, imageUrl, _id } = item;

                    return (
                      <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                        <div
                          className="h-full border-2 hover:shadow-2xl transition duration-300 border-gray-200 rounded-2xl overflow-hidden"
                          style={{
                            backgroundColor:
                              mode === "dark" ? "rgb(46 49 55)" : "",
                            color: mode === "dark" ? "white" : "",
                          }}
                        >
                          <div
                            onClick={() => navigateToProduct(_id)}
                            className="flex justify-center cursor-pointer"
                          >
                            <img
                              className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition duration-300"
                              src={imageUrl}
                              alt={title}
                            />
                          </div>

                          <div className="p-5 border-t-2">
                            <h2 className="text-xs text-gray-400">
                              Bookie Store
                            </h2>

                            <h1 className="text-lg font-medium mb-2">
                              {title}
                            </h1>

                            <p className="mb-3">₹{price}</p>

                            <div className="flex justify-center">
                              {user ? (
                                <button
                                  onClick={() => addCart(item)}
                                  className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm w-full py-2"
                                >
                                  Add To Cart
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    toast.error(
                                      "Please login to place order"
                                    )
                                  }
                                  className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm w-full py-2"
                                >
                                  Add To Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;