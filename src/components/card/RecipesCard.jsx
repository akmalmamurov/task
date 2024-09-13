import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "../rating/RatingStars";

const RecipesCard = ({
  id,
  image,
  name,
  caloriesPerServing,
  cookTimeMinutes,
  cuisine,
  difficulty,
  rating,
  reviewCount,
  ingredients,
  mealType,
}) => {
  const navigate = useNavigate();

  const goRecipeDetails = () => {
    navigate(`/dashboard/recipes/${id}`);
  };
  const goRecipeMeal = () => {
    navigate(`/dashboard/recipes/meal-type/${mealType}`);
  };
  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-72 cursor-pointer"
        onClick={goRecipeDetails}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex justify-between items-center">
          <Typography variant="h5" className="font-bold">
            {name}
          </Typography>
          <Typography
            variant="small"
            className="font-medium text-blue-gray-600"
          >
            {cuisine}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-3">
          <Typography variant="small" color="gray" className="font-medium">
            {difficulty} - {cookTimeMinutes} mins
          </Typography>
          <Typography variant="small" color="gray" className="font-medium">
            {caloriesPerServing} kcal
          </Typography>
        </div>
        <div className="flex  gap-2 items-center mb-3">
          <RatingStars rating={rating} />
          <Typography variant="small" color="gray" className="font-medium">
            ({reviewCount} reviews)
          </Typography>
        </div>

        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          Ingredients: {ingredients.slice(0, 3).join(", ")}...
          <Link to={`/dashboard/recipes/${id}`} className="text-blue-500">
            more
          </Link>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-auto flex justify-end gap-4">
        <Button
          className="bg-blue-500 text-white"
          onClick={goRecipeMeal}
          fullWidth
        >
          Meal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipesCard;
