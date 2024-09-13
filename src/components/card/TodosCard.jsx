import { useDeleteData } from "@/hooks/useDeleteData";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

const TodosCard = (props) => {
  const { id, todo, completed, userId, handleOpen } = props;
  const { mutate: deleteTodo } = useDeleteData("todos");

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <Card className="w-full max-w-sm my-4 shadow-md border border-gray-200 rounded-lg">
      <CardBody>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="small" className="font-bold text-blue-gray-800">
            Todo ID: {id}
          </Typography>
          <Typography
            variant="small"
            color={completed ? "green" : "red"}
            className="font-semibold"
          >
            {completed ? "Completed" : "Incomplete"}
          </Typography>
        </div>

        <Typography variant="small" className="mb-2 text-gray-700">
          {todo}
        </Typography>

        <div className="flex justify-between items-center mt-4">
          <Button
            color={completed ? "green" : "blue"}
            variant="filled"
            size="sm"
          >
            {completed ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
        </div>
      </CardBody>

      <CardFooter className="pt-4 pb-0 mt-auto">
        <div className="flex items-center gap-4 mb-4">
          <span
            className="cursor-pointer"
            onClick={() => handleOpen({ id, todo, userId })}
          >
            <PencilSquareIcon className="w-5 h-5 text-blue-600" />
          </span>
          <span className="cursor-pointer" onClick={() => handleDelete(id)}>
            <TrashIcon className="w-5 h-5 text-red-500" />
          </span>

          <Button
            className="bg-yellow-600 text-white shadow-md capitalize"
            fullWidth
          >
            See more
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodosCard;
