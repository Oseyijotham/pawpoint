import { TasksPastDueList } from '../TasksPastDueList/TasksPastDueList';
import { useEffect } from 'react';
import {
  closeSortedPastDueModal,
  closePastDueMobileAndTabModal,
  fetchSavedPlaces,
  updatePlaceDetails,
  fetchSavedCatPics,
  fetchSavedDogPics
} from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactJson from '@microlink/react-json-view';
import {
  selectKey,
  selectError,
  selectIsLoading,
  selectOpenSortedPastDueModal,
  selectedSelectedEndpoint,
  selectOpenPastDueMobileAndTabModal,
  selectIsSelectedSavedPlaceLoading,
  selectEndpointOne,
  selectEndpointTwo,
  selectEndpointFour,
  selectEndpointFive
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
  const [placeId, setPlaceId] = useState('%20');
  const [description, setDescription] = useState('%20');
   const myEndpoint = useSelector(selectedSelectedEndpoint);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isOpenPastDueMobileAndTabModal = useSelector(
    selectOpenPastDueMobileAndTabModal
  );
  const isSelectedSavedPlaceLoading = useSelector(selectIsSelectedSavedPlaceLoading);
 
  const error = useSelector(selectError);
  const endPointOne = useSelector(selectEndpointOne);
  const endPointTwo = useSelector(selectEndpointTwo);
  const endPointFour = useSelector(selectEndpointFour);
  const endPointFive = useSelector(selectEndpointFive);

  
  
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMobileOrTab = useMediaQuery({ query: '(max-width: 1279px)' });
  const isOpenModal = useSelector(selectOpenSortedPastDueModal);
  const apiKey =  useSelector(selectKey);
  
  const jsonData = JSON.stringify(endPointOne, null, 2);

  const jsonDataTwo = JSON.stringify(endPointTwo, null, 2);

  const jsonDataFour = JSON.stringify(endPointFour, null, 2);

  const jsonDataFive = JSON.stringify(endPointFive, null, 2);


 const handleModalClose = () => {
   dispatch(closeSortedPastDueModal());
   dispatch(closePastDueMobileAndTabModal());
  };

  const handleIdInput = (evt) => {
    setPlaceId(evt.target.value);
  }

  const handleDescriptionInput = (evt) => {
    setDescription(evt.target.value);
  };
  

  const handleFirstPoint = () => {
    dispatch(fetchSavedPlaces(apiKey));
  }

  const handleSecondPoint = () => {
    if (placeId.trim() === '%20' || description.trim() === '%20') {
      Notiflix.Notify.warning('Missing Place ID or Description');
    }
    else {
      dispatch(updatePlaceDetails({ id: placeId, description: description, apiKey: apiKey }));
    }
  }

  const handleFourthPoint = () => {
    dispatch(fetchSavedCatPics(apiKey));
  }

  const handleFifthPoint = () => {
    dispatch(fetchSavedDogPics(apiKey));
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
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '180px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {`fetch('https://pawpoint-backend.onrender.com/api/places/savedPlaces', {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-api-key": ${apiKey},
      },
    })
  .then(response => response.json())
  .then(data => console.log(data));`}
              </SyntaxHighlighter>
            </li>
            <li>
              <button
                className={css.detailsItemButton}
                onClick={handleFirstPoint}
              >
                Send
              </button>
            </li>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '100px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {jsonData}
              </SyntaxHighlighter>
            </li>
          </ul>
        )}

        {myEndpoint.id === '2' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '140px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {`fetch('https://pawpoint-backend.onrender.com/api/places/savedPlacesApi/${placeId}', {
      method: "PATCH",
      headers: {
        "accept": "application/json",
        "x-api-key": ${apiKey},
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ description: ${description} })
    })
  .then(response => response.json())
  .then(data => console.log(data));`}
              </SyntaxHighlighter>
            </li>
            <li className={css.formItem}>
              <input
                type="text"
                className={css.detailsValInput}
                required
                onChange={handleIdInput}
                name="Place ID"
                placeholder="Place ID"
              />
              <button
                className={css.detailsItemButton}
                onClick={handleSecondPoint}
              >
                Send
              </button>
              <input
                type="text"
                className={css.detailsValInput}
                required
                onChange={handleDescriptionInput}
                name="Place Description"
                placeholder="Place Description"
              />
            </li>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '140px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {jsonDataTwo}
              </SyntaxHighlighter>
            </li>
          </ul>
        )}

        {myEndpoint.id === '3' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '180px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {`fetch('https://pawpoint-backend.onrender.com/api/places/savedPlaces', {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-api-key": ${apiKey},
      },
    })
  .then(response => response.json())
  .then(data => console.log(data));`}
              </SyntaxHighlighter>
            </li>
            <li>
              <button
                className={css.detailsItemButton}
                onClick={handleFirstPoint}
              >
                Send
              </button>
            </li>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '100px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {jsonData}
              </SyntaxHighlighter>
            </li>
          </ul>
        )}

        {myEndpoint.id === '4' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '180px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {`fetch('https://pawpoint-backend.onrender.com/api/places/catpicsApi', {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-api-key": ${apiKey},
      },
    })
  .then(response => response.json())
  .then(data => console.log(data));`}
              </SyntaxHighlighter>
            </li>
            <li>
              <button
                className={css.detailsItemButton}
                onClick={handleFourthPoint}
              >
                Send
              </button>
            </li>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '100px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {jsonDataFour}
              </SyntaxHighlighter>
            </li>
          </ul>
        )}

        {myEndpoint.id === '5' && (
          <ul className={css.detailsWrapper}>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '180px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {`fetch('https://pawpoint-backend.onrender.com/api/places/dogpicsApi', {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-api-key": ${apiKey},
      },
    })
  .then(response => response.json())
  .then(data => console.log(data));`}
              </SyntaxHighlighter>
            </li>
            <li>
              <button
                className={css.detailsItemButton}
                onClick={handleFifthPoint}
              >
                Send
              </button>
            </li>
            <li className={css.detailsItem}>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                wrapLongLines={false}
                className={css.codeBlock}
                showLineNumbers
                customStyle={{
                  height: '100px',
                  paddingBottom: '10px',
                  borderRadius: '8px',
                  background: '#1f242d',
                  border: '1px solid #ffff',
                }}
              >
                {jsonDataFive}
              </SyntaxHighlighter>
            </li>
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
