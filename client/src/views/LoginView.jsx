import React from 'react';
import Title from '@/components/layout/Title'
import LoginSection from '@/components/member/LoginSection'
import styled from 'styled-components';

const LoginViewBlock= styled.div`
background: linear-gradient(to right, #a18cd1, #fbc2eb);
padding:130px 0 0 0;
height:100vh;
.box{background:#fff; width:60%; margin:0 auto; padding:20px 0; border-radius:50px;
   h2 {font-size:25px; font-weight:300;  background: linear-gradient(to right, #8e2de2, #4a00e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;}
}
`

const LoginView = () => {

    return (
        <LoginViewBlock>
        <div className="box" data-aos="fade-down"
     data-aos-duration="3000">
            <Title title="Log in your account"  />
            <LoginSection />
        </div>
        </LoginViewBlock>
    );
};

export default LoginView;