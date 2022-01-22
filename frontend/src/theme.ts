import { motion } from "framer-motion";
import styled from "styled-components";

export interface IProp {
  location?: string;
  bdcolor?: string | null;
  brdius?: string | null;
}
export interface IAnswer {
  answer: string;
}
export const Btn = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
`;

export const Noti = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: white;
  font-size: 15px;
  border-color: black;
  border-width: 5px;
  border-style: solid;
`;

export const TestBox = styled(motion.div)`
  background-color: teal;
  width: 80vw;
  height: 90vh;
  top: 20;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

export const Content = styled(TestBox)`
  background-color: whitesmoke;
  border-color: black;
  border-style: solid;
`;

export const WordSet = styled(motion.div)<IProp>`
  width: 100px;
  height: 100px;
  background-color: lightBlue;
  position: ${(props) => props.location};
  border-width: 5px;
`;
export const Word = styled.input<IProp>`
  border: 0;
  background-color: whitesmoke;
  outline: 0;
  cursor: default;
`;
