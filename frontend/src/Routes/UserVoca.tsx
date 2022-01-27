import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchVocas } from "../api";
import { userInfoAtom } from "../atoms";
import { Content, Word, WordSet } from "../theme";

interface IVoca {
  title: string;
  content: string;
}
interface ISingnUpForm {
  id: number;
  username: string | null | number;
  first_name: string | null | number;
  last_name: string | null | number;
  email: string;
  nickname: string | null | number;
  collection: Array<number>;
  user_voca: Array<IVoca>;
}

function UserVoca() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery<ISingnUpForm>(["allVocas", userInfo], () =>
    fetchVocas(userInfo)
  );
  const datas = data?.user_voca;
  const { vocaName } = useParams();
  const [onTest, setOnTest] = useState(false);
  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);
  const tempClickedVoca =
    vocaName && datas?.find((voca) => voca.title === vocaName);
  const clickedVoca =
    tempClickedVoca &&
    Object.entries(JSON.parse(tempClickedVoca.content.replace(/[\']/g, '"')));
  const toggleOnTest = () => {
    setOnTest((prev) => !prev);
  };
  const onSetClicked = (vocaName: string) => {
    navigate(`/voca/${vocaName}`);
  };
  const onTestClicked = (vocaName: string) => {
    toggleOnTest();
    navigate(`/voca/test/${vocaName}`);
  };
  const onCloseClicked = () => {
    if (onTest) toggleOnTest();
    navigate(`/voca`);
  };

  return (
    <div>
      <AnimatePresence>
        {vocaName && !onTest ? (
          <Content>
            {clickedVoca && (
              <>
                <button key="test" onClick={() => onTestClicked(vocaName)}>
                  test
                </button>
                <button key="close" onClick={onCloseClicked}>
                  close
                </button>
                <button key="wordBlind" onClick={toggleWordBlind}>
                  단어 가리기
                </button>
                <button key="meanBlind" onClick={toggleMeanBlind}>
                  뜻 가리기
                </button>
                {clickedVoca.map((word, index) => (
                  <div>
                    <span key={index + "#" + word[0]}>{index + 1}</span>
                    <form>
                      <Word key={word[0]} readOnly value={word[0]} />
                      <Word
                        key={String(word[1])}
                        readOnly
                        value={String(word[1])}
                      />
                    </form>
                    <br key={index + word[0] + "br"} />
                  </div>
                ))}
              </>
            )}
          </Content>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {datas?.map((data) => (
          <WordSet
            onClick={() => onSetClicked(data.title)}
            key={data.title + "#"}
          >
            {data.title}
          </WordSet>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default UserVoca;
