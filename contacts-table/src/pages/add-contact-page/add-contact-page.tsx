import CloseButton from '@components/close-button/close-button';
import AddContactForm from '@components/add-contact-form/add-contact-form';

function AddContactPage(): JSX.Element {
  return (
    <div className='add-contact-page'>
      <div className='add-contact-page__wrapper'>
        <main>
          <CloseButton />
          <div className='add-contact-page__title-wrapper'>
            <h1 className='add-contact-page__title'>Новый контакт</h1>
          </div>
          <AddContactForm />
        </main>
      </div>
    </div>
  );
}
export default AddContactPage;
