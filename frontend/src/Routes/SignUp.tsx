import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { baseUrl } from "../api";

interface ISingnUpForm {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingnUpForm>();
  const navigate = useNavigate();
  const mutation = useMutation((newUser: ISingnUpForm) =>
    axios.post(`${baseUrl}/users/`, newUser)
  );

  const [errorCode, setErrorCode] = useState(0);
  const onValid = (data: ISingnUpForm) => {
    mutation
      .mutateAsync({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        nickname: data.nickname,
      })
      .then(() => navigate("/login"))
      .catch((e) => setErrorCode(e.response["status"]));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <InPut
          {...register("first_name", { required: "필수 항목입니다." })}
          placeholder="성(First Name)"
        />
        <span>{errors.first_name?.message}</span>
        <InPut
          {...register("last_name", { required: "필수 항목입니다." })}
          placeholder="이름(Last Name)"
        />
        <span>{errors.last_name?.message}</span>
        <InPut
          {...register("username", {
            required: "필수 항목입니다.",
            pattern: {
              value: /^[a-z]+[a-z0-9]{5,19}$/g,
              message: "영문자로 시작하는 6~20자 영문자 또는 숫자여야합니다. ",
            },
          })}
          placeholder="아이디(ID)"
          type="text"
        />
        {errorCode === 400 ? <span>이미 존재하는 아이디입니다</span> : null}
        <span>{errors.username?.message}</span>
        <InPut
          {...register("email", {
            required: "필수 항목입니다.",
            pattern: {
              value: /@/,
              message: "유효한 형식을 입력하십시오",
            },
          })}
          placeholder="이메일(email)"
          type="text"
        />
        {errorCode === 409 ? <span>이미 존재하는 이메일입니다</span> : null}
        <span>{errors.email?.message}</span>
        <InPut
          {...register("password", {
            required: "필수 항목입니다.",
            pattern: {
              value: /(?=.*\d)(?=.*[a-z]).{8,}/,
              message: "영어 소문자, 숫자 포함 8자 이상으로 입력해 주십시오",
            },
          })}
          placeholder="비밀번호(Password)"
          type="password"
        />
        <span>{errors.password?.message}</span>
        <InPut {...register("nickname")} placeholder="닉네임(Nickname)" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default SignUp;
