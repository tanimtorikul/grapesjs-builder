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
          direction: "ltr", // Default direction
        },
      traits: [
  {
    type: "select",
    name: "theme",
    label: "Select Theme",
      placeholder: false,
    options: [
      { value: "theme1", name: "Theme 1" },
      { value: "theme2", name: "Theme 2" },
    ],
          value: "theme1", 

    changeProp: 1,
  },
  {
    type: "select",
    name: "returnOption",
    label: "Return Option",
      placeholder: false,
    options: [
      { value: "with", name: "With Return" },
      { value: "without", name: "Without Return" },
    ],
          value: "with", 

    changeProp: 1,
  },
  {
    type: "select",
    name: "language",
    label: "Language",
      placeholder: false,
    options: [
      { value: "en", name: "English" },
      { value: "bn", name: "বাংলা" },
    ],
          value: "en", 

    changeProp: 1,
  },
  {
    type: "select",
    name: "direction",
    label: "Direction",
                

    options: [
      { value: "ltr", name: "Left to Right" },
      { value: "rtl", name: "Right to Left" },
    ],
      value: "ltr", 
    changeProp: 1,
  },
],
      },

      init() {
        this.listenTo(this, "change:theme", this.updateComponents);
        this.listenTo(this, "change:returnOption", this.updateComponents);
        this.listenTo(this, "change:language", this.updateComponents);
        this.listenTo(this, "change:direction", this.updateComponents);
        this.updateComponents();
      },

      updateComponents() {
        const theme = this.get("theme");
        const returnOption = this.get("returnOption");
        const language = this.get("language");
        const direction = this.get("direction");

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

        // Add direction class based on the selected direction
        const directionClass = direction === "rtl" ? "rtl-direction" : "ltr-direction";
        
        comps.push(
          {
            type: "input",
            attributes: { 
              type: "text", 
              placeholder: t.origin,
              dir: direction // Add dir attribute
            },
            classes: [directionClass],
          },
          {
            type: "input",
            attributes: { 
              type: "text", 
              placeholder: t.destination,
              dir: direction // Add dir attribute
            },
            classes: [directionClass],
          },
          {
            type: "input",
            attributes: { 
              type: "date", 
              placeholder: t.departure,
              dir: direction // Add dir attribute
            },
            classes: [directionClass],
          }
        );

        if (returnOption !== "without") {
          comps.push({
            type: "input",
            attributes: { 
              type: "date", 
              placeholder: t.return,
              dir: direction // Add dir attribute
            },
            classes: [directionClass],
          });
        }

        comps.push({
          type: "button",
          content: t.search,
          classes: [directionClass],
        });

        // Set direction on the main container
        this.addAttributes({ dir: direction });
        this.addClass(directionClass);
        
        this.components(comps);
      },
    },
  });
};

export default searchBarComponent;