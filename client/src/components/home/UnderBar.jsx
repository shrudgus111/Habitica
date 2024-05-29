import React from 'react';
import styled from 'styled-components';
import { PiPlusMinusBold } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { PiShoppingBagOpen } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';

const UnderBarBlock = styled.div`
width:100%;

position:fixed;
bottom:0;
background:#6132b4;
text-align:center;
.butt{margin-top:-87px;
    
   
.plus {
    
    text-align:center;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom-color:#925cf2;
    position: relative;
    top: -11px;
    text-align:center;
    margin:0 auto;
    
    p{
        color:#fff;
        line-height:100px;
        font-size:40px;
        position: relative;
        z-index:99999;
        text-align:center;
        margin:0 auto;
        left: -18px;
    }
  
   
  }
  .plus:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 50px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top-color:#925cf2;
  }
}

.u_menu{
    padding:10px 30px;
    display:flex; align-items:center; justify-content:space-between;
    li{
        text-align:center;
        
        font-size:34px;
        color:#fff;
        p{
            font-size:13px;
        }
    }
}


`

const UnderBar = () => {
    return (
        <UnderBarBlock>
            <div className='butt'><Link to="/todo"><div className="plus"><p><FiPlus /></p></div></Link></div>
             <ul className="u_menu">
<li><Link to="/"><PiPlusMinusBold /><p>습관</p></Link></li>
<li><Link to="/"><LuCalendarDays /><p>일일 과제목록</p></Link></li>
<li><Link to="/"><FiCheckCircle /><p>해야 할 일</p></Link></li>
<li><Link to="/"><PiShoppingBagOpen /><p>보상</p></Link></li>
             </ul>
        </UnderBarBlock>
    );
};

export default UnderBar;