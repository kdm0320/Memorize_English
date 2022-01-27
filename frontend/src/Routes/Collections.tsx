import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Pagination from "rc-pagination";
import { baseUrl, fetchCollections, putCollection } from "../api";
import { userInfoAtom } from "../atoms";
import { Content, Overlay, Word, WordSet } from "../theme";
import { spawn } from "child_process";

interface IData {
  pk: number;
  title: string;
  content: [][];
}

function Collection() {
  const navigate = useNavigate();
  const { setId } = useParams();

  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery(["allCollections", userInfo], () =>
    fetchCollections(userInfo)
  );
  const datas: {
    pk: number;
    title: string;
    content: Array<any>;
  }[] = data;

  const [wordPk, setwordPk] = useState<number>(0);

  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);

  const clickedSet = setId && datas?.find((set) => String(set.pk) === setId);
  const mutation = useMutation(putCollection);

  const onSetClicked = (setId: number) => {
    setwordPk(setId);
    navigate(`/collection/${setId}`);
  };
  const onCloseClicked = () => {
    navigate(`/collection`);
  };
  const onDelete = () => {
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

  const nextClick = () => setCurrentPage((prev) => prev + 1);
  const prevClick = () => setCurrentPage((prev) => prev - 1);
  //

  const ShowWords = ({ list }: { list: Array<any> }) => {
    return (
      <>
        {list.map((word) => (
          <div>
            <form>
              <Word key={word[0]} readOnly value={isBlindWord ? "" : word[0]} />
              <br />
              <Word key={word[1]} readOnly value={isBlindMean ? "" : word[1]} />
              <input type="button" value="단어장에 저장" />
            </form>
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <AnimatePresence>
        {setId ? (
          <div>
            <button onClick={onCloseClicked}>close</button>
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
            <button onClick={onDelete}>delete</button>
            <button onClick={() => onSetClicked(data.pk)}>내용보기</button>
          </WordSet>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Collection;
