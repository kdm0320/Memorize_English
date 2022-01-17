import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Btn } from "../buttonTheme";

const ChosenBox = styled.div`
  display: flex;
  float: right;
  width: 300px;
  height: 400px;
  background-color: red;
  border-color: black;
  border-width: 5px;
`;

interface IProp {
  location?: string;
}

const WorldSet = styled(motion.div)<IProp>`
  width: 100px;
  height: 100px;
  background-color: lightBlue;
  position: ${(props) => props.location};
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

function Courses() {
  const [showing, setShowing] = useState(false);
  const [ischoice, setIschoice] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  const toggleChoice = () => setIschoice((prev) => !prev);

  const datas = ["토익", "오픽", "실생활", "기본"];
  const target = {
    id: "",
    title: "",
  };
  return (
    <>
      <ChosenBox>
        <h3>장바구니</h3>
        <Btn>저장</Btn>

        <button>저장</button>
        <button>삭제</button>
      </ChosenBox>
      <WorldSet location="relative" layoutId="choice">
        <WorldSet
          location="absolute"
          style={{ top: 0 }}
          onClick={toggleShowing}
          layoutId="ex"
        >
          단어주제
        </WorldSet>
        단어주제
      </WorldSet>
      <AnimatePresence>
        {showing ? (
          <Overlay onClick={toggleShowing}>
            <OverView layoutId="ex">
              단어 상세내용
              <button onClick={toggleChoice}>choose</button>
            </OverView>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Courses;
