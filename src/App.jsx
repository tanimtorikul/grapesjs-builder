import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import { Toaster } from "react-hot-toast";
import ItemPage from "./pages/ItemPage";
import StudioPreviewDisplay from "./pages/StudioPreviewDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/item" element={<ItemPage />} />
           <Route path="/page" element={<StudioPreviewDisplay />} />

      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;

