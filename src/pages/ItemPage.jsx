import React, { useEffect, useState } from "react";
import ProductTemplate from "../components/ProductTemplate";

const ItemPage = () => {
  const [template, setTemplate] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("product-template-json"));
    setTemplate(saved);

    // Example API call
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container p-4">
      <h2 className="text-xl font-bold mb-4">Product Page</h2>
      {template ? (
        <ProductTemplate projectJSON={template} items={items} />
      ) : (
        <p>Loading template...</p>
      )}
    </div>
  );
};

export default ItemPage;
