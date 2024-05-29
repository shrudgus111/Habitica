import React from "react";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import { FaAlignJustify, FaSistrix, FaFilter } from "react-icons/fa6";

const HeaderBlock = styled.header`
  width: 100%;
  background-color: whitesmoke;
`;

const HeaderMain = styled.ul`
  width: 94%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  li {
    width: 30%;

    font-size: 16px;
    color: var(--black-color);
    &.right_section {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
  }
`;

const HeaderBack = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  position: fixed;
  inset: 0;
  z-index: 1;
  transition: all 0.3s;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const Header = () => {
    const navigate = useNavigate()
    const mobile = useMediaQuery({ maxWidth:768 })
    const [openNav, setOpenNav] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector(state=>state.members.user)
    const cartsCount = useSelector(state=>state.products.cartsCount)

    const handleLogout = (e)=>{
      e.preventDefault()
      dispatch(userLogout())
      dispatch(initCarts([]))
      navigate("/")
    }

    useEffect(()=>{
      if (localStorage.getItem('loging')) {
        const {userNo} = JSON.parse(localStorage.getItem('loging'))
        axios.post("http://localhost:8001/auth/refresh", {userNo})
        .then((res)=>{
           dispatch(localUser(res.data[0]))
        })
        .catch(err=>console.log(err))
      } 
    }, [dispatch, cartsCount])

    return (
        <HeaderBlock>
            <h1 className="header__logo">
                <Link to="/">STARSHIP SQUARE</Link>
            </h1>
            { user ?
              <div className="member">
                <a href="#" onClick={ handleLogout }>로그아웃</a>
                <Link to="/memberModify">정보수정({user.userId})</Link>
              </div>
              :
              <div className="member">
                  <Link to="/login">로그인</Link>
                  <Link to="/join">회원가입</Link>
              </div>
            }
            { mobile &&
              <Hamburger onClick={()=>setOpenNav(true)}>
                <FaBars />
              </Hamburger> 
            }
            <ItemCount>
              <Link to="/cart">
                <BsCartPlusFill />
                { cartsCount ? <span>{ cartsCount }</span> : ""}
              </Link>
            </ItemCount>
            <MyOrder>
              <Link to="/myOrder">
                <FaRegUser />
              </Link>
            </MyOrder>
            { mobile ||
              <nav id="header__nav">
                  <ul>
                      <li>
                          <NavLink to="/artist">Artist</NavLink>
                      </li>
                      <li>
                          <NavLink to="/actor">Actor</NavLink>
                      </li>
                      <li>
                          <NavLink to="/movie">Movie</NavLink>
                      </li>
                      <li>
                          <NavLink to="/theater">Theater</NavLink>
                      </li>
                      <li>
                          <NavLink to="/product" state={{ page:1, category:'all'}}>Product</NavLink>
                      </li>
                      <li>
                          <NavLink to="/boardList" state={{page:1}}>Community</NavLink>
                      </li>
                  </ul>
              </nav>
            }
            { mobile &&
              <MobileNav className={ openNav && "on"}>
                <MdClose className={cn("closeNav", openNav && "on")} onClick={()=>setOpenNav(false)} />
                <ul className={ openNav && "on"}>
                    <li>
                        <NavLink to="/artist">Artist</NavLink>
                    </li>
                    <li>
                        <NavLink to="/actor">Actor</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movie">Movie</NavLink>
                    </li>
                    <li>
                        <NavLink to="/theater">Theater</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/boardList">Community</NavLink>
                    </li>
                </ul>
              </MobileNav>
            }
        </HeaderBlock>
    );
};

export default Header;
