// Builder.jsx
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import "grapesjs-blocks-basic"; 

const Builder = () => {
  return (
  <div className="h-screen">
      <StudioEditor
      options={{
        plugins: ["gjs-blocks-basic"], 
        pluginsOpts: {
          "gjs-blocks-basic": {
            blocks: ["text", "image", "video", "link"],
            category: "Basic",
          },
        },
        project: {
          type: "web",
          default: {
            pages: [
              {
                name: "Home",
                component: "<div class='my-container'><h1>Welcome</h1></div>",
              },
            ],
          },
        },
      }}
    />
  </div>
  );
};

export default Builder;
