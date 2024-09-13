import { Link, useParams } from "react-router-dom"; // Import useParams from 'react-router-dom'
import useFetchDataById from "@/hooks/useFetchDataById"; // Import custom hook
import { Button, Card, CardBody, Chip } from "@material-tailwind/react";

const PostDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const { data: post } = useFetchDataById("posts", id); // Fetch data for the specific post by ID

  return (
    <div className="my-6">
      <Link to="/dashboard/posts" className="">
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
      <Card className="w-[650px] my-6">
        <CardBody>
          {post ? (
            <>
              <div>
                <h2 className="text-2xl font-bold mb-2">{post?.title}</h2>
                <p className="text-gray-700">{post?.body}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {post?.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    value={tag}
                    className="bg-blue-100 text-blue-800"
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Reactions:</span>
                  <div className="flex gap-4 mt-2">
                    <span className="text-green-600">
                      👍 Likes: {post?.reactions.likes}
                    </span>
                    <span className="text-red-600">
                      👎 Dislikes: {post?.reactions.dislikes}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Views:</span>
                  <span className="text-gray-700">{post?.views} views</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-lg font-medium">User ID:</span>
                <span className="text-gray-700 ml-2">{post?.userId}</span>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PostDetails;
