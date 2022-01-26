import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchWords, fetchWordsNew } from "../api";
import { OnNoti, userInfoAtom } from "../atoms";
import { Noti, WordSet } from "../theme";

const ChosenBox = styled.div`
  float: right;
  width: 300px;
  height: 400px;
  background-color: red;
  border-color: black;
  border-width: 5px;
`;

const Overlay = styled(motion.div)`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  align-items: center;
  justify-content: center;
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
  const { data } = useQuery<IData>("allWords", async () => {
    const { data } = await axios.get(`${baseUrl}/words/`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    return data;
  });
  const datas: Array<any> | undefined = data?.results;
  const userInfo = useRecoilValue(userInfoAtom);
  const mutation = useMutation(() =>
    axios.put(
      `${baseUrl}/users/${userInfo.pk}/collection/`,
      { pk: wordPk },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
  );

  const toggleLearning = () => setIsLearning((prev) => !prev);
  const toggleBasket = async () => {
    mutation.mutateAsync();
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
              console.log(data.is_learning);
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
