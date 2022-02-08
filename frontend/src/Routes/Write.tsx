import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postBoards } from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { Error, Overlay } from "../Components/Others";
import { ProfileNoti } from "./Profile";

interface IFormData {
  title: string;
  content: string;
  writer: number | undefined;
  isSolved: boolean;
}
const WriteError = styled(Error)`
  padding-top: 1%;
  padding-bottom: 2%;
  font-size: 80%;
`;
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
  padding-left: 7%;
  ${ContentTitle} {
    width: 90%;
    height: 30px;
    border-color: black;
    border-width: 1px;
    border-style: dashed;
    text-align: center;
  }
  ${Content} {
    display: flex;
    width: 90%;
    height: 300px;
    border-color: black;
    border-width: 1px;
    border-style: outset;
    justify-content: center;
  }
  ${SubmitButton} {
    all: unset;
    width: 5.5%;
    height: 30px;
    color: rgb(12, 151, 175);
    border-radius: 15px;
    border: 2px solid;
    text-align: center;
    margin-left: 85.5%;
    cursor: pointer;
    :hover {
      box-shadow: 1px 1px;
    }
    :active {
      box-shadow: none;
    }
  }
`;

function Write() {
  const userInfo = useRecoilValue(userInfoAtom);
  const writeMutate = useMutation(postBoards);
  const isLogged = useRecoilValue(isLoggedAtom);
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
  const [isUpload, setIsUpload] = useState(false);
  const toggleUpload = () => setIsUpload((prev) => !prev);
  const notiUpload = () => {
    toggleUpload();
    navigate("/qna");
  };
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
    toggleUpload();
  };
  return (
    <div>
      {isUpload ? (
        <Overlay>
          <ProfileNoti>
            <h3>저장되었습니다</h3>
            <button onClick={notiUpload}>완료</button>
          </ProfileNoti>
        </Overlay>
      ) : null}
      <Title>
        <Head>버그리포트</Head>
      </Title>
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <ContentTitle
          {...register("title", { required: "필수 입력 항목입니다." })}
          placeholder="제목을 입력하세요"
        />
        <WriteError>{errors?.title?.message}</WriteError>
        <Content>
          <input
            {...register("content", { required: "필수 입력 항목입니다." })}
            placeholder="내용을 입력하세요"
            style={{ border: "0", outline: "0" }}
          />
        </Content>
        <WriteError>{errors?.content?.message}</WriteError>
        <SubmitButton>작성</SubmitButton>
      </WriteForm>
    </div>
  );
}

export default Write;
