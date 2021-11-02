import { memo } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  z-index: 9999;
`;

export default memo(Loader);
