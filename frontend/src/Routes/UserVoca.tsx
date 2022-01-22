import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Content, IAnswer, TestBox, Word, WordSet } from "../theme";

const datas = [
  {
    title: "단어장1",
    content: [
      ["one", "1"],
      ["two", "2"],
    ],
  },
  {
    title: "단어장2",
    content: [
      ["three", "3"],
      ["four", "4"],
    ],
  },
];

function UserVoca() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnswer>();
  const { vocaName } = useParams();
  const [onTest, setOnTest] = useState(false);
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
  const onValid = (data: IAnswer) => {
    console.log(data);
  };
  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);
  const clickedVoca = vocaName && datas.find((voca) => voca.title === vocaName);

  return (
    <div>
      <AnimatePresence>
        {vocaName && onTest ? (
          <TestBox>
            {clickedVoca && (
              <>
                <span>{errors.answer?.message}</span>
                <div>{clickedVoca.content[0][0]}</div>
                <form onSubmit={handleSubmit(onValid)}>
                  <input></input>
                </form>
                <button onClick={onCloseClicked}>close</button>
              </>
            )}
          </TestBox>
        ) : null}
      </AnimatePresence>
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
                {clickedVoca.content.map((word, index) => (
                  <div>
                    <span key={index + "#" + word[0]}>{index + 1}</span>
                    <form>
                      <Word
                        key={word[0]}
                        readOnly
                        value={isBlindWord ? "" : word[0]}
                      />
                      <Word
                        key={word[0]}
                        readOnly
                        value={isBlindMean ? "" : word[1]}
                      />
                      <input type="button" value="단어장에 저장" />
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
        {datas.map((data) => (
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
