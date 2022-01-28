import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isLoggedAtom, userInfoAtom } from "../atoms";

function Header() {
  const search = useLocation();
  const Logout = useResetRecoilState(isLoggedAtom);
  const RestUser = useResetRecoilState(userInfoAtom);

  const OnClick = () => {
    Logout();
    RestUser();
  };

  if (search.pathname === "/") return null;
  if (search.pathname === "/Login" || search.pathname === "/login") return null;
  if (search.pathname === "/signup") return null;

  return (
    <div>
      <Link to="/qna">
        <h2>QnA</h2>
      </Link>
      <Link to="/collection">
        <h2>학습관리</h2>
      </Link>
      <Link to="/courses">
        <h2>단어모음</h2>
      </Link>
      <Link to="/profile">
        <h2>Profile</h2>
      </Link>
      <button onClick={OnClick}>Logout</button>
      <hr />
    </div>
  );
}

export default Header;
