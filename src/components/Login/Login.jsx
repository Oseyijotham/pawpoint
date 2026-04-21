import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/AuthRedux/operations';
import css from './Login.module.css';
import Notiflix from 'notiflix';
import { NavLink } from 'react-router-dom';
import { useAuthHook } from '../../customHook/customHook';
import logoImage from './GeoPets.png';

export const Login = () => {
  const dispatch = useDispatch();
  const { isRegistered } = useAuthHook();
  const handleButtonPress = e => {
    e.target.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      e.target.style.boxShadow = 'none';
    }, 2000);
  }

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
     e.target.elements.button.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
     e.target.elements.button.style.boxShadow = 'none';
     }, 2000);
    const form = e.currentTarget;
    if (form.elements.password.value.length < 6) {
      Notiflix.Notify.warning('Password Must be more than 6 characters');
      return;
    }
      dispatch(
        logIn({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      );
    //form.reset();
  };

  return (
    <>
      <div className={css.loginContainer}>
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
                  Email
                  <input
                    type="email"
                    name="email"
                    className={css.input}
                    required
                  />
                </label>
                <label className={css.label}>
                  Password
                  <input
                    type="password"
                    name="password"
                    className={css.input}
                    required
                    onChange={handleChange}
                  />
                </label>
                <button className={css.inputButton} name="button" type="submit">
                  Log In
                </button>
                {isRegistered === false ? (
                  <>
                    <span className={css.inputText}>or</span>
                    <NavLink
                      className={css.inputButton}
                      to="/register"
                      onClick={handleButtonPress}
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <div className={css.inputTextInfo}>
                      You're Registered, you can login now
                    </div>
                    <div className={css.inputTextInfo}>
                      Logout to Register another account
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
