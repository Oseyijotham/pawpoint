import { TasksPastDueList } from '../TasksPastDueList/TasksPastDueList';
import { useEffect } from 'react';
import {
  closeSortedPastDueModal,
  updateSortedPastDueContactAvatar,
  updateSortedPastDueContactName,
  closePastDueMobileAndTabModal,
  getSavedPlaces,
} from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectError,
  selectIsLoading,
  selectOpenSortedPastDueModal,
  selectedSelectedEndpoint,
  selectOpenPastDueMobileAndTabModal,
  selectIsSelectedSavedPlaceLoading,
} from '../../redux/AppRedux/selectors';
import css from './SortedPastDueTasks.module.css';
import svg from './icons.svg';
import { ThreeCircles } from 'react-loader-spinner';
import { useState } from 'react';
import Notiflix from 'notiflix';
import 'flatpickr/dist/themes/material_blue.css';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';

export const Contacts = () => {
  const sectionRef = useRef(null);
  const [isNameEditing, setNameEdit] = useState(false);
  const [nameValue, setNameValue] = useState("");
   const myEndpoint = useSelector(selectedSelectedEndpoint);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOpenPastDueMobileAndTabModal = useSelector(
    selectOpenPastDueMobileAndTabModal
  );
  const isSelectedSavedPlaceLoading = useSelector(selectIsSelectedSavedPlaceLoading);
 
  const error = useSelector(selectError);
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMobileOrTab = useMediaQuery({ query: '(max-width: 1279px)' });
  const isOpenModal = useSelector(selectOpenSortedPastDueModal);
  

 const handleModalClose = () => {
   dispatch(closeSortedPastDueModal());
   dispatch(closePastDueMobileAndTabModal());
  };

  

  const handleNameSave = evt => {
    
     if (nameValue.trim() !== '') {
       const idValue = evt.target.name;
       dispatch(
         updateSortedPastDueContactName({
           description: nameValue,
           myUpdateId: idValue,
         })
       );
       setNameEdit(false);
     } else if (nameValue.trim() === '') {
       Notiflix.Notify.warning('Input is required');
     }
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 500);
  };
  
  
   useEffect(() => {
     if (isOpenModal === true) {
       const scrollTimer = setTimeout(() => {
         sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
       }, 1000); // 1000ms delay

       return () => clearTimeout(scrollTimer); // Cleanup on unmount
     }
   }, [isOpenModal]);

  return (
    <div
      className={clsx(css.coverWrapper, {
        [css.contactsWrapperSpace]: isOpenModal && isDesktop,
      })}
    >
      {isMobileOrTab && (
        <div
          className={clsx(css.backdrop, {
            [css.backdropIsHidden]: isOpenPastDueMobileAndTabModal,
          })}
        >
          <div className={css.modalWindow}>
            {isSelectedSavedPlaceLoading && (
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
            <p className={css.detailsTitle}>UPDATE DETAILS</p>

            <ul className={css.detailsWrapper}>
              <li className={css.detailsItem}></li>
            </ul>
          </div>
        </div>
      )}
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
        {isSelectedSavedPlaceLoading && (
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
        <p className={css.detailsTitle}>{myEndpoint.name}</p>

        {myEndpoint.id === '1' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>First</li>
          </ul>
        )}

        {myEndpoint.id === '2' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Second</li>
          </ul>
        )}

        {myEndpoint.id === '3' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Third</li>
          </ul>
        )}

        {myEndpoint.id === '4' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Fourth</li>
          </ul>
        )}

        {myEndpoint.id === '5' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Fifth</li>
          </ul>
        )}

        {myEndpoint.id === '6' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Sixth</li>
          </ul>
        )}

        {myEndpoint.id === '7' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>Seventh</li>
          </ul>
        )}
      </div>
      <div
        className={clsx(css.sortedWrapper, {
          [css.selected]: isOpenModal && isDesktop,
        })}
      >
        <TasksPastDueList />
      </div>
    </div>
  );
};

export default Contacts;
