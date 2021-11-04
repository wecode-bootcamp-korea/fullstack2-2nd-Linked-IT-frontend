import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Auth({ match }) {
  const { app } = match.params;
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const [code, setCode] = useState(useQuery().get('code'));
  console.log(app, code); // Test Code for Checking Variables

  const history = useHistory();
  useEffect(() => {
    if (code.length !== 0) {
      history.push('/feed');
    } else {
      history.push('/signup');
    }
  }, []);

  return <></>;
}
