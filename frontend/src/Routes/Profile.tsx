import { on } from "process";
import { useForm } from "react-hook-form";

function Profile() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("Validate");
  };

  return (
    <>
      <div>
        <h3>Avatar</h3>
        <button>Upload</button>
        <button>Delete</button>
      </div>
      <div>
        <h3>Info</h3>

        <hr />
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...(register("firstName"), { required: false })}
            placeholder="성(First Name)"
          />
          <input
            {...(register("lastName"), { required: false })}
            placeholder="이름(Last Name)"
          />
          <input
            {...(register("username"), { required: false })}
            placeholder="아이디(ID)"
          />
          <input
            {...(register("password"), { required: false })}
            placeholder="비밀번호(Password)"
          />
          <input
            {...(register("password1"), { required: false })}
            placeholder="비밀번호 확인(Confirm Password)"
          />
          <input {...register("nickName")} placeholder="닉네임(Nickname)" />
          <button>save</button>
        </form>
      </div>
    </>
  );
}

export default Profile;
