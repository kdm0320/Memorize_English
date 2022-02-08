import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchUser, fetchWords, putCollection } from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";
import { BackGround, WordSetBox } from "../Components/Others";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Footer from "../Components/Footer";
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
  background-color: transparent;
  margin-top: 5px;
  margin-right: 10px;
`;

const WordSet = styled(motion.div)`
  display: flex;
  width: 18vw;
  height: 22vh;
  background-color: rgb(237, 235, 222);
  border-width: 3px;
  border-style: solid;
  border-color: rgb(86, 182, 194);
  margin: 15px;
  margin-top: 14%;
  box-shadow: 5px 5px 5px;
  border-radius: 15px;
  flex-direction: row-reverse;
  justify-content: space-around;
  text-align: center;
  span {
    margin-top: 15%;
    margin-left: 12%;
    justify-self: center;
    font-weight: bold;
    font-size: 110%;
  }
`;

function Courses() {
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged]);

  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery<IData>(["allWords", userInfo], () =>
    fetchWords(userInfo)
  );
  const datas: Array<any> | undefined = data?.results;
  //하트 구현
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
  //
  return (
    <>
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
                <span>{data.title}</span>
              </WordSet>

              {(index + 1) % 4 === 0 ? <br /> : null}
            </div>
          ))}
        </WordSetBox>
      </BackGround>
      <Footer />;
    </>
  );
}

export default Courses;
