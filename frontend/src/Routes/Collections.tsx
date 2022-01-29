import { AnimatePresence, motion } from "framer-motion";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {
  fetchCollections,
  fetchFinished,
  patchFinished,
  putCollection,
} from "../api";
import { userInfoAtom } from "../atoms";
import { Content, Overlay, Word, WordSet } from "../theme";
import { useForm } from "react-hook-form";

interface IVoca {
  title: string;
  content: any[];
}

function Collection() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [wordPk, setwordPk] = useState<number>(0);

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
  const toggleAchievement = () => setOnAchievement((prev) => !prev);
  //단어 완료처리
  const finishedData = useQuery(["allFinished", userInfo], () =>
    fetchFinished(userInfo)
  );
  const isFinishedLoading = finishedData.isLoading;
  const [vocas, setVocas] = useState<any[]>([]);
  const setCurrentVoca = ({ word, mean }: { word?: any; mean?: string }) => {
    setVocas(JSON.parse(finishedData?.data?.finished_voca));
    const initial: any[] = JSON.parse(finishedData?.data?.finished_voca);
    if (clickedSet) {
      if (initial.length != 0) {
        for (let i in vocas) {
          if (vocas[i].title === clickedSet.title) {
            vocas.map((voca: IVoca) => {
              if (clickedSet) {
                if (clickedSet.title === voca.title) {
                  console.log(voca);
                  voca.content.push({ [word]: mean });
                  const newFinished: string = JSON.stringify(vocas);
                  patchFinished({ userInfo, newFinished });
                }
              }
            });
            return;
          }
          createSet();
        }
      } else {
        console.log(`두번 이상이면 initial의 문제`);
        createSet();
      }
    }
  };
  const createSet = () => {
    if (clickedSet) {
      const newContent = [{ title: clickedSet.title, content: [] }];
      setVocas((prev) => [...prev, ...newContent]);
      const newFinished = JSON.stringify(vocas);
      patchFinished({ userInfo, newFinished });
    }
  };
  const onClick = (index: number) => {
    const word = document.getElementById(`word${index}`)?.innerText;
    const mean = document.getElementById(`mean${index}`)?.innerText;
    setCurrentVoca({ word, mean });
  };
  //단어 보여주기
  const ShowWords = ({ list }: { list: Array<string> }) => {
    return (
      <>
        {list.map((word, index) => (
          <div key={index}>
            <Word key={word[0]} id={`word${index}`}>
              {isBlindWord ? "" : word[0]}
            </Word>
            <Word key={word[1]} id={`mean${index}`}>
              {isBlindWord ? "" : word[1]}
            </Word>
            <button onClick={() => onClick(index)}>완료</button>
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      {isFinishedLoading ? <h1>Loading..</h1> : null}
      {onAchievement
        ? clickedSet && (
            <>
              <ReactApexChart
                type="pie"
                series={[clickedSet.content.length - 50, 50]}
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

            {indexOfFirst != 0 ? <button onClick={prevClick}>⬅️</button> : null}
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
