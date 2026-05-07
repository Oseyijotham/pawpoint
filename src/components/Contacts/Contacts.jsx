import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { useEffect } from 'react';
import {
  closeModal,
  closeMobileAndTabModal
} from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectError,
  selectIsLoading,
  selectOpenModal,
  selectedContact,
  selectedIsSlideLoading,
  selectOpenMobileAndTabModal,
  selectIsWeatherConditionsLoading,
  selectWeatherConditions
} from '../../redux/AppRedux/selectors';
import css from './Contacts.module.css';
import svg from './icons.svg';
import weather from './weather.svg';
import location from './location.svg';
import { ThreeCircles } from 'react-loader-spinner';
import { useState } from 'react';
import 'flatpickr/dist/themes/material_blue.css';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';

export const Contacts = () => {
  
  const myRef = useRef();
  const sectionRef = useRef(null);
   const myContact = useSelector(selectedContact);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOpenMobileAndTabModal = useSelector(selectOpenMobileAndTabModal);

  //const contacts = useSelector(selectContacts);
  const isSlideLoading = useSelector(selectedIsSlideLoading);

  const isWeatherConditionsLoading = useSelector(selectIsWeatherConditionsLoading);

  const weatherConditionDetails = useSelector(selectWeatherConditions);
 
 
  const error = useSelector(selectError);
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMobileOrTab = useMediaQuery({ query: '(max-width: 1279px)' });
  const isOpenModal = useSelector(selectOpenModal);
  
 const handleModalClose = () => {
   dispatch(closeModal());
   dispatch(closeMobileAndTabModal());
  };

  const handleWeatherNav = () => {
    setWeatherConditions(true);
    setPlaceDetails(false);
  }

  const handleDetailsNav = () => {
    setPlaceDetails(true);
    setWeatherConditions(false);
  };

  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(4);
  const [placeDetails, setPlaceDetails] = useState(true);
  const [weatherConditions, setWeatherConditions] = useState(false);
  

  
  useEffect(() => { if (isOpenModal === true) { sectionRef.current?.scrollIntoView({ behavior: 'smooth' }); } }, [isOpenModal]);

  return (
    <div className={clsx(css.coverWrapper, {})}>
      {isMobileOrTab && (
        <div
          className={clsx(css.backdrop, {
            [css.backdropIsHidden]: isOpenMobileAndTabModal,
          })}
        >
          <div className={css.modalWindow}>
            {isSlideLoading && (
              <div className={css.backDrop}>
                <ThreeCircles
                  visible={true}
                  height="80"
                  width="80"
                  color="#1e73d8"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={css.loader}
                />
              </div>
            )}
            <button className={css.closeModal} onClick={handleModalClose}>
              <svg width="10px" height="10px" className={css.modalIcon}>
                <use href={`${svg}#icon-cross`}></use>
              </svg>
            </button>

            <p className={css.detailsTitle}>PLACE DETAILS</p>

            <ul className={css.detailsWrapper}>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Name:</span>{' '}
                    <span className={css.detailsVal}>
                      <i className={css.detail}>
                        {myContact.properties.names.primary}
                      </i>
                    </span>
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Freeform:</span>{' '}
                    <pre className={css.detailsDetailsVal}>
                      <i className={css.detail}>
                        {myContact.properties.addresses[0].freeform
                          ? myContact.properties.addresses[0].freeform
                          : 'Null'}
                      </i>
                    </pre>
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Locality:</span>{' '}
                    <pre className={css.detailsDetailsVal}>
                      <i className={css.detail}>
                        {myContact.properties.addresses[0].locality
                          ? myContact.properties.addresses[0].locality
                          : 'Null'}
                      </i>
                    </pre>
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Postal Code:</span>{' '}
                    <pre className={css.detailsDetailsVal}>
                      <i className={css.detail}>
                        {myContact.properties.addresses[0].postcode
                          ? myContact.properties.addresses[0].postcode
                          : 'Null'}
                      </i>
                    </pre>
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Region and Country:</span>{' '}
                    <span className={css.detailsValPhone}>
                      <i>
                        {myContact.properties.addresses[0].region
                          ? myContact.properties.addresses[0].region
                          : 'Null'}
                        ,{' '}
                      </i>
                      <i>
                        {myContact.properties.addresses[0].country
                          ? myContact.properties.addresses[0].country
                          : 'Null'}
                      </i>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className={clsx(css.sortedWrapper, {
          [css.selected]: isOpenModal && isDesktop,
        })}
      >
        <ContactForm
          lowerLimitSetter={setLowerLimit}
          upperLimitSetter={setUpperLimit}
        >
          <b
            className={clsx(css.notification, {
              [css.notificationShow]: isLoading && !error,
            })}
          >
            Please wait...
          </b>

          {error && (
            <b className={css.notificationShow}>
              There was an error, logout and login again!!!
            </b>
          )}
          <div
            ref={sectionRef}
            className={clsx(css.contactsDetailsHide, {
              [css.contactsDetailsShow]: isOpenModal && isDesktop,
            })}
          >
            {isSlideLoading && (
              <div className={css.backDrop}>
                <ThreeCircles
                  visible={true}
                  height="80"
                  width="80"
                  color="#1e73d8"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={css.loader}
                />
              </div>
            )}
            <button className={css.closeModal} onClick={handleModalClose}>
              <svg width="10px" height="10px" className={css.modalIcon}>
                <use href={`${svg}#icon-cross`}></use>
              </svg>
            </button>
            <div className={css.detailsTitleWrapper}>
              <button
                className={css.weather}
                onClick={handleWeatherNav}
                style={{
                  backgroundColor: `
    ${weatherConditions ? '#00bfff' : '#ffff'}
  `,
                }}
              >
                <img src={weather} alt="Weather" width="20" height="20" />
              </button>
              <p
                className={css.detailsTitle}
                onClick={handleDetailsNav}
                style={{
                  backgroundColor: `
    ${placeDetails ? '#00bfff' : '#0b2a4a'}
  `,
                }}
              >
                PLACE DETAILS
              </p>
              <a
                className={css.location}
                name={myContact.id}
                href={`https://www.google.com/maps?q=${myContact.geometry.coordinates[1]},${myContact.geometry.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={location} alt="Location" width="20" height="20" />
              </a>
            </div>
            <div className={css.detailsCover}>
              {isWeatherConditionsLoading && (
                <div className={css.backDrop}>
                  <ThreeCircles
                    visible={true}
                    height="60"
                    width="60"
                    color="#1e73d8"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass={css.loader}
                  />
                  {isWeatherConditionsLoading && (
                    <p className={css.centerLabel}>
                      Fetching current weather conditions
                    </p>
                  )}
                </div>
              )}

              {placeDetails === true && (
                <ul className={css.detailsWrapper}>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Name:</span>{' '}
                        <span className={css.detailsVal}>
                          <i className={css.detail}>
                            {myContact.properties.names.primary}
                          </i>
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Freeform:</span>{' '}
                        <pre className={css.detailsDetailsVal}>
                          <i className={css.detail}>
                            {myContact.properties.addresses[0].freeform
                              ? myContact.properties.addresses[0].freeform
                              : 'Null'}
                          </i>
                        </pre>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Locality:</span>{' '}
                        <pre className={css.detailsDetailsVal}>
                          <i className={css.detail}>
                            {myContact.properties.addresses[0].locality
                              ? myContact.properties.addresses[0].locality
                              : 'Null'}
                          </i>
                        </pre>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Postal Code:</span>{' '}
                        <pre className={css.detailsDetailsVal}>
                          <i className={css.detail}>
                            {myContact.properties.addresses[0].postcode
                              ? myContact.properties.addresses[0].postcode
                              : 'Null'}
                          </i>
                        </pre>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Region and Country:</span>{' '}
                        <span className={css.detailsValPhone}>
                          <i>
                            {myContact.properties.addresses[0].region
                              ? myContact.properties.addresses[0].region
                              : 'Null'}
                            ,{' '}
                          </i>
                          <i>
                            {myContact.properties.addresses[0].country
                              ? myContact.properties.addresses[0].country
                              : 'Null'}
                          </i>
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
              )}
              {weatherConditions === true && (
                <ul className={css.conditionsWrapper}>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Outdoor Conditions:</span>{' '}
                        <span className={css.detailsVal}>
                          <i className={css.detail}>
                            {weatherConditionDetails[0].WeatherText}
                          </i>
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Time of Day:</span>{' '}
                        <span className={css.detailsVal}>
                          {weatherConditionDetails[0].IsDayTime === true ? (
                            <i className={css.detail}>Day</i>
                          ) : (
                            <i className={css.detail}>Night</i>
                          )}
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Precipitation:</span>{' '}
                        <span className={css.detailsVal}>
                          {weatherConditionDetails[0].HasPrecipitation ===
                          true ? (
                            <i className={css.detail}>Yes</i>
                          ) : (
                            <i className={css.detail}>No</i>
                          )}
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>Temperature:</span>{' '}
                        <span className={css.detailsVal}>
                          <i className={css.detail}>
                            {`${weatherConditionDetails[0].Temperature.Metric.Value}°${weatherConditionDetails[0].Temperature.Metric.Unit}`}
                          </i>
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className={css.detailsItem}>
                    <span className={css.detailsCover}>
                      <span className={css.detailsInfo}>
                        <span className={css.details}>View full forecast:</span>{' '}
                        <span className={css.detailsVal}>
                          <a
                            href={weatherConditionDetails[0].Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.detail}
                          >
                            Click Here →
                          </a>
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <ContactList
            lowerLimitProp={lowerLimit}
            upperLimitProp={upperLimit}
            lowerLimitSetter={setLowerLimit}
            upperLimitSetter={setUpperLimit}
            placeDetailsSetter={setPlaceDetails}
            weatherConditionsSetter={setWeatherConditions}
          >
            <Filter />
          </ContactList>
        </ContactForm>
      </div>
    </div>
  );
};

export default Contacts;
