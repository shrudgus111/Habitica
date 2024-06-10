import React from "react";
import styled from "styled-components";
import HeaderNavMenu from "@/components/layout/HeaderNavMenu";

const LogoBox = styled.div`
  background: linear-gradient(-45deg, #925cf2, #6132b4);
  height: 180px;
  border-radius: 8px;
  .logo {
    height: 70%;
  }
`;

const CompanyView = () => {
  const companyMenu = [
    {
      title: "",
      icon: "",
      list: [
        { listTitle: "피드백 보내기", listLink: "/character/skills" },
        { listTitle: "버그 리포트", listLink: "/character/stats" },
        { listTitle: "리뷰 남기기", listLink: "/character/achievements" },
      ],
    },
    {
      title: "",
      icon: "",
      list: [
        { listTitle: "기부자의 전당", listLink: "/character/skills" },
        { listTitle: "후원자의 전당", listLink: "/character/stats" },
      ],
    },
    {
      title: "",
      icon: "",
      list: [
        { listTitle: "웹사이트", listLink: "/character/skills" },
        { listTitle: "트위터", listLink: "/character/stats" },
        { listTitle: "인스타그램", listLink: "/character/achievements" },
      ],
    },
    {
      title: "",
      icon: "",
      list: [{ listTitle: "GitHub 방문하기", listLink: "/character/skills" }],
    },
  ];
  return (
    <section className="">
      <LogoBox className="DefaultWidth TA_Center FL_CSB">
        <img
          className="logo "
          src="../src/assets/image/logo.svg"
          alt="해비티카 로고"
        />
      </LogoBox>
      <HeaderNavMenu menu={companyMenu} />
    </section>
  );
};

export default CompanyView;
