import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [projectJSON, setProjectJSON] = useState(null);

  useEffect(() => {
    // Load GrapesJS project JSON from localStorage
    const savedJSON = localStorage.getItem("product-template-json");
    if (savedJSON) {
      setProjectJSON(JSON.parse(savedJSON));
    }

    // Fetch products API
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!projectJSON) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          projectJSON={projectJSON}
          data={product}
        />
      ))}
    </div>
  );
};

export default ProductPage;
