import React from "react";
import HeaderNavMenu from "@/components/layout/HeaderNavMenu";

const SettingsView = () => {
  const settingMenu = [
    {
      title: "유저",
      list: [
        { listTitle: "내 계정", listLink: "/setting/user/myAccount" },
        { listTitle: "로그아웃", listLink: "/setting/user/logout" },
      ],
    },
    {
      title: "환경설정",
      list: [
        { listTitle: "언어", listLink: "/setting/preference/language" },
        {
          listTitle: "시작 화면",
          listLink: "/setting/preference/launchScreen",
        },
        { listTitle: "화면 모드", listLink: "/setting/preference/displayMode" },
      ],
    },
  ];
  return (
    <>
      <HeaderNavMenu menu={settingMenu} />
      {/* <div className="language-switcher">
          <button onClick={() => changeLanguage('ko')}>KO</button>
          <button onClick={() => changeLanguage('en')}>EN</button>
        </div> */}
    </>
    
  );
};

export default SettingsView;
