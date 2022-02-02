import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedAtom, userInfoAtom } from "../atoms";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: rgb(241, 241, 241);
`;

const Items = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid;
`;

const Item = styled.li`
  color: rgb(39, 123, 133);

  display: inline-block;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 70px;
  :hover {
    font-weight: bolder;
  }
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  :hover {
    cursor: pointer;
    border-bottom: 3px solid rgb(113, 186, 194);
  }
`;

function Header() {
  const search = useLocation();
  const Logout = useResetRecoilState(isLoggedAtom);
  const ResetUser = useResetRecoilState(userInfoAtom);

  const OnClick = () => {
    Logout();
    ResetUser();
  };

  if (search.pathname === "/") return null;
  if (search.pathname === "/Login" || search.pathname === "/login") return null;
  if (search.pathname === "/signup") return null;

  return (
    <div>
      <Nav>
        <Items>
          <Item>
            <Link to="/qna">QnA</Link>
          </Item>
          <Item>
            <Link to="/collection">학습관리</Link>
          </Item>
          <Item>
            <Link to="/courses">단어모음</Link>
          </Item>
          <Item>
            <Link to="/profile">Profile</Link>
          </Item>
          <Item onClick={OnClick}>Logout</Item>
        </Items>
      </Nav>
    </div>
  );
}

export default Header;
