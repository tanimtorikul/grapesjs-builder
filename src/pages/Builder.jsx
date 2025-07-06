import { useState } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import "grapesjs-blocks-basic";
import customVideoBlock from "../blocks/customVideoBlock";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import customVideoComponent from "../components/CustomVideoComponent";
import itemCardComponent from "../components/itemCardComponent";
import itemContainerComponent from "../components/itemContainerComponent";
import itemContainerBlock from "../blocks/itemContainerBlock";
import latestNewsMarqueeBlock from "../blocks/latestNewsMarqueeBlock";
import latestNewsMarqueeComponent from "../components/latestNewsMarqueeComponent";
import searchBarBlock from "../blocks/searchBarBlock";
import searchBarComponent from "../components/searchBarComponent";

const Builder = () => {
  const [editor, setEditor] = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!editor) return;
    const projectData = await editor.getProjectData();
    localStorage.setItem("product-template-json", JSON.stringify(projectData));
    toast.success("Template JSON saved!");
    navigate("/latest-news");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Page Builder</h1>
        <button
          onClick={handleSave}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1 rounded"
        >
          Save Template
        </button>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1">
          <StudioEditor
            onEditor={(editor) => {
              setEditor(editor);
              customVideoComponent(editor);
              itemCardComponent(editor);
              latestNewsMarqueeComponent(editor);
              itemContainerComponent(editor);
              searchBarComponent(editor)
            }}
            options={{
              theme: "dark",
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
