import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchWords, putCollection } from "../api";
import { isLoggedAtom, OnNoti, userInfoAtom } from "../atoms";
import { BackGround, WordSet } from "../Components/Others";

const WordSetBox = styled.div`
  display: flex;
  margin: 5px 5px 30px 85px;
  width: 90%;
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
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
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
    <BackGround>
      <WordSetBox>
        {datas?.map((data: IWordData, index) => (
          <div key={index}>
            <WordSet
              onClick={() => {
                setwordPk(data.pk);
                setIsLearning(data.is_learning);
              }}
              key={data.pk + "#"}
              layoutId={data.pk + "#"}
            >
              {data.title}
              <button onClick={toggleBasket}>
                {isLearning ? "off" : "on"}
              </button>
              <i className="far fa-heart" style={{ color: "pink" }}></i>
            </WordSet>

            {(index + 1) % 4 === 0 ? <br /> : null}
          </div>
        ))}
      </WordSetBox>

      <AnimatePresence></AnimatePresence>
    </BackGround>
  );
}

export default Courses;
