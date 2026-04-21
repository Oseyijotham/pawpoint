import { useDispatch } from 'react-redux';
import { register } from '../../redux/AuthRedux/operations';
import css from './Register.module.css';
import { NavLink } from 'react-router-dom';
import Notiflix from 'notiflix';
import logoImage from './GeoPets.png';

export const Register = () => {
const dispatch = useDispatch();


  const handleChange = (evt) => {
   const wrd = evt.target.value;
   let hasExceeded = false;
   let nameRay;
   if (wrd.length > 16) {
     nameRay = [...wrd];
     nameRay.pop();
     evt.target.value = nameRay.join('');
     hasExceeded = true;
   }
   if (hasExceeded === true) {
     Notiflix.Notify.warning('Maximum Charater limit is 16');
   }
}

const handleSubmit = e => {
  e.preventDefault();
  e.target.elements.button.style.boxShadow =
    'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
  setTimeout(() => {
    e.target.elements.button.style.boxShadow = 'none';
  }, 1000);
  const form = e.currentTarget;
  /*if (form.elements.firstname.value.trim() === '') {
    Notiflix.Notify.warning('Empty spaces are NOT allowed');
    return;
  }*/
  let firstnameValue = form.elements.firstname.value;
  if ([...firstnameValue].includes(' ')) {
    Notiflix.Notify.warning('Remove empty spaces from First Name');
    return;
  }
  /*if (form.elements.lastname.value.trim() === '') {
    Notiflix.Notify.warning('Empty spaces are NOT allowed');
    return;
  }*/
  let lastnameValue = form.elements.lastname.value;
  if ([...lastnameValue].includes(' ')) {
    Notiflix.Notify.warning('Remove empty spaces from Last Name');
    return;
  }
  /* if (form.elements.email.value.trim() === '') {
    Notiflix.Notify.warning('Empty spaces are NOT allowed');
    return;
  }*/
  let emailValue = form.elements.email.value;
  if ([...emailValue].includes(' ')) {
    Notiflix.Notify.warning('Remove empty spaces from Email');
    return;
  }
  if (form.elements.password.value.length < 6) {
    Notiflix.Notify.warning('Password Must be more than 6 characters');
    return;
  }
  let passwordValue = form.elements.password.value;
  if ([...passwordValue].includes(' ')) {
    Notiflix.Notify.warning('Remove empty spaces from Password');
    return;
  }

  dispatch(
    register({
      firstName: form.elements.firstname.value,
      lastName: form.elements.lastname.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      password: form.elements.password.value,
    })
  );
  //form.reset();
};

    return (
      <div className={css.login}>
        <NavLink to="/">
          <div className={css.symbol}>
            <div className={css.logo}>
              <div role="img" aria-label="computer icon">
                <img
                  src={logoImage}
                  alt="Logo"
                  width="80px"
                  className={css.frame}
                />
              </div>
              <div className={css.iconLabelWrapper}>
                <span className={css.iconLabelStart}>Geo</span>
                <span className={css.iconLabelEnd}>
                  <i>Pets</i>
                </span>
              </div>
            </div>
          </div>
        </NavLink>

        <div>
          <div className={css.formContainer}>
            <form
              className={css.form}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label className={css.label}>
                First Name
                <input
                  type="text"
                  name="firstname"
                  className={css.input}
                  placeholder="Enter Your First Name"
                  title="Enter Your First Name"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Last Name
                <input
                  type="text"
                  name="lastname"
                  className={css.input}
                  placeholder="Enter Your Last Name"
                  title="Enter Your Last Name"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Email
                <input
                  type="email"
                  name="email"
                  className={css.input}
                  placeholder="Enter Email Address"
                  title="Enter Email Address"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Phone Number
                <input
                  type="number"
                  name="phone"
                  className={css.input}
                  placeholder="Enter Phone Number"
                  title="Enter Phone Number"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Password
                <input
                  type="password"
                  name="password"
                  className={css.input}
                  title="Minimum of Six Characters, Max 16"
                  placeholder="Minimum of Six Characters, Max 16"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
              <button className={css.inputButton} name="button">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Register;
