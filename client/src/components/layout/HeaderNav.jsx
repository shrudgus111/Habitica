import React from "react";
import styled from "styled-components";
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
  inset: 0;
  z-index: 2;
  transform: translateX(-100%);
  transition: all 0.3s;
`;

const Header = styled.header`
  width: 100%;
  background-color: var(--main-color);
  ul {
    width: 94%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    font-size: 16px;
    color: white;
    li {
      display: flex;
      align-items: center;
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
            &.content {
              font-size: 13px;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
`;

const Section = styled.section``;

const HeaderNav = () => {
  const Menu = [
    {
      title: "캐릭터",
      list: [
        { listTitle: "스킬", listLink: "/링크" },
        { listTitle: "스탯", listLink: "/링크" },
        { listTitle: "도전과제", listLink: "/링크" },
      ],
    },
    {
      title: "상점",
      list: [{ listTitle: "상점", listLink: "/링크" }],
    },
    {
      title: "인벤토리",
      list: [
        { listTitle: "장비", listLink: "/링크" },
        { listTitle: "아이템", listLink: "/링크" },
      ],
    },
    {
      title: "어바웃",
      list: [
        { listTitle: "뉴스", listLink: "/링크" },
        { listTitle: "게시판", listLink: "/링크" },
        { listTitle: "About", listLink: "/링크" },
      ],
    },
  ];
  return (
    <HeaderNavBlock className="HeaderNav">
      <Header>
        <ul>
          <li className="profile">
            <div className="imageBox"></div>
            <p className="textBox">
              <span className="title">닉네임</span>
              <span className="content">@유저코드같은부분</span>
            </p>
          </li>
          <li className="setting">
            <button type="button">
              <MdMessage />
              <span className="blind">메시지</span>
            </button>
            <button type="button">
              <IoMdSettings />
              <span className="blind">설정</span>
            </button>
          </li>
        </ul>
      </Header>
      <Section>
        {Menu.map((menu, index) => (
          <div key={index}>
            <h2>{menu.title}</h2>
            <ul>
              {menu.list.map((list, index) => (
                <li key={index}>
                  <a href={list.listLink}>{list.listTitle}</a>
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
