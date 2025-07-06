const searchBarComponent = (editor) => {
  editor.Components.addType("search-bar", {
    model: {
      defaults: {
        tagName: "div",
        droppable: true,
        editable: true,
        stylable: true,
        classes: ["search-bar"],
        attributes: {
          theme: "theme1",
          returnOption: "with",
        },
        style: {},
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
        ],
      },

      init() {
        this.listenTo(this, "change:theme", this.updateComponents);
        this.listenTo(this, "change:returnOption", this.updateComponents);
        this.updateComponents();
      },

      updateComponents() {
        const theme = this.get("theme");
        const returnOption = this.get("returnOption");

        const comps = [];

        // theme 2 = one way + round (by default)
        if (theme === "theme2") {
          const radioComponents = [
            {
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
                {
                  type: "textnode",
                  content: "One Way",
                },
              ],
            },
          ];

          // if without return selected round round way will be gone
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
                {
                  type: "textnode",
                  content: "Round Way",
                },
              ],
            });
          }

          comps.push({
            type: "div",
            classes: ["trip-type"],
            components: radioComponents,
          });
        }

        // common fields
        comps.push(
          {
            type: "input",
            attributes: { type: "text", placeholder: "Origin" },
            classes: ["input-origin"],
          },
          {
            type: "input",
            attributes: { type: "text", placeholder: "Destination" },
            classes: ["input-destination"],
          },
          {
            type: "input",
            attributes: { type: "date", placeholder: "Departure Date" },
            classes: ["input-departure"],
          }
        );

        // always show return data unless without return is selected
        if (returnOption !== "without") {
          comps.push({
            type: "input",
            attributes: { type: "date", placeholder: "Return Date" },
            classes: ["input-return"],
          });
        }

        // Search button
        comps.push({
          type: "button",
          content: "Search",
          classes: ["search-button"],
        });

        this.components(comps);
      },
    },
  });
};

export default searchBarComponent;
