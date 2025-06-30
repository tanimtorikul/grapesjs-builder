
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const DynamicProductCard = ({ data }) => {
  const [template, setTemplate] = useState("");

  useEffect(() => {
    const savedHtml = localStorage.getItem("product-template");
    const savedCss = localStorage.getItem("product-style");

    if (savedHtml) setTemplate(savedHtml);

    if (savedCss) {
      const styleId = "dynamic-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = savedCss;
        document.head.appendChild(style);
      }
    }
  }, []);

  const renderHTML = () => {
    if (!template) return "";

    return template
      .replace(/{name}/g, data.name || "")
      .replace(/{price}/g, data.data?.price || "")
      .replace(/{color}/g, data.data?.color || "")
      .replace(/{year}/g, data.data?.year || "");
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(renderHTML()),
      }}
    />
  );
};

export default DynamicProductCard;
