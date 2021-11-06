import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import SignInButton from '../SignIn/SignInButton';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';

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
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

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
    fetch(`http://localhost:10000/user/signin`, {
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

  // Test Code for Checking Functions
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <HomeHeader>
        <Link to="/">
          <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        </Link>
        <div>
          <Button
            onClick={() => history.push('/signup')}
            type="submit"
            bgc={`white`}
            color={props => props.theme.colors.fontGrey}
            text={`회원가입`}
            width={`90px`}
            height={`40px`}
          />
          <Button
            onClick={() => history.push('/signin')}
            type="submit"
            bgc={`white`}
            color={props => props.theme.colors.primary}
            text={`로그인`}
            width={`90px`}
            height={`40px`}
          />
        </div>
      </HomeHeader>
      <HomeMain>
        <HomeMainHead>
          <h1>로그인하세요</h1>
          <p>업무 관련 소식을 받아보세요</p>
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
      <GoToSignUp>
        LinkedIT이 처음이세요? <Link to="/signup">회원 가입</Link>
      </GoToSignUp>
      <GlobalFooter isDefault />
      <HomeBackground>
        <img
          alt="LinkedIT Home Page Background"
          src="/images/home_background_custom.png"
        />
      </HomeBackground>
    </>
  );
}

const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;

  width: 1128px;
  margin: 16px auto 0;

  img {
    width: 136px;
  }

  div {
    display: flex;
    justify-content: space-between;

    width: 210px;

    button {
      margin-left: 12px;
      border-radius: 28px;
      padding-top: 6px;
      font-weight: 600;

      &:first-child {
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
  align-items: center;

  width: 352px;
  height: 545px;
  margin: 24px auto;
  border-radius: 8px;
  padding: 26px 24px 24px;
  background-color: white;
`;

const HomeMainHead = styled.div`
  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.25;
  }

  p {
    margin-top: 4px;
    font-size: 15px;
  }
`;

const HomeMainForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;

  height: 236px;

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
      height: 52px;
      margin-top: 8px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 2px 0 0 12px;
      font-size: 19px;
    }

    span {
      position: absolute;
      top: 28px;
      right: 12px;

      color: ${props => props.theme.colors.primary};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.colors.bgcLightBlue};
      }
    }
  }

  p {
    display: block;

    width: 150px;
    margin-top: 4px;

    a {
      color: ${props => props.theme.colors.primary};
      font-weight: 600;

      &:hover {
        background-color: ${props => props.theme.colors.bgcLightBlue};
        text-decoration: underline;
      }
    }
  }

  button {
    margin-top: 8px;
    border: 0;
    border-radius: 28px;
    padding-top: 6px;
    font-weight: 600;

    &:hover {
      border: 0;
      background-color: ${props => props.theme.colors.btnNavy};
    }
  }
`;

const HomeMainSeperator = styled.span`
  display: flex;
  align-items: center;

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
    margin: 0 10px;
    background: #c4c4c4;
  }
`;

const GoToSignUp = styled.article`
  margin: 0 auto;
  font-size: 17px;
  text-align: center;

  a {
    display: inline-block;

    margin-left: 2px;
    color: ${props => props.theme.colors.primary};
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: ${props => props.theme.colors.bgcLightBlue};
      text-decoration: underline;
    }
  }
`;

const HomeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100vw;
  height: 100vh;
  background-color: white;

  img {
    position: absolute;
    top: 120px;
    right: -20px;

    width: 700px;
  }
`;
