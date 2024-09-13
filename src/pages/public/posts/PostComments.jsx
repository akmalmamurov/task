import {Link} from "react-router-dom"
import { useParams } from "react-router-dom";
import useGetPostComment from "@/hooks/useGetPostComment";
import { Button } from "@material-tailwind/react";

const PostComments = () => {
  const { id } = useParams();
  const { data: comment } = useGetPostComment(id);

  return (
    <div className="my-6">
        <Link to="/dashboard/posts">
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
      <div className="p-6 my-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Comments for Post {id}</h2>
        {comment?.comments && comment.comments.length > 0 ? (
          comment.comments.map((singleComment) => (
            <div
              key={singleComment.id}
              className="border-b border-gray-200 py-4"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  {singleComment.user.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {singleComment.user.fullName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        @{singleComment.user.username}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold">
                      👍 {singleComment.likes}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{singleComment.body}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">
            <p>No comments available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComments;
