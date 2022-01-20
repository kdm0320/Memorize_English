import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function SignUp() {
  const onValid = () => {
    console.log("OK");
  };
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...(register("firstName"), { required: true })}
          placeholder="성(First Name)"
        />
        <input
          {...(register("lastName"), { required: true })}
          placeholder="이름(Last Name)"
        />
        <input
          {...(register("username"), { required: true })}
          placeholder="아이디(ID)"
        />
        <input
          {...(register("password"), { required: true })}
          placeholder="비밀번호(Password)"
        />
        <input
          {...(register("password1"), { required: true })}
          placeholder="비밀번호 확인(Confirm Password)"
        />
        <input {...register("nickName")} placeholder="닉네임(Nickname)" />
        <Link to="/login">
          <button>Create</button>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
