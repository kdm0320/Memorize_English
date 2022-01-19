import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketState, IBasket, OnNoti } from "../atoms";
import { CnNoti } from "../Components/Notification";
import { Btn, Noti } from "../theme";

interface IProp {
  location?: string;
  bdcolor?: string | null;
  brdius?: string | null;
}

interface IChosenSet {
  borderColor: string;
}

const ChosenBox = styled.div`
  float: right;
  width: 300px;
  height: 400px;
  background-color: red;
  border-color: black;
  border-width: 5px;
`;

const WorldSet = styled(motion.div)<IProp>`
  width: 100px;
  height: 100px;
  background-color: lightBlue;
  position: ${(props) => props.location};
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

const ChosenSet = styled(WorldSet)`
  background-color: lightblue;
  width: 50px;
  height: 50px;
  border-color: ${(props) => props.bdcolor};
  border-radius: ${(props) => props.brdius || "0px"};
`;

const datas = [
  { pk: "1", title: "토익", is_learnig: false },
  { pk: "2", title: "오픽", is_learnig: false },
  { pk: "3", title: "회화", is_learnig: false },
  { pk: "4", title: "비즈니스", is_learnig: false },
  { pk: "5", title: "기초", is_learnig: false },
];

function Courses() {
  const [id, setId] = useState<string | null | undefined>(null);
  const [title, setTitle] = useState<string>("");
  const [basket, setBaskets] = useRecoilState<IBasket>(basketState);
  const addBasket = () => {
    if (Object.keys(basket).includes(title)) return null;
    const world = title;
    setBaskets((prev) => {
      const newprev = { ...prev };
      newprev[title] = false;
      return newprev;
    });
  };
  console.log(basket);
  const [chekList, setCheckList] = useState<(string | undefined | null)[]>([]);

  const chosenSetRef = useRef<HTMLDivElement>(null);
  const deleteBasket = () => {};
  const onChangeClick = () => {
    setCheckList((prev) => [title, ...prev]);
  };
  return (
    <>
      <ChosenBox>
        {/* <div>
          {basket.length != 0
            ? basket.map((set, index) => (
                <ChosenSet onClick={onChangeClick} key={index}>
                  {JSON.parse(set)}
                </ChosenSet>
              ))
            : null}
        </div> */}
        <h3>장바구니</h3>
        <button>저장</button>
        <button>삭제</button>
      </ChosenBox>
      <div>
        {datas.map((data) => (
          <WorldSet
            onClick={() => {
              setId(data.pk + "#");
              setTitle(data.title);
            }}
            key={data.pk + "#"}
            layoutId={data.pk + "#"}
          >
            {data.title}
          </WorldSet>
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
