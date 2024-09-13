import * as API from "@/constants/api";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

const getCommentPost = async (id) => {
  const response = await request.get(`${API.COMMENT}/${id}`);
  return response.data;
};

const useGetCommentPost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getCommentPost(id),
  });
};

export default useGetCommentPost;
