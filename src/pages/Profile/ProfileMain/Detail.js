import styled from 'styled-components';
import isKorean from '../../../utils/LanguageUtil';

export default function Detail(props) {
  const { showCurrentCompany, showEducation, careers } = props || {};
  const {
    firstName,
    lastName,
    oneLineProfile,
    country,
    city,
    friendCount,
    companyLogo,
    schoolLogo,
    companyName,
    schoolName,
  } = props.profile;

  // console.log(careers[0]);
  return (
    <StyledDetail>
      <StyledBasicInfo>
        <h1 className="name">
          {firstName && isKorean(firstName)
            ? `${firstName}${lastName}`
            : `${lastName} ${firstName}`}
        </h1>
        {oneLineProfile && <span className="oneline">{oneLineProfile}</span>}
        <div>
          <span className="region">{`${country} ${city} • `}</span>
          <span className="contact">연락처</span>
        </div>
        <span className="connection">{`1촌 ${friendCount}명`}</span>
      </StyledBasicInfo>

      <StyledAdditionalInfo>
        {showCurrentCompany && careers[0] && (
          <div className="companyCardWrapper">
            <img alt="companyLogo" src={careers[0].companyLogo} />
            <span>{careers[0].companyName}</span>
          </div>
        )}
        {showEducation && schoolName && (
          <div className="schoolCardWrapper">
            <img alt="schoolLogo" src={schoolLogo} />
            <span>{schoolName}</span>
          </div>
        )}
      </StyledAdditionalInfo>
    </StyledDetail>
  );
}

const StyledDetail = styled.section`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 25px;
  border-radius: 0 0 15px 15px;
`;

const StyledBasicInfo = styled.section`
  display: inline-block;
  width: 450px;

  .name {
    display: block;
    padding-bottom: 5px;
    font-size: 25px;
    font-weight: 600;
  }

  .oneline {
    display: block;
    padding: 5px 0;
    font-size: 15px;
  }

  .region {
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 12px;
  }

  .contact {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .connection {
    display: inline-block;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledAdditionalInfo = styled.section`
  display: inline-block;
  border-radius: 0 0 15px 15px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    width: 230px;

    img {
      margin-right: 10px;
      width: 32px;
    }

    span {
    }
  }

  .companyCardWrapper {
  }

  .schoolCardWrapper {
  }
`;
