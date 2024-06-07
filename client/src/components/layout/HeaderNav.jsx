import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import HeaderNavMenu from "./HeaderNavMenu";
import { IoMdSettings } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { userLogout, localUser } from "@/store/member";
import { useSelector, useDispatch } from "react-redux";
import { FiUser, FiUserPlus, FiUserX, FiUserCheck } from "react-icons/fi";
import { fetchReview } from "@/store/board";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
    align-items: center;
    padding: 16px 0;
    font-size: 15px;
    color: white;
    .member {
      position: absolute;
      right: 54px;
      font-size: 20px;
      align-items: center;
      a {
        margin-right: 10px;
      }
    }

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
        &.setting {
          font-size: 20px;
        }
      }
    }
  }

  .language-switcher {
    display: flex;
    gap: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .language-switcher button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const HeaderNav = ({ headerMenu, sidebarActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const { t, i18n } = useTranslation();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    navigate("/home");
  };

  useEffect(() => {
    if (localStorage.getItem("loging")) {
      const { userNo } = JSON.parse(localStorage.getItem("loging"));
      axios
        .post("http://localhost:8002/auth/refresh", { userNo })
        .then((res) => {
          dispatch(localUser(res.data[0]));
          dispatch(fetchReview(1));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, user?.userNo]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
              {user ? (
                <>
                  <span className="title">{user.userIrum}</span>
                  <span className="content">{user.userId}</span>
                </>
              ) : (
                "로그인이 필요합니다"
              )}
            </p>
          </li>
          {user ? (
            <div className="member">
              <a href="#" onClick={handleLogout}>
                <FiUserX />
              </a>
              <Link to="/memberModify">
                <FiUserCheck />
              </Link>
            </div>
          ) : (
            <div className="member">
              <Link to="/"><FiUser /></Link>
              <Link to="/join"><FiUserPlus /></Link>
            </div>
          )}
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
