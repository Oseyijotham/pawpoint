import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
import { selectIsDogPicsLoading } from '../../redux/AppRedux/selectors';

export const Loader = () => {
  const isDogPicsLoading = useSelector(selectIsDogPicsLoading);

  return (
    <>
      {isDogPicsLoading && (
        <div className={css.backDrop}>
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
        </div>
      )}
    </>
  );
};
