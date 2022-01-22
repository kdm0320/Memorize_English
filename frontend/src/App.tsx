import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Achievment from "./Routes/Achievment";
import Courses from "./Routes/Courses";
import Gate from "./Routes/Gate";
import Loby from "./Routes/Loby";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import SignUp from "./Routes/SignUp";
import UserVoca from "./Routes/UserVoca";
import Write from "./Routes/Write";
import Board from "./Routes/Board";
import Collection from "./Routes/Collections";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Gate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/loby" element={<Loby />} />
        <Route path="/achievment" element={<Achievment />} />
        {["/collection", "/collection/test/:setId", "/collection/:setId"].map(
          (path, index) => {
            return <Route path={path} element={<Collection />} key={index} />;
          }
        )}
        {["/voca", "/voca/test/:vocaName", "/voca/:vocaName"].map(
          (path, index) => {
            return <Route path={path} element={<UserVoca />} key={index} />;
          }
        )}
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qna" element={<Board />} />
        <Route path="/userboard" element={<Board />} />
        <Route path="/qna/write" element={<Write />} />
        <Route path="/userboard/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;
