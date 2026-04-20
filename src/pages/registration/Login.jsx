import { SignIn } from "@clerk/clerk-react";
import Layout from "../../components/layout/Layout";

const SignInPage = () => (
  <Layout>
    <SignIn
      appearance={{
        elements: {
          rootBox: "flex justify-center items-center h-screen w-screen",
        },
      }}
      path="/Login"
      routing="path"
      signUpUrl="/Signup"
      redirectUrl="/"
    />
  </Layout>
);

export default SignInPage;
