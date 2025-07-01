const productCardTraits = [
  {
    name: "layout",
    label: "Grid Layout",
    type: "select",
    options: [
      { value: "1", name: "Single Column" },
      { value: "2", name: "2 Columns" },
      { value: "3", name: "3 Columns" },
    ],
    changeProp: 1, // makes it reactive
  },
];

export default productCardTraits;
