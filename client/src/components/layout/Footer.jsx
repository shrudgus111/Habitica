<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components'


const FooterBlock = styled.div`
    background: #000;
    color: #fff;
    padding: 50px;
    margin-top:50px; 
    .footer__nav {
        border-bottom: 1px solid #fff;
        padding-bottom: 20px;
        margin-bottom: 20px;
        a { margin-right: 50px; }
    }
    .footer__info {
        span {
            position: relative;
            margin-left: 14px;
            &::before {
                content: '';
                position: absolute;
                top: 5px;
                left: -10px;
                width: 1px;
                height: 14px;
                background: #fff;
            }
        }
    }
    @media screen and (max-width: 768px) {
        padding: 0px;
        .footer__nav {
          border-bottom: 0px solid #fff;
          padding-bottom: 0px;
          margin-bottom: 0px;
          a {
            margin-right: 0px;
            display: block;
            border: 1px solid #fff;
            border-top: none;
            padding: 10px 20px;
          }
        }
        .footer__info {
          padding: 30px 20px;
          line-height: 1.5em;
          span {
            margin-left: 0px;
            display: block;
            &::before {
              display: none;
            }
          }
        }
      }
`

const Footer = () => {
    return (
        <FooterBlock>
          
        </FooterBlock>
    );
=======
import React from "react";

const Footer = () => {
  return <div></div>;
>>>>>>> 38dddec6970ed8d689e91e03f33624878dad06fb
};

export default Footer;
