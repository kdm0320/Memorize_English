import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedAtom, userInfoAtom } from "../atoms";

function Loby() {
  const check = useRecoilValue(isLoggedAtom);
  const user = useRecoilValue(userInfoAtom);
  console.log(user);
  console.log(check);
  return (
    <div>
      <Link to="/achievment">
        <button>성취도</button>
      </Link>
      <Link to="/collection">
        <button>개인 단어모음</button>
      </Link>
      <Link to="/voca">
        <button>단어장</button>
      </Link>
    </div>
  );
}

export default Loby;
