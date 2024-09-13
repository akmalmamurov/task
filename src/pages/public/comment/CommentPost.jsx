import useGetCommentPost from "@/hooks/useGetCommentPost";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const CommentPost = () => {
  const { id } = useParams();
  const { data: post } = useGetCommentPost(`${id}`);

  return (
    <div className="my-8 max-w-3xl mx-auto">
        <Link to="/dashboard/comments">
          <Button variant="text" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            Back
          </Button>
        </Link>
      <div className="bg-white shadow-md rounded-lg p-6 my-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Post ID: {id}
        </h1>
        {post?.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Card
              key={comment.id}
              className="w-full mb-4 shadow-md border border-gray-200 rounded-lg"
            >
              <CardBody>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                    {comment.user.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <Typography variant="h6" className="font-semibold">
                          {comment.user.fullName}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-medium">
                          @{comment.user.username}
                        </Typography>
                      </div>
                      <Typography variant="small" color="green" className="font-semibold">
                        👍 {comment.likes}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="mt-2 text-gray-700">
                      {comment.body}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <Typography variant="body2" className="text-center text-gray-500">
            No comments available.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default CommentPost;
