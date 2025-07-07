const searchBarComponent = (editor) => {
  editor.Components.addType("search-bar", {
    model: {
      defaults: {
        tagName: "div",
        droppable: true,
        stylable: true,
        editable: true,
        classes: ["search-bar"],
        attributes: {
          theme: "theme1",
          returnOption: "with",
          language: "en",
        },
        traits: [
          {
            type: "select",
            name: "theme",
            label: "Select Theme",
            options: [
              { value: "theme1", name: "Theme 1" },
              { value: "theme2", name: "Theme 2" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "returnOption",
            label: "Return Option",
            options: [
              { value: "with", name: "With Return" },
              { value: "without", name: "Without Return" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "language",
            label: "Language",
            options: [
              { value: "en", name: "English" },
              { value: "bn", name: "বাংলা" },
            ],
            changeProp: 1,
          },
        ],
      },

      init() {
        this.listenTo(this, "change:theme", this.updateComponents);
        this.listenTo(this, "change:returnOption", this.updateComponents);
        this.listenTo(this, "change:language", this.updateComponents);
        this.updateComponents();
      },

      updateComponents() {
        const theme = this.get("theme");
        const returnOption = this.get("returnOption");
        const language = this.get("language");

        const texts = {
          en: {
            origin: "Origin",
            destination: "Destination",
            departure: "Departure Date",
            return: "Return Date",
            search: "Search",
            oneway: "One Way",
            round: "Round Way",
          },
          bn: {
            origin: "উৎপত্তি স্থান",
            destination: "গন্তব্য স্থান",
            departure: "যাত্রার তারিখ",
            return: "ফেরার তারিখ",
            search: "অনুসন্ধান",
            oneway: "একমুখী",
            round: "দ্বিমুখী",
          },
        };

        const t = texts[language] || texts.en;

        const comps = [];

        if (theme === "theme2") {
          const radioComponents = [];

          radioComponents.push({
            type: "label",
            components: [
              {
                type: "input",
                attributes: {
                  type: "radio",
                  name: "tripType",
                  value: "oneway",
                  checked: true,
                },
              },
              { type: "textnode", content: t.oneway },
            ],
          });

          if (returnOption !== "without") {
            radioComponents.push({
              type: "label",
              components: [
                {
                  type: "input",
                  attributes: {
                    type: "radio",
                    name: "tripType",
                    value: "round",
                  },
                },
                { type: "textnode", content: t.round },
              ],
            });
          }

          comps.push({
            type: "div",
            classes: ["trip-radio-wrapper"],
            components: radioComponents,
          });
        }

        comps.push(
          {
            type: "input",
            attributes: { type: "text", placeholder: t.origin },
          },
          {
            type: "input",
            attributes: { type: "text", placeholder: t.destination },
          },
          {
            type: "input",
            attributes: { type: "date", placeholder: t.departure },
          }
        );

        if (returnOption !== "without") {
          comps.push({
            type: "input",
            attributes: { type: "date", placeholder: t.return },
          });
        }

        comps.push({
          type: "button",
          content: t.search,
        });

        this.components(comps);
      },
    },
  });
};

export default searchBarComponent;
