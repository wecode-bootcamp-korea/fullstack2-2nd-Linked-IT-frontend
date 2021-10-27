import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function ProfileBackGround(props) {
  const { backgroundImg } = props;
  return (
    <StyledProfileBackGround>
      <div className="bgImgWrapper">
        {backgroundImg ? (
          <img className="bgImg" alt="background" src={backgroundImg} />
        ) : (
          <img
            className="bgImg"
            alt="background"
            src="/images/defaultProfileBg.png"
          />
        )}
        <div className="cameraIconWrapper">
          <FontAwesomeIcon className="cameraIcon" icon={faCamera} />
        </div>
      </div>
    </StyledProfileBackGround>
  );
}

const StyledProfileBackGround = styled.div`
  .bgImgWrapper {
    position: relative;
    height: 200px;
    overflow: hidden;

    .bgImg {
      width: 750px;
    }

    .cameraIconWrapper {
      position: absolute;
      top: 0;
      right: 5px;
      transform: translate(-50%, 35%);
      width: 32px;
      height: 32px;
      border-radius: 50px;
      background-color: white;
      cursor: pointer;

      .cameraIcon {
        display: block;
        margin: 7px auto;
        color: ${({ theme }) => theme.colors.primary};
        cursor: pointer;

        &:hover {
          color: black;
        }
      }
    }
  }
`;
