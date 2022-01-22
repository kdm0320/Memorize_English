import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
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
  const search = useLocation();

  return (
    <div>
      <h1>{search.pathname === "/qna/write" ? "버그리포트" : "유저리포트"}</h1>
      <Title>제목</Title>
      <Content>
        <input
          placeholder="내용을 입력하세요"
          style={{ border: "0", outline: "0" }}
        />
      </Content>
      <span>
        <Img></Img>
      </span>
      <span>
        <Choice>
          <label>
            공개
            <input type="radio" name="isopen" id="open" value="공개" />
            비공개
            <input type="radio" name="isopen" id="close" value="비공개" />
          </label>
        </Choice>
      </span>
      <button>작성</button>
    </div>
  );
}

export default Write;
