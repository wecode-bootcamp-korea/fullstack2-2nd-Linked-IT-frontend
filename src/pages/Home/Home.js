import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const [isFooterDefault, setIsFooterDefault] = useState(false);
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  const toggleFooter = () => {
    setIsFooterHidden(!isFooterHidden);
  };

  return (
    <>
      {!isFooterDefault && isFooterHidden ? (
        <button onClick={() => toggleFooter()}>더 보기</button>
      ) : (
        <button>더 보기</button>
      )}
      <Footer
        isDefault={isFooterDefault}
        isHidden={isFooterHidden}
        toggleFooter={toggleFooter}
      />
    </>
  );
}
