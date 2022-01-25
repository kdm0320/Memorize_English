import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchWords } from "../api";
import { basketState, IBasket, OnNoti } from "../atoms";
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

const ChosenSet = styled(WordSet)`
  background-color: lightblue;
  width: 50px;
  height: 50px;
  border-color: ${(props) => props.bdcolor};
  border-radius: ${(props) => props.brdius || "0px"};
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
  const [title, setTitle] = useState<string>("");
  const [basket, setBaskets] = useRecoilState<IBasket>(basketState);
  const addBasket = () => {
    if (Object.keys(basket).includes(title)) return null;
    setBaskets((prev) => {
      const newprev = { ...prev };
      newprev[title] = false;
      return newprev;
    });
  };

  const [onNoti, setOnNoti] = useRecoilState(OnNoti);
  const toggleNoti = () => setOnNoti((prev) => !prev);
  const reset = useResetRecoilState(basketState);
  const { isLoading, data } = useQuery<IData>("allWords", fetchWords);
  const datas: Array<any> | undefined = data?.results;

  const SendData = () => {
    toggleNoti();
    console.log(basket);
    // reset();
  }; //백엔드와 연결 후 장바구니 데이터를 유저 단어모음으로 보내주고 장바구니 리셋 역할 함수
  const showFuction = (message: string) => {
    return (
      <div>
        <Noti>
          {message}
          <button onClick={SendData}>확인</button>
          <button onClick={toggleNoti}>취소</button>
        </Noti>
      </div>
    );
  };

  const chosenSetRef = useRef<HTMLDivElement>(null);
  const deleteBasket = () => {
    for (let i in basket) {
      if (basket[i]) {
        setBaskets((prev) => {
          const newprev = { ...prev };
          delete newprev[i];
          return newprev;
        });
      }
    }
  };
  const onChangeClick = (event: MouseEvent) => {
    setBaskets((prev) => {
      const newprev = { ...prev };
      newprev[event.currentTarget.innerHTML] =
        !newprev[event.currentTarget.innerHTML];
      return newprev;
    });
  };
  return (
    <>
      <ChosenBox>
        {onNoti ? showFuction("저장하시겠습니까?") : null}

        <div>
          {Object.keys(basket).length !== 0
            ? Object.keys(basket).map((set, index) => (
                <ChosenSet
                  onClick={onChangeClick}
                  key={index}
                  ref={chosenSetRef}
                  brdius={basket[set] ? "25px" : null}
                >
                  {set}
                </ChosenSet>
              ))
            : null}
        </div>
        <h3>장바구니</h3>
        <button onClick={toggleNoti}>저장</button>
        <button onClick={deleteBasket}>삭제</button>
      </ChosenBox>
      <div>
        {datas?.map((data: IWordData) => (
          <WordSet
            onClick={() => {
              setId(data.pk + "#");
              setTitle(data.title);
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
            }}
          >
            <OverView layoutId={id}>
              단어 상세내용
              <button onClick={addBasket}>choose</button>
            </OverView>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Courses;
