import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const StudioPreviewDisplay = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComponents = async () => {
      const savedJsonStr = localStorage.getItem("product-template-json");
      if (!savedJsonStr) {
        setComponents([{ type: "error", text: "No project data found in localStorage." }]);
        setLoading(false);
        return;
      }

      try {
        const parsedJson = JSON.parse(savedJsonStr);
        const found = [];

        const styleMap = {};
        parsedJson.styles?.forEach((styleObj) => {
          styleObj.selectors?.forEach((selector) => {
            if (selector.startsWith("#")) {
              const id = selector.slice(1);
              styleMap[id] = styleObj.style;
            }
          });
        });

        // Recursively collect components
        const findComponents = (comps) => {
          if (!comps) return;
          for (const comp of comps) {
            const id = comp.attributes?.id;
            const common = {
              id,
              classes: comp.classes || [],
              style: comp.style || {},
              appliedStyle: id && styleMap[id] ? styleMap[id] : {},
            };

            if (comp.type === "latest-news") {
              const mode = comp.attributes?.mode || "static";
              const item = {
                type: "latest-news",
                mode,
                text: "",
                ...common,
              };
              found.push(item);
            }

            if (comp.type === "search-bar") {
              found.push({
                type: "search-bar",
                theme: comp.attributes?.theme || "theme1",
                returnField: comp.attributes?.returnField || "with-return",
                components: (comp.components || []).map((child) => {
                  const cid = child.attributes?.id;
                  return {
                    tag: child.type,
                    id: cid,
                    placeholder: child.attributes?.placeholder,
                    type: child.attributes?.type,
                    content: child.content,
                    classes: child.classes || [],
                    style: cid ? styleMap[cid] || {} : {},
                    components: child.components || [],
                    attributes: child.attributes || {},
                  };
                }),
                ...common,
              });
            }

            if (comp.components) {
              findComponents(comp.components);
            }
          }
        };

        parsedJson.pages?.forEach((page) =>
          page.frames?.forEach((frame) =>
            findComponents(frame.component?.components || [])
          )
        );

        // Dynamic text fetch for latest-news
        for (const comp of found) {
          if (comp.type === "latest-news") {
            if (comp.mode === "static") {
              const original = parsedJson.pages
                .flatMap((p) => p.frames || [])
                .flatMap((f) => f.component?.components || [])
                .find((c) => c.attributes?.id === comp.id);
              comp.text = original?.text || original?.attributes?.text || "";
            } else if (comp.mode === "dynamic") {
              try {
                const res = await fetch("/data.json");
                const data = await res.json();
                comp.text = data?.latestNews || "No dynamic news found.";
              } catch {
                comp.text = "Failed to load dynamic news.";
              }
            }
          }
        }

        setComponents(found);
        setLoading(false);
      } catch (err) {
        console.error("JSON parse error", err);
        setComponents([{ type: "error", text: "Failed to parse JSON." }]);
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  if (loading) return <div>Loading Components...</div>;

  return (
    <div>
      {components.map((comp, index) => {
        const wrapperStyle = comp.appliedStyle || {};
        const wrapperClass = comp.classes?.join(" ") || "";

        if (comp.type === "error") {
          return <div key={index}>{comp.text}</div>;
        }

        if (comp.type === "latest-news") {
          return (
            <div key={index} style={wrapperStyle} className={wrapperClass}>
              {comp.text ? (
                <Marquee gradient={false} speed={60}>
                  {comp.text}
                </Marquee>
              ) : (
                "No news available"
              )}
            </div>
          );
        }

        if (comp.type === "search-bar") {
          const isTheme2 = comp.theme === "theme2";
          const showReturn = comp.theme === "theme1" && comp.returnField === "with-return";

          return (
            <div key={index} style={wrapperStyle} className={wrapperClass} id={comp.id}>
              {comp.components.map((field, idx) => {
                // ✅ trip-type radio group (always render if present)
                if (
                  field.tag === "div" &&
                  field.classes?.includes("trip-type") &&
                  field.components?.length
                ) {
                  return (
                    <div key={idx} className="trip-type" style={field.style}>
                      {field.components.map((labelComp, i) => {
                        if (labelComp.type === "label") {
                          const input = labelComp.components.find((c) => c.type === "input");
                          const text = labelComp.components.find((c) => c.type === "textnode");
                          return (
                            <label
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                cursor: "pointer",
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
                        }
                        return null;
                      })}
                    </div>
                  );
                }

                // ❌ skip return input if not allowed in theme1
                if (
                  field.placeholder === "Return Date" &&
                  !showReturn &&
                  comp.theme === "theme1"
                ) {
                  return null;
                }

                // ✅ input fields
                if (field.tag === "input") {
                  return (
                  <div>
                      <input
                      key={idx}
                      
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className={field.classes?.join(" ")}
                      style={field.style}
                    />
                  </div>
                  );
                }

                // ✅ button
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
        }

        return null;
      })}
    </div>
  );
};

export default StudioPreviewDisplay;
