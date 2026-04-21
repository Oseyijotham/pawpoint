import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { selectPlaces } from '../../redux/AppRedux/selectors';
import {
  selectContactsFilter,
  selectFilterUp,
  selectFilterDown,
  selectError,
  selectIsLoading,
  selectIsUpdateLoading,
} from '../../redux/AppRedux/selectors';
import {
  openModal,
  fetchContactById,
  handleFilterFowardUp,
  handleFilterFowardDown,
  handleFilterBackwardUp,
  handleFilterBackwardDown,
  updateStatus,
  openMobileAndTabModal,
} from '../../redux/AppRedux/operations';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import icons from './icons.svg';



export const ContactList = ({ lowerLimitProp, upperLimitProp, lowerLimitSetter, upperLimitSetter, children }) => {
  const [isTrue, setIfTrue] = useState(true);
  const sectionRef = useRef(null);
  const places = useSelector(selectPlaces);
  const filterUp = useSelector(selectFilterUp);
  const filterDown = useSelector(selectFilterDown);
  const isLoading = useSelector(selectIsLoading);
  const isUpdateLoading = useSelector(selectIsUpdateLoading);
  const error = useSelector(selectError);
  
  const dispatch = useDispatch();
  const filterValue = useSelector(selectContactsFilter);

  const handleModalOpen = (evt) => {
    if (evt.target.getAttribute('data-id')) {
      

      const id = evt.currentTarget.getAttribute('data-id');
      
      dispatch(fetchContactById(id));
      dispatch(openModal());
      dispatch(openMobileAndTabModal());
    }
  };
  


  const handleForward = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 500);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    if (filterValue === "") {
      lowerLimitSetter(lowerLimitProp + 4);
      upperLimitSetter(upperLimitProp + 4);
    }
    if (filterValue !== "") {
      console.log("OK")
      const str = filterUp;
      const sto = filterDown
      dispatch(handleFilterFowardUp(str));
      dispatch(handleFilterFowardDown(sto));
    }
  }

  const handleBackward = (evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
       sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, 80);
    
    
    if (filterValue === "") {
      lowerLimitSetter(lowerLimitProp - 4);
      upperLimitSetter(upperLimitProp - 4);
    }
    if (filterValue !== '') {
      const str1 = filterUp;
      const sto1 = filterDown;
       dispatch(handleFilterBackwardUp(str1));
       dispatch(handleFilterBackwardDown(sto1));
     }
  };
  
  const handleChange = (placesData, evt) => {

    setIfTrue(evt.target.checked);

    dispatch(updateStatus({ data: { ...placesData, status: evt.target.checked } }));
  }
  
   const bestMatches = places.filter(
     place =>
       place.properties.names.primary.toLowerCase().includes(filterValue.trim().toLowerCase()) &&
       filterValue.trim() !== ''
  );
  
  


  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Places List</h3>
      {children}
      <div style={{ position: 'relative' }}>
        {console.log(isUpdateLoading)}
        {(isLoading || isUpdateLoading) && filterValue === '' && (
          <div className={css.backDrop}>
            <div className={css.centerStyle}>
              <ThreeCircles
                visible={true}
                height="60"
                width="60"
                color="#9225ff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass={css.loader}
              />
              {isLoading && (
                <p className={css.centerLabel}>
                  Please be patient, fetching places can take up to 60 seconds
                </p>
              )}
              {isUpdateLoading && isTrue === true && (
                <p className={css.centerLabel}>
                  Saving place to your API Database
                </p>
              )}
              {isUpdateLoading && isTrue === false && (
                <p className={css.centerLabel}>
                  Removing place from your API Database
                </p>
              )}
            </div>
          </div>
        )}
        {filterValue === '' && places.length !== 0 && (
          <ul className={css.contactsList} style={{ height: '315px' }}>
            {places.map(place => {
              const myindex = places.indexOf(place);
              if (myindex >= lowerLimitProp && myindex < upperLimitProp) {
                return (
                  <li
                    key={place.id}
                    data-id={place.id}
                    className={css.contactsItem}
                    onClick={handleModalOpen}
                  >
                    <span className={css.contactsData} data-id={place.id}>
                      <input
                        type="checkbox"
                        className={css.checkbox}
                        onChange={evt => handleChange(place, evt)}
                        name={place.id}
                        checked={place.status}
                        value={place.properties.addresses[0]}
                      />
                      :{' '}
                      <span className={css.contactsPhone} data-id={place.id}>
                        {place.properties.names.primary}
                      </span>
                    </span>
                    {place.properties.socials.length !== 0 && (
                      <span className={css.contactsButtonArea}>
                        <a
                          className={css.contactsButton}
                          name={place.id}
                          href={place.properties.socials[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="20"
                            height="20"
                            className={css.socialsIcon}
                          >
                            <use href={`${icons}#icon-facebook`} />
                          </svg>
                        </a>
                      </span>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        )}
        {places.length === 0 && (
          <div className={css.contactsListAlt}>
            {isLoading && !error && (
              <b className={css.notification}>Fetching Places...</b>
            )}
            {!isLoading && !error && (
              <b className={css.notification}>No Places Found!!!</b>
            )}
            {!isLoading && error && (
              <b className={css.notification}>Error!!!</b>
            )}
          </div>
        )}
      </div>
      {filterValue === '' && (
        <div className={css.navigationArea}>
          {lowerLimitProp !== 0 && (
            <button
              className={css.navigationButton}
              ref={sectionRef}
              onClick={handleBackward}
            >
              Prev
            </button>
          )}
          {!(upperLimitProp > places.length) &&
            upperLimitProp !== places.length && (
              <button
                className={css.navigationButton}
                ref={sectionRef}
                onClick={handleForward}
              >
                Forward
              </button>
            )}
        </div>
      )}
      {filterValue !== '' && (
        <div className={css.navigationArea}>
          {filterDown !== 0 && (
            <button
              className={css.navigationButton}
              ref={sectionRef}
              onClick={handleBackward}
            >
              Prev
            </button>
          )}
          {!(filterUp > bestMatches.length) &&
            filterUp !== bestMatches.length && (
              <button
                className={css.navigationButton}
                ref={sectionRef}
                onClick={handleForward}
              >
                Forward
              </button>
            )}
        </div>
      )}
    </div>
  );
};

ContactList.propTypes = {
  children: PropTypes.node,
};
