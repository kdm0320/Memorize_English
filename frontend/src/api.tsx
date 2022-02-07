import axios from "axios";

import { IUserInfo } from "./atoms";

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
    writer: number | undefined;
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

export async function patchBoard({
  userInfo,
  noticePk,
  title,
  content,
}: {
  userInfo: IUserInfo;
  noticePk: number;
  title: string;
  content: string;
}) {
  axios.patch(
    `${baseUrl}/qnaboards/${noticePk}/`,
    { title: title, content: content },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
}
export async function putAddBoardViews({
  userInfo,
  postId,
  views,
}: {
  userInfo: IUserInfo;
  postId: number;
  views: number;
}) {
  axios.put(
    `${baseUrl}/qnaboards/${postId}/`,
    { views: views },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
}
export async function deleteBoards({
  userInfo,
  noticePk,
}: {
  userInfo: IUserInfo;
  noticePk: number;
}) {
  await axios.delete(`${baseUrl}/qnaboards/${noticePk}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
}
