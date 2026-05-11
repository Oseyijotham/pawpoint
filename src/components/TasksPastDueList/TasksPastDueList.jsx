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
  openSortedPastDueModal,
  openPastDueMobileAndTabModal,
  fetchSavedPlaceById,
} from '../../redux/AppRedux/operations';
import css from './TasksPastDueList.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import icons from './icons.svg';
import endpointNames from '../Options/endpoints.json';

export const TasksPastDueList = ({ children }) => {
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
      dispatch(openSortedPastDueModal());
      dispatch(openPastDueMobileAndTabModal());
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
      <h3 className={css.contactsTitle}>API Documentation</h3>
      {children}
      <div style={{ position: 'relative' }}>
        {(isSavedPlacesLoading || isDeletePlacesLoading) && (
          <div className={css.backDrop}>
            <div className={css.centerStyle}>
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
              {isSavedPlacesLoading && (
                <p className={css.centerLabel}>Fetching your saved places</p>
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
          <ul className={css.contactsList}>
            {console.log(savedPlaces)}
            {endpointNames.map(name => {
              const myindex = endpointNames.indexOf(name);
              if (myindex >= lowerLimit && myindex < upperLimit) {
                return (
                  <li
                    data-id={name.id}
                    className={css.contactsItem}
                    onClick={handleModalOpen}
                  >
                    <span className={css.contactsData}>
                      <span className={css.contactsPhone}>
                        {name.name}
                      </span>
                    </span>

                  </li>
                );
              }
            })}
          </ul>
        )}

      </div>
      <div className={css.navigationArea}>
        {lowerLimit !== 0 && (
          <button className={css.navigationButton} onClick={handleBackward}>
            Prev
          </button>
        )}
        {!(upperLimit > endpointNames.length) &&
          upperLimit !== endpointNames.length && (
            <button className={css.navigationButton} onClick={handleForward}>
              Forward
            </button>
          )}
      </div>
    </div>
  );
};

