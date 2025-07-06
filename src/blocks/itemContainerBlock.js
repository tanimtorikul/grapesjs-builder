const itemContainerBlock = {
  id: "item-container",
  label: "Item Container",
  category: "Products",
  content: {
    type: "item-container",
    attributes: { count: 1 }, 
    components: [
      {
        type: "item-card",
      },
    ],
  },
};

export default itemContainerBlock;
