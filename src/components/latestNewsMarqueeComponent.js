const latestNewsMarqueeComponent = (editor) => {
  editor.Components.addType("latest-news", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          mode: "static",
          text: "This is a static latest news scrolling text...",
        },
        traits: [],

        droppable: false,
        editable: false,
        stylable: [
          "color",
          "background-color",
          "font-size",
          "padding",
          "font-weight",
          "text-align",
        ],
        style: {
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "block",
          backgroundColor: "#fef3c7",
          color: "#b45309",
          fontWeight: "bold",
          padding: "10px",
        },
        classes: ["latest-news-marquee"],
      },

      init() {
        // Initial trait setup
        this.updateTraitsBasedOnMode();

        // Listen to mode change
        this.listenTo(this, "change:attributes:mode", () => {
          this.updateTraitsBasedOnMode();
          this.view.render();
        });

        // Listen to static text change
        this.listenTo(this, "change:attributes:text", () => {
          this.view.render(); // re-render view on text change
        });
      },

      updateTraitsBasedOnMode() {
        const mode = this.get("attributes").mode;

        // Update trait list based on selected mode
        if (mode === "static") {
          this.set("traits", [
            {
              type: "select",
              name: "mode",
              label: "News Mode",
              options: [
                { value: "static", name: "Static" },
                { value: "dynamic", name: "Dynamic" },
              ],
            },
            {
              type: "text",
              name: "text",
              label: "Static News Text",
              changeProp: 1,
              placeholder: "Enter static news text",
            },
          ]);
        } else {
          this.set("traits", [
            {
              type: "select",
              name: "mode",
              label: "News Mode",
              options: [
                { value: "static", name: "Static" },
                { value: "dynamic", name: "Dynamic" },
              ],
            },
          ]);
        }
      },
    },

    view: {
      onRender() {
        const attrs = this.model.getAttributes();
        const isStatic = attrs.mode === "static";
        const marqueeText = attrs.text || "Loading news...";

        this.el.innerHTML = `
          <div class="marquee-content">
            ${
              isStatic ? marqueeText : "Dynamic latest news will appear here..."
            }
          </div>
        `;

        // Inject marquee animation styles only once
        if (!document.getElementById("marquee-style")) {
          const marqueeStyle = document.createElement("style");
          marqueeStyle.id = "marquee-style";
          marqueeStyle.innerHTML = `
            .marquee-content {
              display: inline-block;
              animation: scroll-left 10s linear infinite;
            }

            @keyframes scroll-left {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `;
          document.head.appendChild(marqueeStyle);
        }

        // Disable inline editing if mode is dynamic
        this.el.contentEditable = isStatic ? "true" : "false";
      },
    },
  });
};

export default latestNewsMarqueeComponent;
