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
import { Content, Overlay, Word } from "../theme";
import { useForm } from "react-hook-form";
import { Loading } from "../Components/Loading";
import { BackGround, WordSet, WordSetBox } from "../Components/Others";

interface ICollect {
  title: string;
  content: Array<any>;
}

function Collection() {
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
  const userInfo = useRecoilValue(userInfoAtom);
  // const [wordPk, setwordPk] = useState<number>(0);
  //유저 단어 콜렉션 Fetch 함수
  const [collections, setCollections] = useState<any[]>([]);
  useEffect(() => {
    fetchCollections(userInfo).then((value) => setCollections(value));
  }, []);
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
    setIsInFinished(Array(pageSize).fill(false));
    setCurrentPage(1);
    navigate(`/collection`);
  };
  //삭제 관련
  const mutation = useMutation(putCollection);
  const onDelete = (wordPk: number) => {
    setCollections((prev) => prev.filter((set) => set.pk != wordPk));
    mutation.mutate({ userInfo, wordPk });
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
    setIsInFinished(Array(pageSize).fill(false));
    setCurrentPage((prev) => prev + 1);
  };
  const prevClick = () => {
    unregist();
    setIsInFinished(Array(pageSize).fill(false));
    setCurrentPage((prev) => prev - 1);
  };
  //단어 성취도 보여주기
  const [onAchievement, setOnAchievement] = useState(false);
  const [finishedWords, setFinishedWords] = useState(0);
  const toggleAchievement = () => setOnAchievement((prev) => !prev);
  //단어 완료처리
  const finishedMutation = useMutation(patchFinished);
  const [isChangeFinished, SetIsChangeFinished] = useState(false);
  const [showFinished, setShowFinished] = useState<any[]>([]);
  const toggleIsChanged = () => {
    SetIsChangeFinished((prev) => !prev);
  };
  const curAllFinishedRef = useRef<any[]>([]); //Ref 전체 finised
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
      setShowFinished((prev) => [...prev, newContent]);
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
  //단어 보여주기 //완료된 단어 체크 -> 완료를 외움으로 바꿈
  const { getValues, register, unregister } = useForm();
  const [isInFinished, setIsInFinished] = useState(Array(pageSize).fill(false));

  const ShowWords = ({ list }: { list: Array<string> }) => {
    return (
      <>
        {list.map((word, index) => (
          <div key={index}>
            <Word
              key={word[0]}
              readOnly
              {...register(`word${index}`)}
              value={isBlindWord ? "" : word[0]}
            />
            <Word
              key={word[1]}
              readOnly
              {...register(`mean${index}`)}
              value={isBlindMean ? "" : word[1]}
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
                // onClick={() => onFinishedClick(index)}
              >
                완료
              </button>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <BackGround>
      {onAchievement
        ? clickedSet && (
            <>
              <ReactApexChart
                type="pie"
                series={[
                  clickedSet.content.length - finishedWords,
                  finishedWords,
                ]}
                options={{
                  labels: ["남은 단어", "외운 단어"],
                  chart: { width: "100px", height: "100px" },
                }}
              />
            </>
          )
        : null}
      <AnimatePresence>
        {clickedSet ? (
          <motion.div
            style={{
              width: "300px",
              height: "500px",
              backgroundColor: "whitesmoke",
              borderStyle: "solid",
            }}
            layoutId={String(clickedSet.pk) + "3"}
          >
            <button type="button" onClick={toggleWordBlind}>
              단어 가리기
            </button>
            <button type="button" onClick={toggleMeanBlind}>
              뜻 가리기
            </button>
            <button type="button" onClick={onCloseClicked}>
              close
            </button>
            <button type="button" onClick={() => toggleAchievement()}>
              성취
            </button>
            {clickedSet && <ShowWords list={sliceDatas(clickedSet.content)} />}

            {indexOfFirst != 0 ? (
              <button onClick={prevClick}> ⬅️</button>
            ) : null}
            {/* {clickedSet &&
                Array.from(
                  { length: Math.ceil(clickedSet.content.length / 10) },
                  (v, i) => i + 1
                ).map((page) => (
                  <>
                    <span>{page}</span>
                  </>
                ))} */}
            {clickedSet && indexOfLast < clickedSet.content.length ? (
              <button onClick={nextClick}>➡️</button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        <WordSetBox>
          {collections.map((collection) => (
            <WordSet key={collection.pk} layoutId={String(collection.pk)}>
              {collection.title}
              <button
                key={collection.pk + "showCon"}
                type="button"
                onClick={() => {
                  onSetClicked(collection.pk);
                }}
              >
                내용보기
              </button>
              <button
                key={"delete" + collection.pk}
                onClick={() => onDelete(collection.pk)}
              >
                삭제
              </button>
            </WordSet>
          ))}
        </WordSetBox>
      </AnimatePresence>
    </BackGround>
  );
}

export default Collection;
