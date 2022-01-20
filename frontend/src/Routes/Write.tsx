import { Link, useLocation } from "react-router-dom";

function Write() {
  const search = useLocation();

  return (
    <div>
      {search.pathname === "/qna/write" ? (
        <h1>버그리포트</h1>
      ) : (
        <h1>유저리포트</h1>
      )}
    </div>
  );
}

export default Write;
