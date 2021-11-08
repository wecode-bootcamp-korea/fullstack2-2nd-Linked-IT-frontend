import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  signUpFooterData,
  signInFooterData,
  languageData,
} from './linearFooterData';

export default function LinearFooter(props) {
  const { signUp, signIn } = props;

  return (
    <>
      {signUp && (
        <SignUpFooter>
          <ul>
            <li>
              <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
              {` `}© 2021
            </li>
            <>
              {signUpFooterData.map(data => {
                return (
                  <li key={data.id}>
                    <Link to={data.pageLink}>{data.pageName}</Link>
                  </li>
                );
              })}
            </>
            <li>
              <Link to="#">
                언어<i className="far fa-chevron-down"></i>
              </Link>
            </li>
          </ul>
        </SignUpFooter>
      )}
      {signIn && (
        <SignInFooter>
          <ul>
            <li>
              <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
              {` `}© 2021
            </li>
            <>
              {signInFooterData.map(data => {
                return (
                  <li key={data.id}>
                    <Link to={data.pageLink}>{data.pageName}</Link>
                  </li>
                );
              })}
            </>
            <li>
              <Link to="#">
                언어<i className="far fa-chevron-down"></i>
              </Link>
            </li>
          </ul>
        </SignInFooter>
      )}
    </>
  );
}

const SignUpFooter = styled.footer`
  position: fixed;
  bottom: 0;

  width: 100vw;
  background-color: white;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    width: 920px;
    height: 32px;
    margin: 10px auto;

    li {
      padding: 8px;
      color: ${props => props.theme.colors.fontGrey};
      font-size: 13px;

      img {
        position: relative;
        top: 3px;

        width: 56px;
        margin-right: 2px;
      }

      a {
        color: ${props => props.theme.colors.fontGrey};
        font-weight: 600;

        .far {
          margin-left: 6px;
        }

        &:hover {
          color: ${props => props.theme.colors.primary};
          text-decoration: underline;
        }
      }
    }
  }
`;

const SignInFooter = styled.footer`
  position: fixed;
  bottom: 0;

  width: 100vw;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    width: 920px;
    height: 32px;
    margin: 20px auto;

    li {
      padding: 8px;
      color: ${props => props.theme.colors.fontGrey};
      font-size: 13px;

      img {
        position: relative;
        top: 3px;

        width: 56px;
        margin-right: 2px;
      }

      a {
        color: ${props => props.theme.colors.fontGrey};
        font-weight: 600;

        .far {
          margin-left: 6px;
        }

        &:hover {
          color: ${props => props.theme.colors.primary};
          text-decoration: underline;
        }
      }
    }
  }
`;
