import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader.jsx";
import AppSideBar from "./AppSideBar.jsx";
import AppContent from "./AppContent.jsx";
import { useContext } from "react";
import CryptoContext from "../../Context/crypto-context.jsx";
export default function AppLayout() {
    const { loading } = useContext(CryptoContext)
    if (loading) {
        return <Spin fullscreen />;
      }
    
    return (
     <Layout>
            <AppHeader />
            <Layout>
            <AppSideBar />
            <AppContent />
            </Layout>
  </Layout>
    )
}