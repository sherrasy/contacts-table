import AddButton from '@components/add-button/add-button';
import { useAppSelector } from '@utils/hooks';
import Table from '@components/table/table';
import { getContacts } from '@store/contacts-data/selectors';

function MainPage(): JSX.Element {
  const contacts = useAppSelector(getContacts);
  return (
    <div className='main-page'>
      <div className='main-page__wrapper'>
        <div className='main-page__title-wrapper'>
          <h1 className='main-page__title'>Мои контакты</h1>
          <AddButton />
        </div>
        <Table contacts = {contacts}/>
      </div>
    </div>
  );
}
export default MainPage;
