import { productHeaderData } from "@/data";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const ProductModal = (props) => {
  const { isModalOpen, handleOpen, onSubmit, element } = props;
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
console.log(element);
  useEffect(() => {
    reset(element);
    reset();
  }, [handleOpen, isModalOpen, element, reset]);
  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={handleOpen}
    >
      <DialogHeader className="text-blue-gray-600">
        Product created
      </DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-10">
            {Object.entries(productHeaderData).map(([key, item]) =>
              item.type === "select" ? (
                <div
                  key={key}
                  className={`flex flex-col mb-4 text-blue-gray-600`}
                >
                  <label htmlFor={item.name} className="label">
                    {item.name}:
                  </label>
                  <Controller
                    name={key}
                    control={control}
                    defaultValue={item[0]}
                    render={({ field }) => (
                      <Select
                        id={item.name}
                        label={item.name}
                        value={field.value}
                        className={`text-sm text-blue-gray-600`}
                        labelProps={{
                          className: `text-blue-gray-600`,
                        }}
                        menuProps={{
                          className: `text-blue-gray-600 `,
                        }}
                        color="blue-gray"
                        onChange={(value) => field.onChange(value)}
                        error={errors[key] ? true : false}
                      >
                        {item.options.map((el, index) => (
                          <Option key={index} value={el} className="capitalize">
                            {el}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  {errors[key] && (
                    <span className="text-red-500 text-sm">
                      {errors[key].message}
                    </span>
                  )}
                </div>
              ) : null
            )}

            {Object.entries(productHeaderData).map(([key, item]) =>
              item.type !== "select" ? (
                <div className={`flex flex-col`} key={key}>
                  <label htmlFor={key} className={`label text-blue-gray-600`}>
                    {item.name}:
                  </label>
                  <div>
                    <Input
                      id={key}
                      defaultValue={item?.value || null}
                      label={item.name}
                      type={item.type}
                      {...register(key, {
                        required: `${item.name} can't be empty`,
                      })}
                    />
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpen}
              className="mr-1 ml-2"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="blue-gray">
            {Object.keys(element).length === 0 ? "Add Product" : "Update"}
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default ProductModal;
