import { Link } from "react-router-dom";

function Loby() {
  return (
    <div>
      <Link to="/achievment">
        <button>성취도</button>
      </Link>
      <Link to="/userCourses">
        <button>개인 단어모음</button>
      </Link>
      <Link to="/userVoca">
        <button>단어장</button>
      </Link>
    </div>
  );
}

export default Loby;
