import styled from "styled-components";

interface ProfileCardProps {
  profileImgSrc: string;
  username: string;
  role: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImgSrc,
  username,
  role,
}) => {
  return (
    <Wrapper>
      <ProfileImgContainer>
        <ProfileImg src={profileImgSrc} alt="profile_img" />
      </ProfileImgContainer>
      <ProfileInfo>
        <Username> {username} </Username>
        <Role> {role} </Role>
      </ProfileInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: white solid 1px;
  border-radius: 30px;
  min-height: 190px;
  text-align: center;
`;

const ProfileImgContainer = styled.div`
  border-radius: 24px;
  height: 104px;
  width: 104px;
  border: white solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  margin: 20px 0;
`;

const Username = styled.div`
  font-size: 24px;
  color: white;
`;

const Role = styled.div`
  font-size: 16px;
  color: #82edda;
`;

export default ProfileCard;
