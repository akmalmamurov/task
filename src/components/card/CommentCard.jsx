import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography, Button, CardFooter, } from "@material-tailwind/react";
import { useDeleteData } from "@/hooks/useDeleteData";

const CommentCard = (props) => {
  const { id, body, postId, likes, user, handleOpen } = props;
  const navigate = useNavigate();
  const { mutate: deleteComment } = useDeleteData("comments");
  const handleDelete = (id) => {
    deleteComment(id);
  };
  const goComment = (id) => {
    navigate(`/dashboard/comments/${id}`);
  };
  const goPost = (id) => {
    navigate(`/dashboard/comments/post/${id}`);
  };
  return (
    <Card className="w-full max-w-md my-6 shadow-md border border-gray-200 rounded-lg">
      <CardBody>
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
            {user.username[0].toUpperCase()}
          </div>
          <Typography variant="h6" color="blue-gray" className="font-bold mb-1">
            {user.fullName} (@{user.username})
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="mb-2 text-blue-gray-500"
        >
          {body}
        </Typography>
        <div className="mt-4">
          <span className="text-green-600 font-semibold">👍 {likes}</span>
        </div>
        <CardFooter className="px-0 pt-4 pb-0">
          <div className="flex gap-4 mb-4">
            <Button
              size="sm"
              className="bg-blue-500 text-white shadow-md"
              fullWidth
              onClick={() => handleOpen({ body, postId, userId: user.id })}
            >
              Edit
            </Button>
            <Button
              size="sm"
              className="bg-red-500 text-white shadow-md"
              fullWidth
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </div>
          <div className="flex gap-4 ">
            <Button
              size="sm"
              className="bg-green-500 text-white shadow-md"
              fullWidth
              onClick={() => goComment(id)}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="bg-yellow-600 text-white shadow-md"
              fullWidth
              onClick={() => goPost(postId)}
            >
              Post Comments
            </Button>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
