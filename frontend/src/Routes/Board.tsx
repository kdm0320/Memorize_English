import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchAllUser, fetchBoards, fetchUser } from "../api";
import { isLoggedAtom, IUserInfo, userInfoAtom } from "../atoms";
import { Overlay } from "../Components/Others";
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
const Table = styled.table`
  width: 70%;
  margin: auto;
`;

const Menu = styled.th``;
const MenuBar = styled.tr`
  height: 40px;
`;
const MenuBox = styled.thead``;

const ContentBox = styled.tbody``;
const ContentNo = styled.td``;
const ContentTitle = styled.td``;
const Writer = styled.td``;
const CreatedDate = styled.td``;
const Views = styled.td``;
const ContentBar = styled.tr`
  text-align: center;
  height: 40px;

  ${ContentNo} {
  }
  ${ContentTitle} {
    span {
      cursor: pointer;
    }
  }
  ${Writer} {
  }
  ${CreatedDate} {
  }
  ${Views} {
  }
`;
export const WriteButton = styled.button`
  all: unset;
  width: 60px;
  height: 30px;
  text-align: center;
  color: rgb(12, 151, 175);
  border-radius: 15px;
  border: 2px solid;
  background-color: transparent;
  margin-top: 30px;
  margin-left: 80%;
  cursor: pointer;
`;

const PostBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
`;

function Board() {
  const { data } = useQuery("allQnA", fetchBoards);
  const BoardDatas: IBoard[] = data?.results;
  const isLogged = useRecoilValue(isLoggedAtom);
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);

  //게시물 보여주기
  const navigate = useNavigate();
  const { postId } = useParams();
  const [onPost, setOnPost] = useState(false);
  const toggleOnPost = () => setOnPost((prev) => !prev);
  const onPostClick = (postId: number) => {
    toggleOnPost();
    navigate(`/qna/${postId}`);
  };
  //
  return (
    <div>
      {onPost ? (
        <Overlay>
          <PostBox></PostBox>
        </Overlay>
      ) : null}
      <Title>
        <Head>QnA</Head>
      </Title>
      <Table>
        <MenuBox>
          <MenuBar>
            <Menu>No.</Menu>
            <Menu>제목</Menu>
            <Menu>작성자</Menu>
            <Menu>작성일</Menu>
            <Menu>조회수</Menu>
          </MenuBar>
        </MenuBox>
        <ContentBox>
          {BoardDatas?.map((data, index) => (
            <ContentBar key={data.pk}>
              <ContentNo key={data.title + data.pk + "num"}>{index}</ContentNo>
              <ContentTitle key={data.title + data.pk}>
                <span
                  key={"forClick" + data.title}
                  onClick={() => onPostClick(data.pk)}
                >
                  {data.title}
                </span>
              </ContentTitle>
              <Writer key={data.writer + data.pk}>{data.writer}</Writer>
              <CreatedDate key={data.created}>
                {data.created.substring(0, 10)}
              </CreatedDate>
              <Views key={data.title + "view"}>{data.views}</Views>
            </ContentBar>
          ))}
        </ContentBox>
      </Table>

      <Link to="/qna/write" style={{ all: "unset" }}>
        <WriteButton>글쓰기</WriteButton>
      </Link>
    </div>
  );
}

export default Board;
