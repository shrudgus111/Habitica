import React, {useEffect, useState} from 'react';



import styled from 'styled-components'


const HeaderBlock = styled.div`
  text-align: center;
  padding: 20px;
  background: #ddd;
  position: relative;
  .header__logo { padding: 20px; }
  .member { position: absolute; top: 30px; left: 30px;
    a { margin-right: 10px; }
  }
  .itemcount { position: absolute; top: 20px; right: 30px;
    font-size: 30px; color: blue;
    span { position: absolute; top: -2px; right: -5px; width: 20px;
      height: 20px; border-radius: 50%; background: red; color: #fff;
      font-size: 12px; line-height: 20px; text-align: center; font-weight: bold;
    }
  }
  .openNav { position: absolute; top: 20px; right: 80px; font-size: 30px; color: blue;
    cursor: pointer; display: none; }
  #header__nav { 
    ul {
      display: flex;
      justify-content: space-around;
      li { margin: 10px 0px; font-size: 20px;
        a { transition: all 0.5s;
          &:hover, &.active { color: #f00; }
        }
      }
    }
    .closeNav { display: none; }
  }
`

const ItemCount = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 30px;
  color: blue;
  span {
    position: absolute;
    top: -2px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
  }
`

const Hamburger = styled.div`
  position: absolute;
  top: 20px;
  right: 110px;
  font-size: 30px;
  color: blue;
`

const MyOrder = styled.div`
  position: absolute;
  top: 20px;
  right: 70px;
  font-size: 30px;
  color: blue;
`

const MobileNav = styled.nav`
  position:fixed;
  left:100%;
  top:0; 
  bottom:0; 
  right:0;
  background:rgba(0,0,0,0.5);
  z-index:9999999;
  overflow:hidden;
  transition:all 0.5s;
  &.on { left:0;  }
  .closeNav { font-size:30px; color:blue; position:absolute; 
    top:20px; right:-50px; z-index:9999;
    transition:all 0.3s;
    &.on { right:20px; transition:all 0.5s; }
  }
  ul {
    position:absolute;
    top:0; right:-200px;
    height:100%; width:200px; 
    background:#fff;
    padding-top:100px; 
    transition:all 0.3s 0s;
    &.on { right:0; transition:all 0.3s 0.2s; }
    li { border-bottom:1px solid #000;
      a { display:block; line-height:60px;  
          transition: all 0.5s;
          &:hover, &.active { color: #f00; }
      }
      &:nth-child(1) { border-top:1px solid #000 }
    }
  }
`

const Header = () => {
 


    return (
        <HeaderBlock>
           
     
        </HeaderBlock>
    );
};

export default Header;