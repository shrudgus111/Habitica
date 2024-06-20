import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { userLogin } from "@/store/member";
// import { fetchCart } from '@/store/product'

const Wrap = styled.div`
  background: #fff;
`;

const LoginSectionBlock = styled.div`
  max-width: 600px;
  margin: 50px auto;

  table {
    col:nth-child(1) {
      width: 40px;
    }
    col:nth-child(2) {
      width: auto;
    }
    td {
      padding: 5px 24px;
      color: #8a2be2;
      &:nth-child(1) {
        text-align: left;
      }
      input {
        border: 1px solid #ddd;
        height: 30px;
        width: 100%;
        text-indent: 1em;
      }
    }
  }
  .btn {
    text-align: center;
    margin-top: 20px;
    button {
      width: 80%;
      padding: 10px;
      background: linear-gradient(to right, #8e2de2, #4a00e0);
      color: #fff;
    }
  }
  .go {
    border-bottom: 1px solid #000;
    width: 70px;
    text-align: center;
    font-size: 13px;
    margin: 30px auto;
    font-weight: 800;
  }
  .go2 {
    border-bottom: 1px solid #000;
    width: 70px;
    text-align: center;
    font-size: 13px;
    margin: 0 auto;
    font-weight: 800;
  }
  .snslogin {
    padding: 50px 50px 50px 150px;
    div {
      display: flex;
      height: 40px;
      line-height: 40px;
      margin: 5px 0;
      cursor: pointer;
      span:nth-child(1) {
        width: 40px;
        text-align: center;
        font-size: 18px;
        padding-top: 1px;
      }
      span:nth-child(2) {
        flex: 1;
      }
      &.naver {
        background: #03c75a;
        color: #fff;
      }
      &.kakao {
        background: yellow;
        color: #000;
      }
      &.google {
        background: #ea4335;
        color: #fff;
      }
      &.github {
        background: #000;
        color: #fff;
      }
    }
  }
`;

const LoginSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const userIdRef = useRef("");
  const userPwRef = useRef("");

  const previousUrl = sessionStorage.getItem("previousUrl");
  const choiceProduct = sessionStorage.getItem("choiceProduct");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("이메일을 입력하세요.");
      userIdRef.current.focus();
      return;
    }
    if (!userPw) {
      alert("비밀번호를 입력하세요.");
      userPwRef.current.focus();
      return;
    }

    axios
      .post("http://localhost:8002/auth/login", { userId, userPw })
      .then((res) => {
        if (res.data[0]) {
          console.log("회원입니다.", res.data[0]);
          dispatch(userLogin(res.data[0]));
          // dispatch(fetchCart(res.data[0].userNo))
          // if (previousUrl=='/payment') {
          //     navigate(previousUrl, {state:JSON.parse(choiceProduct)})
          //     sessionStorage.removeItem('previousUrl')
          // } else if (previousUrl=='/product' || previousUrl=='/cart'){
          //     navigate(previousUrl)
          //     sessionStorage.removeItem('previousUrl')
          // } else {
          navigate("/home");
        } else {
          alert("회원이 아닙니다.");
          userIdRef.current.focus();
          return false;
        }
      })
      .catch((err) => console.log(err.toJSON()));
  };

  return (
    <Wrap>
      <LoginSectionBlock>
        <form onSubmit={handleLogin}>
          <table>
            <colgroup>
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="userId">
                    <FaUser />
                  </label>
                </td>
                <td>
                  <input
                    ref={userIdRef}
                    type="text"
                    id="userId"
                    name="userId"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="userPw">
                    <FaLock />
                  </label>
                </td>
                <td>
                  <input
                    ref={userPwRef}
                    type="password"
                    id="userPw"
                    name="userPw"
                    onChange={(e) => setUserPw(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn">
            <button type="submit">Log In</button>
          </div>

          <div className="go">
            <Link to="/join">
              <p>회원가입</p>
            </Link>
          </div>

          <div className="go2">
            <Link to="/home">
              <p>홈페이지</p>
            </Link>
          </div>
        </form>
        {/* <div className="snslogin">
                <div className="naver">
                    <span style={{ fontSize:'15px'}}><SiNaver /></span>
                    <span>네이버 로그인</span>
                </div>
                <div className="kakao">
                    <span><RiKakaoTalkFill /></span>
                    <span>카카오 로그인</span>
                </div>
                <div className="google">
                    <span><FaGoogle /></span>
                    <span>구글 로그인</span>
                </div>
                <div className="github">
                    <span><FaGithub /></span>
                    <span>깃허브 로그인</span>
                </div>
            </div> */}
      </LoginSectionBlock>
    </Wrap>
  );
};

export default LoginSection;
