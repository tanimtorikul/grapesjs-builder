const latestNewsMarqueeComponent = (editor) => {
  editor.I18n.addMessages({
    en: {
      latestNews: {
        trait: {
          mode: "News Mode",
          static: "Static",
          dynamic: "Dynamic",
          staticText: "Static News Text",
          direction: "Text Direction",
          language: "Language",
        },
      },
    },
  });

  editor.Components.addType("latest-news", {
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          mode: "static",
          text: "This is a static latest news scrolling text...",
          direction: "ltr",
          language: "en",
        },
        traits: [],
        droppable: false,
        editable: false,
        classes: ["latest-news-marquee"],
        style: {
          display: "block",
          width: "100%",
          overflow: "hidden",
          padding: "10px",
          boxSizing: "border-box",
        },
      },

      init() {
        this.updateTraits();

        // Direction change
        this.listenTo(this, "change:attributes:direction", () => {
          this.view.render();
        });

        this.listenTo(this, "change:attributes:mode", () => {
          this.updateTraits();
          this.view.render();
        });

        this.listenTo(this, "change:attributes:language", () => {
          this.updateTraits();
          this.view.render();
        });

        this.listenTo(this, "change:attributes:text", () => {
          this.view.render();
        });
      },

      updateTraits() {
        const mode = this.get("attributes").mode;
        const traits = [
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
            type: "select",
            name: "direction",
            label: "Text Direction",
            options: [
              { value: "ltr", name: "Left to Right" },
              { value: "rtl", name: "Right to Left" },
            ],
            changeProp: 1,
          },
        ];

        if (mode === "static") {
          traits.push(
            {
              type: "text",
              name: "text",
              label: "Static News Text",
              placeholder: "Enter static news text",
              changeProp: 1,
            },
            {
              type: "select",
              name: "language",
              label: "Language",
              options: [
                { value: "en", name: "English" },
                { value: "ar", name: "Arabic" },
              ],
              changeProp: 1,
            }
          );
        }

        this.set("traits", traits);
      },
    },

   view: {
  onRender() {
    const attrs = this.model.getAttributes();
    const { text, mode, direction, language } = attrs;

    // Clear previous content
    this.el.innerHTML = "";

    // Set direction on the wrapper element
    this.el.setAttribute("dir", direction);
    this.el.style.direction = direction;

    const wrapper = document.createElement("div");

    // Static or dynamic text
    let finalText = "";
    if (mode === "static") {
      finalText = text || (language === "ar" ? "نص الأخبار الثابتة" : "This is a static latest news scrolling text...");
    } else {
      finalText = language === "ar"
        ? "سيظهر آخر الأخبار الديناميكية هنا..."
        : "Dynamic latest news will appear here...";
    }

    wrapper.textContent = finalText;
    wrapper.style.whiteSpace = "nowrap";
    wrapper.style.display = "inline-block";
    wrapper.style.width = "100%";

    // 🔥 This is the key for Studio SDK
    wrapper.style.textAlign = direction === "rtl" ? "right" : "left";
    wrapper.style.paddingLeft = direction === "rtl" ? "0" : "20px";
    wrapper.style.paddingRight = direction === "rtl" ? "20px" : "0";

    this.el.appendChild(wrapper);
  }
}

  });
};

export default latestNewsMarqueeComponent;
