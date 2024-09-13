import CommentCard from "@/components/card/CommentCard";
import CommentModal from "@/components/modal/CommentModal";
import Pagination from "@/components/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useCreateData, useFetchData } from "@/hooks";
import { Button, Card, CardBody, Spinner } from "@material-tailwind/react";
import { useState } from "react";

const Comments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const [skip, setSkip] = useState(0);
  const { data: comment, isLoading } = useFetchData("comments", skip);
  const { mutate: createComment } = useCreateData("comments");
  const onSubmit = (data) => {
    createComment(data);
    handleOpen();
  };
  const handleOpen = (element) => {
    setTableElement(element ? element : {});
    setIsOpen(!isOpen);
  };
  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((comment?.total || 0) / LIMIT),
    limit: LIMIT,
  };
  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";
  return (
    <div className="my-6">
      <div className="">
        <Button className={classBtn} onClick={() => handleOpen({})}>
          Create Comments
        </Button>
      </div>
      <Card className="my-6 bg-transparent" shadow={false}>
        <CardBody
          className="pt-0 px-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          {isLoading ? (
            <div className="flex justify-center my-10 h-[50vh] items-center">
              <Spinner className="h-12 w-12 text-blue-gray-500" />
            </div>
          ) : (
            <>
              {comment?.comments?.length > 0 ? (
                <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-8">
                  {comment?.comments.map((el, index) => (
                    <CommentCard key={index} {...el} handleOpen={handleOpen} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center my-10 h-[50vh] items-center">
                  <Typography color="blue-gray" variant="h6">
                    {search ? "No such comment found" : "No products found"}
                  </Typography>
                </div>
              )}
            </>
          )}
        </CardBody>
        <Pagination {...pageProps} />
      </Card>
      <CommentModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Comments;
