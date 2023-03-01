import GlobalStyle from "../components/GlobalStyles";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />

      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </>
  );
}

export default MyApp;
