import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchWords, putCollection } from "../api";
import { OnNoti, userInfoAtom } from "../atoms";
import { Noti, Overlay, WordSet } from "../theme";

const ChosenBox = styled.div`
  float: right;
  width: 300px;
  height: 400px;
  background-color: red;
  border-color: black;
  border-width: 5px;
`;

const OverView = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
`;

interface IWordData {
  pk: number;
  title: string;
  content: string[];
  is_learning: boolean;
}
interface IData {
  count?: number;
  next?: null;
  previous?: null;
  results?: Array<any> | undefined;
}

function Courses() {
  const [id, setId] = useState<string | null | undefined>(null);
  const [wordPk, setwordPk] = useState<number>(0);
  const [isLearning, setIsLearning] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery<IData>(["allWords", userInfo], () =>
    fetchWords(userInfo)
  );
  const datas: Array<any> | undefined = data?.results;
  const mutation = useMutation(putCollection);

  const toggleLearning = () => setIsLearning((prev) => !prev);
  const toggleBasket = async () => {
    mutation.mutate({ userInfo, wordPk });
    toggleLearning();
  };

  return (
    <>
      <div>
        {datas?.map((data: IWordData) => (
          <WordSet
            onClick={() => {
              setId(data.pk + "#");
              setwordPk(data.pk);
              setIsLearning(data.is_learning);
            }}
            key={data.pk + "#"}
            layoutId={data.pk + "#"}
          >
            {data.title}
          </WordSet>
        ))}
      </div>

      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => {
              setId(null);
              setIsLearning(false);
            }}
          >
            <OverView layoutId={id}>
              단어 상세내용
              <button onClick={toggleBasket}>
                {isLearning ? "off" : "on"}
              </button>
            </OverView>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Courses;
