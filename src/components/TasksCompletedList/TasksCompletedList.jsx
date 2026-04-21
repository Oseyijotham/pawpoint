import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectPlaces } from '../../redux/AppRedux/selectors';
import {
  selectFilterDown,
  selectError,
  selectIsSavedPlacesLoading,
  selectIsDeletePlacesLoading,
  selectSavedPlaces,
} from '../../redux/AppRedux/selectors';
import {
  deletePlaces,
  openSortedCompletedModal,
  openCompletedMobileAndTabModal,
  fetchSavedPlaceById,
} from '../../redux/AppRedux/operations';
import css from './TasksCompletedList.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import icons from './icons.svg';

export const TasksCompletedList = ({ children }) => {
  const [isTrue, setIfTrue] = useState(true);
  const savedPlaces = useSelector(selectSavedPlaces);
  const isSavedPlacesLoading = useSelector(selectIsSavedPlacesLoading);
  const isDeletePlacesLoading = useSelector(selectIsDeletePlacesLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleDelete = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 1000);
    dispatch(deletePlaces(evt.target.name));
    
  };

  const handleModalOpen = (evt) => {
    if (evt.target.getAttribute('data-id')) {

      const id = evt.currentTarget.getAttribute('data-id');
      
      dispatch(fetchSavedPlaceById(id));
      dispatch(openSortedCompletedModal());
      dispatch(openCompletedMobileAndTabModal());
    }
  };
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(4);


  const handleForward = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 500);
    
      setLowerLimit(lowerLimit + 4);
      setUpperLimit(upperLimit + 4);
    
  }

  const handleBackward = (evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 500);
    
      setLowerLimit(lowerLimit - 4);
      setUpperLimit(upperLimit - 4);
  };
  
 

  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Update Saved Places</h3>
      {children}
      <div style={{ position: 'relative' }}>
        {(isSavedPlacesLoading || isDeletePlacesLoading) && (
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
              {isSavedPlacesLoading && (
                <p className={css.centerLabel}>
                  Please be patient, fetching places can take up to 60 seconds
                </p>
              )}
              {isDeletePlacesLoading && (
                <p className={css.centerLabel}>
                  Removing place from your API Database, hold on a bit
                </p>
              )}
            </div>
          </div>
        )}

        {savedPlaces.length !== 0 && (
          <ul className={css.contactsList} >
            {console.log(savedPlaces)}
            {savedPlaces.map(place => {
              const myindex = savedPlaces.indexOf(place);
              if (myindex >= lowerLimit && myindex < upperLimit) {
                return (
                  <li
                    key={place._id}
                    data-id={place._id}
                    className={css.contactsItem}
                    onClick={handleModalOpen}
                  >
                    <span className={css.contactsData} data-id={place._id}>
                      <span className={css.contactsPhone} data-id={place._id}>
                        {place.data.properties.names.primary}
                      </span>
                    </span>

                    <span className={css.contactsButtonArea}>
                      {place.data.properties.socials.length !== 0 && (
                        <a
                          className={css.contactsButton}
                          name={place._id}
                          href={place.data.properties.socials[0]}
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
                      )}
                      <button
                        type="submit"
                        className={css.contactsDeleteButton}
                        name={place._id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        )}

        {savedPlaces.length === 0 && (
          <div className={css.contactsListAlt}>
            {isSavedPlacesLoading && !error && (
              <b className={css.notification}>Loading Saved Places</b>
            )}
            {!isSavedPlacesLoading && !error && (
              <b className={css.notification}>NO SAVED PLACES !!!</b>
            )}
            {!isSavedPlacesLoading && error && (
              <b className={css.notification}>Error!!!</b>
            )}
          </div>
        )}
      </div>
      <div className={css.navigationArea}>
        {lowerLimit !== 0 && (
          <button className={css.navigationButton} onClick={handleBackward}>
            Prev
          </button>
        )}
        {!(upperLimit > savedPlaces.length) &&
          upperLimit !== savedPlaces.length && (
            <button className={css.navigationButton} onClick={handleForward}>
              Forward
            </button>
          )}
      </div>
    </div>
  );
};

