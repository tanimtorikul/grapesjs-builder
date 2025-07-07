import Marquee from "react-fast-marquee";

const LatestNews = ({ text, appliedStyle, classes, direction, language }) => {
  return (
    <div
      style={{ ...appliedStyle, direction }}
      className={classes?.join(" ")}
      lang={language}
      dir={direction}
    >
      {text ? (
        <Marquee gradient={false} speed={60} direction={direction === "rtl" ? "left" : "right"}>
          {text}
        </Marquee>
      ) : (
        "No news available"
      )}
    </div>
  );
};

export default LatestNews;
