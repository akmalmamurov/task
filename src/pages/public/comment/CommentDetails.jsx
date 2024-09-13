import useFetchDataById from "@/hooks/useFetchDataById";
import { Button } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";

const CommentDetails = () => {
  const { id } = useParams();
  const { data: comment } = useFetchDataById("comments", id);

  return (
    <div className="my-6">
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
      <div className="my-6">
        <div className="p-6 my-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Comment Details for Post {id}
          </h2>
          {comment ? (
            <div key={comment.id} className="border-b border-gray-200 py-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  {comment.user.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {comment.user.fullName}
                      </h3>
                      <p className="mt-2 text-gray-700">{comment.body}</p>

                      <span className="text-sm text-gray-500">
                        @{comment.user.username}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold">
                      👍 {comment.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>No comment available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
