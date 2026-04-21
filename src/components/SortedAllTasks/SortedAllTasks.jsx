import { TasksAllList } from '../TasksAllList/TasksAllList';
import css from './SortedAllTasks.module.css';
import { useEffect } from 'react';
import {
  fetchCatPics
} from '../../redux/AppRedux/operations';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export const Contacts = () => {
  const hasInitialized = useRef(false);

  const dispatch = useDispatch();

  
  useEffect(()=>{
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    dispatch(fetchCatPics());
  }, [])

  //console.log(myVal);

  return (
    <div className={css.listWrapper}>
      <TasksAllList/>
    </div>
  );
};

export default Contacts;
