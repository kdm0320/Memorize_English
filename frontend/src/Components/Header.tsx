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
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  padding: 0px 50px;
  width: 100px;
  a {
    text-decoration: none;
    color: inherit;
  }
  span {
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
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
            <Link to="/qna">
              <span>QnA</span>
            </Link>
          </Item>
          <Item>
            <Link to="/collection">
              <span>학습관리</span>
            </Link>
          </Item>
          <Item>
            <Link to="/courses">
              <span>단어모음</span>
            </Link>
          </Item>
          <Item>
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          </Item>
          <Item>
            <span onClick={OnClick}>Logout</span>
          </Item>
        </Items>
      </Nav>
      <hr />
    </div>
  );
}

export default Header;
