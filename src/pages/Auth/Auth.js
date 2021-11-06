import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useHistory, useLocation } from 'react-router-dom';

export default function Auth({ match }) {
  const { app } = match.params;
  const [code, setCode] = useState(
    new URLSearchParams(useLocation().search).get('code')
  );

  // Test Code for Checking UserContext
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const history = useHistory();
  useEffect(() => {
    if (code.length !== 0) {
      alert('회원가입에 성공하였습니다!');
      history.push('/feed');
    } else {
      history.push('/signup');
    }
  }, []);

  return <></>;
}
