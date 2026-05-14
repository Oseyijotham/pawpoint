import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  selectError,
  selectIsLoading,
  selectCatPics,
  selectCatPageNums,
} from '../../redux/AppRedux/selectors';
import {
  fetchMoreCatPics,
  fetchCatPics,
  saveCatImage,
} from '../../redux/AppRedux/operations';
import css from './TasksAllList.module.css';
import { Loader } from '../Loader/Loader';

export const TasksAllList = ({ children }) => {

  const isLoading = useSelector(selectIsLoading);
  const catPics = useSelector(selectCatPics);
  const catPageNums = useSelector(selectCatPageNums);
  const error = useSelector(selectError);
  
  const dispatch = useDispatch();

  const handleGalleryButtonPress = () => {
    console.log(catPageNums);
    const storeVar = catPageNums + 1;

    dispatch(fetchMoreCatPics({ pageNum: storeVar }));
  }

    const handleSave = (imageFile, evt) => {
      evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

      setTimeout(() => {
        evt.target.style.boxShadow = 'none';
      }, 2000);

      dispatch(saveCatImage({ data: imageFile }));
    };

   

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
  }, [catPics]);

  useEffect(() => { console.log(catPics)}, []);

  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Cat Pics</h3>
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
    ${catPics.length === 0 ? '600px' : 'auto'}
  `,
          }}
        >
          {catPics.map(pic => (
            <li key={pic.id} className={css.catItem} data-id={pic.id}>
              <a href={pic.url}>
                <img className={css.catImage} src={pic.url} alt="" />
              </a>
              <button
                className={css.saver}
                onClick={evt => handleSave(pic, evt)}
              >
                Save
              </button>
              {console.log(catPics)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {catPics.length !== 0 ? (
          <button onClick={handleGalleryButtonPress} className={css.loadBtn}>
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};
