import * as API from "@/constants/api";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

const getRandomTodo = async () => {
  const response = await request.get(`${API.RANDOM_TODO}`);
  return response.data;
};

const useGetRandomTodo = () => {
  return useQuery({
    queryKey: ["todo", ],
    queryFn: () => getRandomTodo(),
  });
};

export default useGetRandomTodo;
