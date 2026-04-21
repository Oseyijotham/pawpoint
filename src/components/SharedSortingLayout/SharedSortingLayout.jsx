import { Outlet } from 'react-router-dom';
import {
  Container,
  Header,
  Link
} from './SharedSortingLayout.styled';
import { Suspense } from 'react';
import {
  setSortAll,
  setSortPending,
  setSortFulfilled,
  setSortPastDue
} from '../../redux/AuthRedux/operations';
import { createApiKey, fetchCatPics, fetchDogPics } from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import css from './SharedSortingLayout.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import { selectKey, selectIsGenKey, selectGenApiKeyError, selectretrieveApiKeyError, selectIsRetKey } from '../../redux/AppRedux/selectors';
import { useEffect, useState } from 'react';

export const SharedSortingLayout = () => {

  //const hasInitialized = useRef(false);

  const [isInit, setIsInit] = useState(false);

  const dispatch = useDispatch();

  const myKey = useSelector(selectKey);

  const isGenKey = useSelector(selectIsGenKey);

  const error = useSelector(selectGenApiKeyError);

  const retError = useSelector(selectretrieveApiKeyError);

  const retLoading = useSelector(selectIsRetKey);

  const handleSortAll = () => {
     dispatch(setSortAll());
  }

   const handleSortPending = () => {
     dispatch(setSortPending());
  };
  
  const handleSortFulfilled = () => {
    dispatch(setSortFulfilled());
  };

  const handleSortPastDue = () => {
    dispatch(setSortPastDue());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      createApiKey({
        name: form.elements.key.value,
        customMetaData: form.elements.customMetaData.value,
        customAccountId: form.elements.customAccountId.value,
      })
    );
  }
  

  return (
    <Container>
      {myKey === null && (
        
        <div className={css.cover}>
          <div className={css.modal}>
            <div className={css.modalLabel}>
              Create an API key to have access to your API maker
            </div>
            {isGenKey && !error && <b>Generating your API KEY...</b>}
            {error && !isGenKey && <b>Could not Generate Key</b>}
            <div className={css.formContainer}>
              <form
                className={css.form}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <label className={css.label}>
                  API KEY NAME
                  <input
                    type="text"
                    name="key"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Custom Account Id
                  <input
                    type="text"
                    name="customMetaData"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Custom Meta Data
                  <input
                    type="text"
                    name="customAccountId"
                    className={css.input}
                    required
                  />
                </label>
                <button className={css.modalButton}>CREATE API</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Header>
        <Link to="/sharedLayout/apiCreator/catImages" onClick={handleSortAll}>
          View Cat Images
        </Link>
        <Link to="/sharedLayout/apiCreator/dogImages" onClick={handleSortPending}>
          View Dog Images
        </Link>
        <Link to="savedPlaces" onClick={handleSortFulfilled}>
          Add Places
        </Link>
        <Link to="apiDocumentation" onClick={handleSortPastDue}>
          See Documentation
        </Link>
      </Header>

      <Suspense
        fallback={
          <div className={css.childWrapper}>
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
        }
      >
        <Outlet />
      </Suspense>
    </Container>
  );
};
