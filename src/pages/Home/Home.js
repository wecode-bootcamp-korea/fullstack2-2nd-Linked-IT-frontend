import { useState } from 'react';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';
import LinearFooter from '../../components/LinearFooter/LinearFooter';

export default function Home() {
  /*  1. 단순히 Viewport 맨 아래에 마지막 요소로써 Footer를 이어붙이려는 경우 => true / false 입력
      2. 특정 버튼(링크)를 클릭하여 Footer를 Popup 효과로 등장하게 하려는 경우 => false / true 입력  */
  const [isFooterDefault, setIsFooterDefault] = useState(true);
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  const toggleFooter = () => {
    setIsFooterHidden(!isFooterHidden);
  };

  return (
    <>
      {
        /*  2-1. 특정 버튼(링크)에 onClick 이벤트로 위에서 선언한 toggleFooter 함수를 실행하면,
            onClick 이벤트가 실행될 때마다 isFooterHidden이라는 상탯값이 바뀌어 Footer가 등장한다.  */
        !isFooterDefault && isFooterHidden && (
          <button onClick={() => toggleFooter()}>더 보기</button>
        )
      }
      <GlobalFooter
        isDefault={isFooterDefault}
        isHidden={isFooterHidden}
        toggleFooter={toggleFooter}
      />
      <LinearFooter home />
    </>
  );
}
