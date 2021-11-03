import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import globalFooterData from './globalFooterData';

export default function GlobalFooter(props) {
  const { isDefault, isHidden, toggleFooter } = props;

  return (
    <>
      {!isHidden && (
        <StyledFooter className={isDefault ? '' : 'modal'} default={isDefault}>
          <FooterExitButton
            className={isDefault ? '' : 'modal'}
            default={isDefault}
            onClick={() => toggleFooter()}
          >
            <i className="fal fa-times"></i>
          </FooterExitButton>
          <FooterGridContainer>
            <FooterLogo
              alt="LinkedIT Logo"
              src="/images/common_logo_full.png"
            />
            <FooterLinks>
              {globalFooterData.links.map(data => {
                return (
                  <Link key={data.id} to={data.pageLink}>
                    {data.pageName}
                    <i
                      className={
                        data.pageName !== '개인정보와 약관'
                          ? 'far fa-chevron-down inactive'
                          : 'far fa-chevron-down'
                      }
                    ></i>
                  </Link>
                );
              })}
            </FooterLinks>
            <GoToHelpCenter>
              <i className="fas fa-question-circle"></i>
              <p>
                <Link to="#">궁금한 점이 있으세요?</Link>
                <br />
                LinkedIT 고객센터 바로가기
              </p>
            </GoToHelpCenter>
            <GoToMySettings>
              <i className="fas fa-cog"></i>
              <p>
                <Link to="/profile">개인정보 설정</Link>
                <br />
                설정 페이지로 가세요.
              </p>
            </GoToMySettings>
            <SelectLanguage>
              <label
                for="globalfooter-select_language"
                class="global-footer__label"
              >
                언어 선택
              </label>
              <select
                id="globalfooter-select_language"
                class="global-footer__language-selection-dropdown"
              >
                {globalFooterData.languages.map(data => {
                  return (
                    <option
                      key={data.id}
                      selected={data.selected}
                      value={data.langValue}
                      lang={data.langCode}
                    >
                      {data.langName}
                    </option>
                  );
                })}
              </select>
            </SelectLanguage>
            <CopyRightNotice>
              WeCoder's LinkedIT Project © 2021년
            </CopyRightNotice>
          </FooterGridContainer>
        </StyledFooter>
      )}
      {!isDefault && !isHidden && (
        <ModalBlocker
          className={isDefault ? '' : 'modal'}
          onClick={() => toggleFooter()}
        />
      )}
    </>
  );
}

const slideUp = keyframes`
  from {
    transform: translateY(300px);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  height: 266px;
  margin: 0 auto;
  padding: 16px 24px;

  background-color: ${props => props.theme.colors.bgcBeige};
  color: ${props => props.theme.colors.fontGrey};
  font-size: 16px;
  font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', system-ui;

  &.modal {
    position: fixed;
    bottom: 0;
    z-index: 10000;

    height: 282px;
    border-radius: 8px;
    padding-bottom: 16px;

    background-color: white;

    animation-name: ${slideUp};
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;

const FooterExitButton = styled.button`
  position: absolute;
  top: 12px;
  right: 8px;

  display: none;

  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;

  background-color: ${props => props.theme.colors.bgcBeige};
  color: gray;
  font-size: 25px;

  &.modal {
    display: block;
    background-color: white;
  }

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const FooterGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 35px repeat(6, 28px);

  width: 1128px;
  max-width: 100%;
  margin: 24px auto;
`;

const FooterLogo = styled.img`
  grid-column: 1/7;
  grid-row: 1/2;

  width: 84px;
  max-width: 100%;
  height: 21px;
`;

const FooterLinks = styled.nav`
  grid-column: 1/4;
  grid-row: 2/7;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: repeat(5, 28px);

  a {
    color: ${props => props.theme.colors.fontGrey};
    font-size: 13px;
    font-weight: 600;

    .far {
      margin-left: 6px;

      &.inactive {
        display: none;
      }
    }

    &:hover {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

const GoToHelpCenter = styled.article`
  position: relative;
  top: -2px;
  left: 2px;

  grid-column: 4/5;
  grid-row: 2/4;

  display: flex;

  .fas {
    position: relative;
    top: 2px;

    width: 24px;
    height: 24px;
    margin-right: 6px;
    font-size: 20px;
  }

  p {
    font-size: 13px;
    line-height: 1.3;

    a {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 15px;
      font-weight: 600;

      &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
      }
    }
  }
`;

const GoToMySettings = styled.article`
  position: relative;
  top: -5px;
  left: 2px;

  grid-column: 4/5;
  grid-row: 4/6;

  display: flex;

  .fas {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    font-size: 21px;
  }

  p {
    position: relative;
    top: -2px;

    font-size: 13px;
    line-height: 1.3;

    a {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 15px;
      font-weight: 600;

      &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
      }
    }
  }
`;

const SelectLanguage = styled.aside`
  grid-column: 5/7;
  grid-row: 2/5;

  display: flex;
  flex-direction: column;

  margin-left: auto;

  label {
    margin-bottom: 5px;
    font-size: 13px;
  }

  select {
    width: 282px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    padding: 0 32px 0 8px;

    -webkit-appearance: none;
    background: url('/images/footer_arrow_dropdown.png') no-repeat 98% 50%;

    background-color: white;
    color: ${props => props.theme.colors.fontGrey};
    font-weight: 600;

    &:hover {
      border: 2px solid rgba(0, 0, 0, 0.6);
    }
  }
`;

const CopyRightNotice = styled.p`
  grid-column: 1/4;
  grid-row: 7/8;

  padding-top: 13px;
  font-size: 13px;
`;

const ModalBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background-color: transparent;

  &.modal {
    z-index: 5000;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
