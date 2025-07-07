import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import LatestNews from "../components/LatestNews";
import extractComponentsFromJson from "../utils/extractComponentFromJson";
import ItemContainer from "../components/ItemContainer";

const StudioPreviewDisplay = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      const json = localStorage.getItem("product-template-json");
      if (!json) {
        setComponents([{ type: "error", text: "No data found" }]);
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(json);
      console.log("parsed", parsed);
      const extracted = await extractComponentsFromJson(parsed);
      setComponents(extracted);
      setLoading(false);
    };

    loadComponents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {components.map((comp, i) => {
        console.log("🔍 Rendering Component:", comp);

        if (comp.type === "search-bar") return <SearchBar key={i} {...comp} />;

        if (comp.type === "latest-news")
          return <LatestNews key={i} {...comp} />;

        return null;
      })}
    </div>
  );
};

export default StudioPreviewDisplay;
