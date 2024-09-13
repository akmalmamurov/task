import RatingStars from "@/components/rating/RatingStars";
import useGetMealData from "@/hooks/useGetMealData";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";

const RecipMeal = () => {
  const { id } = useParams();
  console.log(id);
  const { data: recipe } = useGetMealData(id);
  console.log(recipe);
  return (
    <div className="my-6">
      <div className="flex flex-col  gap-10">
        <Link to="/dashboard/recipes" className="">
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
            <Typography variant="h5" className="font-bold">
              {recipe?.recipes?.length} - {id}
            </Typography>

      </div>
      <div className="my-6">
        <div className="grid grid-cols-5 gap-4">
          {recipe?.recipes?.map((item,index) => (
            <Card className="h-full flex flex-col relative" key={index}>
              <CardHeader
                shadow={false}
                floated={false}
                className="h-72 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-3 flex justify-between items-center">
                  <Typography variant="h5" className="font-bold">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-medium text-blue-gray-600"
                  >
                    {item.cuisine}
                  </Typography>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-medium"
                  >
                    {item.difficulty} - {item.cookTimeMinutes} mins
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-medium"
                  >
                    {item.caloriesPerServing} kcal
                  </Typography>
                </div>
                <div className="flex  gap-2 items-center mb-3">
                  <RatingStars rating={item.rating} />
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-medium"
                  >
                    ({item.reviewCount} reviews)
                  </Typography>
                </div>

                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  Ingredients: {item.ingredients.slice(0, 3).join(", ")}...
                  <Link
                    to={`/dashboard/recipes/${item.id}`}
                    className="text-blue-500"
                  >
                    more
                  </Link>
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipMeal;
