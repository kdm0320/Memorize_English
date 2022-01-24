import axios from "axios";
import { useMutation } from "react-query";

export interface IForm {
  first_name: string | null | number;
  last_name: string | null | number;
  username: string | null | number;
  password: string | null | number;
  nickname: string | null | number;
  email: string;
}

export const baseUrl = "http://127.0.0.1:8000/api/v1";
