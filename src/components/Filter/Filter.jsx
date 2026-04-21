import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPlaces } from '../../redux/AppRedux/selectors';
import {
  selectContactsFilter,
  selectFilterUp,
  selectFilterDown,
  selectIsLoading,
  selectIsUpdateLoading,
} from '../../redux/AppRedux/selectors';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import { setFilter } from '../../redux/AppRedux/filterSlice';
import {
  openModal,
  fetchContactById,
  openMobileAndTabModal,
  updateStatus,
} from '../../redux/AppRedux/operations';
import icons from './icons.svg';
import { ThreeCircles } from 'react-loader-spinner';

export const Filter = () => {
  const isLoading = useSelector(selectIsLoading);
  const isUpdateLoading = useSelector(selectIsUpdateLoading);

  const [isTrue, setIfTrue] = useState(true);
  const searchTermId = nanoid();
  const places = useSelector(selectPlaces);
  const filterUpper = useSelector(selectFilterUp);
  const filterLower = useSelector(selectFilterDown);
  const filterValue = useSelector(selectContactsFilter);
  const dispatch = useDispatch();
  const handleSearch = event => {
    dispatch(setFilter(event.target.value));
    console.log(event.target.value);
  };
  const bestMatches = places.filter(
    place =>
      place.properties.names.primary
        .toLowerCase()
        .includes(filterValue.trim().toLowerCase()) && filterValue.trim() !== ''
  );

  const handleModalOpen = evt => {
    if (evt.target.getAttribute('data-id')) {
      const id = evt.currentTarget.getAttribute('data-id');
      dispatch(fetchContactById(id));
      dispatch(openModal());
      dispatch(openMobileAndTabModal());
    }
  };

  const handleChange = (placesData, evt) => {
    setIfTrue(evt.target.checked);

    dispatch(
      updateStatus({ data: { ...placesData, status: evt.target.checked } })
    );
  };

  return (
    <div className={css.contactList}>
      <label htmlFor={searchTermId}>
        <span className={css.formLabel}>Search Places by Name:</span>
        <input
          type="text"
          placeholder="Enter Place Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Enter Customer Name"
          required
          onChange={handleSearch}
          id={searchTermId}
          autoComplete="off"
          className={css.formInput}
          value={filterValue}
        />
      </label>

      <div style={{ position: 'relative' }}>
        {(isLoading || isUpdateLoading) && filterValue !== '' && (
          <div className={css.backDrop}>
            <div className={css.centerStyle}>
              <ThreeCircles
                visible={true}
                height="60"
                width="60"
                color="#9225ff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass={css.loader}
              />
              {isLoading && (
                <p className={css.centerLabel}>
                  Please be patient, fetching places can take up to 60 seconds
                </p>
              )}
              {isUpdateLoading && isTrue === true && (
                <p className={css.centerLabel}>
                  Saving place to your API Database
                </p>
              )}
              {isUpdateLoading && isTrue === false && (
                <p className={css.centerLabel}>
                  Removing place from your API Database
                </p>
              )}
            </div>
          </div>
        )}

        {filterValue !== '' && bestMatches.length !== 0 && (
          <ul className={css.contactsList} style={{ height: '315px' }}>
            {bestMatches.map(place => {
              const myindex = bestMatches.indexOf(place);
              if (myindex >= filterLower && myindex < filterUpper) {
                return (
                  <li
                    key={place.id}
                    data-id={place.id}
                    className={css.contactsItem}
                    onClick={handleModalOpen}
                  >
                    <span className={css.contactsData} data-id={place.id}>
                      <input
                        type="checkbox"
                        className={css.checkbox}
                        onChange={evt => handleChange(place, evt)}
                        name={place.id}
                        checked={place.status}
                        value={place.properties.addresses[0]}
                      />
                      :{' '}
                      <span className={css.contactsPhone} data-id={place.id}>
                        {place.properties.names.primary}
                      </span>
                    </span>
                    {place.properties.socials.length !== 0 && (
                      <span className={css.contactsButtonArea}>
                        <a
                          className={css.contactsButton}
                          name={place.id}
                          href={place.properties.socials[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="20"
                            height="20"
                            className={css.socialsIcon}
                          >
                            <use href={`${icons}#icon-facebook`} />
                          </svg>
                        </a>
                      </span>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
