import { TasksCompletedList } from '../TasksCompletedList/TasksCompletedList';
import { useEffect } from 'react';
import {
  closeSortedCompletedModal,
  updateSortedCompletedContactAvatar,
  updateSortedCompletedContactName,
  closeCompletedMobileAndTabModal,
  getSavedPlaces
} from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectError,
  selectIsLoading,
  selectOpenSortedCompletedModal,
  selectedSavedPlace,
  selectOpenCompletedMobileAndTabModal,
  selectIsSelectedSavedPlaceLoading,
} from '../../redux/AppRedux/selectors';
import css from './SortedCompletedTasks.module.css';
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
   const myPlace = useSelector(selectedSavedPlace);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOpenCompletedMobileAndTabModal = useSelector(selectOpenCompletedMobileAndTabModal);
  const isSelectedSavedPlaceLoading = useSelector(selectIsSelectedSavedPlaceLoading);
 
  const error = useSelector(selectError);
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMobileOrTab = useMediaQuery({ query: '(max-width: 1279px)' });
  const isOpenModal = useSelector(selectOpenSortedCompletedModal);
  

 const handleModalClose = () => {
   dispatch(closeSortedCompletedModal());
   setNameEdit(false);
   dispatch(closeCompletedMobileAndTabModal());
  };

  const handleNameChange = evt => { 
      const wrd = evt.target.value;
           let hasExceeded = false;
           let nameRay;
           if (wrd.length > 60) {
             nameRay = [...wrd];
             nameRay.pop();
             evt.target.value = nameRay.join('');
             setNameValue(evt.target.value);
             hasExceeded = true;
       }
           else {
             setNameValue(evt.target.value);
       }
           if (hasExceeded === true) {
             Notiflix.Notify.warning('Maximum Charater limit is 60');
           }
  }

  const handleNameEdit = evt => { 
    setNameEdit(true);
    
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
      const input = document.querySelector('[name="username"]');
      input.focus();
    }, 100);
  }

  const handleNameSave = evt => {
    
     if (nameValue.trim() !== '') {
       const idValue = evt.target.name;
       dispatch( updateSortedCompletedContactName({ description: nameValue, myUpdateId: idValue }));
       setNameEdit(false);
     } else if (nameValue.trim() === '') {
       Notiflix.Notify.warning('Input is required');
     }
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 500);
  };
  
   const handleNameEditClose = () => {
     setNameEdit(false);
   };

 
  
   const handleImageChange = e => {
     const file = e.target.files[0];
     const id = e.currentTarget.getAttribute('data-id');
     
     if (file) {
       dispatch(updateSortedCompletedContactAvatar({ myFile: file, myId: id })); // Store the file under the key "avatar"
     }
    
   };

   /*useEffect(() => {
     setNameValue(myContact.name);
   }, [myContact.name]);*/
  
  useEffect(() => { 
    dispatch(getSavedPlaces());
  }, []);
  
   useEffect(() => {
     if (isOpenModal === true) {
       const scrollTimer = setTimeout(() => {
         sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
       }, 1000); // 1250ms delay

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
            [css.backdropIsHidden]: isOpenCompletedMobileAndTabModal,
          })}
        >
          <div className={css.modalWindow}>
            {isSelectedSavedPlaceLoading && (
              <div className={css.backDrop}>
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
            )}
            <button className={css.closeModal} onClick={handleModalClose}>
              <svg width="10px" height="10px" className={css.modalIcon}>
                <use href={`${svg}#icon-cross`}></use>
              </svg>
            </button>
            <p className={css.detailsTitle}>UPDATE DETAILS</p>
            <div className={css.detailsImageWrapper}>
              <img
                className={css.detailsImage}
                src={`${myPlace.avatarURL}`}
                alt="Contact"
              />
            </div>
            <input
              className={css.detailsImageButton}
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleImageChange}
              id="completedMobileTab"
              data-id={myPlace._id}
            />
            <label
              className={css.detailsImageInput}
              htmlFor="completedMobileTab"
            >
              Update Place Image +
            </label>
            <ul className={css.detailsWrapper}>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Description:</span>{' '}
                    {isNameEditing === false ? (
                      <span className={css.detailsVal}>
                        <i className={css.detail}>{myPlace.description}</i>
                      </span>
                    ) : (
                      <input
                        type="text"
                        className={css.detailsValInput}
                        required
                        onChange={handleNameChange}
                        data-id={myPlace._id}
                        name="username"
                        placeholder="Enter Place Description"
                        defaultValue={myPlace.description}
                      />
                    )}
                  </span>
                  <span className={css.buttonWrapper}>
                    {isNameEditing === true && (
                      <button
                        className={css.detailsEditClose}
                        onClick={handleNameEditClose}
                      >
                        <svg width="5px" height="5px" className={css.modalIcon}>
                          <use href={`${svg}#icon-cross`}></use>
                        </svg>
                      </button>
                    )}
                    {isNameEditing === false ? (
                      <button
                        className={css.detailButton}
                        onClick={handleNameEdit}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        name={myPlace._id}
                        className={css.detailButton}
                        onClick={handleNameSave}
                      >
                        Save
                      </button>
                    )}
                  </span>
                </span>
              </li>
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
              color="#9225ff"
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
        <div className={css.detailsImageWrapper}>
          <img
            className={css.detailsImage}
            src={myPlace.avatarURL}
            alt="Contact"
          />
        </div>
        <input
          className={css.detailsImageButton}
          type="file"
          accept="image/*"
          name="avatar"
          onChange={handleImageChange}
          id="completedDesktop"
          data-id={myPlace._id}
        />
        <label className={css.detailsImageInput} htmlFor="completedDesktop">
          Update Place Image +
        </label>
        <ul className={css.detailsWrapper}>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.detailsInfo}>
                <span className={css.details}>Description:</span>{' '}
                {isNameEditing === false ? (
                  <span className={css.detailsVal}>
                    <i className={css.detail}>{myPlace.description}</i>
                  </span>
                ) : (
                  <input
                    type="text"
                    className={css.detailsValInput}
                    required
                    onChange={handleNameChange}
                    data-id={myPlace._id}
                    name="username"
                    placeholder="Enter Place Description"
                    defaultValue={myPlace.description}
                  />
                )}
              </span>
              <span className={css.buttonWrapper}>
                {isNameEditing === true && (
                  <button
                    className={css.detailsEditClose}
                    onClick={handleNameEditClose}
                  >
                    <svg width="5px" height="5px" className={css.modalIcon}>
                      <use href={`${svg}#icon-cross`}></use>
                    </svg>
                  </button>
                )}
                {isNameEditing === false ? (
                  <button className={css.detailButton} onClick={handleNameEdit}>
                    Edit
                  </button>
                ) : (
                  <button
                    name={myPlace._id}
                    className={css.detailButton}
                    onClick={handleNameSave}
                  >
                    Save
                  </button>
                )}
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div
        className={clsx(css.sortedWrapper, {
          [css.selected]: isOpenModal && isDesktop,
        })}
      >
        <TasksCompletedList />
      </div>
    </div>
  );
};

export default Contacts;
