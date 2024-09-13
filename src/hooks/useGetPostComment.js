import * as API from "@/constants/api";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

const getPostComment = async (id) => {
  const response = await request.get(`${API.POST}/${id}/comments`);
  return response.data;
};

const useGetPostComment = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostComment(id),
  });
};

export default useGetPostComment;
