import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchUser, fetchWords, putCollection } from "../api";
import { isLoggedAtom, OnNoti, userInfoAtom } from "../atoms";
import { BackGround, WordSet, WordSetBox } from "../Components/Others";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useRef } from "react";
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

interface IValue {
  collection: any[];
}

const FavButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  float: right;
  margin-top: 5px;
  margin-right: 5px;
`;

function Courses() {
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);
  // const [wordPk, setwordPk] = useState<number>(0);
  const [isLearning, setIsLearning] = useState<any[]>([]);
  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery<IData>(["allWords", userInfo], () =>
    fetchWords(userInfo)
  );
  const datas: Array<any> | undefined = data?.results;
  const mutation = useMutation(putCollection);

  const [isFinished, setIsFinished] = useState<any[]>([]);
  useEffect(() => {
    fetchUser(userInfo).then((value: IValue) => {
      setIsFinished(value.collection);
    });
  }, []);

  const addFinished = (wordPk: number) => {
    setIsFinished((prev) => [...prev, wordPk]);
    mutation.mutate({ userInfo, wordPk });
  };
  const deleteFinished = (wordPk: number) => {
    setIsFinished((prev) => prev.filter((set) => set != wordPk));
    mutation.mutate({ userInfo, wordPk });
  };
  return (
    <BackGround>
      <WordSetBox>
        {datas?.map((data: IWordData, index) => (
          <div key={index}>
            <WordSet key={data.pk + "#"} layoutId={data.pk + "#"}>
              <FavButton>
                {isFinished.includes(data.pk) ? (
                  <IoHeartSharp
                    onClick={() => deleteFinished(data.pk)}
                    fontSize={30}
                    color="rgb(252,28,74)"
                    cursor="pointer"
                  />
                ) : (
                  <IoHeartOutline
                    onClick={() => addFinished(data.pk)}
                    fontSize={30}
                    cursor="pointer"
                  />
                )}
              </FavButton>
              {data.title}
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
