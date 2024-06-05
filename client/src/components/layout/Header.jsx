import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  .language-switcher {
    display: flex;
    gap: 10px;
    position: absolute;
    right: 100px;
    top: 10px;
    align-items: center;
  }

  .language-switcher label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .language-switcher input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #25cc90;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .lang-text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  .lang-ko {
    left: 8px;
  }

  .lang-en {
    right: 8px;
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
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const onClickSidebar = () => setSidebarActive(true);
  const onClickBack = () => setSidebarActive(false);

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
      title: "소셜",
      list: [{ listTitle: "지뢰찾기", listLink: "/app" }],
    },
    {
      title: "소개",
      list: [
        { listTitle: "소개", listLink: "/about/company" },
        { listTitle: "게시판", listLink: "/boardList", state: { page: 1 } },
      ],
    },
  ];

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

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
          <h1 className="FontTitle">{t("msn7")}</h1>
        </li>
        <div className="language-switcher">
          <label>
            <input
              type="checkbox"
              checked={selectedLanguage === "en"}
              onChange={() =>
                changeLanguage(selectedLanguage === "ko" ? "en" : "ko")
              }
            />
            <span className="slider"></span>
            <span className="lang-text lang-ko">KO</span>
            <span className="lang-text lang-en">EN</span>
          </label>
        </div>
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
        className={`HeaderBack ${sidebarActive && "active"}`}
        onClick={onClickBack}
      ></HeaderBack>
    </HeaderBlock>
  );
};

export default Header;
