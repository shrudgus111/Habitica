import React from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

const HeaderNavMenu = ({ menu }) => {
  return (
    <Section className="DefaultWidth">
      {menu.map((menu, index) => (
        <div key={index}>
          {menu.icon && menu.title && (
            <h2 className="FontMenuTitle menu_title">
              <span className="icon">{menu.icon}</span>
              <span>{menu.title}</span>
            </h2>
          )}
          <ul className="menu_content">
            {menu.list.map((list, index) => (
              <li key={index} className="FontBody">
                <Link
                  to={list.listLink}
                  state={list.state}
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
  );
};

export default HeaderNavMenu;
