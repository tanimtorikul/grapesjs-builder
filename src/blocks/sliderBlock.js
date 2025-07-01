const sliderBlock = {
  id: "custom-swiper-slider",
  label: "Swiper Slider",
  category: "Custom",
  media: `<svg width="24" height="24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/></svg>`,

  // Initial component content
  content: {
    type: "swiper",
    slidesCount: 3,      // initially 3 slides
    autoplay: false,     // default autoplay off
    loop: false,         // default loop off
    perView: 1,          // default 1 slide per view
  },
};

export const extendSwiperComponent = (editor) => {
  editor.Components.addType("swiper", {
    extend: "swiper",
    model: {
      defaults: {
        traits: [
          {
            type: "number",
            name: "perView",
            label: "Slides Per View",
            changeProp: 1,
            min: 1,
            placeholder: '1',
          },
          {
            type: "checkbox",
            name: "loop",
            label: "Loop",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "autoplay",
            label: "Autoplay",
            changeProp: 1,
          },
        ],
      },
    },
  });
};

export default sliderBlock;
