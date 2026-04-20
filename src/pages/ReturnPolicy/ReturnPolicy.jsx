import React from "react";
import Layout from "../../components/layout/Layout";

function ReturnPolicy() {
  return (
    <Layout>
      <div className="flex justify-center items-center py-20">
        <div className="bg-gray-100 p-10 rounded-lg shadow-md max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Return Policy</h1>

          <p>
            We offer a-day return policy. Items must be in original condition, with labels attached, and in original packaging. 
            Please provide your receipt for a full refund to your original payment method. 
            Final sale items cannot be returned. 
            If any damage is caused to the product, Return will not be acceptable.
            For assistance, contact our support team.

            To request a return, please send an email to:
          </p>

          <p className="font-semibold mt-3">
            bookiestore@gmail.com
          </p>
          
          <p classname= "mt-3">
            Or call our support team :
            
          </p>
          <p className="font-semibold mt-3">
            +91 9XXXXXXX         
          </p>

          <p className="mt-4">
            Our team will review your request and guide you through the
            return process. 
            For any issues faced, please send a feedback.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ReturnPolicy;