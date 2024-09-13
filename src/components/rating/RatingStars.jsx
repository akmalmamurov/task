import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating); // Butun yulduzlar soni
  const hasHalfStar = rating - fullStars >= 0.5; // Yarim yulduz bormi?
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Bo'sh yulduzlar

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      {/* Half star */}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
    </div>
  );
};

export default RatingStars;
