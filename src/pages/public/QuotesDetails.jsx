import useFetchDataById from "@/hooks/useFetchDataById";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";

const QuotesDetails = () => {
    const { id } = useParams(); 
    const { data: quote } = useFetchDataById("quotes", id); 
  return (
    <div className="my-6">
      <Link to="/dashboard/quotes">
        <Button variant="text" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          Back
        </Button>
      </Link>
      {quote && (
        <Card className="w-full max-w-md p-6 my-6 bg-white shadow-md">
          <Typography variant="h5" className="text-blue-gray-800 font-medium">
            Quote: {id}
          </Typography>
          <Typography variant="h5" className="text-blue-gray-800 font-medium">
            {quote.quote}
          </Typography>
          <Typography
            variant="small"
            className="text-blue-gray-600 mt-2 font-semibold"
          >
            — {quote.author}
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default QuotesDetails;
