import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const PUBLISHABLE_KEY = "pk_test_YmV0dGVyLWpvZXktMzEuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);
