import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrl } from "../api";
import { isLoggedAtom, userInfoAtom } from "../atoms";

interface ILoginForm {
  username?: string;
  password?: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation((user: ILoginForm) =>
    axios.post(`${baseUrl}/users/login/`, user)
  );
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedAtom);
  const setUserAtom = useSetRecoilState(userInfoAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/collection");
  }, []);
  const onValid = (data: ILoginForm) => {
    mutation
      .mutateAsync({
        username: data.username,
        password: data.password,
      })
      .then((value) => {
        setIsLoggedIn(true);
        setUserAtom({
          id: data.username,
          pk: value.data["id"],
          token: value.data["token"],
        });
        navigate("/loby");
      });
  };

  return (
    <div>
      {mutation.isError ? (
        <div>아이디 혹은 비밀번호 오류입니다 다시 확인해 주십시오</div>
      ) : null}
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("username", { required: "필수 항목입니다." })}
          placeholder="ID"
        />
        <span>{errors.username?.message}</span>
        <input
          {...register("password", { required: "필수 항목입니다." })}
          placeholder="Password"
          type="password"
        />
        <span>{errors.password?.message}</span>
        <button>Log In</button>
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
