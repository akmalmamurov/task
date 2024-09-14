import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const QuotesCard = ({ quote, author, id }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full max-w-md p-6 my-6 bg-white shadow-md"
      onClick={() => navigate(`/dashboard/quotes/${id}`)}
    >
      <Typography variant="h5" className="text-blue-gray-800 font-medium">
        {quote}
      </Typography>
      <Typography
        variant="small"
        className="text-blue-gray-600 mt-2 font-semibold"
      >
        — {author}
      </Typography>
    </Card>
  );
};

export default QuotesCard;
