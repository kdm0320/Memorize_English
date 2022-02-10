import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {
  fetchCollections,
  fetchUser,
  patchFinished,
  putCollection,
} from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { useForm } from "react-hook-form";
import {
  BackGround,
  IProp,
  Noti,
  Overlay,
  WordSetBox,
} from "../Components/Others";
import {
  IoArrowForwardCircleSharp,
  IoArrowBackCircleSharp,
  IoEllipseOutline,
  IoCheckmarkSharp,
  IoArrowForwardSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";
import Footer from "../Components/Footer";

//TypeScript를 위한 Interface 영역
interface ICollect {
  title: string;
  content: Array<any>;
}
//

// Styled Components 영역
const CollectionSet = styled(motion.div)`
  // 학습관리에서 보여지는 단어 세트들 Component
  display: flex;
  width: 145px;
  height: 100px;
  background-color: rgb(237, 235, 222);
  border-color: rgb(86, 182, 194);
  box-shadow: 5px 5px 5px;
  border-width: 2px;
  border-style: solid;
  border-radius: 15px;
  margin: 30px;
  margin-top: 40px;
  justify-content: space-around;
  text-align: center;
  span {
    margin-top: 25px;
    margin-left: 20px;
    justify-self: center;
    font-weight: bold;
    font-size: 15px;
  }
`;
const ButtonBox = styled.div`
  // 삭제시 나오는 메세지 안의 버튼 둘러싸는 div Component
`;
const DeleteNoti = styled(Noti)`
  // 삭제시 나오는 메세지 Component
  justify-content: center;
  h3 {
    text-align: center;
    padding-bottom: 5%;
    font-size: 110%;
  }
  ${ButtonBox} {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  button {
    all: unset;
    width: 17%;
    border: 1px solid;
    border-color: rgb(211, 16, 39);
    border-radius: 5px;
    text-align: center;
    padding-top: 2px;
    color: white;
    background-color: rgb(211, 16, 39);
    cursor: pointer;
    :hover {
      box-shadow: 1px 1px gray;
    }
    :active {
      box-shadow: none;
    }
  }
`;
const DeleteButton = styled.button`
  //Collectionset 컴포넌트의 삭제 버튼 Component
  width: 15%;
  height: 30px;
  background-color: transparent;
  margin-top: 5px;
  margin-right: 8px;
  font-size: 20px;
  border: 0;
  color: rgb(203, 0, 22);
`;

const ContentBox = styled(motion.div)`
  //콜렉션 세트 클릭시 나오는 상자의 가장 바깥 div
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: row;
  background-color: rgb(237, 235, 222);
  border-color: rgb(86, 182, 194);
  border-style: solid;
  border-width: 2px;
  border-radius: 50px;
  justify-content: space-between;
`;
const LeftContentBox = styled.div`
  //상자의 왼쪽부분 div
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;

const ContentHeader = styled.div`
  //단어 숨기기와 뜻숨기기 버튼을 둘러싼 div
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 1.5vw;
  span {
    padding-top: 10px;
    text-justify: center;
    text-align: center;
  }
`;

const Blind = styled.button`
  //단어 숨기기와 뜻숨기기 버튼 컴포넌트
  position: fixed;
  all: unset;
  width: 6vw;
  height: 100%;
  text-justify: center;
  text-align: center;
  padding-top: 3px;
  background-color: rgb(241, 174, 45);

  border-width: 2px;
  border-color: white;
  border-style: solid;
  border-radius: 10px;
  text-align: center;

  cursor: pointer;
  :hover {
    box-shadow: 1px 1px gray;
  }
  :active {
    box-shadow: none;
  }
`;
const AllWordBox = styled.div`
  //단어와 단어뜻이 있는 가장 바깥 div
  font-family: "Sarabun", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;

const Content = styled(motion.div)`
  //모든 단어와 단어 뜻이 나오는 div
  display: flex;
  width: 90%;
  height: 85%;
  margin-top: 2%;
  margin-left: 5%;
  background-color: rgb(232, 220, 192);
  border-radius: 20px;
  border-style: solid;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-evenly;
  padding-top: 2%;
  padding-left: 2vw;
  overflow: auto;
`;
const WordBox = styled.div`
  // 단어와 단어 뜻,완료 표시 가 속한 한줄짜리 div
  display: flex;
  width: 80%;
  border-style: dotted;
  border-width: 0 0 3px 0;
  border-color: #aaa6a6;
`;
const Word = styled.input<IProp>`
  //단어와 단어 뜻 input component
  border: 0;
  border-bottom: 1px;
  background-color: transparent;
  outline: 0;
  cursor: default;
  visibility: ${(props) => props.visiblity};
  justify-self: center;
  font-size: 1.04vw;
  margin-left: 10px;
  overflow: hidden;
`;
const Finished = styled.div`
  //완료 표시 div
  margin-top: 2%;
  margin-left: 10%;
  font-size: 25px;
  overflow: hidden;
`;
const PaginatorBox = styled.div`
  //마지막 단어 아래 가장 아래쪽 div
  display: flex;
  width: 100%;
  font-size: 25px;
  overflow: auto;
`;
const Paginator = styled.div`
  //페이지 넘기는 paginator가 속한 div
  display: flex;
  color: rgb(75, 165, 177);
  margin-top: 2%;
  margin-bottom: 1%;
`;
const RightContentBox = styled.div`
  //상자의 오른쪽부분 div
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: space-evenly;
  align-content: ceter;
  justify-content: center;
`;

const AchievementHeader = styled.div`
  // save버튼, 성취도보기버튼, 뒤로가기 버튼이 있는 div
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding-top: 1.5vw;
  width: 33%;
  height: 5%;
`;
const SaveBtn = styled.button`
  //save 버튼
  all: unset;
  width: 15%;
  padding-top: 2px;
  border: 1px solid;
  text-align: center;
  border-color: rgb(33, 175, 126);
  background-color: rgb(33, 175, 126);
  border-radius: 5px;
  cursor: pointer;
  :hover {
    box-shadow: 1px 1px;
  }
  :active {
    box-shadow: none;
  }
`;
const OnShowAchievement = styled.button`
  //성취도 보기 버튼
  all: unset;
  text-justify: center;
  text-align: center;
  padding-top: 3px;
  border: 2px solid;
  border-radius: 10px;
  border-color: white;
  width: 40%;
  background-color: rgb(241, 174, 45);
  overflow: hidden;
  cursor: pointer;
  :hover {
    box-shadow: 1px 1px gray;
  }
  :active {
    box-shadow: none;
  }
`;
const CloseBox = styled.div`
  //뒤로가기 아이콘이 속한 div
  display: flex;
  width: 1%;
  padding-left: 3%;
  justify-self: right;

  p {
    margin-top: 0.01vw;
    font-size: 3vw;
    justify-self: right;
  }
`;

const Graph = styled.div`
  //그래프가 속한 div
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
  margin-top: 6vw;
  margin-left: 10vw;
  margin-right: 5vw;
  border-radius: 30px;
  background-color: rgb(241, 191, 169);
  overflow: hidden;

  div {
    //뒤로가기 아이콘
    margin-top: 4vw;
    margin-right: 0.4vw;
    margin-left: 0.2vw;
    padding-bottom: 1vw;
  }
`;
//
function Collection() {
  //로그인 여부 판단
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    //로그인이 안되어있는 경우 로그인창으로 리다이렉트
    if (!isLogged) navigate("/");
  }, [isLogged]);

  //유저 정보
  const userInfo = useRecoilValue(userInfoAtom);

  //유저 단어 콜렉션 Fetch 함수
  const [userCollections, setUserCollections] = useState<Array<any>>([]);
  useEffect(() => {
    fetchCollections(userInfo).then((value) => {
      const temp = value;
      setUserCollections(value);
    });
  }, []);

  //단어세트 클릭시 설정
  const { setId } = useParams();
  const clickedSet =
    setId && userCollections.find((set) => String(set.pk) === setId);
  const onSetClicked = (setId: number) => {
    navigate(`/collection/${setId}`);
  };
  const onCloseClicked = () => {
    unregist();
    setCurrentPage(1);
    setOnAchievement(false);
    saveFinished();
    navigate(`/collection`);
  };

  //세트 삭제 관련
  const [onDeleteNoti, SetOnDeleteNoti] = useState(false);
  const toggleOnDeleteNoti = () => SetOnDeleteNoti((prev) => !prev);
  const deleteMutation = useMutation(putCollection);
  const tempCurFinishedRef = useRef<ICollect[]>([]);
  const targetSetNumberRef = useRef(0);
  const onDelete = (e: React.MouseEvent, wordPk: number, title: string) => {
    e.stopPropagation();
    toggleOnDeleteNoti();
    tempCurFinishedRef.current = allFinished;
    targetSetNumberRef.current = wordPk;
    SetAllFinished((prev) => prev.filter((set) => set.title != title));
  };
  const cancleDelete = () => {
    SetAllFinished(tempCurFinishedRef.current);
    toggleOnDeleteNoti();
  };
  const confirmDelete = () => {
    const wordPk = targetSetNumberRef.current;
    setUserCollections((prev) => prev.filter((set) => set.pk != wordPk));
    deleteMutation.mutate({ userInfo, wordPk });
    const newFinished = JSON.stringify(allFinished);
    finishedMutation.mutate({ userInfo, newFinished });
    toggleOnDeleteNoti();
  };
  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  let indexOfLast = currentPage * pageSize;
  let indexOfFirst = indexOfLast - pageSize;
  const sliceDatas = (list: Array<any>) => {
    let newArray = [];
    newArray = list.slice(indexOfFirst, indexOfLast);
    return newArray;
  };
  const nextClick = () => {
    unregist();
    setCurrentPage((prev) => prev + 1);
  };
  const prevClick = () => {
    unregist();
    setCurrentPage((prev) => prev - 1);
  };
  //Pagination 교체를 위한 word,mean unregist함수
  const unregist = () => {
    for (let i = 0; i < 10; i++) {
      unregister(`word${i}`);
      unregister(`mean${i}`);
    }
  };
  //단어,뜻가리기 state
  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);

  //단어 성취도 보여주기
  const [curCollection, setCurCollection] = useState<any>({});
  const [onAchievement, setOnAchievement] = useState(false);
  const [finishedWords, setFinishedWords] = useState(0);
  const toggleAchievement = () => setOnAchievement((prev) => !prev);
  const showAchievement = (wordTitle: string, pk: number) => {
    const temp = userCollections.filter((set) => set.pk === pk);
    setCurCollection(temp[0]);
    setFinishedWords(targetFinished.content.length);
    toggleAchievement();
  };

  //외운 단어 체크 처리 관련
  const finishedMutation = useMutation(patchFinished);
  const isFinished = (word: string, mean: string) => {
    for (let i = 0; i < targetFinished.content.length; i++) {
      if (
        Object.keys(targetFinished.content[i]).includes(word) &&
        Object.values(targetFinished.content[i]).includes(mean)
      ) {
        return true;
      }
    }
    return false;
  };
  //단어 완료처리
  const [allFinished, SetAllFinished] = useState<ICollect[]>([]);
  useEffect(() => {
    fetchUser(userInfo).then((value) => {
      const temp: ICollect[] = JSON.parse(value.finished_voca);
      SetAllFinished(temp);
    });
  }, [clickedSet]); //선택된 컬렉션이 설정될때만(업데이트가 되었을 수 있으므로) 유저의 전체 finished_voca를 받아오고 저장

  const [targetFinished, SetTargetFinished] = useState<ICollect>({
    title: "",
    content: [],
  }); //  현재 유저의 완료처리된 단어들의 리스트와 추가/제거 상태 state
  useEffect(() => {
    // 선택된 단어 컬렉션이 설정될 때만 유저의 현재 완료처리된 단어를 데이터로 받아오고 저장
    if (clickedSet) {
      if (
        allFinished.length === 0 ||
        allFinished.every((set) => set.title != clickedSet.title)
      ) {
        SetTargetFinished({ title: "", content: [] });
      } else {
        allFinished.map((set) => {
          if (set.title === clickedSet.title) {
            SetTargetFinished((prev) => {
              return { ...prev, title: set.title, content: set.content };
            });
          }
        });
      }
    }
  }, [clickedSet]);
  const createSet = (word: string, mean: string) => {
    //컬렉션에서 완료된 단어가 없을때 완료 단어가 저장될 양식 생성
    SetTargetFinished((prev) => {
      return {
        ...prev,
        title: clickedSet.title,
        content: [{ [word]: mean }],
      };
    });
  };
  const addFinished = (index: number) => {
    //완료표시 체크시 targetFinished state 상태 설정
    const word = getValues(`word${index}`);
    const mean = getValues(`mean${index}`);
    if (targetFinished.title === "") {
      //선택된 컬렉션의 단어완료 양식이 존재하지 않을때 양식 생성하고 내용 추가
      createSet(word, mean);
    } else {
      //선택된 컬렉션의 단어완료 양식이 존재할때 내용 추가
      SetTargetFinished((prev: ICollect) => {
        return { ...prev, content: [...prev.content, { [word]: mean }] };
      });
    }
  };
  const deleteFinished = (index: number) => {
    //완료표시 체크 해제시 targetFinished state 상태 설정
    const word = getValues(`word${index}`);
    const mean = getValues(`mean${index}`);
    SetTargetFinished((prev: ICollect) => {
      return {
        ...prev,
        content: prev.content.filter(
          (voca) => Object.keys(voca) != word && Object.values(voca) != mean
        ),
      };
    });
  };
  const setFinished = () => {
    //Save 버튼 클릭시 allFinished 업그레이드
    if (allFinished.length === 0) {
      SetAllFinished((prev) => [...prev, { ...targetFinished }]);
    } else {
      allFinished.some((set) => set.title === clickedSet.title)
        ? SetAllFinished((prev) =>
            prev.map((set) =>
              set.title === clickedSet.title ? { ...targetFinished } : set
            )
          )
        : SetAllFinished((prev) => [...prev, { ...targetFinished }]);
    }
  };
  const saveFinished = () => {
    //나가기 아이콘 클릭시 allFinished 저장 => api 네트워크 요청 최소화
    const newFinished = JSON.stringify(allFinished);
    finishedMutation.mutate({ userInfo, newFinished });
  };
  //단어 보여주기
  const { getValues, register, unregister } = useForm();
  const ShowWords = ({ list }: { list: Array<string> }) => {
    return (
      <AllWordBox>
        {list.map((word, index) => (
          <div key={index} style={{ display: "flex" }}>
            <WordBox key={word[0] + "div"}>
              <Word
                key={word[0]}
                readOnly
                {...register(`word${index}`)}
                value={word[0]}
                visiblity={isBlindWord ? "hidden" : "visible"}
              />
              <Word
                key={word[1]}
                readOnly
                {...register(`mean${index}`)}
                visiblity={isBlindMean ? "hidden" : "visible"}
                value={word[1]}
                style={{ marginLeft: "90px" }}
              />
            </WordBox>
            {isFinished(word[0], word[1]) ? (
              <Finished>
                <IoCheckmarkSharp
                  key={"finished" + word[0] + index}
                  onClick={() => deleteFinished(index)}
                  style={{ color: "green" }}
                />
              </Finished>
            ) : (
              <Finished>
                <IoEllipseOutline
                  key={"add" + word[0] + index}
                  onClick={() => addFinished(index)}
                />
              </Finished>
            )}
          </div>
        ))}
      </AllWordBox>
    );
  };
  //
  return (
    <>
      <BackGround>
        {onDeleteNoti ? (
          <Overlay>
            <DeleteNoti>
              <div />
              <h3>모든 데이터가 사라집니다.</h3>
              <h3>삭제하시겠습니까?</h3>
              <ButtonBox>
                <button onClick={confirmDelete}>삭제</button>
                <button onClick={cancleDelete}>취소</button>
              </ButtonBox>
            </DeleteNoti>
          </Overlay>
        ) : null}
        <AnimatePresence>
          {clickedSet ? (
            <Overlay>
              <ContentBox layoutId={String(clickedSet.pk)}>
                <LeftContentBox>
                  <ContentHeader>
                    <Blind
                      onClick={toggleWordBlind}
                      style={{ marginRight: "90px" }}
                    >
                      단어 가리기
                    </Blind>
                    <Blind onClick={toggleMeanBlind}>뜻 가리기</Blind>
                    <span>완료체크</span>
                  </ContentHeader>
                  <Content>
                    {clickedSet && (
                      <ShowWords list={sliceDatas(clickedSet.content)} />
                    )}
                    <PaginatorBox>
                      <Paginator>
                        {indexOfFirst != 0 ? (
                          <IoArrowBackCircleSharp
                            onClick={prevClick}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          />
                        ) : null}
                        {clickedSet &&
                        indexOfLast < clickedSet.content.length ? (
                          <IoArrowForwardCircleSharp
                            onClick={nextClick}
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                          />
                        ) : null}
                      </Paginator>
                    </PaginatorBox>
                  </Content>
                </LeftContentBox>
                <RightContentBox>
                  <AchievementHeader>
                    <SaveBtn onClick={setFinished}>Save</SaveBtn>
                    <OnShowAchievement
                      onClick={() =>
                        showAchievement(clickedSet.title, Number(setId))
                      }
                    >
                      성취도 보기
                    </OnShowAchievement>
                    <CloseBox>
                      <p>
                        <IoArrowForwardSharp
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => onCloseClicked()}
                        />
                      </p>
                    </CloseBox>
                  </AchievementHeader>
                  <Graph>
                    {onAchievement ? (
                      <div>
                        <ReactApexChart
                          height="150%"
                          width="110%"
                          type="pie"
                          series={[
                            curCollection?.content?.length - finishedWords,
                            finishedWords,
                          ]}
                          options={{
                            labels: ["남은단어", "외운단어"],
                            tooltip: {
                              fillSeriesColor: false,
                              marker: {
                                show: false,
                              },
                            },
                            plotOptions: {
                              pie: {
                                expandOnClick: true,
                              },
                            },
                          }}
                        />
                      </div>
                    ) : null}
                  </Graph>
                </RightContentBox>
              </ContentBox>
            </Overlay>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          <WordSetBox>
            {userCollections.map((collection) => (
              <CollectionSet
                key={collection.pk}
                layoutId={String(collection.pk)}
                onClick={() => {
                  onSetClicked(collection.pk);
                }}
              >
                <span key={collection.title}>{collection.title}</span>
                <DeleteButton key={"deleteBox" + collection.pk}>
                  <IoCloseCircleSharp
                    key={"delete" + collection.pk}
                    style={{ cursor: "pointer" }}
                    onClick={(e) =>
                      onDelete(e, collection.pk, collection.title)
                    }
                  />
                </DeleteButton>
              </CollectionSet>
            ))}
          </WordSetBox>
        </AnimatePresence>
      </BackGround>
      <Footer />;
    </>
  );
}

export default Collection;
