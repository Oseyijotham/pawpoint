import { Outlet } from 'react-router-dom';
import {
  Container,
  Header,
  Logo,
  Linker,
  Frame,
  IconLabelStart,
  IconLabelEnd,
  Symbol,
  Button,
  Greeting,
  IconLabelWrapper,
  Burger
} from './SharedLayout.styled';
import { useState,Suspense } from 'react';
import { logOut } from '../../redux/AuthRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHook } from '../../customHook/customHook';
import logoImage from './GeoPets.png';
import { useMediaQuery } from 'react-responsive';
import svg from './icons.svg';
import clsx from 'clsx';
import css from './SharedLayout.module.css';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/AuthRedux/selectors';
import { ThreeCircles } from 'react-loader-spinner';
import { setScheduler } from '../../redux/AuthRedux/operations';



export const SharedLayout = () => {
  const myUser = useSelector(selectUser);
  const [isMenuHidden, setMenuHide] = useState(true);
  const dispatch = useDispatch();
  const { user } = useAuthHook();
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const handleShedular = () => {
       dispatch(setScheduler());
    }
  
  return (
    <Container>
      <Header>
        <Symbol to="/">
          <Logo>
            <Frame role="img" aria-label="computer icon">
              <img src={logoImage} alt="Logo" width="80px" />
            </Frame>
            <IconLabelWrapper>
              <IconLabelStart>Geo</IconLabelStart>
              <IconLabelEnd>
                <i>Pets</i>
              </IconLabelEnd>
            </IconLabelWrapper>
          </Logo>
        </Symbol>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
        <nav>
          <Linker to="/sharedLayout/Home">Home</Linker>
          <Linker to="/sharedLayout/placesFinder">Pet Services</Linker>
          <Linker to="/sharedLayout/apiCreator">Create Your API</Linker>
          <Linker to="/sharedLayout/profile">My Profile</Linker>
          <Button type="button" onClick={() => dispatch(logOut())}>
            Logout
          </Button>
        </nav>
        <Burger type="button" onClick={() => setMenuHide(false)}>
          <svg width="60px" height="40px">
            <use href={`${svg}#icon-burger`}></use>
          </svg>
        </Burger>
      </Header>

      <div
        className={clsx(css.menu, {
          [css.menuHidden]: isMenuHidden,
        })}
      >
        <div>
          <div className={css.headerWindow}>
            <button
              type="button"
              className={css.headerWindowButton}
              onClick={() => setMenuHide(true)}
            >
              <svg
                width="14px"
                height="14px"
                className={css.headerWindowCloseIcon}
              >
                <use href={`${svg}#icon-cross`}></use>
              </svg>
            </button>

            <div className={css.headerWindowNameWrapper}>
              <div className={css.userWrapper}>
                <div className={css.imageWrapper}>
                  <img
                    className={css.detailsImage}
                    src={`${myUser.avatarURL}`}
                    alt="User"
                  />
                </div>
                <span className={css.headerWindowName}>
                  <i>{user.firstname}</i>
                </span>
              </div>
            </div>

            <div className={css.headerWindowNav}>
              <div className={css.headerWindowNavList}>
                <Link
                  to="/sharedLayout/Home"
                  className={css.headerWindowNavLink}
                  onClick={() => setMenuHide(true)}
                >
                  Home
                </Link>

                <li className={css.headerWindowNavItem}>
                  <Link
                    to="/sharedLayout/placesFinder"
                    className={css.headerWindowNavLink}
                    onClick={() => {
                      setMenuHide(true);
                      //handleShedular();
                    }}
                  >
                    Pet Services
                  </Link>
                </li>
                <li className={css.headerWindowNavItem}>
                  <Link
                    to="/sharedLayout/apiCreator"
                    className={css.headerWindowNavLink}
                    onClick={() => setMenuHide(true)}
                  >
                    Create Your API
                  </Link>
                </li>
                <li className={css.headerWindowNavItem}>
                  <Link
                    to="/sharedLayout/profile"
                    className={css.headerWindowNavLink}
                    onClick={() => setMenuHide(true)}
                  >
                    My Profile
                  </Link>
                </li>

                <button
                  type="button"
                  className={css.headerWindowNavButton}
                  onClick={() => dispatch(logOut())}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div>
            <ThreeCircles
              visible={true}
              height="80"
              width="80"
              color="#9225ff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass={css.loader}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Container>
  );
};
