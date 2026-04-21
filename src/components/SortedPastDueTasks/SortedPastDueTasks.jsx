import { TasksPastDueList } from '../TasksPastDueList/TasksPastDueList';
import { Filter } from '../Filter/Filter';
import { useEffect } from 'react';
import {
  fetchContacts,
  closeSortedPastDueModal,
  updateSortedPastDueContactAvatar,
  updateSortedPastDueContactName,
  updateSortedPastDueContactEmail,
  updateSortedPastDueContactPhone,
  closePastDueMobileAndTabModal,
} from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  selectError,
  selectIsLoading,
  selectOpenSortedPastDueModal,
  selectedSortedPastDueContact,
  selectedIsSlideLoading,
  selectOpenPastDueMobileAndTabModal,
} from '../../redux/AppRedux/selectors';
import css from './SortedPastDueTasks.module.css';
import svg from './icons.svg';
import { ThreeCircles } from 'react-loader-spinner';
import { useState } from 'react';
import Notiflix from 'notiflix';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';

export const Contacts = () => {
   const [inputKey, setInputKey] = useState(Date.now());
   const sectionRef = useRef(null);
   const [date, setDate] = useState(new Date());
  const [isNameEditing, setNameEdit] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [isEmailEditing, setEmailEdit] = useState(false);
   const myContact = useSelector(selectedSortedPastDueContact);
  const [emailValue, setEmailValue] = useState(myContact.email);
   const [isPhoneEditing, setPhoneEdit] = useState(false);
   const [dateValue, setDateValue] = useState('');
  //const [idValue, setIdValue] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOpenPastDueMobileAndTabModal = useSelector(selectOpenPastDueMobileAndTabModal);
  //const contacts = useSelector(selectContacts);
  const isSlideLoading = useSelector(selectedIsSlideLoading);
 
  const error = useSelector(selectError);
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMobileOrTab = useMediaQuery({ query: '(max-width: 1279px)' });
   const isOpenModal = useSelector(selectOpenSortedPastDueModal);
 const handleModalClose = () => {
   dispatch(closeSortedPastDueModal());
   setNameEdit(false);
   setEmailEdit(false);
   dispatch(closePastDueMobileAndTabModal());
  };

  const handleNameChange = evt => { 
    const wrd = evt.target.value;
         let hasExceeded = false;
         let nameRay;
         if (wrd.length > 30) {
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
           Notiflix.Notify.warning('Maximum Charater limit is 30');
         }
  }

  const handleNameEdit = evt => { 
    setNameEdit(true);
    //const input = document.getElementById('nameInput');
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
       dispatch( updateSortedPastDueContactName({ name: nameValue, myUpdateId: idValue }));
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

    const handleEmailChange = evt => {
      setEmailValue(evt.target.value);
      /*const id = evt.currentTarget.getAttribute('data-id');
    setIdValue(id);*/
      const wrd = evt.target.value;
      let hasExceeded = false;
      let nameRay;
      if (wrd.length > 200) {
        nameRay = [...wrd];
        nameRay.pop();
        evt.target.value = nameRay.join('');
        hasExceeded = true;
      }
      if (hasExceeded === true) {
        Notiflix.Notify.warning('Maximum Charater limit is 200');
      }
    };

    const handleEmailEdit = evt => {
      setEmailEdit(true);
      evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
      setTimeout(() => {
        evt.target.style.boxShadow = 'none';
        const input = document.querySelector('[name="email"]');
        input.focus();
      }, 100);
  };

   const handleEmailSave = evt => {
     if (emailValue.trim() !== '') {
       const idValue = evt.target.name;
       dispatch(updateSortedPastDueContactEmail({ email: emailValue, myUpdateId: idValue }));
       setEmailEdit(false);
     } else if (emailValue.trim() === '') {
       Notiflix.Notify.warning('Input is required');
     }
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 500);
   };

  const handleEmailEditClose = () => {
    setEmailEdit(false);
    setEmailValue(myContact.email);
  }

 
   const handlePhoneEdit = evt => {
     setPhoneEdit(true);
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
       const input = document.querySelector('[name="date"]');
       input.focus();
     }, 100);
   };
  
  const handlePhoneSave = evt => {
    /*if (phoneValue.trim() !== '') {*/
    const idValue = evt.target.name;
    const exactDate = new Date();
    if (date <= exactDate) {
      Notiflix.Notify.failure('Invalid date, choose a date in the future');
    }
    else{
      dispatch(updateSortedPastDueContactPhone({ dueDate: date, myUpdateId: idValue }));
    }
      setPhoneEdit(false);
    
    /*} else if (phoneValue.trim() === '') {
      Notiflix.Notify.warning('Input is Empty or Incorrect');
    }*/
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 500);
  };
 
  const handlePhoneEditClose = () => {
    setPhoneEdit(false);
  };
  
   const handleImageChange = e => {
     const file = e.target.files[0];
     const id = e.currentTarget.getAttribute('data-id');
     //dispatch(updateAvatar({ avatar: file }));
     //console.log({ avatar: file });
     if (file) {
       dispatch(updateSortedPastDueContactAvatar({ myFile: file, myId: id })); // Store the file under the key "avatar"
     }
     setInputKey(Date.now());
   };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setEmailValue(myContact.email);
  }, [myContact.email]);

   useEffect(() => {
     setNameValue(myContact.name);
   }, [myContact.name]);
  
     useEffect(() => {
       //setPhoneValue(myContact.phone);
       /*const date = new Date(myContact.phone);

       const formattedDate = date.toLocaleDateString('en-GB', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
       });
       setDateValue(formattedDate)*/

       const userLocale = navigator.language; // e.g., "en-US" or "fr-FR"
       const myDate = new Date(myContact.dueDate);

      const formatter = new Intl.DateTimeFormat(userLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit', // Optional: include seconds
        hour12: true, // Optional: use 12-hour clock (set to false for 24-hour clock)
      });
       setDateValue(formatter.format(myDate));
        
     }, [myContact.dueDate]);
  
   useEffect(() => {
     if (isOpenModal === true) {
       const scrollTimer = setTimeout(() => {
         sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
       }, 1000); // 1250ms delay

       return () => clearTimeout(scrollTimer); // Cleanup on unmount
     }
   }, [isOpenModal]);
  
  //The code below causes the component to rerender every second, this way appointments that are past due are reflected automatically
     const [time, setTime] = useState(new Date());
     useEffect(() => {
       const timer = setInterval(() => setTime(new Date()), 1000);
       return () => clearInterval(timer);
     }, []);

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
            {isSlideLoading && (
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
            <p className={css.detailsTitle}>CUSTOMER DETAILS</p>
            <div className={css.detailsImageWrapper}>
              <img
                className={css.detailsImage}
                src={`${myContact.avatarURL}`}
                alt="Contact"
              />
            </div>
            <input
              className={css.detailsImageButton}
              type="file"
              accept="image/*"
              name="avatar"
              key={inputKey}
              onChange={handleImageChange}
              id="pastDueMobileTab"
              data-id={myContact._id}
            />
            <label className={css.detailsImageInput} htmlFor="pastDueMobileTab">
              Update Customer Avatar +
            </label>
            <ul className={css.detailsWrapper}>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Name:</span>{' '}
                    {isNameEditing === false ? (
                      <span className={css.detailsVal}>
                        <i className={css.detail}>{myContact.name}</i>
                      </span>
                    ) : (
                      <input
                        type="text"
                        className={css.detailsValInput}
                        required
                        onChange={handleNameChange}
                        data-id={myContact._id}
                        name="username"
                        defaultValue={myContact.name}
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
                        name={myContact._id}
                        className={css.detailButton}
                        onClick={handleNameSave}
                      >
                        Save
                      </button>
                    )}
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Email:</span>{' '}
                    {isEmailEditing === false ? (
                      <pre className={css.detailsDetailsVal}>
                        <i className={css.detail}>{myContact.email}</i>
                      </pre>
                    ) : (
                      <input
                        type="text"
                        className={css.detailsDetailsValInput}
                        required
                        onChange={handleEmailChange}
                        data-id={myContact._id}
                        name="email"
                        title="Enter the details of your task"
                        defaultValue={myContact.email}
                      />
                    )}
                  </span>
                  <span className={css.buttonWrapper}>
                    {isEmailEditing === true && (
                      <button
                        className={css.detailsEditClose}
                        onClick={handleEmailEditClose}
                      >
                        <svg width="5px" height="5px" className={css.modalIcon}>
                          <use href={`${svg}#icon-cross`}></use>
                        </svg>
                      </button>
                    )}
                    {isEmailEditing === false ? (
                      <button
                        className={css.detailButton}
                        onClick={handleEmailEdit}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        name={myContact._id}
                        className={css.detailButton}
                        onClick={handleEmailSave}
                      >
                        Save
                      </button>
                    )}
                  </span>
                </span>
              </li>
              <li className={css.detailsItem}>
                <span className={css.detailsCover}>
                  <span className={css.detailsInfo}>
                    <span className={css.details}>Due Date:</span>{' '}
                    {isPhoneEditing === false ? (
                      <span className={css.detailsValPhone}>
                        <i className={css.detail}>{dateValue}</i>
                      </span>
                    ) : (
                      <Flatpickr
                        data-enable-time
                        value={date}
                        onChange={selectedDates => {
                          const nowDate = new Date();
                          if (selectedDates[0] <= nowDate) {
                            Notiflix.Notify.warning(
                              'Choose a date in the future'
                            );
                          } else {
                            Notiflix.Notify.success('Due Date Selected');
                          }
                          setDate(selectedDates[0]);
                        }}
                        options={{
                          minuteIncrement: 1, // Set minute increments to 1
                        }}
                        render={({ defaultValue, ...props }, ref) => (
                          <input
                            {...props}
                            ref={ref}
                            className={css.detailsValInputPhone}
                            required
                            data-id={myContact._id}
                            name="date"
                          />
                        )}
                      />
                    )}
                  </span>
                  <span className={css.buttonWrapper}>
                    {isPhoneEditing === true && (
                      <button
                        className={css.detailsEditClose}
                        onClick={handlePhoneEditClose}
                      >
                        <svg width="5px" height="5px" className={css.modalIcon}>
                          <use href={`${svg}#icon-cross`}></use>
                        </svg>
                      </button>
                    )}
                    {isPhoneEditing === false ? (
                      <button
                        className={css.detailButton}
                        onClick={handlePhoneEdit}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        name={myContact._id}
                        className={css.detailButton}
                        onClick={handlePhoneSave}
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
        {isSlideLoading && (
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
        <p className={css.detailsTitle}>CUSTOMER DETAILS</p>
        <div className={css.detailsImageWrapper}>
          <img
            className={css.detailsImage}
            src={myContact.avatarURL}
            alt="Contact"
          />
        </div>
        <input
          className={css.detailsImageButton}
          type="file"
          accept="image/*"
          name="avatar"
          key={inputKey}
          onChange={handleImageChange}
          id="pastDueDesktop"
          data-id={myContact._id}
        />
        <label className={css.detailsImageInput} htmlFor="pastDueDesktop">
          Update Customer Avatar +
        </label>
        <ul className={css.detailsWrapper}>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.detailsInfo}>
                <span className={css.details}>Name:</span>{' '}
                {isNameEditing === false ? (
                  <span className={css.detailsVal}>
                    <i className={css.detail}>{myContact.name}</i>
                  </span>
                ) : (
                  <input
                    type="text"
                    className={css.detailsValInput}
                    required
                    onChange={handleNameChange}
                    data-id={myContact._id}
                    name="username"
                    defaultValue={myContact.name}
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
                    name={myContact._id}
                    className={css.detailButton}
                    onClick={handleNameSave}
                  >
                    Save
                  </button>
                )}
              </span>
            </span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.detailsInfo}>
                <span className={css.details}>Email:</span>{' '}
                {isEmailEditing === false ? (
                  <pre className={css.detailsDetailsVal}>
                    <i className={css.detail}>{myContact.email}</i>
                  </pre>
                ) : (
                  <input
                    type="text"
                    className={css.detailsDetailsValInput}
                    required
                    onChange={handleEmailChange}
                    data-id={myContact._id}
                    name="email"
                    title="Enter the details of your task"
                    defaultValue={myContact.email}
                  />
                )}
              </span>
              <span className={css.buttonWrapper}>
                {isEmailEditing === true && (
                  <button
                    className={css.detailsEditClose}
                    onClick={handleEmailEditClose}
                  >
                    <svg width="5px" height="5px" className={css.modalIcon}>
                      <use href={`${svg}#icon-cross`}></use>
                    </svg>
                  </button>
                )}
                {isEmailEditing === false ? (
                  <button
                    className={css.detailButton}
                    onClick={handleEmailEdit}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    name={myContact._id}
                    className={css.detailButton}
                    onClick={handleEmailSave}
                  >
                    Save
                  </button>
                )}
              </span>
            </span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.detailsInfo}>
                <span className={css.details}>Due Date:</span>{' '}
                {isPhoneEditing === false ? (
                  <span className={css.detailsValPhone}>
                    <i className={css.detail}>{dateValue}</i>
                  </span>
                ) : (
                  <Flatpickr
                    data-enable-time
                    value={date}
                    onChange={selectedDates => {
                      const nowDate = new Date();
                      if (selectedDates[0] <= nowDate) {
                        Notiflix.Notify.warning('Choose a date in the future');
                      } else {
                        Notiflix.Notify.success('Due Date Selected');
                      }
                      setDate(selectedDates[0]);
                    }}
                    options={{
                      minuteIncrement: 1, // Set minute increments to 1
                    }}
                    render={({ defaultValue, ...props }, ref) => (
                      <input
                        {...props}
                        ref={ref}
                        className={css.detailsValInputPhone}
                        required
                        data-id={myContact._id}
                        name="date"
                      />
                    )}
                  />
                )}
              </span>
              <span className={css.buttonWrapper}>
                {isPhoneEditing === true && (
                  <button
                    className={css.detailsEditClose}
                    onClick={handlePhoneEditClose}
                  >
                    <svg width="5px" height="5px" className={css.modalIcon}>
                      <use href={`${svg}#icon-cross`}></use>
                    </svg>
                  </button>
                )}
                {isPhoneEditing === false ? (
                  <button
                    className={css.detailButton}
                    onClick={handlePhoneEdit}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    name={myContact._id}
                    className={css.detailButton}
                    onClick={handlePhoneSave}
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
        <TasksPastDueList />
      </div>
    </div>
  );
};

export default Contacts;
