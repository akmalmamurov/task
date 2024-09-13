import { Button, Dialog, DialogBody, DialogHeader, Input } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const CreateCartModal = ({ isOpen, handleOpen, onSubmit }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      userId: "",
      products: [{ name: "", quantity: 1, price: 0 }],
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset({
        userId: "",
        products: [{ name: "", quantity: 1, price: 0 }], 
      });
    }
  }, [isOpen, reset]);

  const handleAddProduct = () => {
    const currentValues = control._defaultValues;
    const newProducts = [...currentValues.products, { name: "", quantity: 1, price: 0 }];
    reset({ ...currentValues, products: newProducts });
  };

  const handleRemoveProduct = (index) => {
    const currentValues = control._defaultValues;
    const updatedProducts = currentValues.products.filter((_, i) => i !== index);
    reset({ ...currentValues, products: updatedProducts });
  };

  return (
    <Dialog open={isOpen} handler={handleOpen} onClose={handleOpen}>
      <DialogHeader>Create New Cart</DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="userId" className="text-blue-gray-600">User ID:</label>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <Input
                  label="User ID"
                    id="userId"
                    {...field}
                    error={!!errors.userId}
                  />
                )}
                rules={{ required: "User ID is required" }}
              />
              {errors.userId && (
                <span className="text-red-500 text-sm">{errors.userId.message}</span>
              )}
            </div>
            {control._defaultValues.products.map((product, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center mb-4">
                <Controller
                  name={`products[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                    label="Product Name"
                      type="text"
                      {...field}
                      error={!!errors?.products?.[index]?.name}
                    />
                  )}
                  rules={{ required: "Product name is required" }}
                />
                <Controller
                  name={`products[${index}].quantity`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      {...field}
                      error={!!errors?.products?.[index]?.quantity}
                    />
                  )}
                  rules={{ required: "Quantity is required", min: 1 }}
                />
                <Controller
                  name={`products[${index}].price`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Price"
                      type="number"
                      min="0"
                      step="1"
                      {...field}
                      error={!!errors?.products?.[index]?.price}
                    />
                  )}
                  rules={{ required: "Price is required", min: 0 }}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    color="red"
                    onClick={() => handleRemoveProduct(index)}
                    className="bg-red-500 text-white w-8 h-8 rounded-full"
                  >
                    &times;
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleAddProduct} className="bg-green-500 text-white mt-2">
              Add Product
            </Button>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={handleOpen} className="bg-gray-400 text-white">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Create Cart
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default CreateCartModal;
