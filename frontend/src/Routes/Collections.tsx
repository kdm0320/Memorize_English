import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactLoading from "react-loading";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchCollections,
  fetchUser,
  patchFinished,
  putCollection,
} from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { IProp } from "../theme";
import { useForm } from "react-hook-form";
import { Loading } from "../Components/Loading";
import { BackGround, Overlay, WordSet, WordSetBox } from "../Components/Others";

interface ICollect {
  title: string;
  content: Array<any>;
}

const CollectionSet = styled(motion.div)`
  width: 125px;
  height: 90px;
  background-color: rgb(237, 235, 222);
  border-color: rgb(86, 182, 194);
  box-shadow: 5px 5px 5px;
  border-width: 2px;
  border-style: solid;
  border-radius: 15px;
  margin: 30px;
  margin-top: 40px;
`;

const ContentBox = styled(motion.div)`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: row;
  background-color: rgb(237, 235, 222);
  border-color: rgb(86, 182, 194);
  border-style: solid;
  border-width: 2px;
  justify-content: space-between;
`;
const LeftContentBox = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;

const ContentHeader = styled.div``;

const Content = styled(motion.div)`
  display: flex;
  width: 40%;
  height: 90%;
  margin-top: 50px;
  margin-left: 50px;
  background-color: rgb(232, 220, 192);
  border-radius: 20px;
  border-style: solid;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: space-evenly;
`;
const Word = styled.input<IProp>`
  border: 0;
  background-color: transparent;
  outline: 0;
  cursor: default;
  visibility: ${(props) => props.visiblity};
  justify-self: center;
  font-size: 20px;
`;

const RightContentBox = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: space-evenly;
  align-content: ceter;
  justify-content: center;
`;

const AchievementHeader = styled.div`
  position: fixed;
`;

const Graph = styled.div`
  display: flex;
  width: 50%;
  height: 80%;
  margin-top: 80px;
  margin-left: 200px;
  border-radius: 30px;
  background-color: rgb(241, 191, 169);
  justify-content: center;
  align-items: center;
