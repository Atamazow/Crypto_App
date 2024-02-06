import { Layout } from "antd";
import AppHeader from "./components/Layout/AppHeader.jsx";
import AppSideBar from "./components/Layout/AppSideBar.jsx";
import AppContent from "./components/Layout/AppContent.jsx";

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSideBar />
        <AppContent />
      </Layout>
    </Layout>
  );
}
