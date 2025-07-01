const itemCardComponent = (editor) => {
  editor.Components.addType("item-card", {
    model: {
      defaults: {
        tagName: "div",
        droppable: false,
        editable: true,
        attributes: {
          itemName: "Name",
          price: "price",
        },
        traits: [
          { type: "text", name: "itemName", label: "Item Name" },
          { type: "text", name: "price", label: "Price" },
        ],
        // Remove inline styles (define them in the Style Manager instead)
        style: {}, 
        classes: ["item-card"], // Add a default CSS class
      },
      init() {
        this.listenTo(this, "change:attributes", this.handleChange);
      },
      handleChange() {
        this.view.render();
      },
    },
    view: {
      onRender() {
        const attrs = this.model.getAttributes();
        this.el.innerHTML = `
          <h4 style="margin: 0 0 8px 0;">${attrs.itemName}</h4>
          <p style="color: #27ae60; font-weight: bold; margin: 0;">${attrs.price}</p>
        `;
        
        // Preserve existing classes and don't override styles
        if (!this.el.classList.contains("item-card")) {
          this.el.classList.add("item-card");
        }
      },
    },
  });
};

export default itemCardComponent;