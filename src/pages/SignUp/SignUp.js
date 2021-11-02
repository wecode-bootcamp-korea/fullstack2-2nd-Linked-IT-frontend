import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import LinearFooter from '../../components/LinearFooter/LinearFooter';

export default function SignUp() {
  return (
    <>
      <SignUpHeader>
        <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        <h1>LinkedIn을 활용하여 기회의 문을 넓히세요.</h1>
      </SignUpHeader>
      <SignUpMain>
        <SignUpMainForm>
          <div>
            <label for="email">이메일</label>
            <input required id="email" type="email" />
          </div>
          <div>
            <label for="password">비밀번호(6자 이상)</label>
            <input required id="password" type="password" />
            {/* <span>보기</span> */}
          </div>
          <p>
            동의 후 가입을 클릭하시면 LinkedIT{` `}
            <Link to="#">사용자약관</Link>,{` `}
            <Link to="#">개인정보 취급방침</Link>,{` `}
            <Link to="#">쿠키정책</Link>에 동의한 것으로 간주됩니다.
          </p>
          <Button
            type="submit"
            bgc={props => props.theme.colors.primary}
            color={`white`}
            text={`동의 후 가입`}
            width={`100%`}
            height={`48px`}
          />
        </SignUpMainForm>
        <SignUpMainSeperator>또는</SignUpMainSeperator>
        <Button
          type="submit"
          bgc={`white`}
          color={props => props.theme.colors.primary}
          text={
            <div>
              <i class="fab fa-google"></i>
              <span>구글 계정으로 가입</span>
            </div>
          }
          width={`100%`}
          height={`48px`}
        />
        <GoToSignIn>
          이미 LinkedIT 회원이세요? <Link to="/signin">로그인</Link>하세요.
        </GoToSignIn>
      </SignUpMain>
      <LinearFooter signUp />
      <SignUpBackground />
    </>
  );
}

const SignUpHeader = styled.header`
  margin: 36px auto 0 auto;
  text-align: center;

  img {
    width: 135px;
  }

  h1 {
    height: 84px;
    padding: 24px 16px;

    font-size: 32px;
    font-weight: 400;
    line-height: 1.25;
  }
`;

const SignUpMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 400px;
  height: 436px;
  margin: 12px auto 0;
  border-radius: 8px;
  padding: 26px 24px 24px;
  background-color: white;

  button {
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 28px;
    font-weight: 600;

    .fab {
      position: relative;
      top: 2px;

      margin-right: 12px;
      color: ${props => props.theme.colors.primary};
      font-size: 21px;
    }

    &:hover {
      border: 2px solid ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.bgcLightBlue};
    }
  }
`;

const SignUpMainForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;

  height: 236px;

  div {
    position: relative;

    label {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 15px;
    }

    input {
      width: 100%;
      height: 32px;
      margin-top: 4px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 2px 0 0 12px;
      font-size: 19px;
    }

    span {
      position: absolute;
      top: 30px;
      right: 10px;

      color: ${props => props.theme.colors.fontGrey};
      font-size: 15px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    display: block;

    color: ${props => props.theme.colors.fontGrey};
    font-size: 13px;
    text-align: center;
    line-height: 1.3;

    a {
      color: ${props => props.theme.colors.primary};
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  button {
    border: 0;
    padding-top: 6px;

    &:hover {
      border: 0;
      background-color: ${props => props.theme.colors.btnNavy};
    }
  }
`;

const SignUpMainSeperator = styled.span`
  display: flex;
  align-items: center;

  margin-top: 4px;

  color: ${props => props.theme.colors.fontGrey};
  font-size: 17px;
  text-align: center;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;

    height: 1px;
    margin: 0 10px;
    background: #c4c4c4;
  }
`;

const GoToSignIn = styled.article`
  margin: 0 auto;
  font-size: 17px;
  text-align: center;

  a {
    display: inline-block;

    margin-left: 2px;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgcBeige};
`;
