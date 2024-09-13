import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import RatingStars from "../rating/RatingStars";
import { useDeleteData } from "@/hooks/useDeleteData";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const ProductCard = ({
  images,
  title,
  price,
  description,
  category,
  rating,
  brand,
  id,
  dimensions,
  handleOpen,
}) => {
  const navigate = useNavigate();
  const { mutate: deleteProduct } = useDeleteData("products");

  const handleDelete = () => {
    deleteProduct(id);
  };

  const goProduct = () => {
    navigate(`/dashboard/products/${id}`);
  };

  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-72 cursor-pointer pt-4"
        onClick={goProduct}
      >
        <img
          src={images[0]}
          alt="card-image"
          className="h-full w-full object-cover hover:scale-105 delay-100 duration-300"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex justify-between">
          <Typography variant="small" className="font-medium text-sm w-full">
            {title || "No Title Available"}
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="font-semibold text-sm"
          >
            ${price !== undefined ? price : "0.00"}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-3">
          <RatingStars rating={rating} />
          <Typography
            variant="small"
            color="gray"
            className="font-semibold text-sm"
          >
            {brand || "Unknown Brand"}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description || "No Description Available"}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-auto flex justify-end gap-4">
        <Button
        className="bg-none"
          onClick={() =>
            handleOpen({
              id,
              title,
              price,
              description,
              category,
              brand,
              width: dimensions?.width,
              height: dimensions?.height,
              depth: dimensions?.depth,
            })
          }
          color="blue"
        >
          <PencilSquareIcon className="h-4 w-4 text-white" />
        </Button>
        <Button className="bg-red-500 text-white " onClick={handleDelete}>
        <TrashIcon className="h-4 w-4 text-white"/>
        </Button>
      </CardFooter>
      <div className="absolute right-3 top-1">
        <span className="text-sm text-blue-gray-600 capitalize">
          {category || "No Category"}
        </span>
      </div>
    </Card>
  );
};

export default ProductCard;
