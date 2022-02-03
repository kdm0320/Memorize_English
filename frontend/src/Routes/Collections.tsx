import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  pk: number;
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
  const [wordPk, setwordPk] = useState<number>(0);
  //유저 단어 콜렉션 Fetch 함수
  const { isLoading, data } = useQuery<ICollect[]>(
    ["allCollections", userInfo],
    () => fetchCollections(userInfo)
  );
  const unregist = () => {
    for (let i = 0; i < 10; i++) {
      unregister(`word${i}`);
      unregister(`mean${i}`);
    }
  };

  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);
  //단어세트 클릭시 설정
  const { setId } = useParams();
  const clickedSet = setId && data?.find((set) => String(set.pk) === setId);
  const onSetClicked = (setId: number) => {
    setwordPk(setId);
    navigate(`/collection/${setId}`);
  };

  const onCloseClicked = () => {
    unregist();
    mounted.current = false;
    setIsInFinished(Array(pageSize).fill(false));
    setCurrentPage(1);
    navigate(`/collection`);
  };
  //삭제 관련
  const mutation = useMutation(putCollection);
  const onDelete = () => {
    mutation.mutate({ userInfo, wordPk });
    navigate(`/collection`);
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
    mounted.current = false;
    setCurrentPage((prev) => prev + 1);
  };
  const prevClick = () => {
    unregist();
    setIsInFinished(Array(pageSize).fill(false));
    mounted.current = false;
    setCurrentPage((prev) => prev - 1);
  };
  //단어 성취도 보여주기
  const [onAchievement, setOnAchievement] = useState(false);
  const [finishedWords, setFinishedWords] = useState(0);
  const toggleAchievement = () => setOnAchievement((prev) => !prev);
  //단어 완료처리
  const userData = useQuery(["allFinished", userInfo], () =>
    fetchUser(userInfo)
  );
  const isUserDataLoading = userData.isLoading;
  const finishedMutation = useMutation(patchFinished);
  const isPatchFinishLoading = finishedMutation.isLoading;
  const [vocas, setVocas] = useState<any[]>([]);
  const setCurrentVoca = ({ word, mean }: { word?: any; mean?: string }) => {
    setVocas(JSON.parse(userData?.data?.finished_voca));
    const initial: any[] = JSON.parse(userData?.data?.finished_voca);
    if (initial.length != 0) {
      if (clickedSet) {
        for (let i = 0; i < vocas.length; i++) {
          if (clickedSet.title === vocas[i].title) {
            vocas[i].content.push({ [word]: mean });
            const newFinished: string = JSON.stringify(vocas);
            finishedMutation.mutate({ userInfo, newFinished });
            setFinishedWords(vocas[i].content.length);
            return;
          }
        }
      }
      createSet();
    } else {
      createSet();
    }
  };
  const createSet = () => {
    if (clickedSet) {
      const newContent = [{ title: clickedSet.title, content: [] }];
      setVocas((prev) => [...prev, ...newContent]);
      const newFinished = JSON.stringify(vocas);
      finishedMutation.mutate({ userInfo, newFinished });
    }
  };
  const onFinishedClick = (index: number) => {
    const word = getValues(`word${index}`);
    const mean = getValues(`mean${index}`);
    setCurrentVoca({ word, mean });
  };
  //단어 보여주기 //완료된 단어 체크 -> 완료를 외움으로 바꿈
  const testSkeleton = false;
  const { getValues, register, unregister } = useForm();
  const [isInFinished, setIsInFinished] = useState(Array(pageSize).fill(false));

  const checkFinshed = (list: Array<string>) => {
    const currentFinished: { title: string; content: any[] }[] = JSON.parse(
      userData?.data?.finished_voca
    );
    if (clickedSet) {
      currentFinished.map((voca, index) => {
        if (voca.title === clickedSet.title) {
          for (let i = 0; i < pageSize; i++) {
            for (let j = 0; j < voca.content.length; j++) {
              if (
                Object.keys(voca.content[j]).includes(list[i][0]) &&
                Object.values(voca.content[j]).includes(list[i][1])
              ) {
                setIsInFinished((prev) =>
                  prev.map((tf, idx) => (idx === i ? true : tf))
                );
                break;
              }
            }
          }
          return;
        }
      });
    }
  };
  const mounted = useRef(false);

  const ShowWords = ({ list }: { list: Array<string> }) => {
    if (!mounted.current) {
      checkFinshed(list);
      mounted.current = true;
    } else {
      //pass
    }
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
            {isInFinished[index] ? (
              <button>외운거다</button>
            ) : (
              <button onClick={() => onFinishedClick(index)}>완료</button>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <BackGround>
      {isPatchFinishLoading || isUserDataLoading || isLoading ? (
        <Loading />
      ) : null}
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
            <button type="button" onClick={onDelete}>
              delete
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
          {data?.map((collection) => (
            <WordSet key={collection.pk} layoutId={String(collection.pk)}>
              {collection.title}
              <button
                type="button"
                onClick={() => {
                  onSetClicked(collection.pk);
                }}
              >
                내용보기
              </button>
            </WordSet>
          ))}
        </WordSetBox>
      </AnimatePresence>
    </BackGround>
  );
}

export default Collection;
