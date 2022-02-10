import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "react-loading";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { baseUrl, fetchUser } from "../api";
import { isLoggedAtom, IUserInfo, userInfoAtom } from "../atoms";
import Footer from "../Components/Footer";
import { BackGround, Error, Noti, Overlay } from "../Components/Others";

interface IProFileInfo {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
}

const ProflieError = styled(Error)`
  margin-left: 1.2%;
`;

export const ProfileNoti = styled(Noti)`
  h3 {
    align-self: center;
    padding-top: 15%;
    padding-bottom: 10%;
    font-size: 3vh;
  }
  button {
    all: unset;
    width: 17%;
    height: 16%;
    margin-bottom: 6%;
    padding-top: 1%;
    align-self: center;
    text-align: center;
    border: 1px solid;
    border-color: transparent;
    border-radius: 15px;
    color: white;
    background-color: rgba(235, 47, 6, 1);
    cursor: pointer;
  }
`;

const LabelHead = styled.h3``;
const LabelEx = styled.p``;

const ProfileLabel = styled.div`
  padding-top: 2%;
  width: 80%;
  margin-left: 2%;
  padding-bottom: 1%;
  ${LabelHead} {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  ${LabelEx} {
    margin-top: 20px;
    font-size: 15px;
    color: grey;
  }
  border-bottom: 3px solid rgb(22, 175, 202);
`;
const ProfileInput = styled.input``;
const SaveButton = styled.button``;
const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 20px 30px;
  ${ProfileInput} {
    width: 20%;
    margin-left: 1.2%;
    margin-bottom: 1%;
    border-bottom: 1px solid;
    border-left: none;
    border-right: none;
    border-top: none;
    background-color: transparent;
    outline: 0;
  }
  p {
    margin-bottom: 20px;
    font-size: 20px;
  }
  ${SaveButton} {
    all: unset;
    text-align: center;
    color: rgb(244, 244, 244);
    background-color: rgb(22, 175, 202);
    margin-top: 10px;
    margin-bottom: 10px;
    width: 80px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid rgb(22, 175, 202);
    cursor: pointer;
  }
`;
function Profile() {
  const isLogged = useRecoilValue(isLoggedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    //로그인이 안되어있는 경우 로그인창으로 리다이렉트
    if (!isLogged) navigate("/");
  }, [isLogged]);
  const userInfo = useRecoilValue(userInfoAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();
  const { isLoading, data } = useQuery<IProFileInfo>(
    ["userInfo", userInfo],
    () => fetchUser(userInfo)
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const toggleIsUpdate = () => setIsUpdate((prev) => !prev);
  const profileMutate = useMutation(
    ({
      pk,
      userInfo,
      firstName,
      lastName,
      email,
    }: {
      pk: string | undefined;
      userInfo: IUserInfo;
      firstName: string;
      lastName: string;
      email: string;
    }) =>
      axios.patch(
        `${baseUrl}/users/${userInfo.pk}/`,
        {
          pk: pk,
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
  );
  const onValid = (data: IProfileForm) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const pk = userInfo.pk;
    profileMutate
      .mutateAsync({
        pk,
        userInfo,
        firstName,
        lastName,
        email,
      })
      .then(() => toggleIsUpdate())
      .catch((e) => setErrorCode(e.response["status"]));
  };

  return (
    <>
      {isLoading || profileMutate.isLoading ? <Loading /> : null}
      {isUpdate ? (
        <Overlay>
          <ProfileNoti>
            <div />
            <h3>저장되었습니다</h3>
            <button onClick={toggleIsUpdate}>완료</button>
          </ProfileNoti>
        </Overlay>
      ) : null}
      <BackGround>
        <ProfileLabel>
          <LabelHead>Profile settings</LabelHead>
          <LabelEx>Update your name or Email</LabelEx>
        </ProfileLabel>
        <ProfileForm onSubmit={handleSubmit(onValid)}>
          <p>Your Name</p>
          <ProfileInput
            {...register("firstName", {
              required: "필수 입력 항목입니다.",
            })}
            defaultValue={data?.first_name}
            placeholder="이름(First Name)"
          />
          <ProflieError>{errors.firstName?.message}</ProflieError>
          <ProfileInput
            {...register("lastName", { required: "필수 입력 항목입니다." })}
            placeholder="성(Last Name)"
            defaultValue={data?.last_name}
          />
          <ProflieError>{errors.lastName?.message}</ProflieError>
          <p>Your Email</p>
          <ProfileInput
            {...register("email", {
              required: "필수 입력 항목입니다.",
              pattern: {
                value: /@/,
                message: "유효한 형식을 입력하십시오",
              },
            })}
            defaultValue={data?.email}
            placeholder="이메일(E-mail)"
          />
          {errorCode === 409 ? <Error>이미 존재하는 이메일입니다</Error> : null}
          <ProflieError>{errors.email?.message}</ProflieError>
          <SaveButton>save</SaveButton>
        </ProfileForm>
      </BackGround>
      <Footer />
    </>
  );
}

export default Profile;
