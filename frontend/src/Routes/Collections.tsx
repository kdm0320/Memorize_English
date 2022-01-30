import { AnimatePresence, motion } from "framer-motion";
import React, { FormEvent, useEffect, useRef, useState } from "react";
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
import { isAxiosLoadingAtom, userInfoAtom } from "../atoms";
import { Content, Overlay, Word, WordSet } from "../theme";
import { useForm } from "react-hook-form";
import { Loading } from "../Components/Loading";

interface IVoca {
  title: string;
  content: any[];
}

function Collection() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [wordPk, setwordPk] = useState<number>(0);
  //유저 단어 콜렉션 Fetch 함수
  const { isLoading, data } = useQuery(["allCollections", userInfo], () =>
    fetchCollections(userInfo)
  );
  const datas: {
    pk: number;
    title: string;
    content: Array<any>;
  }[] = data;
  //단어,뜻가리기
  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);
  //단어세트 클릭시 설정
  const { setId } = useParams();
  const clickedSet = setId && datas?.find((set) => String(set.pk) === setId);
  const onSetClicked = (setId: number) => {
    setwordPk(setId);
    navigate(`/collection/${setId}`);
  };
  const onCloseClicked = () => {
    navigate(`/collection`);
  };
  //삭제 관련
  const mutation = useMutation(putCollection);
  const onDelete = () => {
    mutation.mutate({ userInfo, wordPk });
    navigate(`/collection`);
    window.location.replace("/collection");
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
  const nextClick = () => setCurrentPage((prev) => prev + 1);
  const prevClick = () => setCurrentPage((prev) => prev - 1);
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
            console.log(vocas[i]);
            vocas[i].content.push({ [word]: mean });
            const newFinished: string = JSON.stringify(vocas);
            finishedMutation.mutate({ userInfo, newFinished });
            setFinishedWords(vocas[i].content.length);
            return;
          }
        }
      }
      createSet();
      console.log(
        "이게 문제같은데-> 같은거만 누를땐 뜨면 안돼 이건 새로운거 누를때 한번만 떠야하는데"
      );
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
  const onClick = (index: number) => {
    const word = document.getElementById(`word${index}`)?.innerText;
    const mean = document.getElementById(`mean${index}`)?.innerText;
    setCurrentVoca({ word, mean });
  };
  //단어 보여주기
  const testSkeleton = false;
  const ShowWords = ({ list }: { list: Array<string> }) => {
    return (
      <>
        {list.map((word, index) => (
          <div key={index}>
            {!isLoading ? (
              <Word key={word[0]} id={`word${index}`}>
                {isBlindWord ? "" : word[0]}
              </Word>
            ) : (
              <SkeletonTheme width="30%">
                <Skeleton />
              </SkeletonTheme>
            )}
            {!isLoading ? (
              <Word key={word[1]} id={`mean${index}`}>
                {isBlindWord ? "" : word[1]}
              </Word>
            ) : (
              <SkeletonTheme baseColor="black" width="50%">
                <Skeleton />
              </SkeletonTheme>
            )}

            <button onClick={() => onClick(index)}>완료</button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <>
        <Skeleton />
        <ReactLoading type="spin" color="black" />
        <h3>Loading</h3>
      </>
      {isPatchFinishLoading || isUserDataLoading ? <Loading /> : null}
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
        {setId ? (
          <div
            style={{
              width: "300px",
              height: "500px",
              backgroundColor: "whitesmoke",
              borderStyle: "solid",
            }}
          >
            <button onClick={toggleWordBlind}>단어 가리기</button>
            <button onClick={toggleMeanBlind}>뜻 가리기</button>
            <button onClick={onCloseClicked}>close</button>
            <button onClick={() => toggleAchievement()}>성취</button>
            <button onClick={onDelete}>delete</button>
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
          </div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {datas?.map((data) => (
          <WordSet key={data.pk} layoutId={String(data.pk)}>
            {data.title}
            <button onClick={() => onSetClicked(data.pk)}>내용보기</button>
          </WordSet>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Collection;
