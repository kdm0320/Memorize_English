import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Achievment from "./Routes/Achievment";
import Courses from "./Routes/Courses";
import Gate from "./Routes/Gate";
import Header from "./Routes/Header";
import Loby from "./Routes/Loby";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import QnaBoard from "./Routes/QnaBoard";
import SignUp from "./Routes/SignUp";
import UserBoard from "./Routes/UserBoard";
import UserCourse from "./Routes/UserCourses";
import UserVoca from "./Routes/UserVoca";

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
        <Route path="/usercourses" element={<UserCourse />} />
        <Route path="/uservoca" element={<UserVoca />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qna" element={<QnaBoard />} />
        <Route path="/userBoard" element={<UserBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
