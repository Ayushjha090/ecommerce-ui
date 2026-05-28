import { useMutation } from "@tanstack/react-query";

import { adminLogin } from "../api";

export const useAdminAuth = () => {
  const loginMutation = useMutation({
    mutationFn: adminLogin,
  });

  return {
    login: {
      login: loginMutation.mutate,
      loginAsync: loginMutation.mutateAsync,
      loginMutation,
      response: loginMutation.data,
      error: loginMutation.error,
      isError: loginMutation.isError,
      isFetching: loginMutation.isPending,
      isLoading: loginMutation.isPending,
      isPending: loginMutation.isPending,
      isSuccess: loginMutation.isSuccess,
      reset: loginMutation.reset,
      status: loginMutation.status,
    },
  };
};
