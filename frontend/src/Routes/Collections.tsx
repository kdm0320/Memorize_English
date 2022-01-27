import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchCollections, putCollection } from "../api";
import { userInfoAtom } from "../atoms";
import { Content, Overlay, Word, WordSet } from "../theme";

interface IData {
  pk: number;
  title: string;
  content: [][];
}

function Collection() {
  const navigate = useNavigate();
  const { setId } = useParams();

  const userInfo = useRecoilValue(userInfoAtom);

  const { data } = useQuery(["allCollections", userInfo], () =>
    fetchCollections(userInfo)
  );
  const datas: {
    pk: number;
    title: string;
    content: Array<any>;
  }[] = data;

  const [wordPk, setwordPk] = useState<number>(0);

  const [isBlindMean, setIsBlindMean] = useState(false);
  const [isBlindWord, setIsBlindWord] = useState(false);
  const toggleMeanBlind = () => setIsBlindMean((prev) => !prev);
  const toggleWordBlind = () => setIsBlindWord((prev) => !prev);

  const clickedSet = setId && datas?.find((set) => String(set.pk) === setId);
  const mutation = useMutation(putCollection);
  const onTestClicked = (setId: string) => {
    navigate(`/collection/test/${setId}`);
  };
  const onCloseClicked = () => {
    navigate(`/collection`);
  };
  const onSetClicked = (setId: number) => {
    setwordPk(setId);
    navigate(`/collection/${setId}`);
  };
  const onDelete = () => {
    mutation.mutate({ userInfo, wordPk });
  };
  return (
    <div>
      <AnimatePresence>
        {setId ? (
          <Overlay onClick={onCloseClicked}>
            <Content>
              {clickedSet &&
                clickedSet.content.map((word, index) => (
                  <div>
                    <span>{index + 1}</span>
                    <form>
                      <Word
                        key={word[0]}
                        readOnly
                        value={isBlindWord ? "" : word[0]}
                      />
                      <br />
                      <Word
                        key={word[1]}
                        readOnly
                        value={isBlindMean ? "" : word[1]}
                      />
                      <input type="button" value="단어장에 저장" />
                    </form>
                  </div>
                ))}
            </Content>
          </Overlay>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {datas?.map((data) => (
          <WordSet key={data.pk} layoutId={String(data.pk)}>
            {data.title}
            <button onClick={onDelete}>delete</button>
            <button onClick={() => onSetClicked(data.pk)}>내용보기</button>
          </WordSet>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Collection;
