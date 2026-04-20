import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <Layout>
      <SignUp
        appearance={{
          elements: {
            rootBox: "flex justify-center items-center h-screen w-screen",
          },
        }}
        signInUrl="/login"
      />
    </Layout>
  );
}

export default SignUpPage;
