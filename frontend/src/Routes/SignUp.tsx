import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { baseUrl } from "../api";
import Footer from "../Components/Footer";
import {
  Box,
  Btn,
  Error,
  Form,
  Input,
  LeftBox,
  Phrase,
  RightBox,
  Wrapper,
} from "../Components/Others";

interface ISingnUpForm {
  first_name: string | null | number;
  last_name: string | null | number;
  username: string | null | number;
  password: string | null | number;
  email: string;
}

const SignUpError = styled(Error)`
  margin-right: 40%;
  font-size: 80%;
`;
const EmailError = styled(Error)`
  margin-right: 19%;
`;

const PhraseVariant = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};

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
      })
      .then(() => navigate("/"))
      .catch((e) => setErrorCode(e.response["status"]));
  };
  return (
    <>
      <Wrapper>
        <Box>
          <LeftBox>
            <Phrase variants={PhraseVariant} initial="start" animate="end">
              Regist
            </Phrase>
          </LeftBox>
          <RightBox>
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("first_name", { required: "필수 항목입니다." })}
                placeholder="성(Last Name)"
                variants={PhraseVariant}
                initial="start"
                animate="end"
              />
              <SignUpError>{errors.last_name?.message}</SignUpError>
              <Input
                {...register("last_name", { required: "필수 항목입니다." })}
                placeholder="이름(First Name)"
                variants={PhraseVariant}
                initial="start"
                animate="end"
              />
              <SignUpError>{errors.first_name?.message}</SignUpError>
              <Input
                {...register("username", {
                  required: "필수 항목입니다.",
                  pattern: {
                    value: /^[a-z]+[a-z0-9]{5,19}$/g,
                    message: "6~20자 영문자 또는 숫자여야합니다. ",
                  },
                })}
                placeholder="아이디(ID)"
                type="text"
                variants={PhraseVariant}
                initial="start"
                animate="end"
              />
              {errorCode === 400 ? (
                <EmailError>이미 존재하는 아이디입니다</EmailError>
              ) : null}
              <SignUpError>{errors.username?.message}</SignUpError>
              <Input
                {...register("email", {
                  required: "필수 항목입니다.",
                  pattern: {
                    value: /@/,
                    message: "유효한 형식을 입력하십시오",
                  },
                })}
                placeholder="이메일(email)"
                variants={PhraseVariant}
                initial="start"
                animate="end"
              />
              {errorCode === 409 ? (
                <EmailError>이미 존재하는 이메일입니다</EmailError>
              ) : null}
              <SignUpError>{errors.email?.message}</SignUpError>
              <Input
                {...register("password", {
                  required: "필수 항목입니다.",
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z]).{8,}/,
                    message:
                      "영어 소문자, 숫자 포함 8자 이상으로 입력해 주십시오",
                  },
                })}
                variants={PhraseVariant}
                initial="start"
                animate="end"
                placeholder="비밀번호(Password)"
                type="password"
              />
              <SignUpError>{errors.password?.message}</SignUpError>
              <Btn variants={PhraseVariant} initial="start" animate="end">
                Create
              </Btn>
            </Form>
          </RightBox>
        </Box>
      </Wrapper>
      <Footer />
    </>
  );
}

export default SignUp;
