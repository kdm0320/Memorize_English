import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchAllUser, fetchBoards, fetchUser } from "../api";
import { IUserInfo, userInfoAtom } from "../atoms";
import Write from "./Write";

interface IContent {
  bdstyle: string;
}

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

const MenuBar = styled.div`
  border-width: 2px;
  border-style: solid;
`;

const ContentBar = styled.div``;

const Content = styled.span<IContent>`
  border-width: 1px;
  border-style: ${(props) => props.bdstyle};
  font-size: 15px;
`;

function Board() {
  const { data } = useQuery("allQnA", fetchBoards);
  const BoardDatas: IBoard[] = data?.results;

  return (
    <div>
      <Head>QnA</Head>
      <hr />
      <MenuBar>
        <Content bdstyle="solid">No.</Content>
        <Content bdstyle="solid">제목</Content>
        <Content bdstyle="solid">작성자</Content>
        <Content bdstyle="solid">작성일</Content>
        <Content bdstyle="solid">조회수</Content>
      </MenuBar>
      <ContentBar>
        {BoardDatas?.map((data, index) => (
          <div>
            <Content bdstyle="dotted">{index}</Content>
            <Content bdstyle="dotted">{data.title}</Content>
            <Content bdstyle="dotted">{data.writer}</Content>
            <Content bdstyle="dotted">{data.created}</Content>
            <Content bdstyle="dotted">{data.views}</Content>
          </div>
        ))}
      </ContentBar>
      <Link to="/qna/write">
        <button>글쓰기</button>
      </Link>
    </div>
  );
}

export default Board;
