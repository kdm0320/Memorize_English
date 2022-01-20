import { motion } from "framer-motion";
import styled from "styled-components";

export interface IProp {
  location?: string;
  bdcolor?: string | null;
  brdius?: string | null;
}

export const WorldSet = styled(motion.div)<IProp>`
  width: 100px;
  height: 100px;
  background-color: lightBlue;
  position: ${(props) => props.location};
  border-width: 5px;
`;
