import { Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Write from "./Write";

interface IContent {
  bdstyle: string;
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
  const search = useLocation();
  return (
    <div>
      <Head>{search.pathname === "/qna" ? "QnA" : "User Board"}</Head>
      <hr />
      <MenuBar>
        <Content bdstyle="solid">No.</Content>
        <Content bdstyle="solid">제목</Content>
        <Content bdstyle="solid">작성자</Content>
        <Content bdstyle="solid">작성일</Content>
        <Content bdstyle="solid">조회수</Content>
      </MenuBar>
      <ContentBar>
        <Content bdstyle="dotted">1.</Content>
        <Content bdstyle="dotted">Test</Content>
        <Content bdstyle="dotted">admin</Content>
        <Content bdstyle="dotted">오늘</Content>
        <Content bdstyle="dotted">0</Content>
      </ContentBar>
      <div>
        {search.pathname === "/qna" ? (
          <Link to="/qna/write">
            <button>글쓰기</button>
          </Link>
        ) : (
          <Link to="/userBoard/write">
            <button>글쓰기</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Board;
