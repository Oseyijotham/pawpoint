import { TasksPendingList } from '../TasksPendingList/TasksPendingList';
import { useEffect } from 'react';
import { fetchDogPics } from '../../redux/AppRedux/operations';
import { useDispatch } from 'react-redux';
import css from './SortedPendingTasks.module.css';
import 'flatpickr/dist/themes/material_blue.css';
import { useRef } from 'react';


export const Contacts = () => {
  const hasInitialized = useRef(false);

  const dispatch = useDispatch();

  useEffect(()=>{
      if (hasInitialized.current) return;
      hasInitialized.current = true;
      dispatch(fetchDogPics());
    }, [])
  
  return (
    <div className={css.listWrapper}>
      <TasksPendingList />
    </div>
  );
};

export default Contacts;
