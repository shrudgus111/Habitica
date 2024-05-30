import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaAlignJustify,
  FaSistrix,
  FaFilter,
  FaAngleLeft,
} from "react-icons/fa6";

const HeaderBlock = styled.header`
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const HeaderMain = styled.ul`
  padding: 16px 0;
  li {
    width: 30%;
    font-size: 16px;
    color: var(--black-color);
    button svg {
      font-size: 20px;
    }
    &.TA_Right {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      .done {
        color: var(--main-color);
        font-family: var(--default-font);
        font-weight: 700;
      }
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
  const location = useLocation();
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState("해비티카");
  const [sidebarActive, setSidebarActive] = useState(false);

  const onClickSidebar = () => setSidebarActive(true);
  const onClickBack = () => setSidebarActive(false);

  useEffect(() => {
    const findTitle = () => {
      if (location.pathname === "/") return "해비티카";

      for (let menu of headerMenu) {
        for (let item of menu.list) {
          if (location.pathname === item.listLink) return item.listTitle;
        }
      }

      switch (location.pathname) {
        case "/setting/settings":
          return "설정";
        case "/setting/message":
          return "메시지";
        case "/character/profile":
          return "내 프로필";
        default:
          return "해비티카";
      }
    };

    setHeaderTitle(findTitle());
    setSidebarActive(false);
  }, [location]);

  const onClickPrev = () => navigate(-1);
  const onClickDone = () => navigate("/");

  const headerMenu = [
    {
      title: "캐릭터",
      icon: "",
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
      title: "소개",
      list: [
        { listTitle: "소개", listLink: "/about/company" },
        { listTitle: "뉴스", listLink: "/about/news" },
        { listTitle: "게시판", listLink: "/about/board" },
      ],
    },
  ];

  return (
    <HeaderBlock>
      <HeaderMain className="HeaderMain DefaultWidth FL_SB">
        <li className="TA_Left">
          {location.pathname === "/" ? (
            <button type="button" onClick={onClickSidebar}>
              <FaAlignJustify />
              <span className="blind">사이드바</span>
            </button>
          ) : (
            !location.pathname.startsWith("/setting") && (
              <button type="button" onClick={onClickPrev}>
                <FaAngleLeft />
                <span className="blind">이전</span>
              </button>
            )
          )}
        </li>
        <li className="TA_Center">
          <h1 className="FontTitle">{headerTitle}</h1>
        </li>
        <li className="right_section TA_Right">
          {location.pathname === "/" ? (
            <>
              <button type="button">
                <FaSistrix />
                <span className="blind">검색</span>
              </button>
              <button type="button">
                <FaFilter />
                <span className="blind">필터</span>
              </button>
            </>
          ) : (
            location.pathname.startsWith("/setting") && (
              <button type="button" className="done" onClick={onClickDone}>
                완료
              </button>
            )
          )}
        </li>
      </HeaderMain>
      <HeaderNav headerMenu={headerMenu} sidebarActive={sidebarActive} />
      <HeaderBack
        className={`HeaderBack ${sidebarActive ? "active" : ""}`}
        onClick={onClickBack}
      ></HeaderBack>
    </HeaderBlock>
  );
};

export default Header;
