import React from "react";

const SearchBarDisplay = ({ comp }) => {
  const wrapperStyle = comp.appliedStyle || {};
  const wrapperClass = comp.classes?.join(" ") || "";
  const showReturn = comp.theme === "theme1" && comp.returnField === "with-return";

  return (
    <div style={wrapperStyle} className={wrapperClass} id={comp.id}>
      {comp.components.map((field, idx) => {
        if (field.placeholder === "Return" && !showReturn) return null;

        if (field.tag === "input") {
          return (
            <input
              key={idx}
              type={field.type || "text"}
              placeholder={field.placeholder}
              className={field.classes?.join(" ")}
              style={field.style}
            />
          );
        }

        if (field.tag === "button") {
          return (
            <button key={idx} className={field.classes?.join(" ")} style={field.style}>
              {field.content || "Search"}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
};

export default SearchBarDisplay;
