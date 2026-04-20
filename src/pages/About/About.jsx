import React from "react";
import Layout from "../../components/layout/Layout";
import image from "../../assets/images/image.jpg";
import man from "../../assets/images/man.jpg";

function About() {
  return (
    <Layout>
      <div className="flex justify-center py-20">
        <div className="bg-gray-100 p-10 rounded-lg shadow-md max-w-3xl text-center">

          <h1 className="text-3xl font-bold mb-6">
            About Bookie Store
          </h1>

          <p className="mb-8">
            Bookie Store was founded with the goal of making books
            accessible to every reader. Our mission is to bring
            together book lovers and create a simple and enjoyable
            online bookstore experience.
          </p>

          <h2 className="text-xl font-semibold mb-6">
            Meet The Founders
          </h2>

          <div className="flex justify-center gap-10">

            <div>
              <img
                src={image}
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <p className="font-semibold">Vedika Bajaj</p>
              <p className="text-sm text-gray-600">
                Co-Founder
              </p>
            </div>

            <div>
              <img
                src={man}
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <p className="font-semibold">
                Sanjeev Kumar Naik
              </p>
              <p className="text-sm text-gray-600">
                Co-Founder
              </p>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default About;