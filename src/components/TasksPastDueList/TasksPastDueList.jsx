import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectPlaces } from '../../redux/AppRedux/selectors';
import {
  selectContactsFilter,
  selectFilterDown,
  selectError,
  selectIsLoading,
  selectKey,
  selectKeyName,
  selectKeyId,
  selectKeyDate
} from '../../redux/AppRedux/selectors';
import {
  deleteContact,
  openSortedPastDueModal,
  fetchSortedPastDueContactById,
  updateStatus,
  openPastDueMobileAndTabModal,
} from '../../redux/AppRedux/operations';
import css from './TasksPastDueList.module.css';
export const TasksPastDueList = ({ children }) => {
  const myKey = useSelector(selectKey);
  const myKeyName = useSelector(selectKeyName);
  const myKeyId = useSelector(selectKeyId);
  const dispatch = useDispatch();
  const handleDelete = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 1000);
    dispatch(deleteContact(evt.target.name));
  };
  const filterValue = useSelector(selectContactsFilter);

  const handleModalOpen = (evt) => {
    if (evt.target.getAttribute('data-id')) {
      const id = evt.currentTarget.getAttribute('data-id');
      dispatch(fetchSortedPastDueContactById(id));
      dispatch(openSortedPastDueModal());
      dispatch(openPastDueMobileAndTabModal());
    }
  };
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(4);
  const [newRay, setNewRay] = useState([]);


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
    //let fwdWar = lowerLimit + 4;
    
      setLowerLimit(lowerLimit - 4);
      setUpperLimit(upperLimit - 4);
    
    /*if (filterValue !== '') {
      const str1 = filterUp;
      const sto1 = filterDown;
       dispatch(handleFilterBackwardUp(str1));
       dispatch(handleFilterBackwardDown(sto1));
     }*/
  };
  
  const handleChange = (evt) => {
    dispatch(updateStatus({ status: evt.target.checked, myUpdateStatusId:evt.target.name}));
  }

  
  const pastDueRay = newRay.filter(contact => {
    const nowSortDate = new Date();
    //return contact.status === false;
    return nowSortDate > new Date(contact.dueDate) && contact.status === false;
  });


  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Documentation</h3>
      {children}
      <div className={css.contactsListAlt}>
        <p>API DETAILS</p>
      
      </div>

      {pastDueRay.length !== 0 && (
        <ul className={css.contactsList}>
          {pastDueRay.map(contact => {
            const myindex = pastDueRay.indexOf(contact);
            if (myindex >= lowerLimit && myindex < upperLimit) {
              return (
                <li
                  key={contact._id}
                  data-id={contact._id}
                  className={css.contactsItem}
                  onClick={handleModalOpen}
                >
                  <span className={css.contactsData} data-id={contact._id}>
                    <input
                      type="checkbox"
                      className={css.checkbox}
                      checked={contact.status}
                      name={contact._id}
                      onChange={handleChange}
                    />
                    :{' '}
                    <span className={css.contactsPhone} data-id={contact._id}>
                      {contact.name}
                    </span>
                  </span>
                  <span className={css.contactsButtonArea}>
                    <button
                      type="submit"
                      className={css.contactsButton}
                      name={contact._id}
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

      <div className={css.navigationArea}>
        {lowerLimit !== 0 && (
          <button className={css.navigationButton} onClick={handleBackward}>
            Prev
          </button>
        )}
        {!(upperLimit > pastDueRay.length) &&
          upperLimit !== pastDueRay.length && (
            <button className={css.navigationButton} onClick={handleForward}>
              Forward
            </button>
          )}
      </div>
    </div>
  );
};

