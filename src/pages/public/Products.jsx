import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import Pagination from "@/components/pagination/Pagination";
import ProductCard from "@/components/card/ProductCard";
import { LIMIT } from "@/constants/api";
import ProductModal from "@/components/modal/ProductModal";
import { useCreateData,  useFetchData } from "@/hooks";

const Products = () => {
  const [skip, setSkip] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [tableElement, setTableElement] = useState({});

  const { data: product, isLoading } = useFetchData(
    "products",
    skip,
    debouncedSearch,
    sortBy,
    order
  );
  const { mutate: createProduct } = useCreateData("products");
  
  const totalPages = Math.ceil((product?.total || 0) / LIMIT);

  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setOpen(!open);
  };
  const onSubmit = (data) => {
    createProduct(data);
    handleOpen();
  };
  const pageProps = {
    skip,
    setSkip,
    totalPages,
    limit: LIMIT,
  };

  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";

  return (
    <div className="my-6">
      <div className="flex mb-4 justify-between">
        <div className="flex gap-10">
          <Button className={classBtn} onClick={() => handleOpen({})}>
            Create Product
          </Button>
          <Input
            value={search}
            label="Search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="flex gap-10">
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            className="bg-white"
          >
            <Option value="title">Title</Option>
            <Option value="price">Price</Option>
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
              {product?.products?.length > 0 ? (
                <div className="grid grid-cols-4 gap-8">
                  {product?.products.map((el, index) => (
                    <ProductCard key={index} {...el} handleOpen={handleOpen} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center my-10 h-[50vh] items-center">
                  <Typography color="blue-gray" variant="h6">
                    {search ? "No such product found" : "No products found"}
                  </Typography>
                </div>
              )}
            </>
          )}
        </CardBody>

        {/* Pagination */}
        {product?.products?.length > 0 && (
          <div className="mt-4">
            <Pagination {...pageProps} />
          </div>
        )}
      </Card>

      <ProductModal
        isModalOpen={open}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        element={tableElement}
      />
    </div>
  );
};

export default Products;
