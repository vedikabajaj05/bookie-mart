import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Feedback() {

  const addFeedback = useMutation(api.feedback.addFeedback);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addFeedback(formData);

    alert("Feedback submitted successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div className="flex justify-center py-20">

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-10 rounded-lg shadow-md w-full max-w-xl"
        >

          <h1 className="text-2xl font-bold mb-6 text-center">
            Feedback Form
          </h1>

          <input
            type="text"
            placeholder="Name"
            required
            className="w-full border p-2 rounded mb-4"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded mb-4"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <textarea
            rows="10"
            placeholder="Write your feedback..."
            required
            className="w-full border p-2 rounded mb-4"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button className="bg-[#6f4e37] hover:bg-[#4f3223] text-white px-6 py-2 rounded-lg w-full">
            Submit Feedback
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default Feedback;