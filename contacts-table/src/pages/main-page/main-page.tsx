import AddButton from '@components/add-button/add-button';
import Loader from '@components/loader/loader';
import Table from '@components/table/table';
import { getIsLoading, getSortedContacts } from '@store/contacts-data/selectors';
import { useAppSelector } from '@utils/hooks';

function MainPage(): JSX.Element {
  const contacts = useAppSelector(getSortedContacts());
  const isLoading = useAppSelector(getIsLoading);
  return (
    <div className='main-page'>
      <div className='main-page__wrapper'>
      <main>
        <div className='main-page__title-wrapper'>
          <h1 className='main-page__title'>Мои контакты</h1>
          <AddButton isDisabled = {isLoading}/>
        </div>
        {isLoading ? <Loader/> :<Table contacts = {contacts}/>}
        </main>
      </div>
    </div>
  );
}
export default MainPage;
