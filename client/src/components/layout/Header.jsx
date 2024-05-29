import React from "react";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import { FaAlignJustify, FaSistrix, FaFilter } from "react-icons/fa6";

const HeaderBlock = styled.header`
  width: 100%;
  background-color: whitesmoke;
`;

const HeaderMain = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  li {
    width: 30%;

    font-size: 16px;
    color: var(--black-color);
    &.right_section {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
  }
`;

const HeaderBack = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  position: fixed;
  inset: 0;
  z-index: 1;
  transition: all 0.3s;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const Header = () => {
  const onClickSidebar = () => {
    document.querySelector(".HeaderNav").classList.add("active");
    document.querySelector(".HeaderBack").classList.add("active");
  };
  const onClickBack = () => {
    document.querySelector(".HeaderNav").classList.remove("active");
    document.querySelector(".HeaderBack").classList.remove("active");
  };

  return (
    <HeaderBlock>
      <HeaderMain className="HeaderMain DefaultWidth">
        <li className="TA_Left">
          <button type="button" onClick={onClickSidebar}>
            <FaAlignJustify />
            <span className="blind">사이드바</span>
          </button>
        </li>
        <li className="TA_Center">
          <h1 className="FontTitle">타이틀</h1>
        </li>
        <li className="right_section TA_Right">
          <button type="button">
            <FaSistrix />
            <span className="blind">검색</span>
          </button>
          <button type="button">
            <FaFilter />
            <span className="blind">필터</span>
          </button>
        </li>
      </HeaderMain>
      <HeaderNav />
      <HeaderBack className="HeaderBack" onClick={onClickBack}></HeaderBack>
    </HeaderBlock>
  );
};

export default Header;