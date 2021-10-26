import styled from 'styled-components';

const isKorean = string => {
  const uniCode = string.charCodeAt(0);
  if (0x1100 <= uniCode && uniCode <= 0x11ff) return true;
  if (0x3130 <= uniCode && uniCode <= 0x318f) return true;
  if (0xac00 <= uniCode && uniCode <= 0xd7a3) return true;
  return false;
};

const UserCard = ({ profile, withoutName, relation, type, text }) => {
  const {
    firstName,
    lastName,
    userProfileUrl,
    companyNameEng,
    companyNameKor,
    currentPosition,
    country,
    city,
    school,
    major,
    degree,
    isConnection,
  } = profile;

  const languageCode = type.charAt(type.indexOf('job') - 1);
  return (
    <StyledUserCard>
      <img alt={`${firstName}'s profile'`} src={userProfileUrl} />
      <div className="infoWrapper">
        <StyledName type={type} withoutName={withoutName} relation={relation}>
          <span className="name">
            {isKorean(firstName)
              ? `${lastName}${firstName}`
              : `${firstName} ${lastName}`}
          </span>
          <span className="relation">
            {isConnection ? ' • 1촌' : ' • 2촌 이상'}
          </span>
        </StyledName>
        <StyledJob type={type}>
          <span>{`${currentPosition} at ${
            languageCode === 'e' ? companyNameEng : companyNameKor
          }`}</span>
        </StyledJob>
        <StyledLocation type={type}>
          <span>
            {city} in {country}
          </span>
        </StyledLocation>
        <StyledEducation type={type}>
          <span>{`${school} ${major} ${degree}`}</span>
        </StyledEducation>
        <StyledText text={text}>
          <span>{text}</span>
        </StyledText>
      </div>
    </StyledUserCard>
  );
};

const StyledUserCard = styled.div`
  display: flex;

  img {
    width: 70px;
    height: 70px;
    margin-right: 18px;
    border-radius: 50px;
  }

  .infoWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-space-evenly;
  }
`;
// name 관련
const StyledName = styled.div`
  display: ${({ withoutName }) => (withoutName === 'true' ? 'none' : 'block')};
  margin: 5px 0;
  font-size: 22px;
  font-weight: 800;

  .relation {
    display: ${({ relation }) => (relation === 'true' ? 'inline' : 'none')};
    color: #666666;
    font-size: 18px;
    font-weight: 500;
    opacity: 0.8;
  }
`;
// job 관련
const StyledJob = styled.div`
  display: ${({ type }) =>
    type.includes('ejob') || type.includes('kjob') ? 'block' : 'none'};

  font-size: ${({ type }) =>
    type.includes('ejob-l') || type.includes('kjob-l') ? '20px' : '15px'}; ;
`;
// location 관련
const StyledLocation = styled.div`
  display: ${({ type }) => (type.includes('location') ? 'block' : 'none')};
  margin: 1px 0;
  font-size: ${({ type }) => (type.includes('location-l') ? '20px' : '15px')}; ;
`;
// education 관련
const StyledEducation = styled.div`
  display: ${({ type }) => (type.includes('education') ? 'block' : 'none')};
  margin: 1px 0;
  font-size: ${({ type }) =>
    type.includes('education-l') ? '20px' : '15px'}; ;
`;
// custom text
const StyledText = styled.div`
  display: ${({ text }) => (text ? 'block' : 'none')};
  margin: 2px 0;
  font-size: 18px;
`;

export default UserCard;
