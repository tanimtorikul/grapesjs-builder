const itemContainerComponent = (editor) => {
  editor.Components.addType("item-container", {
    model: {
      defaults: {
        tagName: "div",
        droppable: true,
        attributes: { count: 1 },
        traits: [
          {
            type: "select",
            name: "count",
            label: "Number of Cards",
            options: [
              { value: 1, name: "1" },
              { value: 2, name: "2" },
              { value: 3, name: "3" },
              { value: 4, name: "4" },
            ],
          },
        ],
        style: {
          display: "grid",
          "grid-template-columns": "repeat(1, 1fr)",
          gap: "15px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        },
      },

      init() {
        this.listenTo(this, "change:attributes", this.handleChange);
        this.generateCards(this.getAttributes().count);
      },

      handleChange() {
        const count = parseInt(this.getAttributes().count || 1);

        this.setStyle({
          display: "grid",
          "grid-template-columns": `repeat(${count}, 1fr)`, 
          gap: "15px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        });

        this.generateCards(count);
      },

    generateCards(count) {
  const components = this.get("components");
  const currentCount = components.length;

  if (currentCount > count) {
    // Remove extra
    for (let i = currentCount - 1; i >= count; i--) {
      components.at(i).remove();
    }
  } else {
    // Add new ones
    for (let i = currentCount; i < count; i++) {
      components.add({ type: "item-card" });
    }
  }
}

    },

    view: {
      onRender() {
        const style = this.model.get("style");
        Object.assign(this.el.style, style);
      },
    },
  });
};

export default itemContainerComponent;