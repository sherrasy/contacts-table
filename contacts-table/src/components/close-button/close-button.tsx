import CloseIcon from '@assets/icon/close.svg';
import { AppRoute } from '@utils/constant';
import { useNavigate } from 'react-router-dom';

function CloseButton(): JSX.Element {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(AppRoute.Main);
  };
  return (
    <button
      className='close-button'
      type='button'
      onClick={handleRedirect}
    >
      <img src={CloseIcon} alt=''/>
    </button>
  );
}
export default CloseButton;
