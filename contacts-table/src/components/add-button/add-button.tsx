import { AppRoute } from '@utils/constant';
import { useNavigate } from 'react-router-dom';

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
      className='main-page__add-button'
      type='button'
      onClick={handleRedirect}
      disabled={isDisabled}
    >
      <span>Добавить +</span>
    </button>
  );
}
export default AddButton;
