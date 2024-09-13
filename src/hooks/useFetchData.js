import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import * as API from "@/constants/api";

const fetchData = async ({ key, skip, searchQuery, sortBy, order, limit }) => {
  let url = `${API.DOMAIN}/${key}`;

  if (searchQuery) {
    url = `${API.DOMAIN}/${key}/search?q=${searchQuery}`;
  } else {
    url += `?limit=${limit || API.LIMIT}&skip=${skip || 0}`; 
  }

  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const response = await request.get(url);
  return response.data;
};

const useData = (key, skip, searchQuery, sortBy, order, limit) => {
  return useQuery({
    queryKey: [key, skip, searchQuery, sortBy, order, limit],
    queryFn: () => fetchData({ key, skip, searchQuery, sortBy, order, limit }),
    onError: (error) => {
      toast.error("Error fetching data", error.message);
    },
  });
};

export const useFetchData = (key, skip, searchQuery, sortBy, order, limit) =>
  useData(key, skip, searchQuery, sortBy, order, limit);
