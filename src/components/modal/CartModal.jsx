import { Button, Typography } from "@material-tailwind/react";

const CartModal = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;
  console.log(products);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Products</h2>
        <div>
          {products.map((product, index) => (
            <div className="flex justify-between items-center flex-wrap" key={index}>
              <div className="w-[20%]">
                <img src={product.thumbnail} alt="" className="w-10 h-10" />
              </div>
              <div className="w-[80%] flex  gap-10">
                <Typography>Quantity: {product.quantity}</Typography>
                <Typography>Price: ${product.price}</Typography>
              </div>
              <Typography variant="small" className="font-medium"></Typography>
            </div>
          ))}
        </div>
        <Button onClick={onClose} className="mt-4 bg-blue-500 text-white">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
