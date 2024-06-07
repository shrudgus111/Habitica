import React from 'react';
import Title from '@/components/layout/Title'
import MemberModifySection from '@/components/member/MemberModifySection'
import styled from 'styled-components';

const MemberModifyViewBlock= styled.div`
background: linear-gradient(to right, #a18cd1, #fbc2eb);
padding:110px 0 0 0;
height:100vh;
.box{background:#fff; width:80%; margin:0 auto; padding:20px 0; border-radius:50px;
   h2 {font-size:25px; font-weight:300;  background: linear-gradient(to right, #8e2de2, #4a00e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;}
}
`

const MemberModifyView = () => {
    return (
        <MemberModifyViewBlock>
        <div className="box" data-aos="fade-down"
     data-aos-duration="3000">
            <Title title="Amendment" />
            <MemberModifySection />
        </div>
        </MemberModifyViewBlock>
    );
};

export default MemberModifyView;