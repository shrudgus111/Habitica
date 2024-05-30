import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

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

const Section = styled.section`
  padding: 16px 0;
  div {
    padding-bottom: 24px;
    .menu_title {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0 16px;
      .icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: gray;
        display: flex;
        place-content: center;
        place-items: center;
      }
    }
    .menu_content {
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;
      overflow: hidden;
      li {
        width: 100%;
        a {
          color: var(--black-color);
          justify-content: space-between;
          background-color: var(--gray-color);
          padding: 16px 8px;
          transition: all 0.3s;
          span {
            &.icon {
              color: gray;
            }
          }
          &:hover {
            background-color: var(--gray-hover);
          }
        }
        &:not(:last-child) a {
          border-bottom: 1px solid var(--gray-hover);
        }
      }
    }
  }
`;

const HeaderNav = () => {
  const navigate = useNavigate();
  const Menu = [
    {
      title: "캐릭터",
      list: [
        { listTitle: "스킬", listLink: "/character/skills" },
        { listTitle: "스탯", listLink: "/character/stats" },
        { listTitle: "도전과제", listLink: "/character/achievements" },
      ],
    },
    {
      title: "상점",
      list: [{ listTitle: "상점", listLink: "/shop/market" }],
    },
    {
      title: "인벤토리",
      list: [
        { listTitle: "장비", listLink: "/inventory/equipment" },
        { listTitle: "아이템", listLink: "/inventory/items" },
      ],
    },
    {
      title: "소셜",
      list: [
        { listTitle: "지뢰찾기", listLink: "/find" },
       
      ],
    },
    {
      title: "소개",
      list: [
        { listTitle: "소개", listLink: "/about/company" },
        { listTitle: "뉴스", listLink: "/about/news" },
        { listTitle: "게시판", listLink: "/about/board" },
      ],
    },
  ];

  return (
    <HeaderNavBlock className="HeaderNav">
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
      <Section className="DefaultWidth">
        {Menu.map((menu, index) => (
          <div key={index}>
            <h2 className="FontMenuTitle menu_title">
              <span className="icon">I</span>
              <span>{menu.title}</span>
            </h2>
            <ul className="menu_content">
              {menu.list.map((list, index) => (
                <li key={index} className="FontBody">
                  <Link
                    to={list.listLink}
                    className="menu_content_button FL_Center"
                  >
                    <span>{list.listTitle}</span>
                    <span className="FL_Center icon">
                      <FaAngleRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </HeaderNavBlock>
  );
};

export default HeaderNav;
