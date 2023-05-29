import "bootstrap/dist/css/bootstrap.css";

import "@/styles/global.css";
import { useEffect } from "react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
