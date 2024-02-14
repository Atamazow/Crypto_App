
import { CryptoContextProvider } from "./Context/crypto-context.jsx";
import AppLayout from "./components/Layout/AppLayout.jsx";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
  );
}
