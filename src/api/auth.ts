import { Category, Profile } from "@/types/domains";
import { getEncrytedStorage } from "@/utils/encryptedStorage";
import { axiosInstance as axios } from "@/api/axios";

type UserRequest = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type ResponseProfile = Profile & Category;

const signUp = async ({ email, password }: UserRequest): Promise<void> => {
  const { data } = await axios.post("/auth/signup", {
    email,
    password
  });

  return data;
};

const signIn = async ({ email, password }: UserRequest): Promise<ResponseToken> => {
  const { data } = await axios.post("/auth/signin", {
    email,
    password
  });

  return data;
};

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axios.get("/auth/me");

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncrytedStorage("refreshToken");

  const { data } = await axios.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  return data;
};

const signOut = async () => {
  await axios.post("/auth/logout");
};

export {
  signUp,
  signIn,
  getProfile,
  getAccessToken,
  signOut
};

export type {
  UserRequest,
  ResponseToken,
  ResponseProfile
};