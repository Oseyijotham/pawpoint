import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  selectError,
  selectIsLoading,
  selectDogPics,
  selectDogPageNums
} from '../../redux/AppRedux/selectors';
import {fetchMoreDogPics, fetchDogPics} from '../../redux/AppRedux/operations';
import css from './TasksPendingList.module.css';
import { Loader } from '../dogLoader/Loader';

export const TasksPendingList = ({ children }) => {

  const isLoading = useSelector(selectIsLoading);
  const dogPics = useSelector(selectDogPics);
  const error = useSelector(selectError);
  const dogPageNums = useSelector(selectDogPageNums);
  
  const dispatch = useDispatch();

  const handleGalleryButtonPress = () => {
      console.log(dogPageNums);
      const storeVar = dogPageNums + 1;
  
      dispatch(fetchMoreDogPics({ pageNum: storeVar }));
    }

  useEffect(() => {
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      closeText: 'X',
      animationSlide: false,
    });

    // Cleanup function
    return () => {
      lightbox.destroy();
    };
  }, [dogPics]);

  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Dog Pics</h3>
      {children}

      <div
        className={css.catGalleryCover}
        style={{
          position: 'relative',
        }}
      >
        <Loader />
        <ul
          className={`${css.catGallery} gallery`}
          style={{
            height: `
    ${dogPics.length === 0 ? '854px' : 'auto'}
  `,
          }}
        >
          {dogPics.map(pic => (
            <li key={pic.id} className={css.catItem} data-id={pic.id}>
              <a href={pic.url}>
                <img className={css.catImage} src={pic.url} alt="" />
              </a>
            </li>
          ))}
        </ul>
      </div>

        <div>
              {dogPics.length !== 0 ? (
                <button onClick={handleGalleryButtonPress} className={css.loadBtn}>
                  Load More
                </button>
              ) : null}
            </div>
    </div>
  );
};
