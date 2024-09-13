import CommentCard from "@/components/card/CommentCard";
import CommentModal from "@/components/modal/CommentModal";
import Pagination from "@/components/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useCreateData, useFetchData } from "@/hooks";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";

const Comments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const [skip, setSkip] = useState(0);
  const { data: comment } = useFetchData("comments", skip);
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
          <div className="grid grid-cols-4 gap-4">
            {comment?.comments.length > 0 ? (
              comment?.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  {...comment}
                  handleOpen={handleOpen}
                />
              ))
            ) : (
              <p>No comments found</p>
            )}
          </div>
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
