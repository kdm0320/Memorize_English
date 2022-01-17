import { Link } from "react-router-dom";

function Header() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/Login" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return null;
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
