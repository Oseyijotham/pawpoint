import css from './Home.module.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading
} from '../../redux/AppRedux/selectors';
import { selectUser } from '../../redux/AuthRedux/selectors';
import { retrieveApiKey } from '../../redux/AppRedux/operations';
import icon from './point.png';
import PetServices from './Dog Points.png';
import API from './API.png';
import Profile from './Profile.png';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';




export const Home = () => {
  const myRef = useRef();
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const myUser = useSelector(selectUser);
  const [isOneHovered, setIsOneHovered] = useState(false);
  const [isTwoHovered, setIsTwoHovered] = useState(false);
  const [isThreeHovered, setIsThreeHovered] = useState(false);
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

   const scrollToSection = () => {
     sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

useEffect(() => {
  dispatch(retrieveApiKey());
}, [dispatch]);

  return (
    <div className={css.homeDisplay}>
      <div>
        <div className={css.homeDisplayIntro}>
          <div className={css.homeIconWrapper}>
            <img src={icon} alt="icon" className={css.homeIcon} />
          </div>
          <span>
            <span className={css.homeDisplayTitle}>
              Welcome,{' '}
              <span className={css.homeDisplayTitlePart}>
                {myUser.firstname}
              </span>
            </span>
            <span className={css.homeDisplaySlogan}>
              <i>
                Here at PawPoint, we provide you with smart location-based
                information on dog-friendly services, facilities, and outdoor
                spots for any area of your choice. From dog parks and walkers to
                vets, trainers, and live weather conditions, we’ve got you and
                your dog covered.
              </i>
            </span>
            <span className={css.homeDisplaySloganMobile}>
              <i>Data-driven dog adventures</i>
            </span>
          </span>
          <div className={css.homeIconWrapper}>
            <img src={icon} alt="icon" className={css.homeIcon} />
          </div>
        </div>
      </div>

      <div className={css.hero}>
        <div className={css.offersLabelWrapper}>
          <div className={css.offersLabel}>We offer</div>
        </div>

        <div className={css.offersWrapper}>
          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsOneHovered(true);
            }}
            onMouseLeave={() => {
              setIsOneHovered(false);
            }}
            style={{
              transform: `
    ${isTwoHovered && isTablet ? 'translateY(105%)' : 'translateY(0)'}
    ${isThreeHovered && isTablet ? 'translateX(-30%)' : 'translateX(0)'}
  `,
              boxShadow: `
              ${
                isOneHovered
                  ? 'inset 0 0 50px 30px #0B2A4A'
                  : 'inset 0 0 10px 5px  #0B2A4A'
              }
              `,
            }}
          >
            <div
              key="townMayor"
              className={css.movieItem}
              onClick={() => {
                setIsOneHovered(false);
              }}
            >
              <Link to="/sharedLayout/placesFinder" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.routeImage}
                    srcSet={PetServices}
                    src={PetServices} // Fallback
                    alt="PetServices"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      Find the right places at the right conditions .
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>Dog Points</span>
                </span>
              </Link>
            </div>
          </div>

          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsTwoHovered(true);
            }}
            onMouseLeave={() => {
              setIsTwoHovered(false);
            }}
            style={{
              transform: `
    ${isOneHovered && isTablet ? 'translateY(105%)' : 'translateY(0)'}
    ${isThreeHovered && isTablet ? 'translateX(30%)' : 'translateX(0)'}
  `,
              boxShadow: `
              ${
                isTwoHovered
                  ? 'inset 0 0 50px 30px #0B2A4A'
                  : 'inset 0 0 10px 5px  #0B2A4A'
              }
              `,
            }}
          >
            <div
              key="townLibrarian"
              className={css.movieItem}
              onClick={() => {
                setIsTwoHovered(false);
              }}
            >
              <Link to="/sharedLayout/apiCreator" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.routeImage}
                    srcSet={API}
                    src={API} // Fallback
                    alt="API"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      Save your data and share through your custom API.
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>Create Your API</span>
                </span>
              </Link>
            </div>
          </div>

          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsThreeHovered(true);
            }}
            onMouseLeave={() => {
              setIsThreeHovered(false);
            }}
            style={{
              transform: `
      ${isOneHovered && isTablet ? 'translateX(-52%)' : 'translateX(0)'}
      ${isTwoHovered && isTablet ? 'translateX(52%)' : 'translateX(0)'}
    `,
              boxShadow: `
              ${
                isThreeHovered
                  ? 'inset 0 0 50px 30px #0B2A4A'
                  : 'inset 0 0 10px 5px  #0B2A4A'
              }
              `,
            }}
          >
            <div
              key="townLibrarian"
              className={css.movieItem}
              onClick={() => {
                setIsTwoHovered(false);
              }}
            >
              <Link to="/sharedLayout/profile" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.routeImage}
                    srcSet={Profile}
                    src={Profile} // Fallback
                    alt="Profile"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      Get your details at a glance
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>View your Profile</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoading && !error && <div>Please wait...</div>}
      {error && <div>There was an error</div>}
    </div>
  );
};
export default Home;