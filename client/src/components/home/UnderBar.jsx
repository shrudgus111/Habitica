import React from "react";
import styled from "styled-components";
import { PiPlusMinusBold } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { PiShoppingBagOpen } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const UnderBarBlock = styled.nav`
  position: sticky;
  bottom: 0;
  background-color: var(--main-color);
  .u_menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1.4fr 1fr 1fr;
    align-items: center;
    padding: 16px 0;
    li {
      position: relative;
      text-align: center;
      color: #fff;
      height: 100%;
      a {
        display: block;
        height: 100%;
        svg {
          font-size: 20px;
        }
        &.toDoBtn {
          background-color: var(--main-color);
          width: 60px;
          height: 60px;
          position: absolute;
          bottom: 60%;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          outline: 10px solid var(--main-hover);
          outline-style: inset;
          svg {
            font-size: 32px;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
`;

const UnderBar = ({ onClickMenu }) => {
  const handleMenuClick = (category) => onClickMenu(category);

  return (
    <UnderBarBlock>
      <ul className="u_menu DefaultWidth FontSub G8px">
        <li>
          <Link to="/" onClick={() => handleMenuClick("habit")}>
            <PiPlusMinusBold />
            <p>습관</p>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => handleMenuClick("daily")}>
            <LuCalendarDays />
            <p>일일과제</p>
          </Link>
        </li>
        <li>
          <Link to="/todo" className="toDoBtn G_PCC">
            <FiPlus />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => handleMenuClick("todo")}>
            <FiCheckCircle />
            <p>할일</p>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => handleMenuClick("reward")}>
            <PiShoppingBagOpen />
            <p>보상</p>
          </Link>
        </li>
      </ul>
    </UnderBarBlock>
  );
};

export default UnderBar;
