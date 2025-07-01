import React from "react";
import renderComponent from "../utils/renderComponent";

const ProductCard = ({ projectJSON, data }) => {
  // Style mapping from projectJSON.styles
  const stylesMap = React.useMemo(() => {
    const map = {};
    projectJSON.styles?.forEach(({ selectors, style }) => {
      selectors.forEach((selector) => {
        map[selector.replace("#", "")] = style;
      });
    });
    return map;
  }, [projectJSON]);

  // All top-level blocks inside wrapper
  const rootComponents =
    projectJSON.pages?.[0]?.frames?.[0]?.component?.components || [];

  return (
    <>
      {rootComponents.map((block, idx) => (
        <div key={idx}>{renderComponent(block, stylesMap, data)}</div>
      ))}
    </>
  );
};

export default ProductCard;
