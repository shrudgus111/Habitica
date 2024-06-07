import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { localUser, userLogout } from '@/store/member'
import axios from 'axios'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
// import { FaCheck } from "react-icons/fa6";

const MemberModifySectionBlock = styled.div`
    max-width:600px; margin:50px auto; 
    table { 
        col:nth-child(1) { width:40px }
        col:nth-child(2) { width:auto }
        td { padding:5px 24px; color: #8A2BE2; font-size:19px;
            &:nth-child(1) { text-align:left }
            input { border:1px solid #ddd; height:30px; width:100%;
                text-indent:1em; }
        }
    }
    .btn { text-align:center; margin-top:20px; 
        button { padding:10px; background:linear-gradient(to right, #8e2de2, #4a00e0); color:#fff;  }
    }
`

const MemberModifySection = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.members.user)

    const userIdRef = useRef("")
    const userPwRef = useRef("")
    const userPwOkRef = useRef("")
   

    const [userInfo, setUserInfo] = useState({
        userNo:user.userNo,
        userId:user.userId,
        userPw:"",
        userPwOk:"",
        userIrum:user.userIrum
      
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    const modify = async (e) =>{
        e.preventDefault()
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
        
        axios.post("http://localhost:8002/auth/modify", { userInfo:userInfo })
        .then((res)=>{
            if (res.data.affectedRows==1) {
                alert("정보가 수정되었습니다.")
                console.log(JSON.parse(res.config.data).userInfo)
                dispatch(localUser(JSON.parse(res.config.data).userInfo))
                navigate("/home")
            } else {
                alert("정보 수정중 오류가 발생했습니다.")
            }
        })

    }

    const memberRemove = async (e)=>{
        e.preventDefault()
        const answer = confirm("정말로 탈퇴하시겠습니까?")
        if (answer) {
            axios.post("http://localhost:8002/auth/remove", { userNo : userInfo.userNo })
            .then((res)=>{
                console.log("탈퇴성공", res)
                if (res.data.affectedRows==1) {
                    dispatch(userLogout())
                    navigate("/home")
                } else {
                    alert("회원탈퇴를 실패했습니다.")
                    return
                }
            })
        } else {
            return
        }
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
               
            }));
            mAddressSubRef.current.focus();
            },
        }).open();
        };
    }, []);
   
    return (
        <MemberModifySectionBlock>
            <form onSubmit={modify}>
                <table border="0">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label htmlFor="userId"><FaUser /></label></td>
                            <td><input type="text" name="userId" id="userId" ref={userIdRef} value={userInfo.userId} disabled /></td>
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
                    <button type="submit">정보수정</button>
                    <button type="button" onClick={memberRemove} style={{marginLeft:"20px"}}>회원탈퇴</button>
                </div>
            </form>
        </MemberModifySectionBlock>
    );
};

export default MemberModifySection;