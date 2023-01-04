import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unsubscribe } from "../../../redux/modules/actions/userActions";
import { Avatar } from "@mui/material";
import styled from "styled-components";

const UserView = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    unsubscribe(setUserProfile);
  }, []);

  return (
    <>
      <ProfileContainer>
        <ProfileWrap>
          {userProfile ? (
            userProfile.map((user) =>
              user.id === userId ? (
                <Profile key={user.id}>
                  <Avatar
                    style={{ width: "300px", height: "300px" }}
                    src={user.photoURL}
                  />
                  <UserName>
                    이름 : {user.username || user.values.displayName}
                  </UserName>
                  <UserEmailWrap>
                    {user.email === null || user.values.email === null ? (
                      <UserEmail>이메일 : 이메일 비공개</UserEmail>
                    ) : (
                      <UserEmail>
                        이메일 : {user.email || user.values.email}
                      </UserEmail>
                    )}
                  </UserEmailWrap>
                  <UserPhoneNumberWrap>
                    {user.phoneNumber === null ||
                    user.values.phoneNumber === null ? (
                      <UserPhoneNumber>
                        전화번호 : 전화번호 비공개
                      </UserPhoneNumber>
                    ) : (
                      <UserPhoneNumber>
                        전화번호 : {user.phoneNumber || user.values.phoneNumber}
                      </UserPhoneNumber>
                    )}
                  </UserPhoneNumberWrap>
                </Profile>
              ) : null
            )
          ) : (
            <h1>유저 정보가 없습니다.</h1>
          )}
        </ProfileWrap>
      </ProfileContainer>
    </>
  );
};

const ProfileContainer = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
`;

const ProfileWrap = styled.div`
  position: absolute;
  width: 400px;
  min-height: 600px;
  align-items: center;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  align-items: center;
`;

const UserName = styled.h1`
  margin-top: 40px;
`;

const UserEmailWrap = styled.div`
  margin-top: 10px;
`;

const UserPhoneNumberWrap = styled.div`
  margin-top: 10px;
`;

const UserEmail = styled.h2`
  color: gray;
`;

const UserPhoneNumber = styled.h2`
  color: gray;
`;

export default UserView;
