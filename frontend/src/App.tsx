import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Achievment from "./Routes/Achievment";
import Courses from "./Routes/Courses";
import Gate from "./Routes/Gate";
import Loby from "./Routes/Loby";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import SignUp from "./Routes/SignUp";
import UserCourse from "./Routes/UserCourses";
import UserVoca from "./Routes/UserVoca";
import Write from "./Routes/Write";
import Board from "./Routes/Board";

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
        <Route path="/userCourses" element={<UserCourse />} />
        <Route path="/userVoca" element={<UserVoca />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qna" element={<Board />} />
        <Route path="/userBoard" element={<Board />} />
        <Route path="/qna/write" element={<Write />} />
        <Route path="/userBoard/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;
