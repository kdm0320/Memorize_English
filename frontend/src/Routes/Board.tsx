import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  deleteBoards,
  fetchAllUser,
  fetchBoards,
  patchBoard,
  putAddBoardViews,
} from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { BackGround, Overlay } from "../Components/Others";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

interface IPost {
  content: string;
  created: string;
  is_solved: Boolean;
  pk: number;
  title: string;
  views: number;
  writer: number;
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
  :hover {
    box-shadow: 1px 1px;
  }
  :active {
    box-shadow: none;
  }
`;
const TopBox = styled.div``;
const PostBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 30%;
  border: 2px solid rgb(86, 182, 194);
  border-radius: 15px;
  background-color: rgb(237, 235, 222);
  ${TopBox} {
    display: flex;
    justify-content: space-between;
    h2 {
      padding: 1.5% 0 1.5% 3%;
      font-size: 1.2vw;
      font-weight: bolder;
    }
  }
`;
const PostTable = styled.table`
  border: 1px 0 1px 0 solid;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: rgb(237, 235, 222);
`;
const PostHeader = styled.thead`
  align-content: center;
  justify-content: center;
  height: 20%;
`;
const TitleLabel = styled.th`
  text-align: center;
  padding-top: 2%;
  text-justify: center;
  border-top: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  height: 100%;
  width: 20%;
`;
const PostTitle = styled.th`
  justify-self: center;
  width: 50%;
  text-align: center;
  border-top: 1px solid;
  border-bottom: 1px solid;
`;
const PostBody = styled.tbody`
  height: 100%;
`;
const PostContent = styled.td`
  height: 100%;
  padding-top: 10%;
  text-align: center;
`;
const EditBox = styled(motion.div)`
  flex-direction: column;
  height: 70%;
  width: 50%;
  border: 2px solid rgb(86, 182, 194);
  border-radius: 15px;
  background-color: rgb(237, 235, 222);
`;
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 80%;
  margin-top: 10%;
  justify-content: space-between;
`;
const EditTitleBox = styled.div`
  display: flex;
  height: 10%;
  border-top: 1px solid;
  border-bottom: 1px solid;
`;
const EditTitleLabel = styled.div`
  width: 50%;
  height: 70%;
  padding-top: 1.8%;
  text-align: center;
  border-right: 1px solid;
`;
const EditTitle = styled.input`
  background-color: transparent;
  border: 0;
  width: 100%;
  text-align: center;
`;
const EditContentBox = styled.div`
  width: 100%;
  height: 90%;
`;
const EditContent = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid;
  width: 99%;
  height: 100%;
  text-align: center;
`;

const EditBtnBox = styled.div`
  margin-top: 2%;
  height: 10%;
`;
const EditBtn = styled.button`
  all: unset;
  float: right;
  border: 1px solid;
  color: rgb(12, 151, 175);
  border-radius: 10%;
  width: 10%;
  height: 60%;
  text-align: center;
  padding-top: 0.8%;
  padding-bottom: 0.3%;
  margin-right: 1%;
  margin-bottom: 0.4%;
  cursor: pointer;
  :hover {
    box-shadow: 1px 1px;
  }
  :active {
    box-shadow: none;
  }
`;
function Board() {
  const userInfo = useRecoilValue(userInfoAtom);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetchBoards().then((value) => {
      setPosts(value.results);
    });
    fetchAllUser(userInfo).then((value) => {
      setUsers(value.results);
    });
  }, []);
  const isLogged = useRecoilValue(isLoggedAtom);
  useEffect(() => {
    //???????????? ??????????????? ?????? ?????????????????? ???????????????
    if (!isLogged) navigate("/");
  }, [isLogged]);
  //??? ????????? ????????????
  const navigate = useNavigate();
  const { postId } = useParams();
  const [onPost, setOnPost] = useState(false);
  const clickedPost: IPost =
    postId && posts.find((set) => String(set.pk) === postId);
  const toggleOnPost = () => setOnPost((prev) => !prev);
  const [views, setViews] = useState(0); // ????????? ??????
  const onPostClick = (postId: number, views: number) => {
    toggleOnPost();
    setViews(views);
    if (clickedPost) {
      if (clickedPost?.writer != Number(userInfo.pk)) {
        setViews((prev) => views + 1);
      }
    }
    navigate(`/qna/${postId}`);
  };

  const addViewsMutate = useMutation(putAddBoardViews); //????????? ??????????????? Mutate
  const onCloseClick = (postId: number) => {
    unregister("title");
    unregister("content");
    addViewsMutate.mutate({ userInfo, postId, views });
    toggleOnPost();
    navigate(`/qna`);
  };
  //????????? ??????
  const { register, unregister, getValues } = useForm();
  const [onEdit, setOnEdit] = useState(false);
  const editMutate = useMutation(patchBoard);
  const toggleOnEdit = () => {
    setOnEdit((prev) => !prev);
  };
  const onConfirmEdit = (noticePk: number) => {
    const title = getValues("title");
    const content = getValues("content");
    editMutate.mutate({ userInfo, noticePk, title, content });
    clickedPost.title = title;
    clickedPost.content = content;
    toggleOnEdit();
  };
  const deleteMutate = useMutation(deleteBoards);
  const onCancleEdit = () => {
    toggleOnEdit();
  };

  const onDelete = (noticePk: number) => {
    deleteMutate.mutate({ userInfo, noticePk });
  };

  return (
    <>
      <BackGround>
        {onPost ? (
          <Overlay>
            {!onEdit ? (
              <PostBox layoutId="Edit">
                <TopBox>
                  <h2>????????????</h2>
                  <IoCloseCircleSharp
                    onClick={() => onCloseClick(clickedPost.pk)}
                    style={{
                      fontSize: "2vw",
                      color: "rgb(252,70,70)",
                      cursor: "pointer",
                    }}
                  />
                </TopBox>
                <PostTable>
                  <PostHeader>
                    <tr>
                      <TitleLabel>??????</TitleLabel>
                      <PostTitle>{clickedPost.title}</PostTitle>
                    </tr>
                  </PostHeader>
                  <PostBody>
                    <tr>
                      <PostContent colSpan={2}>
                        {clickedPost.content}
                      </PostContent>
                    </tr>
                  </PostBody>
                </PostTable>
                {clickedPost?.writer === Number(userInfo.pk) ? (
                  <div>
                    <EditBtn
                      type="button"
                      onClick={() => onDelete(clickedPost.pk)}
                    >
                      ??????
                    </EditBtn>
                    <EditBtn onClick={toggleOnEdit}>??????</EditBtn>
                  </div>
                ) : null}
              </PostBox>
            ) : (
              <EditBox layoutId="Edit">
                <EditForm>
                  <EditTitleBox>
                    <EditTitleLabel>??????</EditTitleLabel>
                    <EditTitle
                      {...register("title")}
                      defaultValue={clickedPost.title}
                    />
                  </EditTitleBox>
                  <EditContentBox>
                    <EditContent
                      {...register("content")}
                      defaultValue={clickedPost.content}
                    />
                  </EditContentBox>
                  <EditBtnBox>
                    <EditBtn type="button" onClick={() => onCancleEdit()}>
                      ??????
                    </EditBtn>
                    <EditBtn
                      type="button"
                      onClick={() => onConfirmEdit(clickedPost.pk)}
                    >
                      ??????
                    </EditBtn>
                  </EditBtnBox>
                </EditForm>
              </EditBox>
            )}
          </Overlay>
        ) : null}
        <Title>
          <Head>QnA</Head>
        </Title>
        <Table>
          <MenuBox>
            <MenuBar>
              <Menu>No.</Menu>
              <Menu>??????</Menu>
              <Menu>?????????</Menu>
              <Menu>?????????</Menu>
              <Menu>?????????</Menu>
            </MenuBar>
          </MenuBox>
          <ContentBox>
            {posts?.map((post, index) => (
              <ContentBar key={post.pk}>
                <ContentNo key={post.title + post.pk + "num"}>
                  {index + 1}
                </ContentNo>
                <ContentTitle key={post.title + post.pk}>
                  <span
                    key={"forClick" + post.title}
                    onClick={() => onPostClick(post.pk, post.views)}
                  >
                    {post.title}
                  </span>
                </ContentTitle>
                {users.map((user) => {
                  if (user.id === post.writer) {
                    return (
                      <Writer key={post.writer + post.pk}>
                        {user.username}
                      </Writer>
                    );
                  }
                })}
                <CreatedDate key={post.created}>
                  {post.created.substring(0, 10)}
                </CreatedDate>
                <Views key={post.title + "view"}>{post.views}</Views>
              </ContentBar>
            ))}
          </ContentBox>
        </Table>

        <WriteButton onClick={() => navigate("/qna/write")}>?????????</WriteButton>
      </BackGround>
      <Footer />
    </>
  );
}

export default Board;
