import { motion } from "framer-motion";
import styled from "styled-components";

//페이지 내부 모든 페이지 공유
export interface IProp {
  visiblity?: string;
}

export const Error = styled.span`
  color: rgb(183, 61, 65);
`;
export const BackGround = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
`;
export const Noti = styled(motion.div)`
  display: flex;
  width: 20vw;
  height: 20vh;
  background-color: rgb(237, 235, 222);
  font-size: 15px;
  border-color: rgba(74, 105, 189, 1);
  border-width: 3px;
  border-style: solid;
  border-radius: 15px;
  flex-direction: column;
`;
//로그인,회원가입 페이지 공유
export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    rgba(198, 217, 241, 0.1),
    rgba(170, 203, 241, 0.7),
    rgba(40, 124, 241, 1)
  );
  background-size: cover;
`;

export const Box = styled(motion.div)`
  width: 45%;
  height: 50%;
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

export const LeftBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 40px 0px 0px 40px;
  justify-content: center;
  text-align: center;
`;

export const Phrase = styled(motion.span)`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 30px;
`;
export const PhraseBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30%;
`;
export const RightBox = styled(LeftBox)`
  background-color: whitesmoke;
  border-radius: 0 40px 40px 0;
  flex-direction: column;
`;

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  justify-content: space-between;
`;
export const Input = styled(motion.input)`
  display: flex;
  place-self: center;
  margin-bottom: 2%;
  padding-bottom: 3%;
  height: 10%;
  width: 60%;
  border-bottom: 1px solid;
  border-left: none;
  border-right: none;
  border-top: none;
  background-color: transparent;
  outline: 0;
`;

export const Btn = styled(motion.button)`
  width: 60%;
  height: 100%;
  background-color: rgba(225, 112, 85, 1);
  border-radius: 10px;
  color: white;
  margin-top: 8%;
  margin-bottom: 5%;
  place-self: center;
  cursor: pointer;
`;
export const IsAccount = styled(motion.span)`
  margin-right: 1%;
`;

export const AskBox = styled.div`
  margin-top: 4%;
`;
export const SignupText = styled(motion.span)`
  color: rgba(225, 112, 85, 1);
  margin-left: 2%;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
// 단어모음,학습관리 페이지 공유
export const WordSetBox = styled.div`
  display: flex;
  padding-left: 4%;
  width: 90%;
`;
//반투명 흑백 배경
export const Overlay = styled(motion.div)`
  display: flex;
  position: fixed;
  height: 100vh;
  padding-bottom: 1%;

  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  align-items: center;
  justify-content: center;
`;
