import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import myImage from "../../assets/images/image.jpg";   // girl
import man from "../../assets/images/man.jpg";        // boy
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  // ✅ Fetch testimonials from Convex
  const testimonials = useQuery(api.testimonials.getTestimonials) || [];

  // ✅ Rotation logic
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 3 >= testimonials.length ? 0 : prev + 3
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  const getImageByName = (name) => {
  const femaleNames = [
  "Aarohi",
  "Aditi",
  "Ananya",
  "Anika",
  "Anjali",
  "Anushka",
  "Aparna",
  "Arpita",
  "Avni",
  "Bhavna",
  "Chandni",
  "Deepika",
  "Divya",
  "Esha",
  "Garima",
  "Gayatri",
  "Harshita",
  "Ira",
  "Ishita",
  "Jahnavi",
  "Jaya",
  "Juhi",
  "Kajal",
  "Kanchan",
  "Kanika",
  "Karishma",
  "Kavita",
  "Khushi",
  "Komal",
  "Kritika",
  "Lakshmi",
  "Madhuri",
  "Mahima",
  "Manisha",
  "Megha",
  "Mira",
  "Monika",
  "Muskan",
  "Naina",
  "Neha",
  "Nidhi",
  "Nikita",
  "Nisha",
  "Pallavi",
  "Parul",
  "Pooja",
  "Prachi",
  "Pragya",
  "Preeti",
  "Priya",
  "Radhika",
  "Rashmi",
  "Riya",
  "Saanvi",
  "Sakshi",
  "Saloni",
  "Sanya",
  "Sarika",
  "Shalini",
  "Shivani",
  "Shraddha",
  "Shruti",
  "Simran",
  "Sneha",
  "Sonali",
  "Swati",
  "Tanvi",
  "Trisha",
  "Vaishnavi",
  "Vidya",
  "Yamini",
  "Yashika",
  "Zara",
  "Vedika",
  "Ritika",
  "Tanya"
];
  
  const firstName = name.split(" ")[0];

  if (femaleNames.includes(firstName)) {
    return myImage;
  } else {
    return man;
  }
};
  return (
    <section>
      <div className="container mx-auto px-5 py-10">

        {/* Heading + Button */}
        <div className="relative mb-4">
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            What Our <span className="text-blue-500">Book Lovers</span> Say
          </h1>

          <button
            onClick={() => navigate("/give-testimonial")}
            className="absolute right-0 top-0 bg-[#6f4e37] hover:bg-[#4f3223] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-bold"
          >
            Give a Testimonial
          </button>
        </div>

        {/* Subheading */}
        <h2
          className="text-center text-2xl font-semibold mb-10"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          Real Readers, Real Stories
        </h2>

        {/* Testimonials */}
        <div className="flex flex-wrap -m-4">
          {visibleTestimonials.map((item) => (
            <div key={item._id} className="lg:w-1/3 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={getImageByName(item.name)}
                />
                <p
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className="leading-relaxed"
                >
                  "{item.message}"
                </p>
                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4" />
                <h2
                  style={{ color: mode === "dark" ? "#f8edefff" : "" }}
                  className="font-medium title-font tracking-wider text-sm uppercase"
                >
                  {item.name}
                </h2>
                <p
                  style={{ color: mode === "dark" ? "white" : "gray" }}
                  className="text-sm"
                >
                  {item.designation}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonial;