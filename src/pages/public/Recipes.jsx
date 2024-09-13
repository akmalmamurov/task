import RecipesCard from "@/components/card/RecipesCard";
import Pagination from "@/components/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useFetchData } from "@/hooks";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";

const Recipes = () => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const ref = useRef(null);
  console.log(search);
  const { data: recipe, isLoading } = useFetchData(
    "recipes",
    skip,
    search,
    sortBy,
    order
  );
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearch("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((recipe?.total || 0) / LIMIT),
    limit: LIMIT,
  };
  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";
  return (
    <div className="my-6">
      <div className="flex mb-4 justify-between">
        <div className="flex gap-10 w-[40%] relative">
          <Input
            value={search}
            label="Search Recipe"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white"
          />
          {search && (
            <span className="cursor-pointer" onClick={(e) => setSearch("")}>
              <XMarkIcon className="absolute top-3 right-14 h-5 w-5 text-gray-400" />
            </span>
          )}
        </div>
        <div className="flex gap-10">
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            className="bg-white"
          >
            <Option value="name">Name</Option>
            <Option value="reviews">Reviews</Option>
            <Option value="rating">Rating</Option>
          </Select>
          <Select
            label="Order"
            value={order}
            onChange={(value) => setOrder(value)}
            className="bg-white"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Button
            className={classBtn}
            onClick={() => {
              setSortBy("");
              setOrder("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      <Card className="my-6 bg-transparent" shadow={false}>
        <CardBody
          className="px-0 pt-0 pb-2 overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          {isLoading ? (
            <div className="flex justify-center my-10 h-[50vh] items-center">
              <Spinner className="h-12 w-12 text-blue-gray-500" />
            </div>
          ) : (
            <>
              {recipe?.recipes?.length > 0 ? (
                <div className="grid grid-cols-4 gap-8">
                  {recipe?.recipes.map((el, index) => (
                    <RecipesCard key={index} {...el} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center my-10 h-[50vh] items-center">
                  <Typography color="blue-gray" variant="h6">
                    {search ? "No such recipe found" : "No recipes found"}
                  </Typography>
                </div>
              )}
            </>
          )}
        </CardBody>

        {/* Pagination */}
        {recipe?.recipes?.length > 0 && (
          <div className="mt-4">
            <Pagination {...pageProps} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Recipes;
