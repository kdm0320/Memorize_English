import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postBoards } from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";

interface IFormData {
  title: string;
  content: string;
  writer: string;
  isSolved: boolean;
}

const Title = styled.input`
  width: 90%;
  height: 30px;
  border-color: black;
  border-width: 1px;
  border-style: dashed;
  text-align: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  height: 300px;
  border-color: black;
  border-width: 1px;
  border-style: outset;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-color: black;
  border-style: solid;
  border-width: 1px;
  margin-top: 10px;
`;

const Choice = styled.span``;

function Write() {
  const writeMutate = useMutation(postBoards);
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit = (data: {
    title: string;
    content: string;
    writer: string;
  }) => {
    const formdata: IFormData = {
      title: data.title,
      content: data.content,
      writer: data.writer,
      isSolved: false,
    };
    writeMutate.mutate({ formdata });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>버그리포트</h1>
      <Title
        {...register("title", { required: "필수 입력 항목입니다." })}
        placeholder="제목"
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
      <span>
        <input
          {...register("writer", { required: false })}
          defaultValue="Unknown"
          style={{ borderStyle: "solid" }}
        />
      </span>
      <button>작성</button>
    </form>
  );
}

export default Write;