`;

function Collection() {
  //로그인 여부 판단
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);

  //유저 정보
  const userInfo = useRecoilValue(userInfoAtom);

  //유저 단어 콜렉션 Fetch 함수
  const [collections, setCollections] = useState<any[]>([]);
  useEffect(() => {
    fetchCollections(userInfo).then((value) => {
      setCollections(value);
    });
  }, []);

  //단어세트 클릭시 설정
  const { setId } = useParams();
  const clickedSet =
    setId && collections.find((set) => String(set.pk) === setId);
  const onSetClicked = (setId: number) => {
    // setwordPk(setId);
    navigate(`/collection/${setId}`);
  };
  const onCloseClicked = () => {
    unregist();
    setCurrentPage(1);
    setOnAchievement(false);
    navigate(`/collection`);
  };

  //세트 삭제 관련
  const mutation = useMutation(putCollection);
  const onDelete = (wordPk: number, title: string) => {
    setCollections((prev) => prev.filter((set) => set.pk != wordPk));
    console.log(curAllFinishedRef.current);
    const temp = curAllFinishedRef.current.filter((set) => set.title != title);
    mutation.mutate({ userInfo, wordPk });
    const newFinished = JSON.stringify(temp);
    finishedMutation.mutate({ userInfo, newFinished });
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
    const temp = collections.filter((set) => set.pk === pk);
    setCurCollection(temp[0]);
    setFinishedWords(curFinishedRef.current.length);
    toggleAchievement();
  };

  //외운 단어 체크 처리 관련
  const finishedMutation = useMutation(patchFinished);
  const [isChangeFinished, SetIsChangeFinished] = useState(false);
  const [showFinished, setShowFinished] = useState<any[]>([]);
  const toggleIsChanged = () => {
    SetIsChangeFinished((prev) => !prev);
  };
  const curAllFinishedRef = useRef<any[]>([]);
  const curFinishedRef = useRef<any[]>([]);

  useEffect(() => {
    fetchUser(userInfo).then((value) => {
      const temp: ICollect[] = JSON.parse(value.finished_voca);
      curAllFinishedRef.current = temp;
    });
  }, [isChangeFinished]); //전체 finished_voca 양식 저장

  useEffect(() => {
    fetchUser(userInfo).then((value) => {
      const temp: ICollect[] = JSON.parse(value.finished_voca);
      if (clickedSet) {
        temp.map((set) => {
          if (set.title === clickedSet.title) {
            curFinishedRef.current = set.content;
            setShowFinished(set.content);
          }
        });
      }
    });
  }, [setId]);
  const newCreateSet = (word: string, mean: string) => {
    if (clickedSet) {
      const newContent = {
        title: clickedSet.title,
        content: [{ [word]: mean }],
      };
      curAllFinishedRef.current.push(newContent);
      setShowFinished((prev) => [...prev, ...newContent.content]);
      const newFinished: string = JSON.stringify(curAllFinishedRef.current);
      finishedMutation.mutate({ userInfo, newFinished });
    }
  };
  const isFinished = (word: string, mean: string) => {
    for (let i = 0; i < showFinished.length; i++) {
      if (
        Object.keys(showFinished[i]).includes(word) &&
        Object.values(showFinished[i]).includes(mean)
      ) {
        return true;
      }
    }
    return false;
  };
  const addFinished = (index: number) => {
    toggleIsChanged();
    const word = getValues(`word${index}`);
    const mean = getValues(`mean${index}`);
    if (curFinishedRef.current.length === 0) {
      newCreateSet(word, mean);
    } else {
      curFinishedRef.current.push({ [word]: mean });
      setShowFinished((prev) => [...prev, { [word]: mean }]);
      curAllFinishedRef.current.map((set) => {
        if (set.title === clickedSet.title) {
          set.content = curFinishedRef.current;
        }
      });
      const newFinished: string = JSON.stringify(curAllFinishedRef.current);
      finishedMutation.mutate({ userInfo, newFinished });
    }
  };
  const deleteFinished = (index: number) => {
    toggleIsChanged();
    const word = getValues(`word${index}`);
    const mean = getValues(`mean${index}`);
    curFinishedRef.current = curFinishedRef.current.filter(
      (voca) =>
        !Object.keys(voca).includes(word) && !Object.values(voca).includes(mean)
    );
    setShowFinished((prev) =>
      prev.filter(
        (voca) =>
          !Object.keys(voca).includes(word) &&
          !Object.values(voca).includes(mean)
      )
    );
    curAllFinishedRef.current.map((set) => {
      if (set.title === clickedSet.title) {
        set.content = curFinishedRef.current;
      }
    });
    const newFinished: string = JSON.stringify(curAllFinishedRef.current);
    finishedMutation.mutate({ userInfo, newFinished });
  };

  //단어 보여주기
  const { getValues, register, unregister } = useForm();
  const ShowWords = ({ list }: { list: Array<string> }) => {
    return (
      <>
        {list.map((word, index) => (
          <div key={index}>
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
            />
            {isFinished(word[0], word[1]) ? (
              <button
                key={"finished" + word[0] + index}
                onClick={() => deleteFinished(index)}
              >
                외운거다
              </button>
            ) : (
              <button
                key={"add" + word[0] + index}
                onClick={() => addFinished(index)}
              >
                완료
              </button>
            )}
          </div>
        ))}
      </>
    );
  };
  //
  return (
    <BackGround>
      <AnimatePresence>
        {clickedSet ? (
          <Overlay>
            <ContentBox layoutId={String(clickedSet.pk)}>
              <LeftContentBox>
                <ContentHeader>
                  <button type="button" onClick={toggleWordBlind}>
                    단어 가리기
                  </button>
                  <button type="button" onClick={toggleMeanBlind}>
                    뜻 가리기
                  </button>
                  <button type="button" onClick={onCloseClicked}>
                    close
                  </button>
                </ContentHeader>
                <Content>
                  {clickedSet && (
                    <ShowWords list={sliceDatas(clickedSet.content)} />
                  )}

                  {indexOfFirst != 0 ? (
                    <button onClick={prevClick}> ⬅️</button>
                  ) : null}
                  {clickedSet && indexOfLast < clickedSet.content.length ? (
                    <button onClick={nextClick}>➡️</button>
                  ) : null}
                </Content>
              </LeftContentBox>
              <RightContentBox>
                <AchievementHeader>
                  {" "}
                  <button
                    type="button"
                    onClick={() =>
                      showAchievement(clickedSet.title, Number(setId))
                    }
                  >
                    성취
                  </button>
                </AchievementHeader>
                <Graph>
                  {onAchievement ? (
                    <ReactApexChart
                      height="100%"
                      width="400px"
                      type="pie"
                      series={[
                        curCollection?.content?.length - finishedWords,
                        finishedWords,
                      ]}
                      options={{
                        labels: ["남은 단어", "외운 단어"],
                      }}
                    />
                  ) : null}
                </Graph>
              </RightContentBox>
            </ContentBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        <WordSetBox>
          {collections.map((collection) => (
            <CollectionSet
              key={collection.pk}
              layoutId={String(collection.pk)}
              onClick={() => {
                onSetClicked(collection.pk);
              }}
            >
              {collection.title}

              <button
                key={"delete" + collection.pk}
                onClick={() => onDelete(collection.pk, collection.title)}
              >
                삭제
              </button>
            </CollectionSet>
          ))}
        </WordSetBox>
      </AnimatePresence>
    </BackGround>
  );
}

export default Collection;
