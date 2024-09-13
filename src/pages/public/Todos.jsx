import TodosCard from "@/components/card/TodosCard";
import TodosModal from "@/components/modal/TodosModal";
import Pagination from "@/components/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useCreateData, useFetchData } from "@/hooks";
import useGetRandomTodo from "@/hooks/useGetRandomTodo";
import request from "@/services";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as API from "@/constants/api";
const Todos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const [skip, setSkip] = useState(0);
  const [randomTodoData, setRandomTodoData] = useState([]);

  const { data: todo } = useFetchData("todos", skip);
  const { mutate: createTodos } = useCreateData("todos");

  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      id: data.id.toString(),
    };
    createTodos(parsedData);
    handleOpen();
  };

  const handleOpen = (element) => {
    setTableElement(element ? element : {});
    setIsOpen(!isOpen);
  };
  const getTodo = async () => {
    try {
      const response = await request.get(API.RANDOM_TODO);
      setRandomTodoData(response.data);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
  const randomTodoHandler = () => {
    getTodo();
  };
  useEffect(() => {
    getTodo();
  }, []);
  const pageProps = {
    skip,
    setSkip,
    totalPages: Math.ceil((todo?.total || 0) / LIMIT),
    limit: LIMIT,
  };

  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";

  return (
    <div className="my-6">
      <div className="flex gap-10">
        <Button className={classBtn} onClick={() => handleOpen({})}>
          Create Todos
        </Button>
        <Button className={classBtn} onClick={randomTodoHandler}>
          Random Todos
        </Button>
      </div>

      {randomTodoData && (
        <Card className="w-full max-w-sm my-4 shadow-md border border-gray-200 rounded-lg">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography
                variant="small"
                className="font-bold text-blue-gray-800"
              >
                Todo ID: {randomTodoData.id}
              </Typography>
              <Typography
                variant="small"
                color={randomTodoData.completed ? "green" : "red"}
                className="font-semibold"
              >
                {randomTodoData.completed ? "Completed" : "Incomplete"}
              </Typography>
            </div>

            <Typography variant="small" className="mb-2 text-gray-700">
              {randomTodoData.todo}
            </Typography>

            <div className="flex justify-between items-center mt-4">
              <Button
                color={randomTodoData.completed ? "green" : "blue"}
                variant="filled"
                size="sm"
              >
                {randomTodoData.completed
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      <Card className="my-6 bg-transparent" shadow={false}>
        <CardBody
          className="pt-0 px-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {todo?.todos.length > 0 ? (
              todo?.todos.map((todos) => (
                <TodosCard key={todos.id} {...todos} handleOpen={handleOpen} />
              ))
            ) : (
              <p>No todos found</p>
            )}
          </div>
        </CardBody>
        <Pagination {...pageProps} />
      </Card>

      <TodosModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        element={tableElement}
      />
    </div>
  );
};

export default Todos;
