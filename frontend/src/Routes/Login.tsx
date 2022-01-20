import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("username", { required: true })} placeholder="ID" />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <Link to="/loby">
          <button>Log In</button>
        </Link>
      </form>
      <div>
        Don't have a account?
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
