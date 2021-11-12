import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import SignInButton from '../SignIn/SignInButton';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';
import API_ENDPOINT from '../../api';

const validateInput = user => {
  const { email, password } = user;

  const validEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const isValidEmail = email.match(validEmail) && email !== '';
  const isValidPassword = password.length >= 8 && password !== '';

  // Test Code for Checking Function
  console.log(isValidEmail, isValidPassword);

  return isValidEmail && isValidPassword;
};

export default function Home() {
  // Test Code for Checking UserContext
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleInput = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const showPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const history = useHistory();
  const submitInput = event => {
    const { email, password } = user;

    // event.preventDefault();
    fetch(`${API_ENDPOINT}/user/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        localStorage.setItem('accessToken', res.access_token);
        if (res.access_token && res.status === 'SIGNIN_SUCCESSED') {
          alert('로그인에 성공하였습니다.');
          history.push('/feed');
        } else if (res.status === 'SIGNIN_FAILED') {
          alert(
            '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 입력해주세요.'
          );
        } else {
          alert(res.status);
        }
      });
  };

  const rejectInput = () => {
    alert('로그인에 실패하였습니다. 이메일과 비밀번호를 다시 입력해주세요.');
    setUser({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <HomeHeader>
        <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        <div>
          <Button
            onClick={() => history.push('/signup')}
            type="submit"
            bgc={`white`}
            color={props => props.theme.colors.fontGrey}
            text={`회원 가입`}
            width={`100%`}
            height={`40px`}
          />
          <Button
            onClick={() => history.push('/signin')}
            type="submit"
            bgc={`white`}
            color={props => props.theme.colors.primary}
            text={`로그인`}
            width={`100%`}
            height={`40px`}
          />
        </div>
      </HomeHeader>
      <HomeMain>
        <HomeMainHead>
          <h1>프로를 위한 커뮤니티</h1>
        </HomeMainHead>
        <HomeMainForm
          onSubmit={validateInput(user) ? submitInput : rejectInput}
        >
          <div>
            {/* <label for="email">이메일</label> */}
            <input
              id="email"
              name="email"
              onChange={handleInput}
              required
              type="email"
              placeholder="이메일"
            />
          </div>
          <div>
            {/* <label for="password">비밀번호</label> */}
            <input
              id="password"
              name="password"
              onChange={handleInput}
              required
              type={isPasswordHidden ? 'password' : 'text'}
              placeholder="비밀번호"
            />
            <span onClick={showPassword}>표시</span>
          </div>
          <p>
            <Link to="#">비밀번호를 잊으셨나요?</Link>
          </p>
          <Button
            type="submit"
            bgc={props => props.theme.colors.primary}
            color={`white`}
            text={`로그인`}
            width={`100%`}
            height={`52px`}
          />
        </HomeMainForm>
        <HomeMainSeperator>
          또<br />는
        </HomeMainSeperator>
        <SignInButton />
      </HomeMain>
      <HomeBackground>
        <img
          alt="LinkedIT Home Page Background"
          src="/images/home_background_custom.png"
        />
      </HomeBackground>
      <GlobalFooter isDefault />
    </>
  );
}

const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;

  width: 1128px;
  margin: 15px auto 0;

  img {
    width: 136px;
    height: 34px;
  }

  div {
    display: flex;
    justify-content: space-between;

    width: 190px;
    margin-top: -2px;

    button {
      border-radius: 28px;
      padding-top: 8px;
      font-weight: 600;

      &:first-child {
        margin-right: 10px;
        border-radius: 4px;

        &:hover {
          background-color: ${props => props.theme.colors.btnLightGrey};
        }
      }

      &:last-child {
        border: 1px solid ${props => props.theme.colors.primary};

        &:hover {
          border: 2px solid ${props => props.theme.colors.primary};
        }
      }
    }
  }
`;

const HomeMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 1128px;
  height: 560px;
  margin: 35px auto;
  border-radius: 8px;
  padding: 26px 0;

  button {
    width: 400px;
    padding-top: 9px;

    font-size: 20px;
    font-weight: 400;
  }
`;

const HomeMainHead = styled.div`
  h1 {
    color: #8f5849;
    font-size: 56px;
    font-weight: 200;
    line-height: 1.25;
  }
`;

const HomeMainForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;

  width: 400px;
  height: 230px;
  margin-top: 10px;

  div {
    position: relative;

    label {
      position: absolute;
      top: 26px;
      left: 13px;

      color: ${props => props.theme.colors.fontGrey};
      font-size: 19px;
    }

    input {
      width: 100%;
      height: 48px;
      margin-top: 8px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 2px 0 0 12px;
      font-size: 17px;
    }

    span {
      position: absolute;
      top: 28px;
      right: 12px;

      color: ${props => props.theme.colors.fontGrey};
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.colors.bgcLightBlue};
      }
    }
  }

  p {
    display: block;

    width: 160px;
    margin: 10px 0;

    a {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 17px;

      &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
      }
    }
  }

  button {
    margin-top: 8px;
    border: 0;
    border-radius: 28px;
    padding-top: 6px;

    &:hover {
      border: 0;
      background-color: ${props => props.theme.colors.btnNavy};
    }
  }
`;

const HomeMainSeperator = styled.span`
  display: flex;
  align-items: center;

  width: 400px;
  margin-top: 2px;

  color: ${props => props.theme.colors.fontGrey};
  font-size: 15px;
  text-align: center;
  line-height: 1.3;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;

    height: 1px;
    margin: 0 12px;
    background: #c4c4c4;
  }
`;

const HomeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100vw;
  height: 100vh;
  background-color: white;

  img {
    position: absolute;
    top: 95px;
    right: -10px;

    width: 700px;
  }
`;
