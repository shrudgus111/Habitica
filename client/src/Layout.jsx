import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { ImSpinner } from "react-icons/im";

const Wrap = styled.div`
div.cover {
      position:fixed; top:0; left:0; bottom:0; right:0; background:#fff; font-weight:900;
      display:flex; align-items:center; justify-content:center;
      @media screen and (max-width: 768px) { display:none; }
  }

  div.container {
        display:none;
        @media screen and (max-width: 768px) { display:block; }
    }
`;

const LoadingBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loadIcon {
    font-size: 80px;
    animation: loadSpin 5s linear infinite;
  }
  @keyframes loadSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(3turn);
    }
  }
`;

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const shouldShowHeaderFooter = location.pathname !== '/' && location.pathname !== '/join';

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  if (!loading) {
    return (
      <Wrap>
        <div className="cover">이 사이트는 768px 이하 화면에서만 보입니다.</div>
        <div className="container">
          {/* <LoadingBlock>
            <ImSpinner className="loadIcon" />
          </LoadingBlock> */}
        </div>
      </Wrap>
    );
  }
  return (
    <Wrap>
    <div className="cover">이 사이트는 768px 이하 화면에서만 보입니다.</div>
    <div className="container">
    <div className="minHeightDisplay FL_Column">
      {shouldShowHeaderFooter  ? <Header /> : ""}
      <main className="FL_Column FL_1">
        <Outlet />
      </main>
     
    </div>
    </div>
    </Wrap>
  );
};

export default Layout;
