import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { baseUrl } from "../api";

interface IForm {
  first_name: string | null | number;
  last_name: string | null | number;
  username: string | null | number;
  password: string | null | number;
  nickname: string | null | number;
  email: string;
}

const InPut = styled.input.attrs((props) => ({
  type: props.type || "text",
}))``;

function SignUp() {
  const { register, handleSubmit } = useForm<IForm>();
  const [loading, setLoading] = useState(true);
  const mutation = useMutation((newUser: IForm) =>
    axios.post(`${baseUrl}/users/`, newUser)
  );
  const onValid = async (data: IForm) => {
    try {
      mutation.mutateAsync({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        nickname: data.nickname,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <InPut
          {...register("first_name", { required: true })}
          placeholder="성(First Name)"
        />
        <InPut
          {...register("last_name", { required: true })}
          placeholder="이름(Last Name)"
        />
        <InPut
          {...register("username", { required: true })}
          placeholder="아이디(ID)"
          type="text"
        />
        <InPut
          {...register("email", { required: true })}
          placeholder="이메일(email)"
          type="text"
        />
        <InPut
          {...register("password", { required: true })}
          placeholder="비밀번호(Password)"
          type="password"
        />
        <InPut {...register("nickname")} placeholder="닉네임(Nickname)" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default SignUp;
