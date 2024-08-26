import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getAccessToken, getProfile, ResponseProfile, signIn, signOut, signUp } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/commons";
import { removeEncryptedStorage, setEncrytedStorage } from "@/utils/encryptedStorage";
import { removeHeader, setHeader } from "@/utils/headers";
import queryClient from "@/api/queryClient";

const useSignUp = (mutationOptions?: UseMutationCustomOptions) => useMutation({
  mutationFn: signUp,
  ...mutationOptions
});

const useSignIn = (mutationOptions?: UseMutationCustomOptions) => useMutation({
  mutationFn: signIn,
  onSuccess: ({ accessToken, refreshToken }) => {
    setEncrytedStorage("refreshToken", refreshToken);
    setHeader("Authorization", `Bearer ${accessToken}`);
  },
  onSettled: () => {
    queryClient.refetchQueries({ queryKey: ["auth", "getAccessToken"] });
    queryClient.invalidateQueries({ queryKey: ["auth", "getProfile"] });
  },
  ...mutationOptions
});

const useGetRefreshToken = () => {
  const { isSuccess, data, isError } = useQuery({
    queryKey: ["auth", "getAccessToken"],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 20,
    refetchInterval: 1000 * 60 * 20,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader("Authorization", `Bearer ${data.accessToken}`);
      setEncrytedStorage("refreshToken", data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      removeEncryptedStorage("refreshToken");
    }
  }, [isError]);

  return { isSuccess, isError };
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions<ResponseProfile>) => useQuery({
  queryKey: ["auth", "getProfile"],
  queryFn: getProfile,
  ...queryOptions
});

const useLogout = (mutationOptions?: UseMutationCustomOptions) => useMutation({
  mutationFn: signOut,
  onSuccess: () => {
    removeHeader("Authorization");
    removeEncryptedStorage("refreshToken");
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  },
  ...mutationOptions
});

const useAuth = () => {
  const signupMutation = useSignUp();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess
  });
  const isLoggedIn = getProfileQuery.isSuccess;
  const loginMutation = useSignIn();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLoggedIn,
    getProfileQuery,
    logoutMutation
  };
};

export default useAuth;