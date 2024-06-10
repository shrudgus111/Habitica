import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

const AvatarEditContainer = styled.div`
  align-items: center;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const AvatarPreviewContainer = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
`;

const AvatarPreviewLayer = styled.img`
  position: absolute;
  width: 90px;
  height: 90px;
`;

const FormField = styled.div`
  width: 100%;
  gap: 16px;
  div {
    flex-wrap: wrap;
  }

  label {
    display: block;
    width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const NavButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background-color: var(--main-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--main-hover);
  }
`;

const AvatarEdit = ({ avatarInfo: initialAvatarInfo }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const userNo = user?.userNo;

  const [avatarInfo, setAvatarInfo] = useState({
    name: "",
    skin: 1,
    bodySize: 1,
    bodyShirt: 1,
    hairColor: "brown",
    hairBang: 1,
  });

  const hairColors = ["black", "blond", "brown", "white", "red"];

  useEffect(() => {
    if (initialAvatarInfo) {
      setAvatarInfo(initialAvatarInfo);
    }
  }, [initialAvatarInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvatarInfo({ ...avatarInfo, [name]: value });
  };

  const handleAvatarChange = (direction, type) => {
    setAvatarInfo((prevInfo) => {
      let newValue;
      if (type === "hairColor") {
        const currentIndex = hairColors.indexOf(prevInfo.hairColor);
        newValue =
          (currentIndex + direction + hairColors.length) % hairColors.length;
        return { ...prevInfo, [type]: hairColors[newValue] };
      } else {
        newValue = prevInfo[type] + direction;
        const maxValues = {
          skin: 8,
          bodySize: 2,
          bodyShirt: 5,
          hairBang: 4,
        };
        if (newValue < 1) newValue = maxValues[type]; // Wrap around to the last value
        if (newValue > maxValues[type]) newValue = 1; // Wrap around to the first value
        return { ...prevInfo, [type]: newValue };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8002/avatar/edit`, { userNo, ...avatarInfo })
      .then((res) => {
        console.log(res.data);
        // Dispatch an action to update avatar info in the Redux store if needed
      })
      .catch((err) => console.error(err));
  };

  const bodySize = `/assets/image/bodySize_${avatarInfo.bodySize}.png`;
  const bodyShirt = `/assets/image/bodySize_${avatarInfo.bodySize}_bodyShirt_${avatarInfo.bodyShirt}.png`;
  const skin = `/assets/image/skin_${avatarInfo.skin}.png`;
  const hairBang = `/assets/image/hairBang_${avatarInfo.hairBang}_${avatarInfo.hairColor}.png`;

  return (
    <AvatarEditContainer className="FL_Column FL_1">
      <div>
        <AvatarPreviewContainer>
          <AvatarPreviewLayer src={bodySize} alt="body size" />
          <AvatarPreviewLayer src={bodyShirt} alt="body shirt" />
          <AvatarPreviewLayer src={skin} alt="skin" />
          <AvatarPreviewLayer src={hairBang} alt="hair bang" />
        </AvatarPreviewContainer>
      </div>
      <form
        onSubmit={handleSubmit}
        className="TA_Center FontMenuTitle DefaultWidth"
      >
        <FormField className="FL_Column">
          <div className="FL_SB">
            <label htmlFor="skin">스킨</label>
            <NavButton onClick={() => handleAvatarChange(-1, "skin")}>
              {"<"}
            </NavButton>
            <span className="FL_Center">{avatarInfo.skin}</span>
            <NavButton onClick={() => handleAvatarChange(1, "skin")}>
              {">"}
            </NavButton>
          </div>
          <div className="FL_SB">
            <label>체형</label>
            <NavButton onClick={() => handleAvatarChange(-1, "bodySize")}>
              {"<"}
            </NavButton>
            <span className="FL_Center">{avatarInfo.bodySize}</span>
            <NavButton onClick={() => handleAvatarChange(1, "bodySize")}>
              {">"}
            </NavButton>
          </div>
          <div className="FL_SB">
            <label>옷</label>
            <NavButton onClick={() => handleAvatarChange(-1, "bodyShirt")}>
              {"<"}
            </NavButton>
            <span className="FL_Center">{avatarInfo.bodyShirt}</span>
            <NavButton onClick={() => handleAvatarChange(1, "bodyShirt")}>
              {">"}
            </NavButton>
          </div>
          <div className="FL_SB">
            <label>헤어 스타일</label>
            <NavButton onClick={() => handleAvatarChange(-1, "hairBang")}>
              {"<"}
            </NavButton>
            <span className="FL_Center">{avatarInfo.hairBang}</span>
            <NavButton onClick={() => handleAvatarChange(1, "hairBang")}>
              {">"}
            </NavButton>
          </div>
          <div className="FL_SB">
            <label htmlFor="hairColor">헤어 색상</label>
            <NavButton onClick={() => handleAvatarChange(-1, "hairColor")}>
              {"<"}
            </NavButton>
            <span className="FL_Center">{avatarInfo.hairColor}</span>
            <NavButton onClick={() => handleAvatarChange(1, "hairColor")}>
              {">"}
            </NavButton>
          </div>
        </FormField>
      </form>
    </AvatarEditContainer>
  );
};

export default AvatarEdit;
