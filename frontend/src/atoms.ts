import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const isChosenAtom = atom({
  key: "isChosen",
  default: false,
});

export const OnNoti = atom({
  key: "onNoti",
  default: false,
});

const { persistAtom } = recoilPersist();

export interface IBasket {
  [index: string]: boolean;
  title: boolean;
}
export const basketState = atom({
  key: "basket",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedAtom = atom({
  key: "isLogged",
  default: false,
});

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    pk: "",
    id: "",
  },
});
