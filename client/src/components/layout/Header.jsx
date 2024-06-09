import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaShoppingBag } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
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
    label {
      position: relative;
      width: 60px;
      height: 34px;
      padding: 0 8px;
    }
    .slider {
      position: absolute;
      inset: 0;
      cursor: pointer;
      background-color: var(--black-color);
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
      background-color: var(--main-color);
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }

    .lang-text {
      font-size: 14px;
      color: #fff;

      position: relative;
      span {
        height: 100%;
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
      icon: <FaShoppingBag />,
      list: [{ listTitle: "상점", listLink: "/shop/market" }],
    },
    {
      title: "인벤토리",
      icon: <MdInventory />,
      list: [
        { listTitle: "장비", listLink: "/inventory/equipment" },
        { listTitle: "아이템", listLink: "/inventory/items" },
      ],
    },
    {
      title: "소셜",
      icon: <FaUserFriends />,
      list: [{ listTitle: "지뢰찾기", listLink: "/app" }],
    },
    {
      title: "소개",
      icon: <FaQuestionCircle />,
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
        <li className="TA_Left FL_Center">
          {location.pathname === "/home" ? (
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
        <li className="TA_Center FL_CSB">
          <h1 className="FontTitle">{t("msn7")}</h1>
        </li>
        <li className="right_section TA_Right">
          <div className="language-switcher FL_Center">
            <label className="FL_SB cursorPointer">
              <input
                className="inputUnset"
                type="checkbox"
                checked={selectedLanguage === "en"}
                onChange={() =>
                  changeLanguage(selectedLanguage === "ko" ? "en" : "ko")
                }
              />
              <span className="slider"></span>
              <div className="lang-text lang-ko FontTitle FL_1">
                <span className="G_PCC">KO</span>
              </div>
              <div className="lang-text lang-en FontTitle FL_1">
                <span className="G_PCC">EN</span>
              </div>
            </label>
          </div>
          {location.pathname === "/home" ? (
            <>
              <button type="button" className="FL_Center">
                <FaSistrix />
                <span className="blind">검색</span>
              </button>
              <button type="button" className="FL_Center">
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
