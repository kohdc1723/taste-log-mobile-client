import { Category, Profile } from "@/types/domains";
import { getEncrytedStorage } from "@/utils/encryptedStorage";
import { axiosInstance } from "@/api/axios";

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type ResponseProfile = Profile & Category;

const signUp = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post("/auth/signup", {
    email,
    password
  });

  return data;
};

const signIn = async ({ email, password }: RequestUser): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post("/auth/signin", {
    email,
    password
  });

  return data;
};

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get("/auth/me");

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncrytedStorage("refreshToken");

  const { data } = await axiosInstance.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  return data;
};

const signOut = async () => {
  await axiosInstance.post("/auth/logout");
};

export {
  signUp,
  signIn,
  getProfile,
  getAccessToken,
  signOut
};

export type {
  RequestUser,
  ResponseToken,
  ResponseProfile
};