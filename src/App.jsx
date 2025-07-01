import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./components/Builder";
import { Toaster } from "react-hot-toast";
import ProductPage from "./pages/ProductPage";
import CustomBuilder from "./pages/CustomBuilder";
import Slider from "./pages/Slider";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/item" element={<ItemPage />} />
           <Route path="/slider" element={<Slider />} />

      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;

