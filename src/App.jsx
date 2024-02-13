import { Layout } from "antd";
import AppHeader from "./components/Layout/AppHeader.jsx";
import AppSideBar from "./components/Layout/AppSideBar.jsx";
import AppContent from "./components/Layout/AppContent.jsx";
import { CryptoContextProvider } from "./Context/crypto-context.jsx";

export default function App() {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSideBar />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  );
}
