import React, { useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function GiveTestimonial() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTestimonial = useMutation(api.testimonials.addTestimonial);

const handleSubmit = async (e) => {
  e.preventDefault();

  await addTestimonial({
    name: formData.name,
    designation: formData.designation,
    message: formData.message,
  });

  navigate("/");
};
  return (
    <Layout>
      <div className="container mx-auto px-5 py-10">
        <h1
          className="text-3xl font-bold text-center mb-8"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          Give a Testimonial
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg"
        >
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              required
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>Testimonial</label>
            <textarea
              name="message"
              rows="10"
              required
              className="w-full border p-2 rounded"
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default GiveTestimonial;