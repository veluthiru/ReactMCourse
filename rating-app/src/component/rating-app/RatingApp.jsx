import { useState } from "react";
import Star from "./Star";
import Button from "./button";
const RatingApp = ({ heading = "Rate Your Experience?", color = "gold" }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState();
  const [submited, setSubmited] = useState(false);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const feedBackMessage = ["Poor", "Fair", "Neutral", "Good", "Excellent"];
  const handleSubmit = () => {
    if (rating > 0) {
      setSubmited(true);
    }
    console.log("btn-Click");
  };

  return (
    <div className="rating-container">
      <h1>{heading}</h1>
      <div className="stars">
        {stars.map((star) => (
          <Star
            key={star}
            star={star}
            color={color}
            rating={rating}
            hover={hover}
            ratingClick={setRating}
            hoverEnter={setHover}
            hoverLeave={() => setHover(0)}
          />
          //   <span
          //     key={star}
          //     className="star"
          //     // className={`star ${star <= (hover || rating) ? "active" : ""}`}
          //     onClick={() => setRating(star)}
          //     onMouseEnter={() => setHover(star)}
          //     onMouseLeave={() => setHover(0)}
          //     style={{ color: star <= (hover || rating) ? color : "#ccc" }}
          //   >
          //     {`\u2605`}
          //   </span>
        ))}
      </div>
      {rating > 0 && <p className="feedback">{feedBackMessage[rating - 1]}</p>}
      {/* <button disabled={rating === 0} onClick={handleSubmit}>
        Submit
      </button> */}

      <Button
        rating={rating}
        handleClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit1
      </Button>
      {/* */}
    </div>
  );
};

export default RatingApp;
