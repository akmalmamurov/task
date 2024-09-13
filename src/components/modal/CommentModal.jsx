import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CommentModal = (props) => {
  const { isOpen, handleOpen, element, onSubmit } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    reset(element);
    reset();
  }, [handleOpen, isOpen, element, reset]);
  return (
    <Dialog size="xs" open={isOpen} handler={handleOpen}>
      <DialogHeader className="text-blue-gray-600">
        Comment created
      </DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 ">
            <div className="flex flex-col mb-4">
              <label htmlFor="body" className="label text-blue-gray-600">
                Body:
              </label>
              <Input
                id="body"
                label="Body"
                type="text"
                {...register("body", {
                  required: "Body ca'nt be empty",
                })}
              />
              {errors.body && (
                <span className="text-red-500 text-sm">
                  {errors.body.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="postId" className="label text-blue-gray-600">
                Post id:
              </label>
              <Input
                id="postId"
                label="Post id"
                type="number"
                {...register("postId", {
                  required: "Post id ca'nt be empty",
                })}
              />
              {errors.postId && (
                <span className="text-red-500 text-sm">
                  {errors.postId.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="userId" className="label text-blue-gray-600">
                User id:
              </label>
              <Input
                id="userId"
                label="User id"
                type="number"
                {...register("userId", {
                  required: "User id ca'nt be empty",
                })}
              />
              {errors.userId && (
                <span className="text-red-500 text-sm">
                  {errors.userId.message}
                </span>
              )}
            </div>
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

export default CommentModal;
