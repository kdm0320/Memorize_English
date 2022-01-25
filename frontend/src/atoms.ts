import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IBasket {
  [index: string]: boolean;
  title: boolean;
}

interface IUserInfo {
  pk?: string;
  id?: string;
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

export const basketState = atom({
  key: "basket",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

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
  },
  effects_UNSTABLE: [persistAtom],
});
