
const productCardBlock = {
  id: "product-card",
  label: "Product Card",
  media: `<img src="https://picsum.photos/seed/my-image-10/200/200" style="width: 200px; height: 40px; display: block; object-fit: cover; border-radius: 3px;"/>`,
  content: {
    tagName: "div",
    style: {
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "350px",
      fontFamily: "sans-serif",
    },
    components: [
      {
        type: "text",
        content: "{name}",
         editable: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "10px",
        },
      },
      {
        type: "text",
        content: "Price: {price}",
          editable: false,
        style: {
          fontSize: "14px",
          color: "#222",
          textAlign: "center",
          marginBottom: "5px",
        },
      },
      {
        type: "text",
        content: "Color: {color}",
           editable: false,
        style: {
          fontSize: "14px",
          color: "#333",
          textAlign: "center",
          marginBottom: "5px",
        },
      },
      {
        type: "text",
        content: "Year: {year}",
           editable: false,
        style: {
          fontSize: "14px",
          color: "#444",
          textAlign: "center",
        },
      },
    ],
  },
};

export default productCardBlock;
