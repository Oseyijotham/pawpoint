import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';
import { cache } from 'react';
import { clearData } from '../AuthRedux/operations';

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  Notiflix.Loading.pulse('Logging You Out...', {
    svgColor: '#9225ff',
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

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
                  thunkAPI.dispatch(logOut());
                  Notiflix.Notify.failure('Invalid Session, login again');
                } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const searchPlaces = createAsyncThunk(
  'places/searchPlaces',
  async ({ category, country }, thunkAPI) => {
    try {
      const response = await axios.post(`/places/`, { category, country });
      console.log(response.data);
      return response.data;
    } catch (error) {
      //console.log(error)

      Notiflix.Notify.failure(error.response.data.error.message);

      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }

      return thunkAPI.rejectWithValue(null);
    }
  }
);


export const openPastDueMobileAndTabModal = createAsyncThunk(
  'pastDueMobileAndTabModal/open',
  async () => {
    return false;
  }
);

export const closePastDueMobileAndTabModal = createAsyncThunk(
  'pastDueMobileAndTabModal/close',
  async () => {
    return true;
  }
);


export const openCompletedMobileAndTabModal = createAsyncThunk(
  'completedMobileAndTabModal/open',
  async () => {
    return false;
  }
);

export const closeCompletedMobileAndTabModal = createAsyncThunk(
  'completedMobileAndTabModal/close',
  async () => {
    return true;
  }
);

export const openPendingMobileAndTabModal = createAsyncThunk(
  'pendingMobileAndTabModal/open',
  async () => {
    return false;
  }
);

export const closePendingMobileAndTabModal = createAsyncThunk(
  'pendingMobileAndTabModal/close',
  async () => {
    return true;
  }
);

export const openAllMobileAndTabModal = createAsyncThunk(
  'allMobileAndTabModal/open',
  async () => {
    return false;
  }
);

export const closeAllMobileAndTabModal = createAsyncThunk(
  'allMobileAndTabModal/close',
  async () => {
    return true;
  }
);

export const openMobileAndTabModal = createAsyncThunk(
  'mobileAndTabModal/open',
  async () => {
    return false;
  }
);

export const closeMobileAndTabModal = createAsyncThunk(
  'mobileAndTabModal/close',
  async () => {
    return true;
  }
);

export const openModal = createAsyncThunk('modalAndTabModal/open', async () => {
  return true;
});

export const closeModal = createAsyncThunk(
  'modal/close',
  async () => {
    return false;
  }
);

export const openSortedAllModal = createAsyncThunk(
  'modal/openAll',
  async () => {
    return true;
  }
);

export const closeSortedAllModal = createAsyncThunk(
  'modal/closeAll',
  async () => {
    return false;
  }
);

export const openSortedPendingModal = createAsyncThunk(
  'modal/openPending',
  async () => {
    return true;
  }
);

export const closeSortedPendingModal = createAsyncThunk(
  'modal/closePending',
  async () => {
    return false;
  }
);

export const openSortedCompletedModal = createAsyncThunk(
  'modal/openCompleted',
  async () => {
    return true;
  }
);

export const closeSortedCompletedModal = createAsyncThunk(
  'modal/closeCompleted',
  async () => {
    return false;
  }
);

export const openSortedPastDueModal = createAsyncThunk(
  'modal/openPastDue',
  async () => {
    return true;
  }
);

export const closeSortedPastDueModal = createAsyncThunk(
  'modal/closePastDue',
  async () => {
    return false;
  }
);

export const handleFilterFowardUp = createAsyncThunk(
  'filter/fowardUp',
  async (val) => {
    return val + 4;
  }
);

export const handleFilterFowardDown = createAsyncThunk(
  'filter/fowardDown',
  async (val) => {
    return val + 4;
  }
);


export const handleFilterBackwardUp = createAsyncThunk(
  'filter/backwardUp',
  async (val) => {
    return val - 4;
  }
);

export const handleFilterBackwardDown = createAsyncThunk(
  'filter/backwardDown',
  async (val) => {
    return val - 4;
  }
);

