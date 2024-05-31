import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import HeaderNavMenu from "./HeaderNavMenu";
import { IoMdSettings } from "react-icons/io";
import { MdMessage } from "react-icons/md";

const HeaderNavBlock = styled.nav`
  &.active {
    transform: translateX(0);
  }
  width: 90%;
  height: 100%;
  background-color: white;
  position: fixed;
  overflow-y: auto;
  inset: 0;
  z-index: 2;
  transform: translateX(-100%);
  transition: all 0.3s;
`;

const Header = styled.header`
  width: 100%;
  background-color: var(--main-color);
  position: sticky;
  top: 0;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    font-size: 16px;
    color: white;
    li {
      column-gap: 8px;
      &.profile {
        cursor: pointer;
        .imageBox {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
        }
        .textBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          font-family: var(--default-font);
          font-weight: 600;
          span {
            display: block;
            &.title {
              font-family: var(--personality-font);
            }
            &.content {
              font-size: 13px;
              font-weight: 400;
            }
          }
        }
      }
      &.setting {
        font-size: 20px;
      }
    }
  }
`;

const HeaderNav = ({ headerMenu, sidebarActive }) => {
  const navigate = useNavigate();
  return (
    <HeaderNavBlock
      className={`HeaderBack ${
        sidebarActive ? "active HeaderNav" : "HeaderNav"
      }`}
    >
      <Header>
        <ul className="DefaultWidth">
          <li
            className="profile FL_Center"
            onClick={() => navigate("/character/profile")}
          >
            <div className="imageBox"></div>
            <p className="textBox">
              <span className="title">닉네임</span>
              <span className="content">@유저코드같은부분</span>
            </p>
          </li>
          <li className="setting FL_Center">
            <Link to={"/setting/message"}>
              <MdMessage />
              <span className="blind">메시지</span>
            </Link>
            <Link to={"/setting/settings"}>
              <IoMdSettings />
              <span className="blind">설정</span>
            </Link>
          </li>
        </ul>
      </Header>
      <HeaderNavMenu menu={headerMenu} />
    </HeaderNavBlock>
  );
};

export default HeaderNav;
