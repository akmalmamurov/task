import CartModal from "@/components/modal/CartModal";
import CreateCartModal from "@/components/modal/CreateCartModal";
import Pagination from "@/components/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useCreateData, useFetchData } from "@/hooks";
import { useDeleteData } from "@/hooks/useDeleteData";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const Cart = () => {
  const [skip, setSkip] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [tableElement, setTableElement] = useState({});

  const [selectedCartProducts, setSelectedCartProducts] = useState([]);
  const { data: cart } = useFetchData("carts", skip);
  const { mutate: createCart } = useCreateData("carts");
  const {mutate: deleteCart} = useDeleteData("carts");

  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement([]);
    }
    setOpenCreate(!openCreate);
  };

  const onSubmit = (data) => {
    createCart(data);
    handleOpen();
  };
  const handleDelete = (id) => {
    deleteCart(id);
  }
  const openModal = (products) => {
    setSelectedCartProducts(products);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCartProducts([]);
  };
  const totalPages = Math.ceil((cart?.total || 0) / LIMIT);
  const pageProps = {
    skip,
    setSkip,
    totalPages,
    limit: LIMIT,
  };
  return (
    <div className="my-6">
      <div className="mb-4">
        <Button
          className="min-w-fit bg-blue-500 text-white font-bold shadow-md"
          onClick={() => handleOpen(setTableElement({}))}
        >
          Create Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cart?.carts.map((cartItem) => (
          <Card
            key={cartItem.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardBody>
              <Typography variant="h6" className="font-bold">
                Cart ID: {cartItem.id}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Total Products: {cartItem.totalProducts}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Total Quantity: {cartItem.totalQuantity}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Total: ${cartItem.total.toFixed(2)}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Discounted Total: ${cartItem.discountedTotal.toFixed(2)}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <TrashIcon
                className="text-red-500 w-6 h-10 mr-4 cursor-pointer"
                onClick={() => handleDelete(cartItem.id)}
              />

              <Button
                onClick={() => openModal(cartItem.products)}
                className="bg-blue-500 text-white w-full"
              >
                View Products
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        products={selectedCartProducts}
      />
      <div className="mt-6">
        <Pagination {...pageProps} />
      </div>
      <CreateCartModal
        isOpen={openCreate}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Cart;
