import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchAllUser, fetchBoards, fetchUser } from "../api";
import { isLoggedAtom, IUserInfo, userInfoAtom } from "../atoms";
import Write from "./Write";

interface IBoard {
  content: string;
  created: string;
  is_solved: boolean;
  pk: number;
  title: string;
  views: number;
  writer: string;
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
    padding: 50px 0;
    border-bottom: 3px solid rgb(2, 97, 114);
  }
`;

const Menu = styled.span``;
const MenuBar = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  ${Menu} {
    margin: auto;
    margin-bottom: 30px;
  }
`;
const ContentBox = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  width: 80%;
`;
const ContentNo = styled.span``;
const ContentTitle = styled.span``;
const Writer = styled.span``;
const CreatedDate = styled.span``;
const Views = styled.span``;
const ContentBar = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  padding-left: 100px;
  margin-bottom: 10px;
  margin-bottom: 20px;
  ${ContentNo} {
    margin-right: 200px;
    text-align: left;
  }
  ${ContentTitle} {
    margin-right: 200px;
    text-align: left;
  }
  ${Writer} {
    margin-right: 150px;
    text-align: left;
  }
  ${CreatedDate} {
    margin-right: 200px;
  }
  ${Views} {
  }
`;
const WriteButton = styled.button`
  all: unset;
  width: 60px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  border-style: solid;
  border-color: rgb(12, 151, 175);
  background-color: transparent;
  color: rgb(12, 151, 175);
  margin-top: 30px;
  margin-left: 1170px;
`;
function Board() {
  const { data } = useQuery("allQnA", fetchBoards);
  const BoardDatas: IBoard[] = data?.results;
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
  return (
    <div>
      <Title>
        <Head>QnA</Head>
      </Title>
      <MenuBar>
        <Menu>No.</Menu>
        <Menu>제목</Menu>
        <Menu>작성자</Menu>
        <Menu>작성일</Menu>
        <Menu>조회수</Menu>
      </MenuBar>
      <ContentBox>
        {BoardDatas?.map((data, index) => (
          <ContentBar key={data.pk}>
            <ContentNo key={data.title + data.pk + "num"}>{index}</ContentNo>
            <ContentTitle key={data.title + data.pk}>{data.title}</ContentTitle>
            <Writer key={data.writer + data.pk}>{data.writer}</Writer>
            <CreatedDate key={data.created}>
              {data.created.substring(0, 9)}
            </CreatedDate>
            <Views key={data.title + "view"}>{data.views}</Views>
          </ContentBar>
        ))}
      </ContentBox>
      <Link to="/qna/write" style={{ all: "unset" }}>
        <WriteButton>글쓰기</WriteButton>
      </Link>
    </div>
  );
}

export default Board;
