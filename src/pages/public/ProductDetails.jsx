import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Spinner,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "@/components/rating/RatingStars";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import useFetchDataById from "@/hooks/useFetchDataById";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product } = useFetchDataById("products", id);
  const [open, setOpen] = useState(false);

  if (!product) {
    return (
      <div className="h-[70vh]  flex justify-center items-center">
        <Spinner className="h-12 w-12 text-blue-gray-500" />
      </div>
    );
  }

  const handleToggleComments = () => {
    setOpen(!open);
  };

  return (
    <div className="my-6 h-full min-h-fit flex">
      <Link to="/dashboard/products" className="">
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
      <Card className="w-full max-w-[80%] flex-row items-center mx-auto h-full relative">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none h-full border-r"
        >
          <img
            src={product.images[0]}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="p-6 w-3/5">
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h4"
              color="blue-gray"
              className="font-bold mb-3"
            >
              {product.title}
            </Typography>
            <RatingStars rating={product.rating} />
          </div>

          <div className="flex justify-between items-start mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-base"
            >
              {product.brand}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold text-base"
            >
              ${product.price}
            </Typography>
          </div>

          <Typography
            variant="small"
            color="gray"
            className="mb-4 font-normal text-base text-blue-gray-500"
          >
            {product.description}
          </Typography>

          <div className="flex gap-10 mb-8">
            {["Depth", "Width", "Height"].map((dim, index) => (
              <div className="flex flex-col items-center" key={index}>
                <Typography
                  variant="small"
                  className="font-bold text-base text-black"
                >
                  {dim}
                </Typography>
                <Typography
                  variant="small"
                  className="font-semibold text-blue-gray-500"
                >
                  {product.dimensions[dim.toLowerCase()]}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-start mt-auto mb-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2">
                Bar Code
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-bold"
              >
                {product.meta.barcode}
              </Typography>
            </div>

            <div className="flex flex-col items-center">
              <Typography variant="small" color="blue-gray" className="mb-2">
                Availability
              </Typography>
              <span>
                {product.availabilityStatus === "In Stock" ? (
                  <CheckCircleIcon className="h-10 w-10 text-green-500" />
                ) : product.availabilityStatus === "Low Stock" ? (
                  <ExclamationCircleIcon className="h-10 w-10 text-yellow-600" />
                ) : (
                  <XCircleIcon className="h-10 w-10 text-red-500" />
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-start border-b">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium text-base"
              >
                Scan this code to get your product
              </Typography>
              <img
                src={product.meta.qrCode}
                alt="QR Code"
                className="h-32 w-32"
              />
            </div>
          </div>

          <Accordion open={open}>
            <AccordionHeader
              onClick={handleToggleComments}
              className="border-none"
            >
              <div className="flex items-center justify-between gap-8 cursor-pointer relative w-[50%]">
                <div className="">
                  {product.reviews.map((_, index) => (
                    <Avatar
                      key={index}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                      size="xs"
                      alt={`Avatar of reviewer ${index + 1}`}
                      className="absolute border-white border-2 top-0"
                      style={{
                        left: `${index * 14}px`,
                        zIndex: `${product.reviews.length - index}`,
                      }}
                    />
                  ))}
                </div>
                <Typography
                  variant="small"
                  className="text-base text-black font-medium"
                >
                  {product.reviews.length}
                  <span className="ml-2">comments</span>
                </Typography>
                <ChevronRightIcon
                  className={`w-6 h-6 text-black transition-transform ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </div>
            </AccordionHeader>
            <AccordionBody>
              {product.reviews.map(({ reviewerName, comment }, index) => (
                <Typography
                  key={index}
                  variant="small"
                  className="text-sm font-medium flex gap-2"
                >
                  <span className="font-bold text-black">{reviewerName}:</span>
                  <span className="text-black text-sm">{comment}</span>
                </Typography>
              ))}
            </AccordionBody>
          </Accordion>
        </CardBody>
        <div className="absolute left-4 top-4">
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {product.category}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
