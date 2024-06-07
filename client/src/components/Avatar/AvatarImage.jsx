import React from 'react';
import styled from 'styled-components';

const AvatarImageBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .character {
    position: relative;

    img {
      position: absolute;
      inset: 0;
    }
  }
`;

const AvatarImage = ({ avatarInfo }) => {
  const bodySize = `../src/assets/image/bodySize_${avatarInfo.bodySize}.png`;
  const bodyShirt = `../src/assets/image/bodySize_${avatarInfo.bodySize}_bodyShirt_${avatarInfo.bodyShirt}.png`;
  const skin = `../src/assets/image/skin_${avatarInfo.skin}.png`;
  const hairColor = avatarInfo.hairColor;
  const hairBang = `../src/assets/image/hairBang_${avatarInfo.hairBang}_${hairColor}.png`;

  return (
    <AvatarImageBlock>
      <div className="character">
        <img src={bodySize} alt="avatar" className="avatar-image" />
        <img src={bodyShirt} alt="" />
        <img src={skin} alt="avatar" className="avatar-image" />
        <img src={hairBang} alt="avatar" className="avatar-image" />
      </div>
    </AvatarImageBlock>
  );
};

export default AvatarImage;