export const updateContactAvatar = createAsyncThunk(
  'contacts/updateContactAvatar',
  async ({myFile, myId}, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Avatar...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/avatars/${myId}`, { avatar: myFile }, {headers: { 'Content-Type': 'multipart/form-data' }});

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

export const updateSortedAllContactAvatar = createAsyncThunk(
  'contacts/updateSortedAllContactAvatar',
  async ({ myFile, myId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Avatar...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(
        `/contacts/avatars/${myId}`,
        { avatar: myFile },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

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

export const updateSortedPendingContactAvatar = createAsyncThunk(
  'contacts/updateSortedPendingContactAvatar',
  async ({ myFile, myId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Avatar...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(
        `/contacts/avatars/${myId}`,
        { avatar: myFile },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

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

export const updateSortedCompletedContactAvatar = createAsyncThunk(
  'contacts/updateSortedCompletedContactAvatar',
  async ({ myFile, myId }, thunkAPI) => {
    /*Notiflix.Loading.pulse('Updating Place Avatar...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });*/
    try {
      const res = await axios.patch(
        `/places/avatars/${myId}`,
        { avatar: myFile },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      //Notiflix.Loading.remove();
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

export const updateSortedPastDueContactAvatar = createAsyncThunk(
  'contacts/updateSortedPastdueContactAvatar',
  async ({ myFile, myId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Avatar...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(
        `/contacts/avatars/${myId}`,
        { avatar: myFile },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

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

export const updateContactName = createAsyncThunk(
  'contacts/updateContactName',
  async ({ name, myUpdateId}, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Name...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/nameupdate/${myUpdateId}`, {
        name
      });

      const response = await axios.get('/contacts');


      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedAllContactName = createAsyncThunk(
  'contacts/updateSortedAllContactName',
  async ({ name, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Name...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/nameupdate/${myUpdateId}`, {
        name,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPendingContactName = createAsyncThunk(
  'contacts/updateSortedPendingContactName',
  async ({ name, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Name...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/nameupdate/${myUpdateId}`, {
        name,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedCompletedContactName = createAsyncThunk(
  'contacts/updateSortedCompletedContactName',
  async ({ description, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Place Description...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/places/detailsUpdate/${myUpdateId}`, {
        description,
      });

      const response = await axios.get('/places/savedPlaces');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPastDueContactName = createAsyncThunk(
  'contacts/updateSortedPastDueContactName',
  async ({ name, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Client Name...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/nameupdate/${myUpdateId}`, {
        name,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);


export const updateContactEmail = createAsyncThunk(
  'contacts/updateContactEmail',
  async ({ email, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Customer Email...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/emailupdate/${myUpdateId}`, {
        email,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      } 
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedAllContactEmail = createAsyncThunk(
  'contacts/updateSortedAllContactEmail',
  async ({ email, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Appointment Details...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/emailupdate/${myUpdateId}`, {
        email,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPendingContactEmail = createAsyncThunk(
  'contacts/updateSortedPendingContactEmail',
  async ({ email, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Appointment Details...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/emailupdate/${myUpdateId}`, {
        email,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedCompletedContactEmail = createAsyncThunk(
  'contacts/updateSortedCompletedContactEmail',
  async ({ email, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Appointment Details...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/emailupdate/${myUpdateId}`, {
        email,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPastDueContactEmail = createAsyncThunk(
  'contacts/updateSortedPastDueContactEmail',
  async ({ email, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Appointment Details...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/emailupdate/${myUpdateId}`, {
        email,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateContactPhone = createAsyncThunk(
  'contacts/updateContactPhone',
  async ({ dueDate, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Due Date...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/phoneupdate/${myUpdateId}`, {
        dueDate,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
    Notiflix.Notify.failure(error.response.data.error.message);
    Notiflix.Loading.remove();
    if (error.response.status === 401) {
      thunkAPI.dispatch(logOut());
      Notiflix.Notify.failure('Invalid Session, login again');
    }
    return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedAllContactPhone = createAsyncThunk(
  'contacts/updateSortedAllContactPhone',
  async ({ dueDate, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Due Date...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/phoneupdate/${myUpdateId}`, {
        dueDate,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPendingContactPhone = createAsyncThunk(
  'contacts/updateSortedPendingContactPhone',
  async ({dueDate, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Due Date...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/phoneupdate/${myUpdateId}`, {
        dueDate,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedCompletedContactPhone = createAsyncThunk(
  'contacts/updateSortedCompletedContactPhone',
  async ({ dueDate, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Due Date...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/phoneupdate/${myUpdateId}`, {
        dueDate,
      });

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateSortedPastDueContactPhone = createAsyncThunk(
  'contacts/updateSortedPastDueContactPhone',
  async ({ dueDate, myUpdateId }, thunkAPI) => {
    Notiflix.Loading.pulse('Updating Due Date...', {
      svgColor: '#9225ff',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.patch(`/contacts/phoneupdate/${myUpdateId}`, {
        dueDate,
      });
    
      const nowInstDate = new Date();
      const myDate = new Date(dueDate);
      if (myDate > nowInstDate) {
        thunkAPI.dispatch(closeSortedPastDueModal());
        Notiflix.Notify.success('Due Date moved foward, appointment status is now PENDING')
      }

      const response = await axios.get('/contacts');

      Notiflix.Loading.remove();
      //return res.data;
      return {
        newObj: res.data,
        newRay: response.data,
      };
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.error.message);
      Notiflix.Loading.remove();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      return thunkAPI.rejectWithValue(null);
    }
  }
);



export const fetchContactById = createAsyncThunk(
  'places/onePlace',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const foundPlaces = state.contacts.contacts.places;
      const myObj = foundPlaces.find(place => place.id === id);
      return myObj;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchSavedPlaceById = createAsyncThunk(
  'places/oneSavedPlace',
  async (id, thunkAPI) => {
    try {
     /* const state = thunkAPI.getState();
      const foundPlaces = state.contacts.contacts.savedPlaces;
      const myObj = foundPlaces.find(place => place._id === id);
      return myObj;*/
      const res = await axios.get(`/places/getOnePlace/${id}`);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchSortedAllContactById = createAsyncThunk(
  'contacts/fetchSortedAllById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      console.log (response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchSortedPendingContactById = createAsyncThunk(
  'contacts/fetchSortedPendingById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      //console.log (response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchSortedCompletedContactById = createAsyncThunk(
  'contacts/fetchSortedCompletedById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      //console.log (response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchSortedPastDueContactById = createAsyncThunk(
  'contacts/fetchSortedPastDueById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      //console.log (response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOut());
        Notiflix.Notify.failure('Invalid Session, login again');
      }
      Notiflix.Notify.failure(error.response.data.error.message);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

/*export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (taskId, thunkAPI) => {
    try {
     const res = await axios.delete(`/contacts/${taskId}`);
      //await axios.get('/contacts');
      const state = thunkAPI.getState();
      const selectedContact = state.contacts.contacts.selectedContact;
      const selectedSortedAllContact = state.contacts.contacts.selectedSortedAllContact;
      const selectedSortedPendingContact = state.contacts.contacts.selectedSortedPendingContact;
      const selectedSortedCompletedContact = state.contacts.contacts.selectedSortedCompletedContact;
      const selectedSortedPastDueContact = state.contacts.contacts.selectedSortedPastDueContact;
      //const newContacts = res.data;
      //console.log(newContacts);
       //const exist = newContacts.find(contact => contact._id === taskId);
    
    if (selectedContact._id === taskId) {
      thunkAPI.dispatch(closeModal());
      }
     if (selectedSortedAllContact._id === taskId) {
       thunkAPI.dispatch(closeSortedAllModal());
      }  
       if (selectedSortedPendingContact._id === taskId) {
         thunkAPI.dispatch(closeSortedPendingModal());
      }  
       if (selectedSortedCompletedContact._id === taskId) {
         thunkAPI.dispatch(closeSortedCompletedModal());
      }  
       if (selectedSortedPastDueContact._id === taskId) {
         thunkAPI.dispatch(closeSortedPastDueModal());
       }  
      
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);  */


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (taskId, thunkAPI) => {
    try {
     const res = await axios.delete(`/contacts/${taskId}`);
     
      
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);          

 export const updateStatus = createAsyncThunk(
   'tasks/updateStatus',
   async ({ data }, thunkAPI) => {
     try {
       const res =  await axios.post(`/places/saveplace`, {
         
         data
       });
       console.log(res.data);
       
       return res.data;
     } catch (e) {
       return thunkAPI.rejectWithValue(null);
     }
   }
);    
 
export const saveCategoryName = createAsyncThunk(
  'category/save',
  async name => {
    return name;
  }
);

export const saveCountryName = createAsyncThunk(
  'country/save',
  async name => {
    return name;
  }
);

export const createApiKey = createAsyncThunk(
  'api/createApiKey',
  async ({ name, customMetaData, customAccountId }, thunkAPI) => {
    try {
      const res = await axios.post('users/create', {
        name,
        customMetaData,
        customAccountId,
      });
      Notiflix.Notify.success('API KEY CREATED');
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const retrieveApiKey = createAsyncThunk(
  'api/retrieveKey',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/users/retrieve', { cache: "store" });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCatPics = createAsyncThunk(
  'api/catPics',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/places/catpics');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDogPics = createAsyncThunk(
  'api/dogPics',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/places/dogpics');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreCatPics = createAsyncThunk(
  'api/moreCatPics',
  async ({ pageNum }, thunkAPI) => {
    try {
      const res = await axios.post('/places/morecatpics', { pageNum } );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreDogPics = createAsyncThunk(
  'api/moreDogPics',
  async ({ pageNum }, thunkAPI) => {
    try {
      const res = await axios.post('/places/moredogpics', { pageNum });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSavedPlaces = createAsyncThunk(
  'places/savedPlaces',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/places/savedPlaces');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePlaces = createAsyncThunk(
  'places/deletePlaces',
  async (placeId, thunkAPI) => {
    try {
      const res = await axios.delete(`/places/deletePlaces/${placeId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

