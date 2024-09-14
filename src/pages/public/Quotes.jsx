import { useFetchData } from "@/hooks";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import * as API from "@/constants/api";
import request from "@/services";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import QuotesCard from "@/components/card/QuotesCard";

const Quotes = () => {
  const [skip, setSkip] = useState(0);

  const [randomQuoteData, setRandomQuoteData] = useState(null);

  const limit = 20;

  const { data: quote, isLoading } = useFetchData("quotes", skip);

  const getQuote = async () => {
    try {
      const response = await request.get(API.QUOTE_RANDOM);
      setRandomQuoteData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const randomQuoteHandler = () => {
    getQuote();
  };

  useEffect(() => {
    getQuote();
  }, []);
  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((quote?.total || 0) / limit),
    limit: limit,
  };
  return (
    <div className="my-6 ">
      <Button
        className="min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm"
        onClick={randomQuoteHandler}
      >
        Random Quotes
      </Button>
      {randomQuoteData && (
        <Card className="w-full max-w-md p-6 my-6 bg-white shadow-md">
          <Typography variant="h5" className="text-blue-gray-800 font-bold">
            {randomQuoteData.quote}
          </Typography>
          <Typography variant="small" className="text-blue-gray-600 mt-2">
            — {randomQuoteData.author}
          </Typography>
        </Card>
      )}
      <Card className="my-6 bg-transparent" shadow={false}>
        <CardBody
          className="pt-0 px-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          {isLoading ? (
            <div className="flex justify-center my-10 h-[50vh] items-center">
              <Spinner className="h-12 w-12 text-blue-gray-500" />
            </div>
          ) : (
            <>
              {quote?.quotes?.length > 0 ? (
                <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-8">
                  {quote?.quotes.map((el, index) => (
                    <QuotesCard key={index} {...el} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center my-10 h-[50vh] items-center">
                  <Typography color="blue-gray" variant="h6">
                    {search ? "No such Qoutes found" : "No quotes found"}
                  </Typography>
                </div>
              )}
            </>
          )}
        </CardBody>
        <Pagination {...pageProps} />
      </Card>
    </div>
  );
};

export default Quotes;
