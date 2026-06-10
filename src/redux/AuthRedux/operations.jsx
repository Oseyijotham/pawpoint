import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

//axios.defaults.baseURL = 'http://localhost:8001/api';

axios.defaults.baseURL = 'https://pawpoint-backend.onrender.com/api';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk(
  'auth/register',
  async ({ firstName, lastName, email, phone, password }, thunkAPI) => {
    Notiflix.Loading.pulse('Registering Your Account...', {
      svgColor: '#1E73D8',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.post('/users/signup', {
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      Notiflix.Loading.remove();
      return res.data;
    } catch (error) {
      Notiflix.Loading.remove();
      
        Notiflix.Notify.failure(error.response.data.error.message);
     
      return thunkAPI.rejectWithValue(null);
    }
  }
);


export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    Notiflix.Loading.pulse('Logging You In...', {
      svgColor: '#1E73D8',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.post('/users/login', { email, password });
      
      setAuthHeader(res.data.token);
      Notiflix.Loading.remove();
      //console.log(res.data);
      return res.data;
    } catch (error) {
      Notiflix.Loading.remove();
  
        Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);


export const clearData = createAsyncThunk('auth/clear', async (_, thunkAPI) => {
  return []
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  Notiflix.Loading.pulse('Logging You Out...', {
    svgColor: '#1E73D8',
    fontFamily: 'DM Sans',
  });
  try {
    await axios.get('/users/logout');
    thunkAPI.dispatch(clearData());
    clearAuthHeader();
    Notiflix.Loading.remove();
  } catch (error) {
    Notiflix.Loading.remove();
    return thunkAPI.rejectWithValue(null);
  }
});


export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
       thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/get',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      //window.location.reload();
      thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (file, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Your Avatar...', {
      svgColor: '#1E73D8',
      fontFamily: 'DM Sans',
    });
    console.log(file);
    try {
      const res = await axios.patch('/users/avatars', file, { headers: { 'Content-Type': 'multipart/form-data' } });
      //file = '';
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Avatar Updated, reflecting now...');
      return res.data;
    } catch (error) {
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
              thunkAPI.dispatch(logOut());
              Notiflix.Notify.failure('Invalid Session, login again');
            }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const setSortAll = createAsyncThunk(
  'setSort/all',
  async () => {
    return true;
  }
);

export const setSortPending = createAsyncThunk('setSort/pending', async () => {
  return true;
});

export const setSortFulfilled = createAsyncThunk('setSort/fulfilled', async () => {
  return true;
});

export const setSortPastDue = createAsyncThunk(
  'setSort/pastDue',
  async () => {
    return true;
  }
);

export const setScheduler = createAsyncThunk('setScheduler/display', async () => {
  return true;
});
