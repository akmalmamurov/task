import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "@/components/rating/RatingStars";
import { useState } from "react";
import useFetchDataById from "@/hooks/useFetchDataById";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const RecipesDetails = () => {
  const { id } = useParams();
  const { data: recipe } = useFetchDataById("recipes", id);
  const [open, setOpen] = useState(false);

  if (!recipe) {
    return (
      <div className="h-[70vh]  flex justify-center items-center">
        <Spinner className="h-12 w-12 text-blue-gray-500" />
      </div>
    );
  }

  const handleToggleInstructions = () => {
    setOpen(!open);
  };

  return (
    <div className="my-6 h-full min-h-fit flex">
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
      <Card className="w-full max-w-[80%] flex-row items-center mx-auto h-full relative">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none h-full border-r"
        >
          <img
            src={recipe.image}
            alt="recipe-image"
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
              {recipe.name}
            </Typography>
            <RatingStars rating={recipe.rating} />
          </div>

          <div className="flex justify-between items-start mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-base"
            >
              Cuisine: {recipe.cuisine}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold text-base"
            >
              Servings: {recipe.servings}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold text-base"
            >
              Meal Type: {recipe.mealType.join(", ")}
            </Typography>
          </div>

          <div className="flex gap-10 mb-4">
            <Typography
              variant="small"
              className="font-bold text-base text-black"
            >
              Prep Time: {recipe.prepTimeMinutes} mins
            </Typography>
            <Typography
              variant="small"
              className="font-bold text-base text-black"
            >
              Cook Time: {recipe.cookTimeMinutes} mins
            </Typography>
            <Typography
              variant="small"
              className="font-bold text-base text-black"
            >
              Difficulty: {recipe.difficulty}
            </Typography>
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-bold text-lg mb-2"
            >
              Ingredients
            </Typography>
            {recipe.ingredients.map((ingredient, index) => (
              <Typography
                key={index}
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {ingredient}
              </Typography>
            ))}
          </div>

          <Accordion open={open}>
            <AccordionHeader
              onClick={handleToggleInstructions}
              className="border-none"
            >
              <div className="flex items-center justify-between gap-8 cursor-pointer relative w-[50%]">
                <Typography
                  variant="small"
                  className="text-base text-black font-medium"
                >
                  Instructions
                </Typography>
                <ChevronRightIcon
                  className={`w-6 h-6 text-black transition-transform ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </div>
            </AccordionHeader>
            <AccordionBody>
              {recipe.instructions.map((step, index) => (
                <Typography
                  key={index}
                  variant="small"
                  className="text-sm font-medium flex gap-2"
                >
                  <span className="font-bold text-black">{index + 1}:</span>
                  <span className="text-black text-sm">{step}</span>
                </Typography>
              ))}
            </AccordionBody>
          </Accordion>
        </CardBody>
        <div className="absolute left-4 top-4">
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {recipe.tags.join(", ")}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default RecipesDetails;
