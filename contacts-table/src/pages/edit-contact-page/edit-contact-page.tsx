import CloseButton from '@components/close-button/close-button';
import { getContactById } from '@store/contacts-data/selectors';
import EditContactForm from '@components/edit-contact-form/edit-contact-form';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/utils/hooks';
import ErrorMessage from '@components/error-message/error-message';

function EditContactPage(): JSX.Element {
  const {id} = useParams();
  const contact = useAppSelector(getContactById(id))
  if(!contact){
    return <ErrorMessage/>;
  }
  return (
    <div className='edit-contact-page'>
      <div className='edit-contact-page__wrapper'>
      <main>
      <CloseButton/>
        <div className='edit-contact-page__title-wrapper'>
          <h1 className='edit-contact-page__title'>Редактировать контакт</h1>
        </div>
        <EditContactForm contact = {contact}/>
        </main>
      </div>
    </div>
  );
}
export default EditContactPage;
