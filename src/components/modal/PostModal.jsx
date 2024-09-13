import { Button, Dialog, DialogBody, DialogHeader, Input, Textarea } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PostModal = (props) => {
  const { isOpen, handleOpen, onSubmit, element } = props;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    reset(element);
    reset();
  }, [handleOpen, isOpen, element, reset]);
  return (
    <Dialog size="xs" open={isOpen} onClose={handleOpen} handler={handleOpen}>
      <DialogHeader>Post Create</DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col`}>
            <label htmlFor={"userid"} className={`label text-blue-gray-600`}>
              User id:
            </label>
            <div>
              <Input
                error={errors.userId ? true : false}
                id={"userId"}
                label={"User id"}
                type="number"
                {...register("userId", {
                  required: `User id can't be empty`,
                })}
              />
              {errors.userId && (
                <span className="text-red-500 text-sm">
                  {errors.userId.message}
                </span>
              )}
            </div>
          </div>
          <div className={`flex flex-col`}>
            <label htmlFor={"title"} className={`label text-blue-gray-600`}>
              Title:
            </label>
            <div>
              <Input
                error={errors.title ? true : false}
                id={"title"}
                label={"Title"}
                type="text"
                {...register("title", {
                  required: `Title can't be empty`,
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>
          <div className={`flex flex-col`}>
            <label htmlFor={"title"} className={`label text-blue-gray-600`}>
              Body:
            </label>
            <div>
              <Textarea
                error={errors.body ? true : false}
                id={"body"}
                resize  
        
                label={"Body"}
                type="text"
                className="min-h-[125px]"
                {...register("body", {
                  required: `Body can't be empty`,
                })}
              />
              {errors.body && (
                <span className="text-red-500 text-sm">
                  {errors.body.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button variant="gradient" color="red" onClick={handleOpen} className="mr-1 ml-2">
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="blue-gray">
              {Object.keys(element).length === 0 ? "Add Post" : "Update"}
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default PostModal;
