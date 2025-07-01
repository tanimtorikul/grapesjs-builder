const customVideoComponent = (editor) => {
  editor.Components.addType("custom-video", {
    model: {
      defaults: {
        tagName: "div",
        droppable: false,
        attributes: {},
        provider: "html5",
        src: "img/video2.webm",
        traits: [
          {
            type: "select",
            name: "provider",
            label: "Provider",
            options: [
              { value: "html5", name: "HTML5 Source" },
              { value: "youtube", name: "YouTube" },
            ],
          },
          {
            name: "src",
            label: "Source",
            placeholder: "e.g. https://youtu.be/abc123 or video.mp4",
          },
          {
            name: "poster",
            label: "Poster (Image)",
            placeholder: "e.g. ./media/image.jpg",
          },
          { type: "checkbox", name: "autoplay", label: "Autoplay" },
          { type: "checkbox", name: "loop", label: "Loop" },
          { type: "checkbox", name: "controls", label: "Controls" },
          { type: "checkbox", name: "muted", label: "Muted" },
        ],
      },

      init() {
        this.listenTo(
          this,
          "change:provider change:src change:poster change:autoplay change:loop change:controls change:muted",
          this.handleChange
        );
      },

      handleChange() {
        this.view.onRender(); // re-render the block on any change
      },
    },

    view: {
      onRender() {
        const model = this.model;
        const provider = model.get("provider") || "html5";
        const src = model.get("src") || "";
        const attrs = model.attributes;

        // Clear old content
        this.el.innerHTML = "";

        if (provider === "youtube") {
          const videoId = extractYouTubeID(src);
          if (videoId) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute(
              "src",
              `https://www.youtube.com/embed/${videoId}`
            );
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.style.width = "100%";
            iframe.style.height = "315px";
            this.el.appendChild(iframe);
          }
        } else {
          const video = document.createElement("video");
          video.setAttribute("src", src);
          if (attrs.poster) video.setAttribute("poster", attrs.poster);
          if (attrs.controls) video.setAttribute("controls", "");
          if (attrs.autoplay) video.setAttribute("autoplay", "");
          if (attrs.loop) video.setAttribute("loop", "");
          if (attrs.muted) video.setAttribute("muted", "");
          video.style.width = "100%";
          video.style.height = "auto";
          this.el.appendChild(video);
        }
      },
    },
  });
};

// Helper to extract YouTube video ID
function extractYouTubeID(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
  } catch {
    return url; // assume it's already an ID
  }
}

export default customVideoComponent;
