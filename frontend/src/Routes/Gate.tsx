import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WelcomePhrase = styled(motion.h1)`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 100px;
`;

function Gate() {
  return (
    <div>
      <AnimatePresence>
        <WelcomePhrase>Welcome to this site!!</WelcomePhrase>
      </AnimatePresence>
      <>
        <div>if you already have a account</div>
        <div>
          <Link to="/Login">
            <button>Sign In</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </>
    </div>
  );
}

export default Gate;
