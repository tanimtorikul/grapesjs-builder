const extractComponentsFromJson = async (parsedJson) => {
  const found = [];
  const styleMap = {};

  parsedJson.styles?.forEach((style) => {
    style.selectors?.forEach((sel) => {
      if (sel.startsWith("#")) {
        const id = sel.slice(1);
        styleMap[id] = style.style;
      }
    });
  });

  const extract = (comps) => {
    if (!comps) return;
    for (const comp of comps) {
      const id = comp.attributes?.id;
      const common = {
        id,
        classes: comp.classes || [],
        style: comp.style || {},
        appliedStyle: id && styleMap[id] ? styleMap[id] : {},
        direction: comp.direction || comp.attributes?.direction || "ltr",
        language: comp.language || comp.attributes?.language || "en",
      };

      if (comp.type === "latest-news") {
        found.push({
          type: "latest-news",
          mode: comp.attributes?.mode || "static",
          text: "", // handled later
          ...common,
        });
      }

      if (comp.type === "search-bar") {
        found.push({
          type: "search-bar",
          theme: comp.attributes?.theme || "theme1",
          returnField: comp.attributes?.returnField || "with-return",
          components: (comp.components || []).map((child) => ({
            tag: child.type,
            id: child.attributes?.id,
            placeholder: child.attributes?.placeholder,
            type: child.attributes?.type,
            content: child.content,
            classes: child.classes || [],
            style: child.attributes?.id ? styleMap[child.attributes.id] || {} : {},
            components: child.components || [],
            attributes: child.attributes || {},
          })),
          ...common,
        });
      }

      if (comp.components) extract(comp.components);
    }
  };

  parsedJson.pages?.forEach((p) =>
    p.frames?.forEach((f) => extract(f.component?.components || []))
  );

  // Latest news dynamic text
  for (const comp of found) {
    if (comp.type === "latest-news") {
      if (comp.mode === "static") {
        const original = parsedJson.pages
          .flatMap((p) => p.frames || [])
          .flatMap((f) => f.component?.components || [])
          .find((c) => c.attributes?.id === comp.id);
        comp.text = original?.text || original?.attributes?.text || "";
      } else {
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

  return found;
};

export default extractComponentsFromJson;
