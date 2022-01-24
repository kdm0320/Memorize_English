import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createAccount } from "../api";

interface IForm {
  firstName: string | null | number;
  lastName: string | null | number;
  username: string | null | number;
  password: string | null | number;
  nickName: string | null | number;
  email: string;
}

const InPut = styled.input.attrs((props) => ({
  type: props.type || "text",
}))``;

function SignUp() {
  const { register, handleSubmit } = useForm<IForm>();
  const [loading, setLoading] = useState(true);
  const onValid = async (data: IForm) => {
    try {
      await createAccount({
        username: data.username,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        nickname: data.nickName,
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <InPut
          {...register("firstName", { required: true })}
          placeholder="성(First Name)"
        />
        <InPut
          {...register("lastName", { required: true })}
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
        <InPut {...register("nickName")} placeholder="닉네임(Nickname)" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default SignUp;
