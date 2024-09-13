import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import * as API from "@/constants/api";

const fetchData = async ({ key, skip, searchQuery, sortBy, order }) => {
  let url = `${API.DOMAIN}/${key}`;

  if (searchQuery) {
    url = `${API.DOMAIN}/${key}/search?q=${searchQuery}`;
  } else {
    url += `?limit=${API.LIMIT}&skip=${skip || 0}`;
  }

  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const response = await request.get(url);
  return response.data;
};

const useData = (key, skip, searchQuery, sortBy, order) => {
  return useQuery({
    queryKey: [key, skip, searchQuery, sortBy, order],
    queryFn: () => fetchData({ key, skip, searchQuery, sortBy, order }),
    onError: (error) => {
      toast.error("Error fetching data", error.message);
    },
  });
};

export const useFetchData = (key, skip, searchQuery, sortBy, order) =>
  useData(key, skip, searchQuery, sortBy, order);
