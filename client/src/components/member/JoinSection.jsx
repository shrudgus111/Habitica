import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const JoinSectionBlock = styled.div`
    max-width:600px; margin:50px auto; 
    table { 
        col:nth-child(1) { width:40px }
        col:nth-child(2) { width:auto }
        td { padding:5px 24px;  color: #8A2BE2; font-size:19px;
            &:nth-child(1) { text-align:left; }
            input { border:1px solid #ddd; height:30px; width:100%;
                text-indent:1em; }
        }
    }
    .btn { text-align:center; margin-top:20px; 
        button {width:80%; padding:10px; background:linear-gradient(to right, #8e2de2, #4a00e0); color:#fff;color:#fff;  }
    }
`
const JoinSection = () => {
   
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const userIdRef = useRef("")
    const userPwRef = useRef("")
    const userPwOkRef = useRef("")

    const mAddressSubRef = useRef("")
    const [userInfo, setUserInfo] = useState({
        userId:"",
        userPw:"",
        userPwOk:"",
        userIrum:""
       
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    
    const register = async (e) =>{
        e.preventDefault()
        if (!userInfo.userId) {
            alert("이메일을 입력하세요.")
            userIdRef.current.focus()
            return
        }
        if (!userInfo.userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        if (!userInfo.userPwOk) {
            alert("비밀번호를 입력하세요.")
            userPwOkRef.current.focus()
            return
        }
        if (userInfo.userPw!=userInfo.userPwOk){
            alert("비밀번호가 일치하지 않습니다.")
            userPwRef.current.focus()
            return
        }

        if ( message=="중복된 아이디입니다." ) {
            alert("중복된 아이디입니다.")
            return
        }

        const addMember = {userId:userInfo.userId, userPw:userInfo.userPw, userIrum:userInfo.userIrum, handphone:userInfo.handphone, zipCode:userInfo.zipCode, addr1:userInfo.addr1, addr2:userInfo.addr2}
        axios
        .post('http://localhost:8002/auth/join', { addMember } )
        .then((res)=>{
            console.log("회원가입중", res)
            if (res.data.affectedRows === 1) {
                alert("회원가입이 성공했습니다.")
            } else { 
                alert("실패")
                return
            }
            navigate("/")
        })
        .catch(err=>console.log(err.toJSON()))
    }
    
    const idCheck = (value)=>{
        axios.post("http://localhost:8002/auth/idcheck", {userId:value})
        .then((res)=>{
            console.log(res)   
            if (res.data[0]) {
                setMessage("중복된 아이디입니다.")
            } else {
                setMessage("가능한 아이디입니다.")
            }
        })
        .catch(err=>console.log(err.toJSON()))
    }

    
    useEffect(() => {
          window.openDaumPostcode = () => {
            new window.daum.Postcode({
              oncomplete: (data) => {
                let fullAddr = ''; // 최종 주소 변수
                let extraAddr = ''; // 조합형 주소 변수
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                  fullAddr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                  fullAddr = data.jibunAddress;
                }
                if (data.userSelectedType === 'R') {
                  if (data.bname !== '') {
                    extraAddr += data.bname;
                  }
                  if (data.buildingName !== '') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                  }
                  fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                }
                // 주소 정보를 입력 요소에 설정
                setUserInfo(prevState => ({
                    ...prevState,
                    zipCode: data.zonecode,
                    addr1: fullAddr
                }));
                mAddressSubRef.current.focus();
              },
            }).open();
          };
      }, []);

    return (
        <JoinSectionBlock>
            <form onSubmit={register}>
                <table border="0">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><FaCheck /></td>
                            <td> { message } </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userId"><FaUser /></label></td>
                            <td><input type="text" name="userId" id="userId" ref={userIdRef} value={userInfo.userId} onChange={(e)=>{handleChange(e); idCheck(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPw"><FaLock /></label></td>
                            <td><input type="password" name="userPw" id="userPw" ref={userPwRef} value={userInfo.userPw} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPwOk"><FaLockOpen /> </label></td>
                            <td><input type="password" name="userPwOk" id="userPwOk" ref={userPwOkRef} value={userInfo.userPwOk} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userIrum"><MdDriveFileRenameOutline /></label></td>
                            <td><input type="text" name="userIrum" id="userIrum" value={userInfo.userIrum} onChange={handleChange} /></td>
                        </tr>
                      
                      
                     
                      
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">Join</button>
                </div>
            </form>
        </JoinSectionBlock>
    );
};

export default JoinSection;