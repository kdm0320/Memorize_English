import { Link, useLocation } from "react-router-dom";

function Header() {
  const search = useLocation();
  if (search.pathname === "/") return null;
  if (search.pathname === "/Login" || search.pathname === "/login") return null;
  if (search.pathname === "/signup") return null;
  return (
    <div>
      <Link to="/qna">
        <h2>QnA</h2>
      </Link>
      <Link to="/userBoard">
        <h2>User Board</h2>
      </Link>
      <Link to="/loby">
        <h2>학습관리</h2>
      </Link>
      <Link to="/courses">
        <h2>단어모음</h2>
      </Link>
      <Link to="/profile">
        <h2>Profile</h2>
      </Link>
      <h2>Log out</h2>
      <hr />
    </div>
  );
}

export default Header;
