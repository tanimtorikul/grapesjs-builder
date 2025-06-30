
import { useEffect, useState } from "react";
import DynamicProductCard from "../components/DynamicProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <DynamicProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductPage;
