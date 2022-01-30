import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IUserInfo {
  pk?: string;
  id?: string;
  token?: string;
  storage?: Storage;
}

export const isChosenAtom = atom({
  key: "isChosen",
  default: false,
});

export const OnNoti = atom({
  key: "onNoti",
  default: false,
});

const { persistAtom } = recoilPersist();

export const isLoggedAtom = atom<Boolean>({
  key: "isLogged",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoAtom = atom<IUserInfo>({
  key: "userInfo",
  default: {
    pk: "",
    id: "",
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isAxiosLoadingAtom = atom({
  key: "isAxiosLoading",
  default: false,
});
