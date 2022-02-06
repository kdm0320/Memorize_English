import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Courses from "./Routes/Courses";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import SignUp from "./Routes/SignUp";
import Write from "./Routes/Write";
import Board from "./Routes/Board";
import Collection from "./Routes/Collections";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {["/collection", "/collection/:setId"].map((path, index) => {
          return <Route path={path} element={<Collection />} key={index} />;
        })}
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        {["/qna", "/qna/:postId"].map((path, index) => {
          return <Route path={path} element={<Board />} key={index} />;
        })}
        <Route path="/qna/write" element={<Write />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
