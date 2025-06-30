import { useState } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import "grapesjs-blocks-basic";
import productCardBlock from "../blocks/productCardBlock";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Builder = () => {
  const [editor, setEditor] = useState(null); 
  const navigate = useNavigate()

 const handleSave = () => {
  if (!editor) return;
  const html = editor.getHtml();
  const css = editor.getCss();

  localStorage.setItem("product-template", html);
  localStorage.setItem("product-style", css); 
  toast.success("Template & Style saved!");
navigate('/product')
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
            onEditor={setEditor}
            options={{
              blocks: {
                default: [productCardBlock],
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
