import axios from "axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom, IUserInfo } from "./atoms";

export const baseUrl = "http://127.0.0.1:8000/api/v1";

export async function fetchCollections(pk: string | undefined) {
  return await (await fetch(`${baseUrl}/users/${pk}/collection`)).json();
}
