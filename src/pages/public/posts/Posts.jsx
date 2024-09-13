import PostModal from "@/components/modal/PostModal";
import Pagination from "@/components/pagination/Pagination";
import { useCreateData, useFetchData } from "@/hooks";
import { useDeleteData } from "@/hooks/useDeleteData";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Posts = () => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const ref = useRef(null);
  const navigate = useNavigate();
  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";
  const handleOpen = (element) => {
    setTableElement(element ? element : {});
    setIsOpen(!isOpen);
  };
  const limit = 10;

  const [debouncedSearch] = useDebounce(search, 1000);

  const { data: post, isLoading } = useFetchData(
    "posts",
    skip,
    debouncedSearch,
    sortBy,
    order,
    limit
  );
  const { mutate: createPost } = useCreateData("posts");
  const { mutate: deletePost } = useDeleteData("posts");
  const onSubmit = (data) => {
    const parsetData = {
      ...data,
      userId: tableElement.userId || data.userId,
    };
    console.log(parsetData);

    createPost(parsetData);
    handleOpen();
  };
  const goPost = (id) => {
    navigate(`/dashboard/posts/${id}`);
  };
  const goComment = (id) => {
    navigate(`/dashboard/posts/${id}/comments`);
  };

  const handleDelete = (id) => {
    deletePost(id);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((post?.total || 0) / limit),
    limit: limit,
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Spinner className="h-12 w-12 text-blue-gray-500" />
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="flex mb-4 justify-between flex-wrap">
        <div className="flex gap-10 xl:mb-0 mb-3">
          <Button className={classBtn} onClick={() => handleOpen({})}>
            Create Posts
          </Button>
          <div className="relative" ref={ref}>
            <Input
              value={search}
              label="Search"
              type="text"
              onChange={handleSearch}
              className="bg-white"
            />
            {search && (
              <span className="cursor-pointer" onClick={() => setSearch("")}>
                <XMarkIcon className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-10">
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            className="bg-white"
          >
            <Option value="title">Title</Option>
            <Option value="reactions">Reactions</Option>
          </Select>
          <Select
            label="Order"
            value={order}
            onChange={(value) => setOrder(value)}
            className="bg-white"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Button
            className={classBtn}
            onClick={() => {
              setSortBy("");
              setOrder("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      <Card className="my-6 bg-transparent" shadow={false}>
        <CardBody
          className="px-0 pt-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {post?.posts.length > 0 ? (
              post?.posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 mb-6 bg-white rounded shadow flex flex-col justify-between"
                >
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.body}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>👍 {post.reactions.likes}</span>
                      <span>👎 {post.reactions.dislikes}</span>
                      <span>👁️ {post.views} views</span>
                    </div>
                  </div>
                  <CardFooter className="flex justify-end gap-2 mt-4">
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white shadow-md"
                      onClick={() => handleOpen(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white shadow-md"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 text-white shadow-md"
                      onClick={() => goPost(post.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-600 text-white shadow-md"
                      onClick={() => goComment( post.id)}
                    >
                      Post Comments
                    </Button>
                  </CardFooter>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 h-[50vh] flex items-center justify-center">
                <Typography variant="h5" color="black">
                  No posts found
                </Typography>
              </div>
            )}
          </div>
        </CardBody>
        {post?.posts?.length > 0 && (
          <div className="mt-4">
            <Pagination {...pageProps} />
          </div>
        )}
      </Card>
      <PostModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Posts;
