import React from 'react';
import { FooterImg, FooterText, FooterFooter } from './FloatingFooterStyled';

export default function FloatingFooter() {
  return (
    <>
      <FooterImg>
        <img src="/images/LinkedIt.png" alt="LinkedIt" />
      </FooterImg>
      <FooterText>
        <span>회사소개</span>
        <span>웹접근성</span>
        <span>고객센터</span>
        <span>개인정보와 약관</span>
        <span>Ad Choices</span>
        <span>광고</span>
        <span>비지니스 서비스</span>
        <span>LinkedIn 앱 다운로드</span>
        <span>더 보기</span>
      </FooterText>
      <FooterFooter>
        <img src="/images/LinkedItIcon.png" alt="LinkedItIcon" />
        <span>LinkedIT with Wecode</span>
      </FooterFooter>
    </>
  );
}
