const latestNewsMarqueeComponent = (editor) => {
  // ১. i18n messages যোগ করা
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
    ar: {
      latestNews: {
        trait: {
          mode: "وضع الأخبار",
          static: "ثابت",
          dynamic: "ديناميكي",
          staticText: "نص الأخبار الثابتة",
          direction: "اتجاه النص",
          language: "اللغة",
        },
      },
    },
  });

  // ৩. Component define করা
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
        stylable: [
          "color",
          "background-color",
          "font-size",
          "padding",
          "font-weight",
          "text-align",
        ],
        classes: ["latest-news-marquee"],
        // Default styles to make direction visible
        style: {
          display: "block",
          width: "100%",
          overflow: "hidden",
          padding: "10px",
          "box-sizing": "border-box",
        },
      },

      init() {
        this.updateTraits();

        // Listeners for attribute changes
        this.listenTo(this, "change:attributes:language", () => {
          const lang = this.get("attributes").language;
          editor.I18n.setLocale(lang);
          this.updateTraits();
          this.view.render();
          this.trigger("change:traits");
        });

        // Force immediate UI update when direction changes
        this.listenTo(this, "change:attributes:direction", () => {
          this.addStyle({ direction: this.get("attributes").direction });
          this.view.render();
          this.trigger("change:traits");
        });

        this.listenTo(this, "change:attributes:mode", () => {
          this.updateTraits();
          this.view.render();
          this.trigger("change:traits");
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
            label: editor.I18n.t("latestNews.trait.mode"),
            options: [
              { value: "static", name: editor.I18n.t("latestNews.trait.static") },
              { value: "dynamic", name: editor.I18n.t("latestNews.trait.dynamic") },
            ],
          },
          {
            type: "select",
            name: "direction",
            label: editor.I18n.t("latestNews.trait.direction"),
            options: [
              { value: "ltr", name: "Left to Right" },
              { value: "rtl", name: "Right to Left" },
            ],
            changeProp: 1,
          }
        ];

        // Add language and text traits only for static mode
        if (mode === "static") {
          traits.push(
            {
              type: "text",
              name: "text",
              label: editor.I18n.t("latestNews.trait.staticText"),
              changeProp: 1,
              placeholder: "Enter static news text",
            },
            {
              type: "select",
              name: "language",
              label: editor.I18n.t("latestNews.trait.language"),
              options: [
                { value: "en", name: "English" },
                { value: "ar", name: "عربى" },
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
    const { mode, text, direction, language } = attrs;
    const isStatic = mode === "static";

    this.el.innerHTML = '';
    this.el.setAttribute('dir', direction);

    const content = document.createElement('div');

    // Language dependent text
    let displayedText = "";
    if (isStatic) {
      displayedText = text || (language === 'ar' ? "نص الأخبار الثابتة" : "This is a static latest news scrolling text...");
    } else {
      displayedText = language === 'ar' ? "سيظهر آخر الأخبار الديناميكية هنا..." : "Dynamic latest news will appear here...";
    }

    content.textContent = displayedText;
    content.style.whiteSpace = 'nowrap';
    content.style.display = 'inline-block';
    content.style.width = '100%';

    if (direction === 'rtl') {
      content.style.textAlign = 'right';
      content.style.paddingLeft = '20px';
      content.style.paddingRight = '0';
    } else {
      content.style.textAlign = 'left';
      content.style.paddingRight = '20px';
      content.style.paddingLeft = '0';
    }

    this.el.appendChild(content);
    this.el.contentEditable = isStatic ? "true" : "false";
  },
}

  });
};

export default latestNewsMarqueeComponent;