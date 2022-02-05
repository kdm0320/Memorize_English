import { motion } from "framer-motion";
import styled, { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {};

export interface IProp {
  visiblity?: string;
}

export const Noti = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: white;
  font-size: 15px;
  border-color: black;
  border-width: 5px;
  border-style: solid;
`;
