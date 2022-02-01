import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

import { userInfoAtom, IUserInfo, isAxiosLoadingAtom } from "./atoms";

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
  try {
    const { data } = await axios.get(
      `${baseUrl}/users/${userInfo.pk}/collection`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
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

export async function fetchUser(userInfo: IUserInfo) {
  const { data } = await axios.get(`${baseUrl}/users/${userInfo.pk}/`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  return data;
}

export async function fetchAllUser(userInfo: IUserInfo) {
  const { data } = await axios.get(`${baseUrl}/users/`, {
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
export async function fetchBoards() {
  const { data } = await axios.get(`${baseUrl}/qnaboards/`);
  return data;
}

export async function postBoards({
  formdata,
}: {
  formdata: {
    title: string;
    content: string;
    isSolved: boolean;
    writer: string;
  };
}) {
  axios.post(`${baseUrl}/qnaboards/`, {
    title: formdata.title,
    content: formdata.content,
    writer: formdata.writer,
    views: 0,
    is_solved: formdata.isSolved,
  });
}
