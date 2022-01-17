import { Link } from "react-router-dom";

function Gate() {
  return (
    <div>
      <h1>Welcome to this site!!</h1>
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
