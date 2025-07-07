import { useState } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ✅ Blocks & components
import customVideoBlock from "../blocks/customVideoBlock";
import itemContainerBlock from "../blocks/itemContainerBlock";
import latestNewsMarqueeBlock from "../blocks/latestNewsMarqueeBlock";
import searchBarBlock from "../blocks/searchBarBlock";

import customVideoComponent from "../components/customVideoComponent";
import itemCardComponent from "../components/itemCardComponent";
import itemContainerComponent from "../components/itemContainerComponent";
import latestNewsMarqueeComponent from "../components/latestNewsMarqueeComponent";
import searchBarComponent from "../components/searchBarComponent";

const Builder = () => {
  const [editor, setEditor] = useState(null);
  const navigate = useNavigate();

  // ✅ Save handler
  const handleSave = async () => {
    if (!editor) return;
    const projectData = await editor.getProjectData();
    localStorage.setItem("product-template-json", JSON.stringify(projectData));
    toast.success("Template JSON saved!");
    navigate("/page");
  };



  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Page Builder</h1>
        <div className="flex items-center gap-2">
      
          <button
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1 rounded"
          >
            Save Template
          </button>
        </div>
      </div>

      {/* StudioEditor */}
      <div className="flex-1 flex">
        <div className="flex-1">
          <StudioEditor
            onEditor={(editor) => {
              setEditor(editor);
                editor.I18n.setLocale("en");

              // ✅ Load custom components
              customVideoComponent(editor);
              itemCardComponent(editor);
              itemContainerComponent(editor);
              latestNewsMarqueeComponent(editor);
              searchBarComponent(editor);

            
            }}
            options={{
              theme: "dark",
             ssages: {},
              
              blocks: {
                default: [
                  customVideoBlock,
                  itemContainerBlock,
                  searchBarBlock,
                  latestNewsMarqueeBlock,
                ],
              },
              pages: false,
              project: {
                type: "web",
                default: {
                  components: '<div class="container"></div>',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Builder;
