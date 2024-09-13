import { userHeader } from "@/data";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserModal = (props) => {
  const { isModalOpen, handleOpen, onSubmit, element } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update reset to handle nested address properties correctly
  useEffect(() => {
    if (element && element.address) {
      reset({
        ...element,
        city: element.address.city || "",
        address: element.address.address || "",
      });
    } else {
      reset(element);
    }
  }, [handleOpen, isModalOpen, element, reset]);


  return (
    <Dialog size="xl" open={isModalOpen} handler={handleOpen} onClose={handleOpen}>
      <DialogHeader>{Object.keys(element).length === 0 ? "Add User" : "Update User"}</DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-10">
            {Object.entries(userHeader).map(([key, item]) => {
              // Handle rendering address fields separately
              if (key === "address") return null; 

              return !item.disabled && (
                <div className="flex flex-col" key={key}>
                  <label htmlFor={key} className="label text-blue-gray-600">
                    {item.name}:
                  </label>
                  <div>
                    <Input
                      error={errors[key] ? true : false}
                      id={key}
                      defaultValue={item?.value || null}
                      label={item.name}
                      type={item.type}
                      {...register(key, {
                        required: `Must be filled ${item.name}`,
                      })}
                    />
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Separate fields for city and address */}
            <div className="flex flex-col">
              <label htmlFor="city" className="label text-blue-gray-600">
                City:
              </label>
              <Input
                error={errors.city ? true : false}
                id="city"
                label="City"
                type="text"
                {...register("city", {
                  required: "City must be filled",
                })}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="label text-blue-gray-600">
                Address:
              </label>
              <Input
                error={errors.address ? true : false}
                id="address"
                label="Address"
                type="text"
                {...register("address", {
                  required: "Address must be filled",
                })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button variant="gradient" color="red" onClick={handleOpen} className="mr-1 ml-2">
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="blue-gray">
              {Object.keys(element).length === 0 ? "Add User" : "Update"}
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default UserModal;
