import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useStoreUserEffect from "../../hooks/useStoreUserEffect.js";

function myState(props) {
  const [mode, setMode] = useState("light");

  const userId = useStoreUserEffect();

  const storeUser = () => {
    if (userId === null) {
      return <div>Storing user...</div>;
    }
    return <div>Stored user ID:</div>;
  };

  storeUser();

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  let prodObj = {
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    date: null,
  };
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const sendProduct = useMutation(api.products.createProduct);
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);

    await sendProduct(products);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
    getProductData();
    setLoading(false);
  };

  const [product, setProduct] = useState([]);
  const Product = useQuery(api.products.getProduct);
  const getProductData = async () => {
    setLoading(true);
    setProduct(Product);
    setTotalProducts(Product.length);
    setLoading(false);
  };

  useEffect(() => {
    if (Product) {
      getProductData();
    }
  }, [Product]);

  // update product function

  const edithandle = (item) => {
    setProducts(item);
  };
  const updateProductMutation = useMutation(api.products.updateProduct);
  const updateProduct = async () => {
    setLoading(true);
    prodObj = {
      id: products._id,
      title: products.title,
      price: products.price,
      imageUrl: products.imageUrl,
      category: products.category,
      description: products.description,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    await updateProductMutation(prodObj);
    toast.success("Product Updated successfully");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
    getProductData();
    setLoading(false);
  };

  // delete product
  const deleteProductMutation = useMutation(api.products.deleteProduct);
  const deleteProduct = async (item) => {
    setLoading(true);
    prodObj = { id: item._id };
    try {
      await deleteProductMutation(prodObj);
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);
  const Order = useQuery(api.orders.getOrder);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const ordersArray = [];
      setOrder(Order);
      setTotalOrders(Order.length);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);
  const User = useQuery(api.users.getUser);
  const getUserData = async () => {
    setLoading(true);
    try {
      setUser(User);
      setTotalUsers(User.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Order) {
      getOrderData();
      //getUserData();
    }
  }, [Order]);

  useEffect(() => {
    if (User) {
      getUserData();
    }
  }, [User]);

  const [totalUsers, setTotalUsers] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [totalOrders, setTotalOrders] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        totalUsers,
        setTotalUsers,
        totalProducts,
        setTotalProducts,
        totalOrders,
        setTotalOrders,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );

  
}

export default myState;
