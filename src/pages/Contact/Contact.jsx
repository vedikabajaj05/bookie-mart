import React from "react";
import Layout from "../../components/layout/Layout";

function Contact() {
  return (
    <Layout>
      <div className="flex justify-center py-20">
        <div className="bg-gray-100 p-10 rounded-lg shadow-md max-w-xl text-center">

          <h1 className="text-2xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="mb-2">
            Customer Support: +91 xxxx xxxx
          </p>

          <p className="mb-2">
            Orders Help: +91 9xxx xxxx
          </p>

          <p className="mt-4 font-semibold">
            Email:
          </p>

          <p>
            bookiestore@gmail.com
          </p>

        </div>
      </div>
    </Layout>
  );
}

export default Contact;