import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const User = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
      // Handle loading state however you like
      return null;
    }

    if (isSignedIn) {
      localStorage.setItem("user", JSON.stringify(user));
      return <div>Hello {user.fullName}!</div>;
    }
  };
  User();
  return (
    <Layout>
      <HeroSection />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={"/allproducts"}>
          <button className=" bg-gray-300 px-5 py-2 rounded-xl">
            See more
          </button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
}

export default Home;
