import axios from "axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom, IUserInfo } from "./atoms";

export const baseUrl = "http://127.0.0.1:8000/api/v1";

export async function fetchWords() {
  return await (await fetch(`${baseUrl}/words/`)).json();
  // return axios.get(`${baseUrl}/words/`,null,token);
}

export async function fetchWordsNew(token: string) {
  const { data } = await axios.get(`${baseUrl}/words/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
