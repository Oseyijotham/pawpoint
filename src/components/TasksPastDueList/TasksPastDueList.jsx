import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectPlaces } from '../../redux/AppRedux/selectors';
import {
  selectSavedPlaces,
} from '../../redux/AppRedux/selectors';
import {
  deletePlaces,
  openSortedPastDueModal,
  openPastDueMobileAndTabModal,
  fetchEndpointById,
} from '../../redux/AppRedux/operations';
import css from './TasksPastDueList.module.css';
import endpointNames from '../Options/endpoints.json';

export const TasksPastDueList = ({ children }) => {
  
  const savedPlaces = useSelector(selectSavedPlaces);
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
      
      dispatch(fetchEndpointById(id));
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
      <h3 className={css.contactsTitle}>API ENDPOINTS</h3>
      {children}
      <div style={{ position: 'relative' }}>
          <ul className={css.contactsList}>
            {console.log(savedPlaces)}
            {endpointNames.map(name => {
              const myindex = endpointNames.indexOf(name);
              if (myindex >= lowerLimit && myindex < upperLimit) {
                return (
                  <li
                    key={name.id}
                    data-id={name.id}
                    className={css.contactsItem}
                    onClick={handleModalOpen}
                  >
                    <span data-id={name.id} className={css.contactsData}>
                      <span data-id={name.id} className={css.contactsPhone}>
                        {name.name}
                      </span>
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        

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

