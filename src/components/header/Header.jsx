import { Button, Container } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import { GetContext } from "../../context/Context";
import { Logout } from "@mui/icons-material";


export const Header = () => {
  const location = useLocation();
  const {user, setUser} = GetContext();
  const navigate = useNavigate();

  const handleLogout = ()=> {
    setUser({
      email:""

    })

    localStorage.removeItem('user')
    navigate('/login')
  }

 
  return (    



    <header>
      <nav className={s.nav}>
        <Container fixed>
          <div className={s.navbar}>

            <div className={s.navbar_left}>
              <Link to="/" className={s.logo}><img src="src/img/Razer-Symbol-removebg-preview.png" alt="" /></Link>
            </div>



            <div className={s.navbar_right}>
              {user.email.length ? 
              <Link to="/cart"><img className={s.cart}src="src/img/free-icon-shopping-cart-of-checkered-design-34627.png" alt="" /></Link>
              :null}
            {user.email.length ? 
            <Button
             color="inherit"
              startIcon={<Logout/>} 
              onClick={handleLogout}>
                Выйти
              </Button> : null }


              { !user.email.length && (location.pathname === '/' 
              ||location.pathname === '/login') && 
              (
                <Link to="/registr">Зарегестрироваться</Link>
              )}
              
              { !user.email.length &&  location.pathname === '/registr' && ( <Link to="/login">Войти</Link>)}
             
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};
