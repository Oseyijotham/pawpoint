import {
  searchPlaces,
  saveCategoryName,
  saveCountryName,
} from '../../redux/AppRedux/operations';
import {selectCategoryName, selectCountryName} from '../../redux/AppRedux/selectors';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import 'flatpickr/dist/themes/material_blue.css';
import Categories from '../Options/categories';
import Countries from '../Options/countries_sorted_by_full_name';

export const ContactForm = ({lowerLimitSetter, upperLimitSetter, children }) => {
  const dispatch = useDispatch();
  const categoryName = useSelector(selectCategoryName);
  const countryName = useSelector(selectCountryName);

  const handleButtonPress = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 1000);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const category = event.target[0].value;
    const country = event.target[1].value;

    
    dispatch(searchPlaces({ category: category, country: country }));
    
    lowerLimitSetter(0);
    upperLimitSetter(4);
    
  };

  const handleCategoryChange = (evt) => {
    
    dispatch(saveCategoryName(evt.target.value));
  }

   const handleCountryChange = evt => {
    
     dispatch(saveCountryName(evt.target.value));
   };

  return (
    <div className={css.taskBook}>
      <h2 className={css.formTitle}>Pet Services</h2>
      <form onSubmit={handleSubmit} className={css.formSection}>
        <label className={css.loginLabel}>
          <span className={css.formLabel}>Categories:</span>
          <select
            className={css.formInput}
            onChange={handleCategoryChange}
            value={categoryName}
            name="categoryName"
            required
            title="Choose a Category"
          >
            <option
              value=""
              disabled
              selected
              style={{
                fontFamily: 'Work Sans',
                fontWeight: 700,
                backgroundColor: 'grey',
                color: 'black',
              }}
            >
              Choose a category of pet service
            </option>
            {Categories.map(categorie => (
              <option value={categorie}>{categorie}</option>
            ))}
          </select>
        </label>
        <label>
          <span className={css.formLabel}>Country:</span>
          <select
            className={css.formInput}
            onChange={handleCountryChange}
            value={countryName}
            name="countryName"
            required
            title="Choose a Country"
          >
            <option
              value=""
              disabled
              selected
              style={{
                fontFamily: 'Work Sans',
                fontWeight: 700,
                backgroundColor: 'grey',
                color: 'black',
              }}
            >
              Choose a country
            </option>
            {Countries.map(country => (
              <option value={country.country}>{country.full_name}</option>
            ))}
          </select>
        </label>
        <div className={css.buttonArea}>
          <button
            type="submit"
            name="button"
            className={css.button}
            onClick={handleButtonPress}
          >
            Search
          </button>
        </div>
      </form>
      {children}
    </div>
  );
};

ContactForm.propTypes = {
  children: PropTypes.node,
};
