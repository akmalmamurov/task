import * as API from "@/constants/api";
import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteFunction = async (key, id) => {
  await request.delete(`${API.DOMAIN}/${key}/${id}`);
};

const deleteData = (key) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteFunction(key, id),
    onSuccess: (_, id) => {
      toast.success(`${key} ID ${id} deleted successfully`, { theme: "light" });
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: (error) => {
      console.error("There was an error deleting the data!", error);
      toast.error("Error deleting data", { theme: "colored" });
    },
  });
};

export const useDeleteData = (key) => {
  return deleteData(key);
};
