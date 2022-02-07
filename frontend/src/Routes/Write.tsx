import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postBoards } from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { WriteButton } from "./Board";

interface IFormData {
  title: string;
  content: string;
  writer: number | undefined;
  isSolved: boolean;
}

const Head = styled.h1``;
const Title = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
  ${Head} {
    margin: auto;
    text-align: center;
    width: 70%;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0;
    border-bottom: 3px solid rgb(2, 97, 114);
  }
`;

const ContentTitle = styled.input``;
const Content = styled.div``;
const SubmitButton = styled.button``;
const WriteForm = styled.form`
  display: flex;
  width: 70%;
  flex-direction: column;
  margin: auto;
  padding-left: 90px;
  ${ContentTitle} {
    width: 90%;
    height: 30px;
    border-color: black;
    border-width: 1px;
    border-style: dashed;
    text-align: center;
    margin-bottom: 30px;
  }
  ${Content} {
    display: flex;
    width: 90%;
    height: 300px;
    border-color: black;
    border-width: 1px;
    border-style: outset;
    justify-content: center;
    margin-bottom: 30px;
  }
  ${SubmitButton} {
    all: unset;
    width: 60px;
    height: 30px;
    color: rgb(12, 151, 175);
    border-radius: 15px;
    border: 2px solid;
    text-align: center;
    margin-left: 85.5%;
    cursor: pointer;
  }
`;

function Write() {
  const userInfo = useRecoilValue(userInfoAtom);
  const writeMutate = useMutation(postBoards);
  const isLogged = useRecoilValue(isLoggedAtom);
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit = (data: {
    title: string;
    content: string;
    writer: number | undefined;
  }) => {
    const formdata: IFormData = {
      title: data.title,
      content: data.content,
      writer: Number(userInfo.pk),
      isSolved: false,
    };
    writeMutate.mutate({ formdata });
    navigate("/qna");
  };
  return (
    <div>
      <Title>
        <Head>버그리포트</Head>
      </Title>
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <ContentTitle
          {...register("title", { required: "필수 입력 항목입니다." })}
          placeholder="제목을 입력하세요"
        />
        <div>{errors?.title?.message}</div>
        <Content>
          <input
            {...register("content", { required: "필수 입력 항목입니다." })}
            placeholder="내용을 입력하세요"
            style={{ border: "0", outline: "0" }}
          />
        </Content>
        <div>{errors?.content?.message}</div>
        <SubmitButton>작성</SubmitButton>
      </WriteForm>
    </div>
  );
}

export default Write;
