import { motion } from "framer-motion";
import styled, { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {};

export interface IProp {
  location?: string;
  bdcolor?: string | null;
  brdius?: string | null;
}

export const Overlay = styled(motion.div)`
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

export const Noti = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: white;
  font-size: 15px;
  border-color: black;
  border-width: 5px;
  border-style: solid;
`;

export const Content = styled(motion.div)`
  display: flex;
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
  border-color: ${(props) => props.bdcolor};
`;
export const Word = styled(motion.input)<IProp>`
  border: 0;
  background-color: whitesmoke;
  outline: 0;
  cursor: default;
`;
