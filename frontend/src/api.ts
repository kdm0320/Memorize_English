import axios from "axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom, IUserInfo } from "./atoms";

export const baseUrl = "http://127.0.0.1:8000/api/v1";

export async function fetchWords(userInfo: IUserInfo) {
  const { data } = await axios.get(`${baseUrl}/words/`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  return data;
}

export async function fetchCollections(userInfo: IUserInfo) {
  const { data } = await axios.get(
    `${baseUrl}/users/${userInfo.pk}/collection`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  return data;
}

export async function putCollection({
  userInfo,
  wordPk,
}: {
  userInfo: IUserInfo;
  wordPk: number;
}) {
  axios.put(
    `${baseUrl}/users/${userInfo.pk}/collection/`,
    { pk: wordPk },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
}

export async function fetchFinished(userInfo: IUserInfo) {
  const { data } = await axios.get(`${baseUrl}/users/${userInfo.pk}/`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  return data;
}

export async function patchFinished({
  userInfo,
  newFinished,
}: {
  userInfo: IUserInfo;
  newFinished: string;
}) {
  axios.patch(
    `${baseUrl}/users/${userInfo.pk}/`,
    { finished_voca: newFinished },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
}
