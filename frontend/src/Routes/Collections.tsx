import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { fetchCollections, fetchFinished, putCollection } from "../api";
import { userInfoAtom } from "../atoms";
import { Content, Overlay, Word, WordSet } from "../theme";

interface IVoca {
  title: string;
  finished: string;
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
  //클릭단어 세트 알기
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
  const [finishedNumbers, setFinishedNumbers] = useState("");
  const getFinished = () => {
    fetchFinished(userInfo).then((data) =>
      data.finished_voca.map((voca: IVoca) => {
        if (clickedSet) {
          if (clickedSet.title === voca.title) {
            setFinishedNumbers(voca.finished);
          }
        }
      })
    );
    toggleAchievement();
  };

  //단어 보여주기
  const ShowWords = ({ list }: { list: Array<any> }) => {
    return (
      <>
        {list.map((word, index) => (
          <form key={index}>
            <Word key={word[0]} readOnly value={isBlindWord ? "" : word[0]} />
            <br />
            <Word key={word[1]} readOnly value={isBlindMean ? "" : word[1]} />
            <button>완료</button>
          </form>
        ))}
      </>
    );
  };
  return (
    <div>
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
            <button onClick={() => getFinished()}>성취</button>
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
