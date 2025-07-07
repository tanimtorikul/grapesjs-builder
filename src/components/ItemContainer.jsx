import React, { useEffect, useState } from "react";

const ItemContainer = ({ id, classes = [], style = {}, attributes = {}, components = [] }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const count = attributes.count ? Number(attributes.count) : 10;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://api.restful-api.dev/objects");
        const data = await res.json();
        setItems(data.slice(0, count));
      } catch (err) {
        console.error("Fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [count]);

  if (loading) return <p>Loading items...</p>;
  if (items.length === 0 && components.length === 0)
    return <p>No items available.</p>;

  return (
    <div id={id} className={classes.join(" ")} style={style}>
      {/* Dynamic API Items */}
      {items.length > 0 &&
        items.map((item, idx) => (
          <div key={`api-item-${idx}`} className="item-card">
            <h4>{item.name || "Unnamed Item"}</h4>
            <p style={{ color: "#27ae60", fontWeight: "bold" }}>
              {item.price || "N/A"}
            </p>
          </div>
        ))}

      {/* Optional: static item-card JSON children */}
      {components.length > 0 &&
        components.map((comp, idx) => {
          if (comp.type === "item-card") {
            const { itemName = "No Name", price = "No Price" } = comp.attributes || {};
            return (
              <div key={`json-item-${idx}`} className="item-card">
                <h4>{itemName}</h4>
                <p style={{ color: "#27ae60", fontWeight: "bold" }}>{price}</p>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default ItemContainer;
