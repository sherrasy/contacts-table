import { AppRoute } from '@utils/constant';
import { useNavigate } from 'react-router-dom';
import Plus from '@assets/icon/plus.svg';

type AddButtonProps = {
  isDisabled: boolean;
};

function AddButton({ isDisabled }: AddButtonProps): JSX.Element {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(AppRoute.AddContact);
  };
  return (
    <button
      className='main-page__add-button add-button'
      type='button'
      onClick={handleRedirect}
      disabled={isDisabled}
    >
      <span className='add-button__text'>Добавить</span>
      <img  className='add-button__icon' src={Plus} alt=''/>
    </button>
  );
}
export default AddButton;
