import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./components/Builder";
import { Toaster } from "react-hot-toast";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;

