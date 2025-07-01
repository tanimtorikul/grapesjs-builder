import React, { useMemo } from "react";

const getStyleMap = (styles) => {
  const map = {};
  styles.forEach(({ selectors, style }) => {
    selectors.forEach((selector) => {
      const cleanId = selector.replace("#", "");
      map[cleanId] = style;
    });
  });
  return map;
};

const ProductTemplate = ({ projectJSON, items = [] }) => {
  const stylesMap = useMemo(() => getStyleMap(projectJSON.styles || []), [projectJSON]);

 const renderComponent = (component) => {
  const { type, components = [], attributes = {}, classes = [], style = {} } = component;
  const id = attributes.id;
  const combinedStyle = { ...(stylesMap[id] || {}), ...style };
  const className = classes?.join(" ") || "";

  if (type === "item-container") {
    return (
      <div key={id || Math.random()} id={id} className={className} style={combinedStyle}>
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>{item.name}</h4>
            <p style={{ color: "#27ae60", fontWeight: "bold" }}>{item.price}</p>
          </div>
        ))}
      </div>
    );
  }

  // Skip rendering default item-card children, because handled above
  if (type === "item-card") return null;

  return (
    <div key={id || Math.random()} id={id} className={className} style={combinedStyle}>
      {components.map(renderComponent)}
    </div>
  );
};


   

  const rootComponent = projectJSON?.pages?.[0]?.frames?.[0]?.component;

  return rootComponent ? renderComponent(rootComponent) : <p>No content found.</p>;
};

export default ProductTemplate;
