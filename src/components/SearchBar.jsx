const SearchBar = ({
  components,
  appliedStyle,
  classes,
  id,
  language,
  direction,
  theme,
  returnField,
  
}) => {
  const showReturn = theme === "theme1" && returnField === "with-return";

  return (
    <div
      id={id}
      style={appliedStyle}
      className={classes?.join(" ")}
      lang={language}
      dir={direction}
    >
      {components.map((field, idx) => {
        if (
          field.tag === "div" &&
          field.classes?.includes("trip-radio-wrapper") &&
          field.components?.length
        ) {
          return (
            <div key={idx} className="trip-radio-wrapper" style={field.style}>
              {field.components.map((labelComp, i) => {
                const input = labelComp.components.find(
                  (c) => c.type === "input"
                );
                const text = labelComp.components.find(
                  (c) => c.type === "textnode"
                );

                return (
                  <label
                    key={i}
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type={input?.attributes?.type || "radio"}
                      name={input?.attributes?.name || "tripType"}
                      value={input?.attributes?.value || ""}
                      defaultChecked={!!input?.attributes?.checked}
                    />
                    {text?.content}
                  </label>
                );
              })}
            </div>
          );
        }

        if (field.placeholder === "Return Date" && !showReturn) return null;

        if (field.tag === "input") {
          return (
            <input
              key={idx}
              type={field.type || "text"}
              placeholder={field.placeholder}
             className={`${field.classes?.join(" ") || ""} border border-gray-300 bg-white`}

              style={field.style}
            />
          );
        }

        if (field.tag === "button") {
          return (
            <button
              key={idx}
              className={`${field.classes?.join(" ") || ""}  bg-[#EFEFEF] rounded`}
              style={field.style}
            >
              {field.content || "Search"}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
};

export default SearchBar;
